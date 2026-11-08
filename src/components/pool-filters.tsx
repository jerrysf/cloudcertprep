"use client";

import { useMemo } from "react";
import type { Question } from "@/lib/content/schema";
import { summarize, type ProgressData } from "@/lib/storage";
import { useProgress } from "@/lib/use-progress";
import { cn } from "@/lib/utils";

export type PoolMode = "all" | "mistakes" | "unseen";
export type DifficultyFilter = "all" | "easy" | "medium" | "hard";

/** Pool counts from the local progress store — zeros until hydration. */
export function usePoolCounts(questions: Question[]) {
  const data = useProgress();
  return useMemo(() => {
    if (!data) return { mistakes: 0, unseen: questions.length };
    const incorrect = summarize(data).incorrectIds;
    const ids = new Set(questions.map((q) => q.id));
    const attempted = new Set(data.attempts.map((a) => a.questionId));
    return {
      mistakes: [...incorrect].filter((id) => ids.has(id)).length,
      unseen: questions.filter((q) => !attempted.has(q.id)).length,
    };
  }, [data, questions]);
}

export function applyPoolFilter(
  questions: Question[],
  mode: PoolMode,
  data: ProgressData | null,
): Question[] {
  if (mode === "all" || !data) return questions;
  if (mode === "unseen") {
    const seen = new Set(data.attempts.map((a) => a.questionId));
    return questions.filter((q) => !seen.has(q.id));
  }
  const incorrect = summarize(data).incorrectIds;
  return questions.filter((q) => incorrect.has(q.id));
}

export function PoolModeButtons({
  value,
  onChange,
  mistakesCount,
  unseenCount,
}: {
  value: PoolMode;
  onChange: (m: PoolMode) => void;
  mistakesCount: number;
  unseenCount: number;
}) {
  const opts: Array<{ id: PoolMode; label: string; count?: number }> = [
    { id: "all", label: "All questions" },
    { id: "mistakes", label: "Mistakes only", count: mistakesCount },
    { id: "unseen", label: "Not attempted", count: unseenCount },
  ];
  return (
    <div className="flex gap-1 rounded-lg bg-slate-100 p-1 text-sm">
      {opts.map((o) => (
        <button
          key={o.id}
          type="button"
          onClick={() => onChange(o.id)}
          aria-pressed={value === o.id}
          className={cn(
            "rounded-md px-3 py-1.5 transition-colors",
            value === o.id
              ? "bg-white font-medium text-foreground shadow-sm"
              : "text-muted hover:text-foreground",
          )}
        >
          {o.label}
          {o.count !== undefined ? (
            <span className="ml-1 text-xs opacity-70">({o.count})</span>
          ) : null}
        </button>
      ))}
    </div>
  );
}

export function DifficultyButtons({
  value,
  onChange,
}: {
  value: DifficultyFilter;
  onChange: (d: DifficultyFilter) => void;
}) {
  const opts: DifficultyFilter[] = ["all", "easy", "medium", "hard"];
  return (
    <div className="flex gap-1 rounded-lg bg-slate-100 p-1 text-sm">
      {opts.map((d) => (
        <button
          key={d}
          type="button"
          onClick={() => onChange(d)}
          aria-pressed={value === d}
          className={cn(
            "rounded-md px-3 py-1.5 capitalize transition-colors",
            value === d
              ? "bg-white font-medium text-foreground shadow-sm"
              : "text-muted hover:text-foreground",
          )}
        >
          {d}
        </button>
      ))}
    </div>
  );
}
