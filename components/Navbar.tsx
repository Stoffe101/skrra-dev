"use client";

import { useState } from "react";
import { Menu, MoonStar, X } from "lucide-react";

const links = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink/80 backdrop-blur-md">
      <nav
        aria-label="Huvudmeny"
        className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6"
      >
        <a
          href="#home"
          className="flex items-baseline gap-2 rounded-md font-mono text-lg font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400"
        >
          <span aria-hidden className="text-violet-400">
            &gt;_
          </span>
          <span>
            skrra<span className="text-violet-400">.dev</span>
          </span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm text-mist transition-colors hover:text-snow focus-visible:outline-2 focus-visible:outline-violet-400"
            >
              {link.label}
            </a>
          ))}
          <span
            aria-hidden
            className="ml-2 rounded-lg border border-line bg-panel p-2 text-mist"
            title="Mörkt tema"
          >
            <MoonStar size={15} />
          </span>
        </div>

        <button
          type="button"
          className="rounded-md p-2 text-mist hover:text-snow focus-visible:outline-2 focus-visible:outline-violet-400 md:hidden"
          aria-expanded={open}
          aria-label={open ? "Stäng meny" : "Öppna meny"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-line bg-ink/95 px-4 py-3 backdrop-blur-md md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-2.5 text-sm text-mist transition-colors hover:bg-panel hover:text-snow focus-visible:outline-2 focus-visible:outline-violet-400"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
