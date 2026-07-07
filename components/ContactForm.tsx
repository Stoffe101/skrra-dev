"use client";

import { useActionState } from "react";
import { CheckCircle2, Loader2, Send, XCircle } from "lucide-react";
import {
  sendContactMessage,
  type ContactFormState,
} from "@/app/actions/send-contact";
import { site } from "@/data/site";

const initialState: ContactFormState = { status: "idle", message: "" };

const fieldClasses =
  "w-full rounded-xl border border-line bg-panel-strong px-4 py-2.5 text-sm text-snow placeholder:text-faint transition-colors focus:border-violet-500/60 focus:outline-none focus-visible:outline-2 focus-visible:outline-violet-400";

const labelClasses = "mb-1.5 block text-xs font-medium text-mist";

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    sendContactMessage,
    initialState
  );

  return (
    <div className="rounded-2xl border border-line bg-panel p-6 sm:p-7">
      <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-mist">
        Skicka ett meddelande
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-mist">
        Fyll i formuläret så återkommer jag – eller maila direkt till{" "}
        <a
          href={`mailto:${site.email}`}
          className="text-violet-300 transition-colors hover:text-violet-200 focus-visible:outline-2 focus-visible:outline-violet-400"
        >
          {site.email}
        </a>
        .
      </p>

      <form action={formAction} className="mt-5 space-y-4">
        {/* Honeypot – osynligt för människor, lockbete för bots. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label htmlFor="contact-company">Företag</label>
          <input
            type="text"
            id="contact-company"
            name="company"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="contact-name" className={labelClasses}>
              Namn
            </label>
            <input
              type="text"
              id="contact-name"
              name="name"
              required
              maxLength={80}
              autoComplete="name"
              className={fieldClasses}
            />
          </div>
          <div>
            <label htmlFor="contact-email" className={labelClasses}>
              E-post
            </label>
            <input
              type="email"
              id="contact-email"
              name="email"
              required
              maxLength={120}
              autoComplete="email"
              className={fieldClasses}
            />
          </div>
        </div>

        <div>
          <label htmlFor="contact-subject" className={labelClasses}>
            Ämne
          </label>
          <input
            type="text"
            id="contact-subject"
            name="subject"
            required
            maxLength={120}
            className={fieldClasses}
          />
        </div>

        <div>
          <label htmlFor="contact-message" className={labelClasses}>
            Meddelande
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            minLength={10}
            maxLength={2000}
            rows={5}
            className={`${fieldClasses} resize-y`}
          />
        </div>

        {state.status === "success" && (
          <p
            role="status"
            className="flex items-start gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300"
          >
            <CheckCircle2 size={16} aria-hidden className="mt-0.5 shrink-0" />
            {state.message}
          </p>
        )}
        {state.status === "error" && (
          <p
            role="alert"
            className="flex items-start gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-300"
          >
            <XCircle size={16} aria-hidden className="mt-0.5 shrink-0" />
            {state.message}
          </p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-violet-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? (
            <Loader2 size={16} aria-hidden className="animate-spin" />
          ) : (
            <Send size={16} aria-hidden />
          )}
          {isPending ? "Skickar…" : "Skicka meddelande"}
        </button>
      </form>
    </div>
  );
}
