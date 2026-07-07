"use client";

import Image from "next/image";
import {
  Brush,
  CloudFog,
  ExternalLink,
  GitFork,
  Package,
  Repeat,
  Star,
  Wrench,
} from "lucide-react";
import type { ProjectAccent } from "@/data/projects";

const accentClasses: Record<ProjectAccent, string> = {
  purple: "from-violet-600/50 via-fuchsia-600/25 to-indigo-950",
  cyan: "from-cyan-500/40 via-sky-600/20 to-cyan-950",
  green: "from-emerald-500/40 via-green-600/20 to-emerald-950",
  slate: "from-slate-500/40 via-slate-600/20 to-slate-950",
  amber: "from-amber-500/40 via-orange-600/20 to-amber-950",
};

export const projectIcons = {
  cloud: CloudFog,
  brush: Brush,
  repeat: Repeat,
  wrench: Wrench,
  package: Package,
} as const;

export type ProjectIconKey = keyof typeof projectIcons;

type Props = {
  title: string;
  description: string;
  tags: string[];
  highlight: boolean;
  accent: ProjectAccent;
  icon: ProjectIconKey;
  image: string | null;
  size: "large" | "compact";
  url: string;
  stats: { stars: number; forks: number; updatedLabel: string };
  /** Om projektets case study-panel är öppen. */
  active: boolean;
  onToggle: () => void;
  panelId: string;
};

export default function ProjectCard({
  title,
  description,
  tags,
  highlight,
  accent,
  icon,
  image,
  size,
  url,
  stats,
  active,
  onToggle,
  panelId,
}: Props) {
  const Icon = projectIcons[icon];

  return (
    <article
      className={`group flex flex-1 flex-col overflow-hidden rounded-2xl border bg-panel transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_40px_-16px_rgb(139_92_246/0.35)] ${
        active
          ? "border-violet-500/60 shadow-[0_0_50px_-18px_rgb(139_92_246/0.6)]"
          : "border-line hover:border-violet-500/40"
      }`}
    >
      <div
        className={`relative overflow-hidden ${
          size === "large" ? "h-40 sm:h-48" : "h-32"
        } ${image ? "" : `bg-gradient-to-br ${accentClasses[accent]}`}`}
      >
        {image ? (
          <>
            <Image
              src={image}
              alt={`Skärmdump från ${title}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-panel via-transparent to-transparent"
            />
          </>
        ) : (
          <div aria-hidden>
            <div className="bg-grid absolute inset-0 opacity-60" />
            <Icon
              className="absolute right-4 bottom-3 h-14 w-14 text-white/20 transition-transform duration-300 group-hover:scale-110"
              strokeWidth={1.2}
            />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-base font-semibold">{title}</h3>
          {highlight && (
            <span className="rounded-full border border-violet-500/40 bg-violet-500/15 px-2 py-0.5 text-[10px] font-medium text-violet-300">
              Featured
            </span>
          )}
        </div>

        <p className="mt-2 text-sm leading-relaxed text-mist">{description}</p>

        <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-line bg-panel-strong px-2 py-1 text-[11px] text-mist"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-4 border-t border-line pt-4 text-xs text-mist">
          <span className="inline-flex items-center gap-1">
            <Star size={13} aria-hidden />
            {stats.stars}
            <span className="sr-only">stjärnor</span>
          </span>
          <span className="inline-flex items-center gap-1">
            <GitFork size={13} aria-hidden />
            {stats.forks}
            <span className="sr-only">forks</span>
          </span>
          <span className="ml-auto">Uppdaterad {stats.updatedLabel}</span>
        </div>

        <div className="mt-3 flex items-center gap-3 text-xs">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md text-mist transition-colors hover:text-snow focus-visible:outline-2 focus-visible:outline-violet-400"
          >
            <ExternalLink size={13} aria-hidden />
            GitHub
          </a>
          <button
            type="button"
            id={`${panelId}-trigger`}
            onClick={onToggle}
            aria-expanded={active}
            aria-controls={panelId}
            className="inline-flex items-center gap-1.5 rounded-md text-violet-300 transition-colors hover:text-violet-200 focus-visible:outline-2 focus-visible:outline-violet-400"
          >
            {active ? "Visa mindre" : "Läs mer"}
          </button>
        </div>
      </div>
    </article>
  );
}
