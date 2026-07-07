export type Skill = {
  name: string;
  abbr: string;
  /** Brandfärg (6-siffrig hex) som används för ikonens platta. */
  color: string;
  /** Visas först efter att användaren klickat på "Visa fler". */
  extra?: boolean;
};

export const skills: Skill[] = [
  { name: "Java", abbr: "Jv", color: "#f89820" },
  { name: "Python", abbr: "Py", color: "#4b8bbe" },
  { name: "TypeScript", abbr: "TS", color: "#3178c6" },
  { name: "C#", abbr: "C#", color: "#a179dc" },
  { name: "HTML", abbr: "<>", color: "#e34f26" },
  { name: "CSS", abbr: "{}", color: "#7c3aed" },
  { name: "JavaScript", abbr: "JS", color: "#f7df1e" },
  { name: "Git", abbr: "Gt", color: "#f05032" },
  { name: "GitHub", abbr: "GH", color: "#c9d1d9" },
  { name: "Gradle", abbr: "Gr", color: "#0ea5a5" },
  { name: "Fabric", abbr: "Fb", color: "#d4bb9e" },
  { name: "MySQL", abbr: "My", color: "#00a3c4" },
  { name: "IntelliJ IDEA", abbr: "IJ", color: "#fe315d", extra: true },
  { name: "VS Code", abbr: "VS", color: "#3b9eff", extra: true },
  { name: "Linux", abbr: "Lx", color: "#fbbf24", extra: true },
  { name: "Windows", abbr: "Wi", color: "#00a4ef", extra: true },
];
