"use client";

import Link from "next/link";
import { Flame, Trash2 } from "lucide-react";
import { CERTIFICATIONS } from "@/lib/content/certifications";
import { QUESTION_BY_ID } from "@/lib/content/questions";
import { getTopic, TOPICS } from "@/lib/content/topics";
import { getProgressStore, summarize } from "@/lib/storage";
import { notifyProgressChanged, useProgress } from "@/lib/use-progress";
import { ButtonLink, Card } from "@/components/ui";

export function ProgressDashboard() {
  const data = useProgress();

  if (!data) return null;
  const s = summarize(data);
  const hasData = s.attempted > 0;

  function resetAll() {
    if (
      typeof window !== "undefined" &&
      window.confirm(
        "Erase all local progress, bookmarks, exam results, and your study plan? This cannot be undone.",
      )
    ) {
      getProgressStore().reset();
      notifyProgressChanged();
    }
  }

  const weakestTopics = [...s.byTopic.entries()]
    .filter(([, v]) => v.total >= 2)
    .sort((a, b) => a[1].correct / a[1].total - b[1].correct / b[1].total)
    .slice(0, 4);

  const suggested = !hasData
    ? { label: "Start your first practice set", href: "/practice" }
    : s.incorrectIds.size > 0
      ? { label: "Review your missed questions", href: "/practice/mistakes" }
      : weakestTopics.length > 0 && weakestTopics[0]
        ? {
            label: `Practice ${getTopic(weakestTopics[0][0])?.name ?? weakestTopics[0][0]}`,
            href: `/practice/${weakestTopics[0][0]}`,
          }
        : { label: "Take a mock exam", href: "/mock-exam" };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Questions attempted" value={String(s.attempted)} />
        <Stat
          label="Overall accuracy"
          value={s.accuracy === null ? "—" : `${Math.round(s.accuracy * 100)}%`}
        />
        <Stat
          label="Study streak"
          value={`${s.streak} day${s.streak === 1 ? "" : "s"}`}
          icon={<Flame className="h-4 w-4 text-amber-500" aria-hidden />}
        />
        <Stat label="Bookmarked" value={String(s.bookmarked.length)} />
      </div>

      <Card className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-muted">Suggested next step</p>
          <p className="font-semibold">{suggested.label}</p>
        </div>
        <ButtonLink href={suggested.href}>Go</ButtonLink>
      </Card>

      {hasData ? (
        <>
          <Card>
            <h2 className="text-lg font-semibold">
              Accuracy by certification &amp; domain
            </h2>
            <div className="mt-4 space-y-6">
              {CERTIFICATIONS.map((cert) => {
                const domains = cert.domains.filter((d) =>
                  s.byDomain.has(d.id),
                );
                if (domains.length === 0) return null;
                return (
                  <div key={cert.id}>
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                      {cert.code} — {cert.name}
                    </p>
                    <div className="mt-2 space-y-3">
                      {domains.map((d) => {
                        const stat = s.byDomain.get(d.id);
                        const pct =
                          !stat || stat.total === 0
                            ? null
                            : stat.correct / stat.total;
                        return (
                          <div key={d.id}>
                            <div className="flex justify-between text-sm">
                              <span className="font-medium">
                                {d.number}. {d.name}
                              </span>
                              <span className="text-muted">
                                {stat
                                  ? `${stat.correct}/${stat.total}`
                                  : "no attempts"}
                                {pct !== null
                                  ? ` (${Math.round(pct * 100)}%)`
                                  : ""}
                              </span>
                            </div>
                            <div className="mt-1 h-2 rounded-full bg-slate-100">
                              <div
                                className="h-full rounded-full bg-accent"
                                style={{ width: `${(pct ?? 0) * 100}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <h2 className="text-lg font-semibold">Topics to review</h2>
              {weakestTopics.length ? (
                <ul className="mt-3 space-y-2">
                  {weakestTopics.map(([slug, v]) => {
                    const t = TOPICS.find((x) => x.slug === slug);
                    return (
                      <li key={slug}>
                        <Link
                          href={`/practice/${slug}`}
                          className="flex items-center justify-between rounded-lg border border-border px-3 py-2 text-sm hover:border-accent/50"
                        >
                          <span>{t?.name ?? slug}</span>
                          <span className="text-muted">
                            {Math.round((v.correct / v.total) * 100)}% · {v.total}{" "}
                            attempts
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="mt-2 text-sm text-muted">
                  Answer a few questions in each topic to surface weak areas.
                </p>
              )}
            </Card>
            <Card>
              <h2 className="text-lg font-semibold">
                Questions to re-attempt ({s.incorrectIds.size})
              </h2>
              {s.incorrectIds.size ? (
                <>
                <ul className="mt-3 space-y-2 text-sm">
                  {[...s.incorrectIds].slice(0, 8).map((id) => {
                    const q = QUESTION_BY_ID.get(id);
                    return (
                      <li key={id}>
                        {q ? (
                          <Link
                            href={`/questions/${q.slug}`}
                            className="line-clamp-1 text-muted hover:text-accent"
                          >
                            {q.question}
                          </Link>
                        ) : (
                          <span className="text-muted">{id}</span>
                        )}
                      </li>
                    );
                  })}
                  {s.incorrectIds.size > 8 ? (
                    <li className="text-muted">…and more</li>
                  ) : null}
                </ul>
                <Link
                  href="/practice/mistakes"
                  className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-accent-hover active:scale-[0.98]"
                >
                  Re-attempt all missed questions
                </Link>
                </>
              ) : (
                <p className="mt-2 text-sm text-muted">
                  No outstanding incorrect answers. Keep it up.
                </p>
              )}
            </Card>
          </div>

          <Card>
            <h2 className="text-lg font-semibold">Recent mock exams</h2>
            {data.examResults.length >= 2 ? (
              <ScoreTrend results={data.examResults} />
            ) : null}
            {data.examResults.length ? (
              <ul className="mt-3 space-y-2 text-sm">
                {[...data.examResults]
                  .reverse()
                  .slice(0, 5)
                  .map((r) => (
                    <li key={r.id}>
                      <Link
                        href={`/results/${r.id}`}
                        className="flex items-center justify-between rounded-lg border border-border px-3 py-2 hover:border-accent/50"
                      >
                        <span>
                          {new Date(r.finishedAt).toLocaleDateString()} ·{" "}
                          {r.totalQuestions} questions
                        </span>
                        <span className="font-medium">
                          {Math.round(r.scorePercent)}%
                        </span>
                      </Link>
                    </li>
                  ))}
              </ul>
            ) : (
              <p className="mt-2 text-sm text-muted">
                No mock exams yet.{" "}
                <Link href="/mock-exam" className="text-accent hover:underline">
                  Take your first mock exam
                </Link>
                .
              </p>
            )}
          </Card>
        </>
      ) : (
        <Card>
          <p className="text-sm text-muted">
            No progress data yet. Progress is stored locally in this browser —
            it won&apos;t sync across devices.{" "}
            <Link href="/practice" className="text-accent hover:underline">
              Start practicing
            </Link>{" "}
            to see your stats here.
          </p>
        </Card>
      )}

      <div className="flex items-center justify-between rounded-xl border border-red-200 bg-red-50 p-4">
        <div className="text-sm">
          <p className="font-medium text-red-900">Reset all progress</p>
          <p className="text-red-700">
            Removes attempts, bookmarks, exam results, flashcards, and your
            study plan from this browser.
          </p>
        </div>
        <button
          type="button"
          onClick={resetAll}
          className="inline-flex items-center gap-1.5 rounded-lg border border-red-300 bg-white px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-100"
        >
          <Trash2 className="h-4 w-4" aria-hidden /> Reset
        </button>
      </div>
    </div>
  );
}

function ScoreTrend({
  results,
}: {
  results: { finishedAt: string; scorePercent: number }[];
}) {
  const ordered = [...results].sort((a, b) =>
    a.finishedAt.localeCompare(b.finishedAt),
  );
  const W = 560;
  const H = 96;
  const PAD = 8;
  const n = ordered.length;
  const pts = ordered.map((r, i) => {
    const x = PAD + (n === 1 ? W / 2 : (i / (n - 1)) * (W - PAD * 2));
    const y = H - PAD - (r.scorePercent / 100) * (H - PAD * 2);
    return { x, y, r };
  });
  const path = pts.map((p) => `${p.x},${p.y}`).join(" ");
  const passY = H - PAD - 0.72 * (H - PAD * 2);

  return (
    <figure className="mt-4" aria-label="Mock exam score trend">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img">
        <title>
          Score trend across {n} mock exams — latest{" "}
          {Math.round(ordered[n - 1].scorePercent)}%
        </title>
        <line
          x1={PAD}
          x2={W - PAD}
          y1={passY}
          y2={passY}
          stroke="#94a3b8"
          strokeDasharray="4 4"
          strokeWidth="1"
        />
        <polyline
          points={path}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {pts.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="3" fill="var(--accent)" />
        ))}
      </svg>
      <figcaption className="mt-1 text-xs text-muted">
        Score over time — dashed line marks a ~72% typical passing range.
      </figcaption>
    </figure>
  );
}

function Stat({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
}) {
  return (
    <Card>
      <p className="flex items-center gap-1.5 text-sm text-muted">
        {icon}
        {label}
      </p>
      <p className="mt-1 text-3xl font-bold tabular-nums">{value}</p>
    </Card>
  );
}

/** Compact variant for the homepage preview. */
export function DashboardPreview() {
  const data = useProgress();
  const s = data
    ? summarize(data)
    : { attempted: 0, accuracy: null, streak: 0, incorrectIds: new Set<string>(), bookmarked: [] as string[] };

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <div className="rounded-xl border border-border bg-white p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-muted">
          Questions completed
        </p>
        <p className="mt-1 text-2xl font-bold">{s.attempted}</p>
      </div>
      <div className="rounded-xl border border-border bg-white p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-muted">
          Your accuracy
        </p>
        <p className="mt-1 text-2xl font-bold">
          {s.accuracy === null ? "—" : `${Math.round(s.accuracy * 100)}%`}
        </p>
      </div>
      <div className="rounded-xl border border-border bg-white p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-muted">
          Questions to review
        </p>
        <p className="mt-1 text-2xl font-bold">{s.incorrectIds.size}</p>
      </div>
      <p className="text-xs text-muted sm:col-span-3">
        {data && s.attempted === 0
          ? "No activity yet — your stats will appear here after your first practice session. Stored locally in your browser."
          : "Stats reflect your practice in this browser only."}
      </p>
    </div>
  );
}
