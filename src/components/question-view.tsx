"use client";

import { useMemo, useState } from "react";
import {
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  ExternalLink,
  Flag,
  XCircle,
} from "lucide-react";
import type { Question } from "@/lib/content/schema";
import { getDomain } from "@/lib/content/domains";
import { getTopic } from "@/lib/content/topics";
import { evaluateAnswer } from "@/lib/exam";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui";

export interface QuestionViewProps {
  question: Question;
  /** preselected answers (exam mode keeps answers across navigation) */
  selected?: string[];
  onSelectionChange?: (selected: string[]) => void;
  /** when set, the view controls submission itself (practice mode) */
  onSubmit?: (selected: string[], correct: boolean) => void;
  /** show answer state + explanations (submitted practice q, or results review) */
  revealed?: boolean;
  disabled?: boolean;
  bookmarked?: boolean;
  onToggleBookmark?: () => void;
  flagged?: boolean;
  onFlag?: () => void;
  /** hide reference links until submission — avoids giving answers away */
  showActions?: boolean;
}

export function QuestionView({
  question,
  selected: controlledSelected,
  onSelectionChange,
  onSubmit,
  revealed = false,
  disabled = false,
  bookmarked,
  onToggleBookmark,
  flagged,
  onFlag,
  showActions = true,
}: QuestionViewProps) {
  const [internalSelected, setInternalSelected] = useState<string[]>([]);
  const selected = controlledSelected ?? internalSelected;
  const multi = question.format === "multiple-response";
  const domain = getDomain(question.domain);
  const topic = getTopic(question.topic);

  const correct = useMemo(
    () => (revealed ? evaluateAnswer(question, selected) : null),
    [revealed, question, selected],
  );

  function toggle(id: string) {
    if (revealed || disabled) return;
    const next = multi
      ? selected.includes(id)
        ? selected.filter((s) => s !== id)
        : [...selected, id]
      : [id];
    if (onSelectionChange) onSelectionChange(next);
    else setInternalSelected(next);
  }

  function submit() {
    if (!onSubmit || selected.length === 0) return;
    onSubmit(selected, evaluateAnswer(question, selected));
  }

  return (
    <article className="space-y-5">
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone="accent">
          Domain {domain.number}: {domain.name}
        </Badge>
        {topic ? <Badge>{topic.name}</Badge> : null}
        <Badge>{question.difficulty}</Badge>
        <Badge>{multi ? "Multiple response" : "Single choice"}</Badge>
        {showActions && (onToggleBookmark || onFlag) ? (
          <span className="ml-auto flex items-center gap-1">
            {onToggleBookmark ? (
              <button
                type="button"
                onClick={onToggleBookmark}
                aria-pressed={bookmarked}
                aria-label={bookmarked ? "Remove bookmark" : "Bookmark question"}
                className="rounded-md p-2 text-muted hover:bg-slate-100 hover:text-foreground"
              >
                {bookmarked ? (
                  <BookmarkCheck className="h-4 w-4 text-accent" />
                ) : (
                  <Bookmark className="h-4 w-4" />
                )}
              </button>
            ) : null}
            {onFlag ? (
              <button
                type="button"
                onClick={onFlag}
                aria-pressed={flagged}
                aria-label="Flag this question for review"
                className="rounded-md p-2 text-muted hover:bg-slate-100 hover:text-foreground"
              >
                <Flag
                  className={cn("h-4 w-4", flagged && "fill-amber-400 text-amber-500")}
                />
              </button>
            ) : null}
          </span>
        ) : null}
      </div>

      <p className="text-base leading-relaxed font-medium">{question.question}</p>
      {multi && !revealed ? (
        <p className="text-sm text-muted">
          Select {question.correctAnswers.length} answers.
        </p>
      ) : null}

      <fieldset disabled={disabled || revealed}>
        <legend className="sr-only">Answer options</legend>
        <div className="space-y-2">
          {question.options.map((opt) => {
            const isSelected = selected.includes(opt.id);
            const isCorrect = question.correctAnswers.includes(opt.id);
            const showCorrect = revealed && isCorrect;
            const showWrong = revealed && isSelected && !isCorrect;
            return (
              <label
                key={opt.id}
                className={cn(
                  "flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors",
                  !revealed && !disabled && "hover:border-accent/60",
                  isSelected && !revealed
                    ? "border-accent bg-accent-soft"
                    : "border-border",
                  showCorrect && "border-green-500 bg-green-50",
                  showWrong && "border-red-400 bg-red-50",
                  (disabled || revealed) && "cursor-default",
                )}
              >
                <input
                  type={multi ? "checkbox" : "radio"}
                  name={`q-${question.id}`}
                  checked={isSelected}
                  onChange={() => toggle(opt.id)}
                  className="mt-1"
                  aria-label={`Option ${opt.id}`}
                />
                <span className="flex-1 text-sm leading-relaxed">
                  <span className="mr-1.5 font-semibold">{opt.id}.</span>
                  {opt.text}
                </span>
                {showCorrect ? (
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" aria-label="Correct answer" />
                ) : null}
                {showWrong ? (
                  <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-danger" aria-label="Your answer, incorrect" />
                ) : null}
              </label>
            );
          })}
        </div>
      </fieldset>

      {!revealed && onSubmit ? (
        <button
          type="button"
          onClick={submit}
          disabled={selected.length === 0}
          className="rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Submit answer
        </button>
      ) : null}

      {revealed ? (
        <div
          className={cn(
            "rounded-lg border p-5",
            correct ? "border-green-300 bg-green-50" : "border-red-300 bg-red-50",
          )}
          role="status"
        >
          <p className="font-semibold">
            {correct ? "Correct." : "Incorrect."}{" "}
            <span className="font-normal">
              Correct answer{question.correctAnswers.length > 1 ? "s" : ""}:{" "}
              {question.correctAnswers.join(", ")}
            </span>
          </p>
          <p className="mt-2 text-sm leading-relaxed">{question.explanation}</p>
          <ul className="mt-4 space-y-2 text-sm">
            {question.options.map((opt) => (
              <li key={opt.id}>
                <span className="font-semibold">{opt.id}.</span>{" "}
                {question.optionExplanations[opt.id]}
              </li>
            ))}
          </ul>
          <div className="mt-4 border-t border-black/10 pt-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">
              Official AWS references
            </p>
            <ul className="mt-1 space-y-1">
              {question.references.map((r) => (
                <li key={r.url}>
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-accent hover:underline"
                  >
                    {r.title}
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </article>
  );
}
