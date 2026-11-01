"use client";

import { useState } from "react";
import { CheckCircle2, ChevronRight, RotateCcw } from "lucide-react";
import type { Question } from "@/lib/content/schema";
import { QuestionView } from "@/components/question-view";
import { ButtonLink } from "@/components/ui";

interface ReadyCheckProps {
  questions: Question[];
  certCode: string;
}

export function ReadyCheck({ questions, certCode }: ReadyCheckProps) {
  const [idx, setIdx] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [done, setDone] = useState(false);
  const [round, setRound] = useState(0);

  if (questions.length === 0) return null;
  const q = questions[Math.min(idx, questions.length - 1)];

  function reset() {
    setIdx(0);
    setSubmitted(false);
    setCorrect(0);
    setDone(false);
    setRound((r) => r + 1);
  }

  if (done) {
    const pct = Math.round((correct / questions.length) * 100);
    const verdict =
      pct >= 80
        ? "Strong — you're close to ready. Polish weak domains with full mocks."
        : pct >= 60
          ? "Getting there — target another week of focused drilling before the exam."
          : "More prep needed — this check shows real gaps. Work through the study plan.";
    return (
      <div className="rounded-xl border-2 border-accent/30 bg-accent-soft/40 p-6">
        <p className="text-lg font-semibold">
          Readiness check: {correct}/{questions.length} ({pct}%)
        </p>
        <p className="mt-1 text-sm text-slate-700">{verdict}</p>
        <p className="mt-1 text-xs text-muted">
          A {questions.length}-question sample — a full {certCode} mock is the
          real benchmark.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <ButtonLink href="/mock-exam" variant="secondary">
            Take a full mock exam
          </ButtonLink>
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted hover:bg-slate-50"
          >
            <RotateCcw className="h-4 w-4" aria-hidden />
            Retake check
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">
        Question {idx + 1} of {questions.length}
      </p>
      <QuestionView
        key={`${q.id}-${round}`}
        question={q}
        showActions={false}
        revealed={submitted}
        onSubmit={(_, isCorrect) => {
          setSubmitted(true);
          if (isCorrect) setCorrect((c) => c + 1);
        }}
      />
      {submitted ? (
        <button
          type="button"
          onClick={() => {
            if (idx + 1 >= questions.length) setDone(true);
            else {
              setIdx((i) => i + 1);
              setSubmitted(false);
            }
          }}
          className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-accent-hover active:scale-[0.98]"
        >
          {idx + 1 >= questions.length ? (
            <>
              <CheckCircle2 className="h-4 w-4" aria-hidden />
              See my score
            </>
          ) : (
            <>
              Next question
              <ChevronRight className="h-4 w-4" aria-hidden />
            </>
          )}
        </button>
      ) : null}
    </div>
  );
}
