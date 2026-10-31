"use client";

import Link from "next/link";
import { QUESTION_BY_ID } from "@/lib/content/questions";
import { summarize } from "@/lib/storage";
import { useProgress } from "@/lib/use-progress";
import { PracticeSession } from "@/components/practice-session";
import { ButtonLink, Card } from "@/components/ui";

export function MistakesSession() {
  const data = useProgress();

  if (!data) {
    return (
      <Card>
        <p className="text-sm text-muted">Loading your review queue…</p>
      </Card>
    );
  }

  const s = summarize(data);
  const questions = [...s.incorrectIds]
    .map((id) => QUESTION_BY_ID.get(id))
    .filter((q) => q !== undefined);

  if (questions.length === 0) {
    return (
      <Card className="text-center">
        <p className="font-semibold">No mistakes to review</p>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted">
          Questions you answer incorrectly in practice sessions land here for
          re-attempt. Answer a few sets first — or you&apos;re just that good.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/practice">Browse practice topics</ButtonLink>
          <Link
            href="/mock-exam"
            className="inline-flex items-center rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-slate-50"
          >
            Take a mock exam
          </Link>
        </div>
      </Card>
    );
  }

  return (
    <PracticeSession questions={questions} topic="mistakes-review" />
  );
}
