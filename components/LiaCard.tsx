import { Check, GraduationCap } from "lucide-react";
import { site } from "@/data/site";

const points = [
  "QA, testautomation och systemutveckling",
  "Java, webbutveckling och närliggande teknik",
  "Malmö/Skåne – hybrid eller remote beroende på upplägg",
];

export default function LiaCard() {
  return (
    <div className="flex flex-col rounded-2xl border border-line bg-panel p-6 sm:p-7">
      <div className="flex items-center gap-3">
        <span
          aria-hidden
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
        >
          <GraduationCap size={17} />
        </span>
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Öppen för LIA
        </span>
      </div>

      <h3 className="mt-5 text-lg font-semibold">
        Söker du en LIA-student inom test och utveckling?
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-mist">
        Jag studerar Systemutvecklare med inriktning test på Jensen
        Yrkeshögskola och är öppen för LIA där jag kan bidra med testning,
        felsökning, automation och praktisk utveckling – och lära mig av ett
        riktigt team.
      </p>

      <ul className="mt-5 space-y-2.5">
        {points.map((point) => (
          <li key={point} className="flex items-start gap-2.5 text-sm">
            <Check
              size={16}
              aria-hidden
              className="mt-0.5 shrink-0 text-emerald-400"
            />
            <span className="text-snow">{point}</span>
          </li>
        ))}
      </ul>

      <p className="mt-auto pt-6 text-sm text-mist">
        Hör av dig via formuläret eller{" "}
        <a
          href={`mailto:${site.email}`}
          className="text-violet-300 transition-colors hover:text-violet-200 focus-visible:outline-2 focus-visible:outline-violet-400"
        >
          {site.email}
        </a>
        .
      </p>
    </div>
  );
}
