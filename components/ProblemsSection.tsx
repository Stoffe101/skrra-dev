import {
  AtSign,
  Bug,
  FlaskConical,
  Globe,
  Scaling,
  Wrench,
} from "lucide-react";

const problems = [
  {
    icon: Wrench,
    title: "Byggsystem & Gradle",
    text: "Beroenden, wrappers och builds som vägrar bygga – tills de gör det.",
  },
  {
    icon: Bug,
    title: "Minecraft/Fabric-debugging",
    text: "Mixins, mappings och klientkrascher som kräver riktig felsökning.",
  },
  {
    icon: Scaling,
    title: "UI-skalning & användbarhet",
    text: "Gränssnitt som ska fungera på alla skärmar och kännas självklara.",
  },
  {
    icon: FlaskConical,
    title: "Automation & testning",
    text: "Repetitiva flöden som borde sköta sig själva – och testas automatiskt.",
  },
  {
    icon: Globe,
    title: "Webbformulär & backend-logik",
    text: "Validering, API:er och datamodeller som håller ihop hela vägen.",
  },
  {
    icon: AtSign,
    title: "DNS, domäner & mail",
    text: "Records, zoner och mailleverans som strular i det tysta.",
  },
];

export default function ProblemsSection() {
  return (
    <section aria-labelledby="problems-heading" className="py-4">
      <h2
        id="problems-heading"
        className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-mist"
      >
        Problems I Like Solving
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {problems.map((problem) => (
          <div
            key={problem.title}
            className="flex items-start gap-3.5 rounded-2xl border border-line bg-panel p-5 transition-colors hover:border-violet-500/40"
          >
            <span
              aria-hidden
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-violet-500/30 bg-violet-500/10 text-violet-300"
            >
              <problem.icon size={17} />
            </span>
            <div>
              <h3 className="text-sm font-semibold">{problem.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-mist">
                {problem.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
