"use client";

import { useState } from "react";
import { skills } from "@/data/skills";
import SkillBadge from "./SkillBadge";

export default function TechStack() {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? skills : skills.filter((skill) => !skill.extra);

  return (
    <section id="skills" className="py-14">
      <h2 className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-mist">
        Teknik & Verktyg
      </h2>
      <div className="flex flex-wrap gap-3">
        {visible.map((skill) => (
          <SkillBadge key={skill.name} skill={skill} />
        ))}
        <button
          type="button"
          onClick={() => setShowAll((value) => !value)}
          aria-expanded={showAll}
          className="inline-flex items-center rounded-xl border border-line bg-panel px-4 py-2.5 text-sm text-mist transition-colors hover:border-line-strong hover:text-snow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
        >
          {showAll ? "Visa färre" : "Visa fler"}
        </button>
      </div>
    </section>
  );
}
