"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Hem", href: "#home" },
  { label: "Projekt", href: "#projects" },
  { label: "Om mig", href: "#about" },
  { label: "Kompetens", href: "#skills" },
  { label: "Erfarenhet", href: "#experience" },
  { label: "Kontakt", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

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
        </div>

        <button
          type="button"
          ref={menuButtonRef}
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
