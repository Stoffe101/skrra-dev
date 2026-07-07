import { ArrowRight } from "lucide-react";
import type { GitHubProfile } from "@/lib/github";
import { GitHubIcon } from "./BrandIcons";

export default function GitHubStats({ profile }: { profile: GitHubProfile }) {
  const stats = [
    { value: profile.publicRepos, label: "Repositories" },
    { value: profile.followers, label: "Followers" },
    { value: profile.following, label: "Following" },
  ];

  return (
    <div className="flex flex-col rounded-2xl border border-line bg-panel p-6">
      <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-mist">
        GitHub översikt
      </h2>

      <p className="mt-5 flex items-center gap-2.5 text-lg font-semibold">
        <GitHubIcon size={20} />
        {profile.username}
      </p>

      <dl className="mt-5 grid grid-cols-3 gap-3">
        {stats.map((stat) => (
          <div key={stat.label}>
            <dd className="text-3xl font-bold text-violet-300">
              {profile.isFallback ? "–" : stat.value}
            </dd>
            <dt className="mt-1 text-xs text-faint">{stat.label}</dt>
          </div>
        ))}
      </dl>

      <p className="mt-5 text-sm leading-relaxed text-mist">{profile.bio}</p>

      {profile.isFallback && (
        <p className="mt-3 text-xs text-faint">
          GitHub-data kunde inte uppdateras just nu.
        </p>
      )}

      <a
        href={profile.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto inline-flex w-fit items-center gap-2 rounded-xl border border-line bg-panel-strong px-4 py-2 pt-2 text-sm text-snow transition-colors hover:border-line-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
      >
        Visa GitHub-profil
        <ArrowRight size={15} aria-hidden />
      </a>
    </div>
  );
}
