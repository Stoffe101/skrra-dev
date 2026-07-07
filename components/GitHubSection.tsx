import { getGitHubData } from "@/lib/github";
import ActivityFeed from "./ActivityFeed";
import GitHubStats from "./GitHubStats";
import LanguageChart from "./LanguageChart";

export default async function GitHubSection() {
  const { profile, languages, activity } = await getGitHubData();

  return (
    <section aria-label="GitHub-statistik" className="py-4">
      <div className="grid gap-5 lg:grid-cols-3">
        <GitHubStats profile={profile} />
        <LanguageChart languages={languages} />
        <ActivityFeed items={activity} />
      </div>
    </section>
  );
}
