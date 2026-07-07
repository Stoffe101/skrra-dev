import { ArrowRight, Check } from "lucide-react";
import Timeline from "./Timeline";

const checklist = [
  "Studerar Systemutvecklare (inr. Testing) – YH-utbildning",
  "Intresserad av QA, automation och cybersäkerhet",
  "Erfarenhet från projekt, GitHub och praktisk felsökning",
  "Bakgrund inom service, försäljning och IT-supportliknande arbete",
];

export default function AboutSection() {
  return (
    <section id="about" className="py-14">
      <div className="grid gap-5 lg:grid-cols-[2fr_3fr]">
        <div className="flex flex-col rounded-2xl border border-line bg-panel p-6 sm:p-7">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-mist">
            Om mig
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-mist">
            Jag studerar systemutveckling med inriktning mot testning och är
            särskilt intresserad av automation, QA och cybersäkerhet.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-mist">
            Jag driver egna utvecklingsprojekt inom Java, Minecraft/Fabric och
            webbutveckling, där jag arbetar praktiskt med kod, testning,
            felsökning och iteration. AI använder jag som ett verktyg i
            utvecklingsprocessen, samtidigt som jag är delaktig i hela kedjan –
            idé, krav, implementation, granskning och vidareutveckling.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-mist">
            Jag gillar att felsöka problem, förstå system och bygga lösningar
            som gör skillnad – oavsett om det är i Minecraft, på webben eller i
            backend.
          </p>

          <ul className="mt-6 space-y-3">
            {checklist.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm">
                <Check
                  size={16}
                  aria-hidden
                  className="mt-0.5 shrink-0 text-emerald-400"
                />
                <span className="text-snow">{item}</span>
              </li>
            ))}
          </ul>

          <a
            href="/cv.pdf"
            className="mt-8 inline-flex w-fit items-center gap-2 rounded-xl border border-line bg-panel-strong px-4 py-2 text-sm text-snow transition-colors hover:border-line-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
          >
            Läs mer om mig
            <ArrowRight size={15} aria-hidden />
          </a>
        </div>

        <div
          id="experience"
          className="rounded-2xl border border-line bg-panel p-6 sm:p-7"
        >
          <h2 className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-mist">
            Utbildning & Erfarenhet
          </h2>
          <Timeline />
        </div>
      </div>
    </section>
  );
}
