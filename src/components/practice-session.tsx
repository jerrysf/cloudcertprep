"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import type { Question } from "@/lib/content/schema";
import {
  getProgressStore,
  recordActivityDay,
  type ProgressData,
} from "@/lib/storage";
import { notifyProgressChanged, useProgress } from "@/lib/use-progress";
import { ANALYTICS_EVENTS, track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { QuestionView } from "@/components/question-view";
import { Card } from "@/components/ui";

interface SubmittedState {
  selected: string[];
  correct: boolean;
}

export function PracticeSession({
  questions,
  topic,
}: {
  questions: Question[];
  topic: string;
}) {
  const [index, setIndex] = useState(0);
  const [submitted, setSubmitted] = useState<Record<string, SubmittedState>>({});
  const progress = useProgress();

  useEffect(() => {
    track(ANALYTICS_EVENTS.practiceStart, { topic, count: questions.length });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const question = questions[index];

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const t = e.target as HTMLElement | null;
      if (t && ["INPUT", "TEXTAREA", "SELECT"].includes(t.tagName)) return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        setIndex((i) => Math.min(questions.length - 1, i + 1));
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        setIndex((i) => Math.max(0, i - 1));
      } else if (
        e.key === "Enter" &&
        submitted[question.id] &&
        !(t instanceof HTMLButtonElement) &&
        !(t instanceof HTMLAnchorElement)
      ) {
        e.preventDefault();
        setIndex((i) => Math.min(questions.length - 1, i + 1));
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  const answeredCount = useMemo(() => Object.keys(submitted).length, [submitted]);
  const correctCount = useMemo(
    () => Object.values(submitted).filter((s) => s.correct).length,
    [submitted],
  );
  const done = answeredCount === questions.length;

  function persist(mutate: (d: ProgressData) => void) {
    const store = getProgressStore();
    const data = store.load();
    mutate(data);
    store.save(data);
    notifyProgressChanged();
  }

  function handleSubmit(selected: string[], correct: boolean) {
    setSubmitted((s) => ({ ...s, [question.id]: { selected, correct } }));
    persist((d) => {
      d.attempts.push({
        questionId: question.id,
        correct,
        answeredAt: new Date().toISOString(),
        domain: question.domain,
        topic: question.topic,
      });
      recordActivityDay(d);
    });
    track(ANALYTICS_EVENTS.questionSubmit, {
      domain: question.domain,
      topic: question.topic,
      correct,
    });
    if (answeredCount + 1 === questions.length) {
      persist((d) => {
        d.sessions.push({
          id: `ps-${Date.now().toString(36)}`,
          topic,
          startedAt: new Date().toISOString(),
          completedAt: new Date().toISOString(),
          total: questions.length,
          correct: correctCount + (correct ? 1 : 0),
        });
      });
      track(ANALYTICS_EVENTS.practiceComplete, {
        topic,
        total: questions.length,
      });
    }
  }

  function reset() {
    setSubmitted({});
    setIndex(0);
  }

  const current = submitted[question.id];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-sm text-muted">
          Question{" "}
          <span className="font-semibold text-foreground">{index + 1}</span> of{" "}
          {questions.length}
          {answeredCount > 0 && (
            <>
              {" "}
              · {answeredCount} answered · {correctCount} correct
            </>
          )}
          <span className="hidden sm:inline text-xs text-slate-400">
            {" "}
            · keys: 1–5 select, Enter submit, ← → navigate
          </span>
        </div>
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted hover:bg-slate-50"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden />
          Reset session
        </button>
      </div>

      <div
        className="h-1.5 rounded-full bg-slate-100"
        role="progressbar"
        aria-valuenow={answeredCount}
        aria-valuemin={0}
        aria-valuemax={questions.length}
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-accent to-blue-400 transition-all duration-300"
          style={{ width: `${(answeredCount / questions.length) * 100}%` }}
        />
      </div>

      <Card>
        <QuestionView
          question={question}
          revealed={!!current}
          selected={current?.selected}
          onSubmit={current ? undefined : handleSubmit}
          bookmarked={progress?.bookmarks.includes(question.id)}
          onToggleBookmark={() =>
            persist((d) => {
              d.bookmarks = d.bookmarks.includes(question.id)
                ? d.bookmarks.filter((b) => b !== question.id)
                : [...d.bookmarks, question.id];
            })
          }
          flagged={!!progress?.flags[question.id]}
          onFlag={() =>
            persist((d) => {
              if (d.flags[question.id]) delete d.flags[question.id];
              else
                d.flags[question.id] = {
                  reason: "flagged-for-review",
                  flaggedAt: new Date().toISOString(),
                };
            })
          }
        />
      </Card>

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          disabled={index === 0}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-white px-4 py-2 text-sm font-medium shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50 active:scale-[0.98] disabled:opacity-40"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden /> Previous
        </button>
        <div className="flex flex-wrap justify-center gap-1.5" aria-label="Question navigation">
          {questions.map((q, i) => {
            const st = submitted[q.id];
            return (
              <button
                key={q.id}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Go to question ${i + 1}`}
                aria-current={i === index ? "true" : undefined}
                className={cn(
                  "h-8 w-8 rounded-md border text-xs font-medium transition-all hover:scale-105",
                  i === index && "border-accent bg-accent text-white shadow-sm",
                  i !== index && !st && "border-border text-muted hover:border-slate-400 hover:text-foreground",
                  i !== index && st?.correct && "border-emerald-400 bg-emerald-50 text-emerald-700",
                  i !== index && st && !st.correct && "border-red-400 bg-red-50 text-red-700",
                )}
              >
                {i + 1}
              </button>
            );
          })}
        </div>
        <button
          type="button"
          onClick={() => setIndex((i) => Math.min(questions.length - 1, i + 1))}
          disabled={index === questions.length - 1}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-white px-4 py-2 text-sm font-medium shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50 active:scale-[0.98] disabled:opacity-40"
        >
          Next <ArrowRight className="h-4 w-4" aria-hidden />
        </button>
      </div>

      {done ? (
        <Card className="border-accent/40 bg-accent-soft">
          <p className="font-semibold">Session complete</p>
          <p className="mt-1 text-sm text-muted">
            You answered {correctCount} of {questions.length} correctly (
            {Math.round((correctCount / questions.length) * 100)}%). Review any
            incorrect explanations above, then practice again or try another
            topic.
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-accent-hover hover:shadow active:scale-[0.98]"
          >
            <RotateCcw className="h-4 w-4" aria-hidden /> Practice again
          </button>
        </Card>
      ) : null}
    </div>
  );
}
