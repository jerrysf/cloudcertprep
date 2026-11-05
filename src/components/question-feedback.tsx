"use client";

import { ThumbsDown, ThumbsUp } from "lucide-react";
import { getProgressStore } from "@/lib/storage";
import { notifyProgressChanged, useProgress } from "@/lib/use-progress";
import { ANALYTICS_EVENTS, track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export function QuestionFeedback({ questionId }: { questionId: string }) {
  const data = useProgress();
  const vote = data?.feedback[questionId];

  function submit(v: "up" | "down") {
    const store = getProgressStore();
    const d = store.load();
    // toggling the same vote withdraws it
    if (d.feedback[questionId] === v) {
      delete d.feedback[questionId];
    } else {
      d.feedback[questionId] = v;
    }
    store.save(d);
    notifyProgressChanged();
    track(ANALYTICS_EVENTS.questionFeedback, { questionId, vote: v });
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-muted">Was this explanation helpful?</span>
      <button
        type="button"
        onClick={() => submit("up")}
        aria-pressed={vote === "up"}
        aria-label="Helpful"
        className={cn(
          "rounded-lg border p-1.5 transition-colors",
          vote === "up"
            ? "border-emerald-400 bg-emerald-50 text-emerald-700"
            : "border-border text-muted hover:border-emerald-300 hover:text-emerald-600",
        )}
      >
        <ThumbsUp className="h-4 w-4" aria-hidden />
      </button>
      <button
        type="button"
        onClick={() => submit("down")}
        aria-pressed={vote === "down"}
        aria-label="Not helpful"
        className={cn(
          "rounded-lg border p-1.5 transition-colors",
          vote === "down"
            ? "border-red-400 bg-red-50 text-red-700"
            : "border-border text-muted hover:border-red-300 hover:text-red-600",
        )}
      >
        <ThumbsDown className="h-4 w-4" aria-hidden />
      </button>
      {vote ? (
        <span className="text-xs text-muted">Thanks — recorded locally.</span>
      ) : null}
    </div>
  );
}
