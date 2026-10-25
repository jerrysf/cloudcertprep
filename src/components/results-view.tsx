"use client";

import Link from "next/link";
import { useState } from "react";
import { CheckCircle2, RotateCcw, XCircle } from "lucide-react";
import type { Question } from "@/lib/content/schema";
import { getDomain } from "@/lib/content/domains";
import { getTopic } from "@/lib/content/topics";
import type { DomainId } from "@/lib/content/schema";
import { type ExamResult } from "@/lib/storage";
import { useProgress } from "@/lib/use-progress";
import { formatDuration } from "@/lib/utils";
import { QuestionView } from "@/components/question-view";
import { Badge, ButtonLink, Card } from "@/components/ui";

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
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-sm font-medium text-muted">Estimated score</p>
            <p className="text-5xl font-bold tabular-nums">
              {Math.round(result.scorePercent)}%
            </p>
            <p className="mt-2 text-sm text-muted">
              {result.correct} of {result.totalQuestions} correct ·{" "}
              {result.answered} answered · {formatDuration(result.timeSpentSeconds)}{" "}
              {result.timed ? "(timed)" : "(untimed)"}
            </p>
            <p className="mt-2 max-w-md text-xs text-muted">
              This is a simple percentage, not AWS&apos;s scaled score
              (100–1000, passing 720). Use it as a directional readiness signal
              only.
            </p>
          </div>
          <div className="flex gap-2">
            <ButtonLink href="/mock-exam" variant="primary">
              <RotateCcw className="h-4 w-4" aria-hidden /> Retake
            </ButtonLink>
            <ButtonLink href="/practice" variant="secondary">
              Back to practice
            </ButtonLink>
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
        <div className="flex gap-2 text-sm">
          <button
            type="button"
            onClick={() => setFilter("incorrect")}
            aria-pressed={filter === "incorrect"}
            className={
              filter === "incorrect"
                ? "rounded-lg bg-accent px-3 py-1.5 font-medium text-white"
                : "rounded-lg border border-border px-3 py-1.5"
            }
          >
            Incorrect ({incorrect.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter("all")}
            aria-pressed={filter === "all"}
            className={
              filter === "all"
                ? "rounded-lg bg-accent px-3 py-1.5 font-medium text-white"
                : "rounded-lg border border-border px-3 py-1.5"
            }
          >
            All ({questions.length})
          </button>
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
