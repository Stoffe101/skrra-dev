# skrra.dev

Personal developer portfolio for **Christoffer Lööf** — system developer student focused on testing, QA, automation, Java and Minecraft/Fabric modding. Live at [skrra.dev](https://skrra.dev).

The site is designed as a dark "developer lab / GitHub dashboard" rather than a traditional portfolio: a terminal-style hero, live GitHub statistics, case-study project cards and an activity feed.

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router, TypeScript)
- [Tailwind CSS v4](https://tailwindcss.com) (CSS-first config via `@theme`)
- [lucide-react](https://lucide.dev) for icons
- Custom SVG donut chart (no chart library)
- Deployed on Vercel

## Features

- **Terminal hero** — syntax-highlighted `whoami` card with line numbers
- **Featured projects** — curated project data merged with live GitHub metadata (stars, forks, last push), with expandable full-width case-study panels
- **GitHub dashboard** — profile stats, most-used languages chart and a recent activity feed built from the GitHub REST API
- **Timeline** — education & experience with status badges
- **Fully static** — the page is prerendered and revalidated hourly (ISR)

## GitHub integration

All GitHub data is fetched **server-side** in [`lib/github.ts`](lib/github.ts):

- Uses the public REST API (`/users`, `/repos`, `/events/public`)
- Responses are cached for one hour (`next: { revalidate: 3600 }`) to stay fast and avoid rate limits
- An optional `GITHUB_TOKEN` raises the rate limit; it is only read on the server and never shipped to the client
- If the API is unreachable, the site falls back to neutral placeholder data instead of breaking — no invented numbers, and the dashboard notes that live data could not be refreshed

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

Copy `.env.example` to `.env.local`:

| Variable          | Required | Description                                      |
| ----------------- | -------- | ------------------------------------------------ |
| `GITHUB_USERNAME` | No       | GitHub account to display (defaults to Stoffe101) |
| `GITHUB_TOKEN`    | No       | Personal access token for a higher API rate limit |

### Scripts

```bash
npm run dev     # development server
npm run build   # production build
npm run lint    # eslint
```

## Project structure

```
app/          # App Router pages, layout, metadata, robots, sitemap, OG image
components/   # UI components (Navbar, Hero, ProjectShowcase, GitHubSection, ...)
data/         # Site config, project/skill/timeline content
lib/          # GitHub API client and formatting helpers
public/       # Static assets, CV (/cv.pdf), project screenshots
```

Site-wide contact details and URLs live in [`data/site.ts`](data/site.ts) — change them once there.
