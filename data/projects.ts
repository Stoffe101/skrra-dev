export type ProjectAccent = "purple" | "cyan" | "green" | "slate" | "amber";

export type CaseStudy = {
  problem: string;
  built: string;
  tech: string;
  role: string;
  learned: string;
};

export type Project = {
  title: string;
  /**
   * GitHub-reponamn som används för att matcha live-statistik
   * (matchas skiftlägesokänsligt). Ändra här om repot byter namn.
   */
  repo: string;
  /** Visas bland de fyra utvalda korten på startsidan. */
  featured: boolean;
  /** Markerar de två huvudprojekten (större kort + badge). */
  highlight: boolean;
  description: string;
  caseStudy: CaseStudy;
  tags: string[];
  accent: ProjectAccent;
  icon: "cloud" | "brush" | "repeat" | "wrench" | "package";
  /**
   * Sökväg till skärmdump under /public, t.ex. "/projects/atmosphere-plus.png".
   * Lämna som null så används gradient/ikon-fallbacken.
   */
  image: string | null;
  fallbackStats: { stars: number; forks: number; updatedLabel: string };
};

export const projects: Project[] = [
  {
    title: "Atmosphere+",
    repo: "AtmospherePlus",
    featured: true,
    highlight: true,
    description:
      "Client-side Fabric mod som låter spelare justera atmosfär, fog, färger och visuella inställningar.",
    caseStudy: {
      problem:
        "Minecrafts atmosfär och färger är låsta – spelare kan inte anpassa den visuella upplevelsen efter smak eller tillgänglighet.",
      built:
        "Client-side mod med justerbar fog, färgtoner och visuella presets som uppdateras i realtid, med konfigurationssystem och eget UI.",
      tech: "Java, Fabric API, Gradle, client-side rendering och config-hantering.",
      role: "Jag har drivit projektet från idé till fungerande client-side mod, arbetat praktiskt i kodbasen, implementerat och justerat funktioner, testat visuella effekter in-game, felsökt rendering/config-problem och itererat UI, presets och användarupplevelse med AI som stöd i utvecklingsprocessen.",
      learned:
        "Hur Minecrafts renderingspipeline hänger ihop, hur client-side mods hålls server-säkra och hur visuella inställningar görs användarvänliga.",
    },
    tags: ["Java", "Fabric", "Gradle", "Minecraft"],
    accent: "purple",
    icon: "cloud",
    image: null, // t.ex. "/projects/atmosphere-plus.png"
    fallbackStats: { stars: 4, forks: 1, updatedLabel: "2 dagar sedan" },
  },
  {
    title: "BlockReskinner",
    repo: "BlockReskinner",
    featured: true,
    highlight: true,
    description:
      "Client-side Fabric-mod som låter spelare ändra hur block ser ut visuellt, med fokus på tydligt UI, blockval och praktisk användbarhet.",
    caseStudy: {
      problem:
        "Att ändra hur block ser ut kräver normalt resource packs eller serverändringar – omständligt för spelare som bara vill anpassa utseendet.",
      built:
        "Client-side mod där spelare väljer block och ändrar deras utseende visuellt via ett tydligt UI – utan att världens faktiska data påverkas.",
      tech: "Java, Fabric API, Gradle, UI-flöden samt blockmodell- och texturhantering.",
      role: "Jag har drivit konceptet och utvecklingen av moddet, arbetat praktiskt i kodbasen, implementerat och justerat funktioner, testat blockval och UI-flöden i Minecraft, felsökt problem och itererat användarupplevelsen med AI som stöd i utvecklingsprocessen.",
      learned:
        "Hur Minecraft renderar blockmodeller, hur UI-flöden görs intuitiva och hur visuella ändringar isoleras helt client-side.",
    },
    tags: ["Java", "Fabric", "Gradle", "Minecraft", "UI"],
    accent: "cyan",
    icon: "brush",
    image: null, // t.ex. "/projects/blockreskinner.png"
    fallbackStats: { stars: 2, forks: 0, updatedLabel: "2 dagar sedan" },
  },
  {
    title: "TradeCycler",
    repo: "TradeCycler",
    featured: true,
    highlight: false,
    description:
      "Mod som förenklar villager trade-rerolling och handel med smarta UI-verktyg.",
    caseStudy: {
      problem:
        "Villager trade-rerolling är repetitivt och kräver hundratals manuella klick för att hitta rätt trades.",
      built:
        "Mod med smarta UI-verktyg som förenklar rerolling och ger tydlig överblick över trades direkt i spelet.",
      tech: "Java, Fabric API, UI-komponenter och event-hantering kring spelmekanik.",
      role: "Jag har drivit projektet från idé till fungerande implementation, arbetat praktiskt i kodbasen, implementerat och justerat funktioner, testat i Minecraft, felsökt problem och itererat lösningen med AI som stöd i utvecklingsprocessen.",
      learned:
        "Event-hantering i Fabric, UI-design in-game och hur automation balanseras mot spelupplevelsen.",
    },
    tags: ["Java", "Fabric", "UI", "Minecraft"],
    accent: "green",
    icon: "repeat",
    image: null, // t.ex. "/projects/tradecycler.png"
    fallbackStats: { stars: 3, forks: 1, updatedLabel: "1 vecka sedan" },
  },
  {
    title: "MinecraftDev Fork",
    repo: "MinecraftDev",
    featured: true,
    highlight: false,
    description:
      "Fork av MinecraftDev-plugin med fixes för Gradle wrapper generation och templates.",
    caseStudy: {
      problem:
        "MinecraftDev-pluginet hade buggar i Gradle wrapper-generering och projektmallar som störde arbetsflödet vid modutveckling.",
      built:
        "Fork med fixar för wrapper-genereringen och uppdaterade projektmallar som fungerar i moderna miljöer.",
      tech: "Java, Gradle och IntelliJ plugin-utveckling.",
      role: "Jag har identifierat och isolerat buggar i en stor befintlig kodbas, arbetat praktiskt i koden, implementerat och justerat fixar, testat i verklig miljö och itererat lösningen med AI som stöd i utvecklingsprocessen.",
      learned:
        "Att navigera och förbättra en stor extern kodbas utan att bryta befintlig funktionalitet.",
    },
    tags: ["Java", "Gradle", "Plugin Dev"],
    accent: "slate",
    icon: "wrench",
    image: null, // t.ex. "/projects/minecraftdev-fork.png"
    fallbackStats: { stars: 2, forks: 0, updatedLabel: "3 veckor sedan" },
  },
  {
    title: "Villager Pickup",
    repo: "VillagerPickup",
    featured: false,
    highlight: false,
    description:
      "Experimentmod för att plocka upp och lagra villagers som items med NBT-data.",
    caseStudy: {
      problem:
        "Att flytta villagers i Minecraft är omständligt och felbenäget – det saknas ett smidigt sätt att transportera dem.",
      built:
        "Experimentmod där villagers serialiseras till NBT och återskapas exakt – inventarier, yrken och trades bevaras.",
      tech: "Java, Fabric API och NBT-/datastrukturhantering.",
      role: "Jag har drivit projektet från idé till fungerande implementation, arbetat praktiskt i kodbasen, implementerat och justerat funktioner, testat i Minecraft, felsökt problem och itererat lösningen med AI som stöd i utvecklingsprocessen.",
      learned:
        "Minecrafts datamodell på djupet: entity-serialisering, NBT och edge cases i praktiken.",
    },
    tags: ["Java", "Fabric", "Minecraft"],
    accent: "amber",
    icon: "package",
    image: null, // t.ex. "/projects/villager-pickup.png"
    fallbackStats: { stars: 1, forks: 0, updatedLabel: "1 månad sedan" },
  },
];
