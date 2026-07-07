import { cache } from "react";
import { site } from "@/data/site";
import { timeAgo } from "./format";

const GITHUB_API = "https://api.github.com";
/** GitHub-data cachas i en timme för att undvika rate limits. */
const REVALIDATE_SECONDS = 3600;

export const githubUsername =
  process.env.GITHUB_USERNAME || site.githubUsername;
export const githubProfileUrl = `https://github.com/${githubUsername}`;

export type GitHubProfile = {
  username: string;
  url: string;
  publicRepos: number;
  followers: number;
  following: number;
  bio: string;
  /** true när API:t inte gick att nå och statisk fallback-data visas. */
  isFallback: boolean;
};

export type RepoStats = {
  name: string;
  stars: number;
  forks: number;
  updatedLabel: string;
  url: string;
};

export type LanguageStat = {
  name: string;
  percent: number;
  color: string;
};

export type ActivityKind = "push" | "release" | "code" | "wrench" | "star";

export type ActivityItem = {
  kind: ActivityKind;
  title: string;
  detail?: string;
  when: string;
};

export type GitHubData = {
  profile: GitHubProfile;
  languages: LanguageStat[];
  activity: ActivityItem[];
  /** Live-statistik per repo, nycklad på gemener av reponamnet. */
  repoStats: Record<string, RepoStats>;
};

const LANGUAGE_COLORS: Record<string, string> = {
  Java: "#f59e0b",
  TypeScript: "#3b82f6",
  JavaScript: "#eab308",
  Python: "#38bdf8",
  PHP: "#818cf8",
  CSS: "#2dd4bf",
  HTML: "#f97316",
  Kotlin: "#ec4899",
  "C#": "#22c55e",
  Shell: "#4ade80",
};
/** Neutral färg för "Övrigt" – medvetet olik alla språkfärger ovan. */
const OTHER_COLOR = "#64748b";
/** Reservfärger för språk som saknas i kartan, så två okända inte blir lika. */
const EXTRA_COLORS = ["#a78bfa", "#f43f5e", "#14b8a6", "#fb923c"];

/**
 * Visas när GitHub API inte går att nå. Medvetet oprecist – inga påhittade
 * exakta siffror eller tidsstämplar. Komponenterna renderar "–" för
 * profilsiffror när isFallback är satt.
 */
const FALLBACK_DATA: GitHubData = {
  profile: {
    username: githubUsername,
    url: githubProfileUrl,
    publicRepos: 0,
    followers: 0,
    following: 0,
    bio: "Java & Minecraft-fokuserade projekt med passion för problemlösning, modding och automation.",
    isFallback: true,
  },
  languages: [
    { name: "Java", percent: 60, color: LANGUAGE_COLORS.Java },
    { name: "TypeScript", percent: 15, color: LANGUAGE_COLORS.TypeScript },
    { name: "Python", percent: 10, color: LANGUAGE_COLORS.Python },
    { name: "CSS", percent: 5, color: LANGUAGE_COLORS.CSS },
    { name: "Övrigt", percent: 10, color: OTHER_COLOR },
  ],
  activity: [
    { kind: "push", title: "Pushade till Atmosphere+", when: "nyligen" },
    { kind: "code", title: "Uppdaterade BlockReskinner", when: "nyligen" },
    {
      kind: "wrench",
      title: "Arbete i MinecraftDev Fork",
      when: "nyligen",
    },
  ],
  repoStats: {},
};

type GitHubUser = {
  login: string;
  public_repos: number;
  followers: number;
  following: number;
  bio: string | null;
  html_url: string;
};

type GitHubRepo = {
  name: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  pushed_at: string;
  html_url: string;
  fork: boolean;
};

type GitHubEvent = {
  type: string;
  created_at: string;
  repo: { name: string };
  payload: {
    ref_type?: string;
    ref?: string | null;
    action?: string;
    release?: { tag_name?: string };
  };
};

