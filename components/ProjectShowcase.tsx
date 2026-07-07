"use client";

import { useEffect, useState } from "react";
import type { CaseStudy, ProjectAccent } from "@/data/projects";
import CaseStudyPanel from "./CaseStudyPanel";
import ProjectCard, { type ProjectIconKey } from "./ProjectCard";

export type ShowcaseProject = {
  title: string;
  description: string;
  caseStudy: CaseStudy;
  tags: string[];
  highlight: boolean;
  accent: ProjectAccent;
  icon: ProjectIconKey;
  image: string | null;
  url: string;
  stats: { stars: number; forks: number; updatedLabel: string };
};

function panelIdFor(title: string) {
  return `case-study-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
}

export default function ProjectShowcase({
  projects,
}: {
  projects: ShowcaseProject[];
}) {
  const [selected, setSelected] = useState<string | null>(null);

  const rows: ShowcaseProject[][] = [];
  for (let i = 0; i < projects.length; i += 2) {
    rows.push(projects.slice(i, i + 2));
  }

  const toggle = (title: string) =>
    setSelected((current) => (current === title ? null : title));

  // Stänger panelen och lämnar tillbaka fokus till kortets "Läs mer"-knapp.
  const close = (title: string) => {
    setSelected(null);
    const trigger = document.getElementById(`${panelIdFor(title)}-trigger`);
    requestAnimationFrame(() => trigger?.focus());
  };

  useEffect(() => {
    if (!selected) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close(selected);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selected]);

  return (
    <div className="space-y-5">
      {rows.map((row, rowIndex) => {
        const selectedProject = row.find(
          (project) => project.title === selected
        );
        return (
          <div key={rowIndex} className="space-y-5">
            <div className="grid gap-5 md:grid-cols-2">
              {row.map((project) => (
                <div key={project.title} className="flex h-full flex-col gap-5">
                  <ProjectCard
                    title={project.title}
                    description={project.description}
                    tags={project.tags}
                    highlight={project.highlight}
                    accent={project.accent}
                    icon={project.icon}
                    image={project.image}
                    size={project.highlight ? "large" : "compact"}
                    url={project.url}
                    stats={project.stats}
                    active={selected === project.title}
                    onToggle={() => toggle(project.title)}
                    panelId={panelIdFor(project.title)}
                  />
                  {/* På mobil visas panelen direkt under det valda kortet. */}
                  {selected === project.title && (
                    <div className="md:hidden">
                      <CaseStudyPanel
                        id={`${panelIdFor(project.title)}-mobil`}
                        title={project.title}
                        icon={project.icon}
                        caseStudy={project.caseStudy}
                        onClose={() => close(project.title)}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
            {/* På desktop/tablet visas panelen i full bredd under kortraden. */}
            {selectedProject && (
              <div className="hidden md:block">
                <CaseStudyPanel
                  id={panelIdFor(selectedProject.title)}
                  title={selectedProject.title}
                  icon={selectedProject.icon}
                  caseStudy={selectedProject.caseStudy}
                  onClose={() => close(selectedProject.title)}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
