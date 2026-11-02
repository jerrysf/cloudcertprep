"use client";

import Link from "next/link";
import { QUESTION_BY_ID } from "@/lib/content/questions";
import { useProgress } from "@/lib/use-progress";
import { PracticeSession } from "@/components/practice-session";
import { ButtonLink, Card } from "@/components/ui";

export function ReviewSession() {
  const data = useProgress();

  if (!data) {
    return (
      <Card>
        <p className="text-sm text-muted">Loading your review queue…</p>
      </Card>
    );
  }

  const ids = new Set<string>([
    ...data.bookmarks,
    ...Object.keys(data.flags),
  ]);
  const questions = [...ids]
    .map((id) => QUESTION_BY_ID.get(id))
    .filter((q) => q !== undefined);

  if (questions.length === 0) {
    return (
      <Card className="text-center">
        <p className="font-semibold">Your review queue is empty</p>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted">
          Bookmark questions to revisit and flag ones that seem off — they
          collect here for focused review. While practicing, use the bookmark
          and flag icons on each question.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/practice">Browse practice topics</ButtonLink>
          <Link
            href="/practice/mistakes"
            className="inline-flex items-center rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-slate-50"
          >
            Review your mistakes
          </Link>
        </div>
      </Card>
    );
  }

  return (
    <PracticeSession questions={questions} topic="bookmarked-review" />
  );
}
