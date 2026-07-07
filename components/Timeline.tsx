import { timeline, type BadgeTone } from "@/data/timeline";

const toneClasses: Record<BadgeTone, string> = {
  violet: "border-violet-500/40 bg-violet-500/15 text-violet-300",
  cyan: "border-cyan-500/40 bg-cyan-500/15 text-cyan-300",
  emerald: "border-emerald-500/40 bg-emerald-500/15 text-emerald-300",
  amber: "border-amber-500/40 bg-amber-500/15 text-amber-300",
  slate: "border-slate-400/40 bg-slate-400/15 text-slate-300",
};

export default function Timeline() {
  return (
    <ol>
      {timeline.map((entry, index) => (
        <li
          key={entry.title}
          className="grid grid-cols-[minmax(72px,96px)_auto_1fr] gap-x-4"
        >
          <span className="pt-0.5 text-right text-xs leading-relaxed text-faint">
            {entry.period}
          </span>

          <span aria-hidden className="flex flex-col items-center">
            <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-violet-500 shadow-[0_0_10px_rgb(139_92_246/0.8)]" />
            {index < timeline.length - 1 && (
              <span className="w-px flex-1 bg-violet-500/25" />
            )}
          </span>

          <div className={index < timeline.length - 1 ? "pb-8" : ""}>
            <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-1.5">
              <h3 className="text-sm font-semibold">{entry.title}</h3>
              <span
                className={`rounded-full border px-2.5 py-0.5 text-[10px] font-medium ${toneClasses[entry.tone]}`}
              >
                {entry.badge}
              </span>
            </div>
            <p className="mt-1 text-xs text-mist">{entry.subtitle}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