async function githubFetch<T>(path: string): Promise<T | null> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  // Token läses endast på servern och skickas aldrig till klienten.
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  try {
    const res = await fetch(`${GITHUB_API}${path}`, {
      headers,
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

function buildLanguages(repos: GitHubRepo[]): LanguageStat[] {
  // Forks räknas inte med – en stor forkad kodbas (t.ex. MinecraftDev)
  // skulle annars skeva bilden av vilka språk de egna projekten använder.
  const ownRepos = repos.filter((repo) => !repo.fork);
  const counts = new Map<string, number>();
  for (const repo of ownRepos) {
    if (!repo.language) continue;
    counts.set(repo.language, (counts.get(repo.language) ?? 0) + 1);
  }
  const total = [...counts.values()].reduce((sum, n) => sum + n, 0);
  if (total === 0) return FALLBACK_DATA.languages;

  const sorted = [...counts.entries()].sort((a, b) => b[1] - a[1]);
  const top = sorted.slice(0, 4);
  const restCount = sorted.slice(4).reduce((sum, [, n]) => sum + n, 0);

  let extraIndex = 0;
  const stats: LanguageStat[] = top.map(([name, n]) => ({
    name,
    percent: Math.round((n / total) * 1000) / 10,
    color:
      LANGUAGE_COLORS[name] ??
      EXTRA_COLORS[extraIndex++ % EXTRA_COLORS.length],
  }));
  if (restCount > 0) {
    stats.push({
      name: "Övrigt",
      percent: Math.round((restCount / total) * 1000) / 10,
      color: OTHER_COLOR,
    });
  }
  return stats;
}

function shortRepoName(fullName: string): string {
  return fullName.split("/").pop() ?? fullName;
}

function buildActivity(events: GitHubEvent[]): ActivityItem[] {
  const items: ActivityItem[] = [];
  const seen = new Set<string>();

  for (const event of events) {
    if (items.length >= 4) break;
    const repo = shortRepoName(event.repo.name);
    const when = timeAgo(event.created_at);
    let item: ActivityItem | null = null;

    switch (event.type) {
      case "PushEvent":
        item = { kind: "push", title: `Pushade till ${repo}`, when };
        break;
      case "ReleaseEvent":
        item = {
          kind: "release",
          title: `Skapade release ${event.payload.release?.tag_name ?? ""}`.trim(),
          detail: repo,
          when,
        };
        break;
      case "CreateEvent":
        if (event.payload.ref_type === "repository") {
          item = { kind: "code", title: `Skapade repot ${repo}`, when };
        } else if (event.payload.ref_type === "tag") {
          item = {
            kind: "release",
            title: `Taggade ${event.payload.ref ?? ""}`.trim(),
            detail: repo,
            when,
          };
        }
        break;
      case "PullRequestEvent":
        item = {
          kind: "wrench",
          title: `${event.payload.action === "closed" ? "Mergade" : "Öppnade"} pull request`,
          detail: repo,
          when,
        };
        break;
      case "WatchEvent":
        item = { kind: "star", title: `Stjärnmärkte ${repo}`, when };
        break;
    }

    if (!item) continue;
    // Undvik att fylla flödet med identiska rader (t.ex. många pushar i rad).
    const key = `${item.kind}:${item.title}`;
    if (seen.has(key)) continue;
    seen.add(key);
    items.push(item);
  }

  return items.length > 0 ? items : FALLBACK_DATA.activity;
}

function buildRepoStats(repos: GitHubRepo[]): Record<string, RepoStats> {
  const stats: Record<string, RepoStats> = {};
  for (const repo of repos) {
    stats[repo.name.toLowerCase()] = {
      name: repo.name,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      updatedLabel: timeAgo(repo.pushed_at),
      url: repo.html_url,
    };
  }
  return stats;
}

/**
 * Hämtar all GitHub-data serverside med graceful fallback.
 * React.cache gör att flera sektioner delar samma hämtning per request.
 */
export const getGitHubData = cache(async (): Promise<GitHubData> => {
  const [user, repos, events] = await Promise.all([
    githubFetch<GitHubUser>(`/users/${githubUsername}`),
    githubFetch<GitHubRepo[]>(
      `/users/${githubUsername}/repos?per_page=100&sort=pushed`
    ),
    githubFetch<GitHubEvent[]>(
      `/users/${githubUsername}/events/public?per_page=30`
    ),
  ]);

  if (!user) return FALLBACK_DATA;

  return {
    profile: {
      username: user.login,
      url: user.html_url,
      publicRepos: user.public_repos,
      followers: user.followers,
      following: user.following,
      bio: user.bio ?? FALLBACK_DATA.profile.bio,
      isFallback: false,
    },
    languages: repos ? buildLanguages(repos) : FALLBACK_DATA.languages,
    activity: events ? buildActivity(events) : FALLBACK_DATA.activity,
    repoStats: repos ? buildRepoStats(repos) : {},
  };
});
