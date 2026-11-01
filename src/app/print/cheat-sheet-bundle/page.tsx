import type { Metadata } from "next";
import { Cloud } from "lucide-react";
import { ARTICLES } from "@/lib/content/articles";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cheat Sheet Bundle — Print",
  robots: { index: false, follow: false },
};

const SHEETS = ARTICLES.filter((a) => a.slug.endsWith("-cheat-sheet"));

/**
 * Branded print master for the cheat-sheet PDF bundle.
 * Open in a browser → Print → Save as PDF → upload to the storefront.
 * Screen styles stay readable; print CSS in globals hides chrome and
 * each sheet starts on a fresh page.
 */
export default function CheatSheetBundlePrint() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      {/* Cover */}
      <section className="flex min-h-[80vh] flex-col items-center justify-center text-center [break-after:page]">
        <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent text-white">
          <Cloud className="h-8 w-8" aria-hidden />
        </span>
        <h1 className="mt-6 text-4xl font-bold tracking-tight">
          AWS Certification
          <br />
          Cheat Sheet Bundle
        </h1>
        <p className="mt-4 max-w-md text-muted">
          Condensed exam-day references for {SHEETS.length} AWS certifications —
          service distinctions, decision rules, and the facts each exam repeats.
        </p>
        <p className="mt-10 text-xs text-muted">
          {SITE.name} · {SITE.url.replace("https://", "")} · For personal use
          only — original content, not exam dumps.
        </p>
      </section>

      {/* One sheet per page */}
      {SHEETS.map((a) => (
        <section key={a.slug} className="[break-before:page] py-8">
          <header className="border-b-2 border-accent pb-4">
            <h1 className="text-2xl font-bold tracking-tight">{a.title}</h1>
            <p className="mt-1 text-sm text-muted">
              {a.description}
            </p>
            <p className="mt-1 text-xs text-muted">
              {SITE.name} · Updated {a.updatedAt}
            </p>
          </header>
          <article className="prose-sm mt-6 space-y-6">
            {a.sections.map((s, i) => (
              <div key={i}>
                {s.heading ? (
                  <h2 className="text-base font-semibold text-accent">
                    {s.heading}
                  </h2>
                ) : null}
                {s.paragraphs?.map((p) => (
                  <p key={p.slice(0, 24)} className="mt-2 text-sm leading-6">
                    {p}
                  </p>
                ))}
                {s.list ? (
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6">
                    {s.list.map((li) => (
                      <li key={li.slice(0, 24)}>{li}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
          </article>
          <footer className="mt-8 border-t border-border pt-3 text-xs text-muted">
            Verify against official AWS documentation — {SITE.url}
          </footer>
        </section>
      ))}

      {/* Back cover */}
      <section className="flex min-h-[60vh] flex-col items-center justify-center text-center [break-before:page]">
        <h2 className="text-xl font-bold">Keep practicing</h2>
        <p className="mt-3 max-w-md text-sm text-muted">
          Free practice questions, timed mock exams, and study plans at{" "}
          <span className="font-medium text-foreground">
            {SITE.url.replace("https://", "")}
          </span>
        </p>
        <p className="mt-10 text-xs text-muted">
          © {new Date().getFullYear()} {SITE.name}. Not affiliated with Amazon
          Web Services, Inc.
        </p>
      </section>
    </main>
  );
}
