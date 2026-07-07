import { site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 px-4 py-8 text-sm text-faint sm:flex-row sm:px-6">
        <p>© 2026 skrra.dev – {site.name}</p>
        <p>
          Byggd med{" "}
          <span role="img" aria-label="hjärta">
            ❤️
          </span>{" "}
          och mycket kaffe{" "}
          <span role="img" aria-label="kaffe">
            ☕
          </span>
        </p>
      </div>
    </footer>
  );
}
