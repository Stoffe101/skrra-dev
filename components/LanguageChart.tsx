import type { LanguageStat } from "@/lib/github";

const RADIUS = 52;
const STROKE = 22;
const SIZE = (RADIUS + STROKE / 2) * 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function LanguageChart({
  languages,
}: {
  languages: LanguageStat[];
}) {
  const segments = languages.map((language, index) => {
    const length = (language.percent / 100) * CIRCUMFERENCE;
    const offset = languages
      .slice(0, index)
      .reduce((sum, prev) => sum + (prev.percent / 100) * CIRCUMFERENCE, 0);
    return { ...language, length, offset };
  });

  return (
    <div className="rounded-2xl border border-line bg-panel p-6">
      <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-mist">
        Mest använda språk
      </h2>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-8 sm:flex-nowrap">
        <svg
          width={SIZE}
          height={SIZE}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          role="img"
          aria-label={`Språkfördelning: ${languages
            .map((language) => `${language.name} ${language.percent} procent`)
            .join(", ")}`}
          className="shrink-0 -rotate-90"
        >
          {segments.map((segment) => (
            <circle
              key={segment.name}
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={RADIUS}
              fill="none"
              stroke={segment.color}
              strokeWidth={STROKE}
              strokeDasharray={`${segment.length} ${CIRCUMFERENCE - segment.length}`}
              strokeDashoffset={-segment.offset}
            />
          ))}
        </svg>

        <ul className="w-full min-w-0 flex-1 space-y-2.5">
          {languages.map((language) => (
            <li
              key={language.name}
              className="flex items-center gap-2.5 text-sm"
            >
              <span
                aria-hidden
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: language.color }}
              />
              <span className="text-snow">{language.name}</span>
              <span className="ml-auto text-mist">{language.percent}%</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
