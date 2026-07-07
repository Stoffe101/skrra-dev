import { ArrowRight, Download, Mail } from "lucide-react";
import { site } from "@/data/site";
import { GitHubIcon, LinkedInIcon } from "./BrandIcons";
import TerminalCard from "./TerminalCard";

const socials = [
  { label: "GitHub", href: site.githubUrl, icon: GitHubIcon, external: true },
  {
    label: "LinkedIn",
    href: site.linkedinUrl,
    icon: LinkedInIcon,
    external: true,
  },
  { label: "Email", href: `mailto:${site.email}`, icon: Mail, external: false },
];

export default function Hero() {
  return (
    <section id="home" className="relative pt-14 pb-20 sm:pt-20">
      <div aria-hidden className="bg-grid absolute inset-0 -z-10" />
      <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-panel px-4 py-1.5 text-xs text-mist">
            <span
              aria-hidden
              className="h-1.5 w-1.5 rounded-full bg-emerald-400"
            />
            Systemutvecklare · QA · Minecraft Modding · Automation
          </p>

          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-[3.4rem] lg:leading-[1.1]">
            Hej, jag är{" "}
            <span className="block bg-gradient-to-r from-violet-400 via-violet-300 to-cyan-300 bg-clip-text text-transparent">
              Christoffer Lööf.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-mist">
            Blivande systemutvecklare med fokus på testning, automation och
            praktisk problemlösning. Jag bygger projekt inom Java, webb,
            Minecraft-modding och verktyg som löser riktiga problem.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-medium text-white shadow-[0_0_30px_-8px_rgb(139_92_246/0.8)] transition-colors hover:bg-violet-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
            >
              Se mina projekt
              <ArrowRight size={16} aria-hidden />
            </a>
            <a
              href={site.cvPath}
              download
              className="inline-flex items-center gap-2 rounded-xl border border-line bg-panel px-5 py-2.5 text-sm font-medium text-snow transition-colors hover:border-line-strong hover:bg-panel-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
            >
              Ladda ner CV
              <Download size={16} aria-hidden />
            </a>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-2 rounded-xl border border-line bg-panel px-5 py-2.5 text-sm font-medium text-snow transition-colors hover:border-line-strong hover:bg-panel-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
            >
              Kontakta mig
              <Mail size={16} aria-hidden />
            </a>
          </div>

          <p className="mt-10 text-xs font-medium uppercase tracking-[0.2em] text-faint">
            Följ mig på
          </p>
          <div className="mt-3 flex flex-wrap gap-3">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                {...(social.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="inline-flex items-center gap-2 rounded-xl border border-line bg-panel px-4 py-2 text-sm text-mist transition-colors hover:border-line-strong hover:text-snow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
              >
                <social.icon size={16} aria-hidden />
                {social.label}
              </a>
            ))}
          </div>
        </div>

        <TerminalCard />
      </div>
    </section>
  );
}
