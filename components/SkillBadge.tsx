import type { Skill } from "@/data/skills";

export default function SkillBadge({ skill }: { skill: Skill }) {
  return (
    <span className="inline-flex items-center gap-2.5 rounded-xl border border-line bg-panel px-4 py-2.5 text-sm text-snow transition-all duration-200 hover:-translate-y-0.5 hover:border-line-strong hover:bg-panel-strong">
      <span
        aria-hidden
        className="flex h-6 w-6 items-center justify-center rounded-md font-mono text-[10px] font-bold"
        style={{ backgroundColor: `${skill.color}22`, color: skill.color }}
      >
        {skill.abbr}
      </span>
      {skill.name}
    </span>
  );
}
