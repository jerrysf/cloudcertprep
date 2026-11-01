import { Cloud } from "lucide-react";
import type { Article } from "@/lib/content/articles";
import type { Certification } from "@/lib/content/certifications";
import type { Question } from "@/lib/content/schema";
import { SITE } from "@/lib/site";

export interface SprintPlanWeek {
  week: string;
  focus: string;
  tasks: string[];
}

export interface SprintPackProps {
  cert: Certification;
  planTitle: string;
  planIntro: string;
  weeks: SprintPlanWeek[];
  cheatSheet: Article;
  drill: Question[];
  checklist: string[];
}

/**
 * Branded print master for a per-cert "sprint pack" PDF:
 * cover → exam snapshot → study plan → cheat sheet → question drill →
 * test-day checklist → colophon. Print → Save as PDF → upload to storefront.
 */
export function SprintPack({
  cert,
  planTitle,
  planIntro,
  weeks,
  cheatSheet,
  drill,
  checklist,
}: SprintPackProps) {
  const optionIds = ["A", "B", "C", "D", "E"];
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      {/* Cover */}
      <section className="flex min-h-[80vh] flex-col items-center justify-center text-center [break-after:page]">
        <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent text-white">
          <Cloud className="h-8 w-8" aria-hidden />
        </span>
        <p className="mt-6 font-mono text-sm font-semibold text-accent">
          {cert.code}
        </p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight">
          {cert.name.replace("AWS Certified ", "")}
          <br />
          Exam Sprint Pack
        </h1>
        <p className="mt-4 max-w-md text-muted">
          A distilled prep plan, the full cheat sheet, a curated question
          drill, and a test-day checklist — everything for the final stretch.
        </p>
        <p className="mt-10 text-xs text-muted">
          {SITE.name} · {SITE.url.replace("https://", "")} · For personal use
          only — original content, not exam dumps.
        </p>
      </section>

      {/* Exam snapshot */}
      <section className="py-6 [break-before:page]">
        <h2 className="border-b-2 border-accent pb-3 text-xl font-bold">
          Exam at a glance
        </h2>
        <dl className="mt-4 grid grid-cols-2 gap-x-8 gap-y-3 text-sm sm:grid-cols-4">
          <div>
            <dt className="text-xs uppercase tracking-wide text-muted">
              Questions
            </dt>
            <dd className="mt-0.5 text-lg font-semibold">
              {cert.questionCount}
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-muted">
              Duration
            </dt>
            <dd className="mt-0.5 text-lg font-semibold">
              {cert.durationMinutes} min
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-muted">Cost</dt>
            <dd className="mt-0.5 text-lg font-semibold">${cert.costUsd}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-muted">
              Passing
            </dt>
            <dd className="mt-0.5 text-lg font-semibold">
              {cert.passingScaledScore}/{cert.scaledScoreRange[1]}
            </dd>
          </div>
        </dl>
        <h3 className="mt-6 text-sm font-semibold uppercase tracking-wide text-muted">
          Domain weights
        </h3>
        <ul className="mt-2 space-y-1.5 text-sm">
          {cert.domains.map((d) => (
            <li key={d.id} className="flex items-baseline gap-2">
              <span className="w-10 shrink-0 text-right font-semibold text-accent">
                {d.weight}%
              </span>
              <span>{d.name}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Study plan */}
      <section className="py-6 [break-before:page]">
        <h2 className="border-b-2 border-accent pb-3 text-xl font-bold">
          {planTitle}
        </h2>
        <p className="mt-3 text-sm leading-6 text-muted">{planIntro}</p>
        <div className="mt-5 space-y-5">
          {weeks.map((w) => (
            <div key={w.week}>
              <h3 className="font-semibold">
                {w.week} — <span className="text-accent">{w.focus}</span>
              </h3>
              <ul className="mt-1.5 list-disc space-y-1 pl-5 text-sm leading-6 text-muted">
                {w.tasks.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Cheat sheet (reuses the published article verbatim) */}
      <section className="py-6 [break-before:page]">
        <header className="border-b-2 border-accent pb-3">
          <h2 className="text-xl font-bold">{cheatSheet.title}</h2>
          <p className="mt-1 text-sm text-muted">{cheatSheet.description}</p>
        </header>
        <div className="mt-5 space-y-6">
          {cheatSheet.sections.map((s, i) => (
            <div key={i}>
              {s.heading ? (
                <h3 className="text-base font-semibold text-accent">
                  {s.heading}
                </h3>
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
        </div>
      </section>

      {/* Question drill */}
      <section className="py-6 [break-before:page]">
        <h2 className="border-b-2 border-accent pb-3 text-xl font-bold">
          Curated question drill
        </h2>
        <p className="mt-3 text-sm leading-6 text-muted">
          Cover the answer line, commit to an option, then check the
          explanation — including why the distractors are wrong.
        </p>
        <ol className="mt-5 space-y-6">
          {drill.map((q, i) => (
            <li key={q.id} className="[break-inside:avoid]">
              <p className="text-sm font-medium leading-6">
                {i + 1}. {q.question}
              </p>
              <ul className="mt-1.5 space-y-0.5 pl-5 text-sm">
                {q.options.map((o, oi) => (
                  <li key={o.id}>
                    <span className="font-medium">{optionIds[oi]}.</span>{" "}
                    {o.text}
                  </li>
                ))}
              </ul>
              <p className="mt-1.5 border-l-2 border-accent bg-accent-soft/60 px-3 py-1.5 text-sm leading-6">
                <strong>Answer: {q.correctAnswers.join(", ")}.</strong>{" "}
                {q.explanation}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* Checklist */}
      <section className="py-6 [break-before:page]">
        <h2 className="border-b-2 border-accent pb-3 text-xl font-bold">
          Test-day checklist
        </h2>
        <ul className="mt-5 space-y-2.5 text-sm leading-6">
          {checklist.map((c) => (
            <li key={c} className="flex items-start gap-3">
              <span className="mt-1 inline-block h-4 w-4 shrink-0 rounded-sm border-2 border-foreground/40" />
              <span>{c}</span>
            </li>
          ))}
        </ul>
        <p className="mt-8 border-t border-border pt-3 text-xs text-muted">
          Verify all exam details against the official AWS exam guide —{" "}
          {cert.examGuideUrl}
        </p>
      </section>

      {/* Colophon */}
      <section className="flex min-h-[50vh] flex-col items-center justify-center text-center [break-before:page]">
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
