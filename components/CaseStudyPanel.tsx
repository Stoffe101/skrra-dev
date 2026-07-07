"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import type { CaseStudy } from "@/data/projects";
import { projectIcons, type ProjectIconKey } from "./ProjectCard";

type Props = {
  id: string;
  title: string;
  icon: ProjectIconKey;
  caseStudy: CaseStudy;
  onClose: () => void;
};

export default function CaseStudyPanel({
  id,
  title,
  icon,
  caseStudy,
  onClose,
}: Props) {
  const Icon = projectIcons[icon];
  const panelRef = useRef<HTMLDivElement>(null);

  // Scrollar in panelen i vyn när den öppnas, om den inte redan syns helt.
  useEffect(() => {
    const el = panelRef.current;
    if (!el || el.offsetParent === null) return;
    const rect = el.getBoundingClientRect();
    const fullyVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
    if (fullyVisible) return;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    el.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  }, []);

  const columns = [
    [
      { label: "Problem", text: caseStudy.problem },
      { label: "Vad jag byggde", text: caseStudy.built },
      { label: "Teknik", text: caseStudy.tech },
    ],
    [
      { label: "Min roll", text: caseStudy.role },
      { label: "Vad jag lärde mig", text: caseStudy.learned },
    ],
  ];

  return (
    <div
      id={id}
      ref={panelRef}
      className="panel-enter relative scroll-mt-24 overflow-hidden rounded-2xl border border-violet-500/30 bg-gradient-to-br from-violet-950/40 via-panel to-panel p-6 shadow-[0_0_60px_-22px_rgb(139_92_246/0.5)] sm:p-7"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 -right-16 h-56 w-56 rounded-full bg-violet-600/15 blur-3xl"
      />

      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span
              aria-hidden
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-violet-500/30 bg-violet-500/10 text-violet-300"
            >
              <Icon size={17} />
            </span>
            <h3 className="text-base font-semibold sm:text-lg">
              {title}
              <span className="ml-2 text-xs font-normal text-mist">
                Case study
              </span>
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-panel-strong px-3 py-1.5 text-xs text-mist transition-colors hover:border-line-strong hover:text-snow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
          >
            <X size={13} aria-hidden />
            Stäng
          </button>
        </div>

        <div className="mt-6 grid gap-x-10 gap-y-5 md:grid-cols-2">
          {columns.map((sections, columnIndex) => (
            <dl key={columnIndex} className="space-y-5">
              {sections.map((section) => (
                <div key={section.label}>
                  <dt className="text-[10px] font-semibold uppercase tracking-wide text-violet-300">
                    {section.label}
                  </dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-snow/85">
                    {section.text}
                  </dd>
                </div>
              ))}
            </dl>
          ))}
        </div>
      </div>
    </div>
  );
}
