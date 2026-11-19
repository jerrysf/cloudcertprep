"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, XCircle } from "lucide-react";
import type { Question } from "@/lib/content/schema";
import { getCertification } from "@/lib/content/certifications";
import { cn } from "@/lib/utils";

export function MiniQuiz({ question }: { question: Question }) {
  const [picked, setPicked] = useState<string | null>(null);
  const cert = getCertification(question.cert);
  const answered = picked !== null;
  const correct = answered && question.correctAnswers.includes(picked);

  return (
    <div className="relative rotate-1 rounded-2xl border border-border bg-white p-5 shadow-xl transition-transform duration-300 hover:rotate-0 sm:p-6">
      <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wide">
        <span className="rounded-full bg-accent-soft px-2 py-0.5 text-accent">
          {cert?.code ?? "Cloud"}
        </span>
        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-muted">
          Try it — click an answer
        </span>
      </div>
      <p className="mt-3 text-sm font-semibold leading-snug">
        {question.question}
      </p>
      <div className="mt-3 space-y-2">
        {question.options.map((o) => {
          const isCorrect = question.correctAnswers.includes(o.id);
          const isPicked = picked === o.id;
          return (
            <button
              key={o.id}
              type="button"
              onClick={() => setPicked(o.id)}
              className={cn(
                "flex w-full items-center gap-2.5 rounded-lg border-2 p-2.5 text-left text-xs transition-colors",
                !answered && "border-border hover:border-accent/60",
                answered &&
                  isCorrect &&
                  "border-emerald-500 bg-emerald-50",
                answered &&
                  isPicked &&
                  !isCorrect &&
                  "border-red-400 bg-red-50",
                answered &&
                  !isPicked &&
                  !isCorrect &&
                  "border-border opacity-60",
              )}
            >
              <span
                className={cn(
                  "flex h-5 w-5 shrink-0 items-center justify-center rounded text-[10px] font-bold",
                  answered && isCorrect
                    ? "bg-emerald-600 text-white"
                    : answered && isPicked && !isCorrect
                      ? "bg-red-500 text-white"
                      : "bg-slate-100 text-slate-500",
                )}
              >
                {o.id}
              </span>
              <span
                className={cn(
                  answered && isCorrect
                    ? "font-medium text-emerald-900"
                    : "text-foreground",
                )}
              >
                {o.text}
              </span>
            </button>
          );
        })}
      </div>
      {answered ? (
        <div
          className={cn(
            "mt-3 rounded-lg px-3 py-2.5 text-xs",
            correct
              ? "bg-emerald-50 text-emerald-800"
              : "bg-amber-50 text-amber-900",
          )}
        >
          <p className="flex items-center gap-1.5 font-medium">
            {correct ? (
              <CheckCircle2 className="h-4 w-4" aria-hidden />
            ) : (
              <XCircle className="h-4 w-4" aria-hidden />
            )}
            {correct ? "Correct." : "Not quite."} Here&apos;s why —
          </p>
          <p className="mt-1 leading-relaxed">{question.explanation}</p>
          <Link
            href={`/practice/${question.cert}`}
            className="mt-2 inline-flex items-center gap-1 font-medium text-accent hover:underline"
          >
            Practice hundreds more like this
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </div>
      ) : null}
    </div>
  );
}
