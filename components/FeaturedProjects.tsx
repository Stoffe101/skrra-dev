import { ArrowRight } from "lucide-react";
import { projects } from "@/data/projects";
import { getGitHubData } from "@/lib/github";
import ProjectShowcase, { type ShowcaseProject } from "./ProjectShowcase";

export default async function FeaturedProjects() {
  const { repoStats, profile } = await getGitHubData();

  const showcaseProjects: ShowcaseProject[] = projects
    .filter((project) => project.featured)
    .map((project) => {
      const live = repoStats[project.repo.toLowerCase()];
      return {
        title: project.title,
        description: project.description,
        caseStudy: project.caseStudy,
        tags: project.tags,
        highlight: project.highlight,
        accent: project.accent,
        icon: project.icon,
        image: project.image,
        url: live?.url ?? `${profile.url}/${project.repo}`,
        stats: live
          ? {
              stars: live.stars,
              forks: live.forks,
              updatedLabel: live.updatedLabel,
            }
          : project.fallbackStats,
      };
    });

  return (
    <section id="projects" className="py-14">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-mist">
          Utvalda projekt
        </h2>
        <a
          href={`${profile.url}?tab=repositories`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-md text-sm text-violet-300 transition-colors hover:text-violet-200 focus-visible:outline-2 focus-visible:outline-violet-400"
        >
          Se alla projekt
          <ArrowRight size={15} aria-hidden />
        </a>
      </div>

      <ProjectShowcase projects={showcaseProjects} />
    </section>
  );
}
