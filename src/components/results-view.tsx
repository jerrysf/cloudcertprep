"use client";

import Link from "next/link";
import { useState } from "react";
import { CheckCircle2, RotateCcw, XCircle } from "lucide-react";
import type { Question } from "@/lib/content/schema";
import { getDomain } from "@/lib/content/domains";
import { getCertification } from "@/lib/content/certifications";
import { getTopic } from "@/lib/content/topics";
import type { DomainId } from "@/lib/content/schema";
import { type ExamResult } from "@/lib/storage";
import { useProgress } from "@/lib/use-progress";
import { formatDuration } from "@/lib/utils";
import { QuestionView } from "@/components/question-view";
import { ShareButton } from "@/components/share-button";
import { Badge, ButtonLink, Card } from "@/components/ui";

function ScoreRing({
  percent,
  passing,
}: {
  percent: number;
  passing: boolean;
}) {
  const r = 44;
  const c = 2 * Math.PI * r;
  const filled = (Math.min(100, Math.max(0, percent)) / 100) * c;
  return (
    <div className="relative h-28 w-28 shrink-0">
      <svg
        viewBox="0 0 100 100"
        className="h-full w-full -rotate-90"
        role="img"
        aria-label={`Score ${Math.round(percent)}%`}
      >
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke="#e2e8f0"
          strokeWidth="9"
        />
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke={passing ? "#059669" : "#1d4ed8"}
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={`${filled} ${c}`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold tabular-nums">
          {Math.round(percent)}
        </span>
        <span className="-mt-0.5 text-[10px] font-medium text-muted">%</span>
      </div>
    </div>
  );
}

export function ResultsView({
  resultId,
  questionBank,
}: {
  resultId: string;
  questionBank: Question[];
}) {
  const data = useProgress();
  const [filter, setFilter] = useState<"all" | "incorrect">("incorrect");
  const result =
    data?.examResults.find(
      (r) => r.id === resultId || r.examId === resultId,
    ) ?? null;

  if (!data) return null;
  if (!result) {
    return (
      <Card>
        <p className="font-semibold">Result not found</p>
        <p className="mt-1 text-sm text-muted">
          Results are stored in this browser only. If you cleared site data or
          switched devices, the result is unavailable.
        </p>
        <ButtonLink href="/mock-exam" className="mt-4">
          Take a mock exam
        </ButtonLink>
      </Card>
    );
  }

  const questions = result.answers
    .map((a) => ({
      answer: a,
      q: questionBank.find((x) => x.id === a.questionId),
    }))
    .filter((x): x is { answer: ExamResult["answers"][number]; q: Question } => !!x.q);
  const incorrect = questions.filter((x) => !x.answer.correct);
  const shown = filter === "incorrect" ? incorrect : questions;

  const cert = questions[0] ? getCertification(questions[0].q.cert) : undefined;
  const passingPercent = cert
    ? Math.round(
        ((cert.passingScaledScore - cert.scaledScoreRange[0]) /
          (cert.scaledScoreRange[1] - cert.scaledScoreRange[0])) *
          100,
      )
    : 72;
  const passing = result.scorePercent >= passingPercent;

  const weakTopics = [
    ...new Set(
      incorrect
        .map((x) => x.q.topic)
        .filter(Boolean),
    ),
  ].slice(0, 6);

  return (
    <div className="space-y-8">
      <Card>
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <ScoreRing
              percent={result.scorePercent}
              passing={passing}
            />
            <div>
              <p className="text-sm font-medium text-muted">
                Estimated score{cert ? ` — ${cert.code}` : ""}
              </p>
              <p
                className={
                  passing
                    ? "mt-1 inline-flex items-center gap-1.5 text-lg font-semibold text-emerald-700"
                    : "mt-1 text-lg font-semibold text-muted"
                }
              >
                {passing
                  ? "At passing range"
                  : "Below typical passing range"}
              </p>
              <p className="mt-1 text-sm text-muted">
                {result.correct} of {result.totalQuestions} correct ·{" "}
                {result.answered} answered ·{" "}
                {formatDuration(result.timeSpentSeconds)}{" "}
                {result.timed ? "(timed)" : "(untimed)"}
              </p>
              <p className="mt-2 max-w-md text-xs text-muted">
                This is a simple percentage, not AWS&apos;s scaled score
                {cert
                  ? ` (${cert.scaledScoreRange[0]}–${cert.scaledScoreRange[1]}, passing ${cert.passingScaledScore} ≈ ${passingPercent}%)`
                  : ""}
                . Use it as a directional readiness signal only.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <ButtonLink href="/mock-exam" variant="primary">
              <RotateCcw className="h-4 w-4" aria-hidden /> Retake
            </ButtonLink>
            <ButtonLink href="/practice" variant="secondary">
              Back to practice
            </ButtonLink>
            <ShareButton
              text={`I scored ${Math.round(result.scorePercent)}% on a CloudCertPrep SAA-C03 mock exam — free AWS practice questions:`}
            />
          </div>
        </div>
      </Card>

      <Card>
        <h2 className="text-lg font-semibold">Performance by domain</h2>
        <div className="mt-4 space-y-3">
          {Object.entries(result.domainBreakdown).map(([domainId, s]) => {
            const domain = getDomain(domainId as DomainId);
            const pct = s.total === 0 ? 0 : (s.correct / s.total) * 100;
            return (
              <div key={domainId}>
                <div className="flex justify-between text-sm">
                  <span className="font-medium">
                    Domain {domain.number}: {domain.name}
                  </span>
                  <span className="text-muted">
                    {s.correct}/{s.total} ({Math.round(pct)}%)
                  </span>
                </div>
                <div className="mt-1 h-2 rounded-full bg-slate-100">
                  <div
                    className={
                      pct >= 70
                        ? "h-full rounded-full bg-green-500"
                        : "h-full rounded-full bg-red-400"
                    }
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <p className="mt-0.5 text-xs text-muted">
                  {s.incorrect} incorrect · {s.unanswered} unanswered
                </p>
              </div>
            );
          })}
        </div>
      </Card>

      {weakTopics.length > 0 ? (
        <Card>
          <h2 className="text-lg font-semibold">Recommended review topics</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {weakTopics.map((t) => {
              const topic = getTopic(t);
              return (
                <Link
                  key={t}
                  href={`/practice/${t}`}
                  className="rounded-full border border-accent/40 bg-accent-soft px-3 py-1.5 text-sm text-accent hover:bg-blue-100"
                >
                  {topic?.name ?? t}
                </Link>
              );
            })}
          </div>
          <p className="mt-3 text-sm text-muted">
            These topics contain questions you answered incorrectly. Revisit the
            study guides and re-attempt the practice sets.
          </p>
        </Card>
      ) : null}

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Answer review</h2>
        <div className="flex gap-1 rounded-lg bg-slate-100 p-1 text-sm">
          {(
            [
              ["incorrect", `Incorrect (${incorrect.length})`],
              ["all", `All (${questions.length})`],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => setFilter(value)}
              aria-pressed={filter === value}
              className={
                filter === value
                  ? "rounded-md bg-white px-3 py-1.5 font-medium text-foreground shadow-sm"
                  : "rounded-md px-3 py-1.5 text-muted transition-colors hover:text-foreground"
              }
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {shown.length === 0 ? (
          <Card>
            <p className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="h-4 w-4 text-success" aria-hidden />
              No incorrect answers in this exam — well done.
            </p>
          </Card>
        ) : (
          shown.map(({ answer, q }, i) => (
            <Card key={q.id}>
              <div className="mb-3 flex items-center gap-2">
                {answer.correct ? (
                  <Badge tone="success">
                    <CheckCircle2 className="mr-1 h-3 w-3" aria-hidden /> Correct
                  </Badge>
                ) : answer.selected.length === 0 ? (
                  <Badge tone="neutral">
                    <XCircle className="mr-1 h-3 w-3" aria-hidden /> Unanswered
                  </Badge>
                ) : (
                  <Badge tone="danger">
                    <XCircle className="mr-1 h-3 w-3" aria-hidden /> Incorrect
                  </Badge>
                )}
                <span className="text-xs text-muted">Question {i + 1}</span>
              </div>
              <QuestionView question={q} selected={answer.selected} revealed />
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
