import { FileText, Mail, Send } from "lucide-react";

const EMAIL = "hej@christofferloof.se";

export default function ContactCTA() {
  return (
    <section id="contact" className="py-14">
      <div className="relative overflow-hidden rounded-2xl border border-violet-500/30 bg-gradient-to-r from-violet-950/90 via-violet-900/40 to-panel p-7 shadow-[0_0_80px_-25px_rgb(139_92_246/0.7)] sm:p-9">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-16 h-64 w-64 rounded-full bg-violet-600/20 blur-3xl"
        />
        <div className="relative flex flex-col items-start gap-6 md:flex-row md:items-center">
          <span
            aria-hidden
            className="flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl border border-violet-400/40 bg-violet-500/15 p-3.5 text-violet-200"
          >
            <Send size={22} />
          </span>

          <div className="min-w-0 flex-1">
            <h2 className="text-xl font-bold sm:text-2xl">
              Låt oss bygga något tillsammans!
            </h2>
            <p className="mt-1.5 text-sm text-mist">
              Letar du efter LIA, junior utvecklare eller någon som gillar att
              felsöka på riktigt?
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-violet-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-300"
            >
              <Mail size={16} aria-hidden />
              Skicka ett mail
            </a>
            <a
              href="/cv.pdf"
              className="inline-flex items-center gap-2 rounded-xl border border-line-strong bg-ink/60 px-5 py-2.5 text-sm font-medium text-snow transition-colors hover:bg-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-300"
            >
              <FileText size={16} aria-hidden />
              Visa CV
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
