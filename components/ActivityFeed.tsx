import {
  Code2,
  GitCommitHorizontal,
  Star,
  Tag,
  Wrench,
} from "lucide-react";
import type { ActivityItem, ActivityKind } from "@/lib/github";

const icons: Record<ActivityKind, typeof Code2> = {
  push: GitCommitHorizontal,
  release: Tag,
  code: Code2,
  wrench: Wrench,
  star: Star,
};

export default function ActivityFeed({ items }: { items: ActivityItem[] }) {
  return (
    <div className="rounded-2xl border border-line bg-panel p-6">
      <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-mist">
        Senaste aktivitet
      </h2>

      <ul className="mt-5 divide-y divide-line">
        {items.map((item, index) => {
          const Icon = icons[item.kind];
          return (
            <li key={index} className="flex items-start gap-3 py-3.5">
              <span
                aria-hidden
                className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-line bg-panel-strong text-violet-300"
              >
                <Icon size={15} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="line-clamp-2 text-sm leading-snug break-words text-snow">
                  {item.title}
                </p>
                {item.detail && (
                  <p className="mt-0.5 line-clamp-1 text-xs break-words text-mist">
                    {item.detail}
                  </p>
                )}
              </div>
              <span className="shrink-0 pt-0.5 text-xs whitespace-nowrap text-faint">
                {item.when}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
