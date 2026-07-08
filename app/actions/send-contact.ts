"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { site } from "@/data/site";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message: string;
};

const LIMITS = {
  name: 80,
  email: 120,
  subject: 120,
  message: 2000,
  messageMin: 10,
} as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const GENERIC_ERROR =
  "Meddelandet kunde inte skickas. Kontrollera fälten och försök igen, eller maila direkt.";

/**
 * Best effort-rate limit per IP. In-memory och därmed per serverinstans –
 * nollställs vid cold starts på Vercel, men stoppar enkla skript.
 * Kan bytas mot t.ex. Upstash Ratelimit utan att röra formuläret.
 */
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
// Tillfälligt höjd under felsökning (var 5) så legitima tester inte blockas.
const RATE_LIMIT_MAX = 20;
const submissionLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (submissionLog.get(ip) ?? []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS
  );
  if (recent.length >= RATE_LIMIT_MAX) {
    submissionLog.set(ip, recent);
    return true;
  }
  recent.push(now);
  submissionLog.set(ip, recent);
  // Håll kartan liten.
  if (submissionLog.size > 1000) {
    const oldestKey = submissionLog.keys().next().value;
    if (oldestKey) submissionLog.delete(oldestKey);
  }
  return false;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Tar bort kontrolltecken men behåller radbrytningar och tab. */
function stripControlChars(value: string): string {
  let out = "";
  for (const ch of value) {
    const code = ch.charCodeAt(0);
    const isAllowedWhitespace = code === 9 || code === 10 || code === 13;
    if (isAllowedWhitespace || (code >= 32 && code !== 127)) {
      out += ch;
    }
  }
  return out;
}

function cleanField(value: FormDataEntryValue | null, maxLength: number) {
  if (typeof value !== "string") return "";
  return stripControlChars(value).trim().slice(0, maxLength);
}

export async function sendContactMessage(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  // Säker felsökningslogg: aldrig nyckelvärden, aldrig meddelandeinnehåll.
  console.log("[contact-form] action started", {
    hasResendApiKey: Boolean(process.env.RESEND_API_KEY),
    hasResendFrom: Boolean(process.env.RESEND_FROM),
  });

  // Honeypot: fältet är osynligt för människor. Ifyllt ⇒ bot.
  // Låtsas lyckas så att skript inte får någon signal att justera mot.
  const honeypot = formData.get("company");
  if (typeof honeypot === "string" && honeypot.length > 0) {
    console.warn("[contact-form] honeypot triggered");
    return {
      status: "success",
      message: "Tack! Ditt meddelande har skickats.",
    };
  }

  const name = cleanField(formData.get("name"), LIMITS.name);
  const email = cleanField(formData.get("email"), LIMITS.email);
  const subject = cleanField(formData.get("subject"), LIMITS.subject);
  const message = cleanField(formData.get("message"), LIMITS.message);

  if (
    !name ||
    !subject ||
    message.length < LIMITS.messageMin ||
    !EMAIL_PATTERN.test(email)
  ) {
    console.warn("[contact-form] validation failed", {
      hasName: Boolean(name),
      hasSubject: Boolean(subject),
      emailValid: EMAIL_PATTERN.test(email),
      messageLength: message.length,
    });
    return { status: "error", message: GENERIC_ERROR };
  }

  const headerList = await headers();
  const ip =
    headerList.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    // Maskad IP: endast första oktetten/blocket loggas.
    console.warn("[contact-form] rate limited", {
      ipPrefix: ip.split(/[.:]/)[0] ?? "unknown",
    });
    return { status: "error", message: GENERIC_ERROR };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact-form] missing RESEND_API_KEY");
    return {
      status: "error",
      message: `Formuläret är inte tillgängligt just nu – maila gärna direkt till ${site.email}.`,
    };
  }

  const resend = new Resend(apiKey);
  // Exakt denna avsändare används om RESEND_FROM inte är satt.
  const from =
    process.env.RESEND_FROM || "skrra.dev Kontakt <noreply@skrra.dev>";

  const text = [
    `Namn: ${name}`,
    `E-post: ${email}`,
    `Ämne: ${subject}`,
    "",
    message,
  ].join("\n");

  const html = `
    <div style="font-family:sans-serif;line-height:1.6">
      <h2 style="margin:0 0 12px">Nytt meddelande via skrra.dev</h2>
      <p style="margin:0"><strong>Namn:</strong> ${escapeHtml(name)}</p>
      <p style="margin:0"><strong>E-post:</strong> ${escapeHtml(email)}</p>
      <p style="margin:0 0 12px"><strong>Ämne:</strong> ${escapeHtml(subject)}</p>
      <p style="white-space:pre-wrap;margin:0">${escapeHtml(message)}</p>
    </div>
  `;

  console.log("[contact-form] sending via Resend", {
    to: site.email,
    fromConfigured: Boolean(process.env.RESEND_FROM),
    replyToValid: EMAIL_PATTERN.test(email),
  });

  try {
    const { error } = await resend.emails.send({
      from,
      to: [site.email],
      replyTo: email,
      subject: `[skrra.dev] ${subject}`,
      text,
      html,
    });

    if (error) {
      // Resend-fel innehåller name/message och ibland statusCode.
      const details = error as {
        name?: string;
        message?: string;
        statusCode?: number;
      };
      console.error("[contact-form] Resend send failed", {
        name: details.name,
        message: details.message,
        statusCode: details.statusCode,
      });
      return { status: "error", message: GENERIC_ERROR };
    }
  } catch (thrown) {
    const err = thrown instanceof Error ? thrown : new Error(String(thrown));
    console.error("[contact-form] Resend send threw", {
      name: err.name,
      message: err.message,
    });
    return { status: "error", message: GENERIC_ERROR };
  }

  console.log("[contact-form] sent successfully");
  return { status: "success", message: "Tack! Ditt meddelande har skickats." };
}
