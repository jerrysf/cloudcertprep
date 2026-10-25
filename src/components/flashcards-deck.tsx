"use client";

import { useMemo, useState } from "react";
import { RefreshCw, RotateCw } from "lucide-react";
import { FLASHCARDS, type Flashcard } from "@/lib/content/flashcards";
import { DOMAINS } from "@/lib/content/domains";
import type { DomainId } from "@/lib/content/schema";
import { getProgressStore, recordActivityDay } from "@/lib/storage";
import { notifyProgressChanged, useProgress } from "@/lib/use-progress";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui";

export function FlashcardsDeck() {
  const [domain, setDomain] = useState<DomainId | "all">("all");
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const progress = useProgress();
  const status = progress?.flashcardStatus ?? {};

  const deck: Flashcard[] = useMemo(
    () =>
      domain === "all"
        ? FLASHCARDS
        : FLASHCARDS.filter((c) => c.domain === domain),
    [domain],
  );
  const card = deck[index];

  function mark(result: "known" | "learning") {
    if (!card) return;
    const store = getProgressStore();
    const data = store.load();
    data.flashcardStatus[card.id] = result;
    recordActivityDay(data);
    store.save(data);
    notifyProgressChanged();
    setFlipped(false);
    setIndex((i) => Math.min(i + 1, deck.length - 1));
  }

  function changeDomain(d: DomainId | "all") {
    setDomain(d);
    setIndex(0);
    setFlipped(false);
  }

  const knownCount = deck.filter((c) => status[c.id] === "known").length;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <label className="text-sm font-medium">
          Domain
          <select
            className="ml-2 rounded-lg border border-border bg-white px-3 py-2 text-sm font-normal"
            value={domain}
            onChange={(e) => changeDomain(e.target.value as DomainId | "all")}
          >
            <option value="all">All domains ({FLASHCARDS.length})</option>
            {DOMAINS.map((d) => (
              <option key={d.id} value={d.id}>
                {d.number}. {d.name}
              </option>
            ))}
          </select>
        </label>
        <span className="text-sm text-muted">
          {knownCount}/{deck.length} marked as known
        </span>
      </div>

      {card ? (
        <>
          <button
            type="button"
            onClick={() => setFlipped((f) => !f)}
            aria-pressed={flipped}
            aria-label={flipped ? "Show question side" : "Show answer side"}
            className="flex min-h-64 w-full items-center justify-center rounded-2xl border border-border bg-white p-10 text-center shadow-sm transition-shadow hover:shadow-md"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                {flipped ? "Answer" : "Card"} · {index + 1} of {deck.length}
              </p>
              <p className="mt-3 text-lg font-medium leading-relaxed">
                {flipped ? card.back : card.front}
              </p>
              {!flipped ? (
                <p className="mt-4 inline-flex items-center gap-1 text-xs text-muted">
                  <RotateCw className="h-3.5 w-3.5" aria-hidden /> Click to flip
                </p>
              ) : null}
            </div>
          </button>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setIndex((i) => Math.max(0, i - 1))}
                disabled={index === 0}
                className="rounded-lg border border-border px-4 py-2 text-sm font-medium disabled:opacity-40"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={() =>
                  setIndex((i) => Math.min(deck.length - 1, i + 1))
                }
                disabled={index === deck.length - 1}
                className="rounded-lg border border-border px-4 py-2 text-sm font-medium disabled:opacity-40"
              >
                Next
              </button>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => mark("learning")}
                className={cn(
                  "rounded-lg border px-4 py-2 text-sm font-medium",
                  status[card.id] === "learning"
                    ? "border-amber-400 bg-amber-50 text-amber-800"
                    : "border-border",
                )}
              >
                Still learning
              </button>
              <button
                type="button"
                onClick={() => mark("known")}
                className={cn(
                  "rounded-lg border px-4 py-2 text-sm font-medium",
                  status[card.id] === "known"
                    ? "border-green-400 bg-green-50 text-green-800"
                    : "border-border",
                )}
              >
                I know this
              </button>
              <button
                type="button"
                onClick={() => {
                  setIndex(0);
                  setFlipped(false);
                }}
                className="inline-flex items-center gap-1 rounded-lg border border-border px-3 py-2 text-sm text-muted"
                aria-label="Restart deck"
              >
                <RefreshCw className="h-4 w-4" aria-hidden />
              </button>
            </div>
          </div>
        </>
      ) : (
        <Card>
          <p className="text-sm text-muted">No cards in this domain yet.</p>
        </Card>
      )}
    </div>
  );
}
