import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { site } from "@/data/site";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 py-24">
      <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-line-strong bg-panel shadow-[0_0_70px_-18px_rgb(139_92_246/0.45)]">
        <div
          aria-hidden
          className="flex items-center gap-2 border-b border-line px-4 py-3"
        >
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          <span className="ml-3 font-mono text-xs text-faint">
            {site.email}
          </span>
        </div>
        <div className="px-5 py-6 font-mono text-sm leading-7">
          <p>
            <span aria-hidden className="text-violet-400">
              &gt;{" "}
            </span>
            <span className="text-cyan-300">cd</span>{" "}
            <span className="text-mist">./den-har-sidan</span>
          </p>
          <p className="mt-1 text-rose-300">404: sidan hittades inte</p>
          <p className="mt-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2 font-sans text-sm font-medium text-white transition-colors hover:bg-violet-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
            >
              <ArrowLeft size={15} aria-hidden />
              Till startsidan
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
