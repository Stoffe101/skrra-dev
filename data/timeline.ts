export type BadgeTone = "violet" | "cyan" | "emerald" | "amber" | "slate";

export type TimelineEntry = {
  period: string;
  title: string;
  subtitle: string;
  badge: string;
  tone: BadgeTone;
};

export const timeline: TimelineEntry[] = [
  {
    period: "Aug 2025 – Maj 2027",
    title: "Systemutvecklare med inriktning test",
    subtitle: "Jensen Yrkeshögskola · Examen maj 2027",
    badge: "Pågående",
    tone: "violet",
  },
  {
    period: "2024 – pågående",
    title: "Egen utveckling & projekt",
    subtitle: "Java, Fabric, Minecraft-modding, Web, Automation",
    badge: "Projekt",
    tone: "cyan",
  },
  {
    period: "2020 – 2023",
    title: "IT-program Backend",
    subtitle: "NTI Gymnasiet · Backend, databaser och webbutveckling",
    badge: "Examen 2023",
    tone: "slate",
  },
  {
    period: "2022",
    title: "Praktik – Sydafrika",
    subtitle: "IT-stöd, programmering och undervisning",
    badge: "Praktik",
    tone: "emerald",
  },
  {
    period: "2021 och tidigare",
    title: "Kundservice, försäljning, VR-studio",
    subtitle: "Teknik, felsökning och live-event",
    badge: "Erfarenhet",
    tone: "amber",
  },
];
