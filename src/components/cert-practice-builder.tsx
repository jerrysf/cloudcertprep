"use client";

import { useMemo, useState } from "react";
import { Play } from "lucide-react";
import type { Certification } from "@/lib/content/certifications";
import type { Question } from "@/lib/content/schema";
import { getDomain } from "@/lib/content/domains";
import type { DomainId } from "@/lib/content/schema";
import { PracticeSession } from "@/components/practice-session";
import {
  applyPoolFilter,
  DifficultyButtons,
  PoolModeButtons,
  usePoolCounts,
  type DifficultyFilter,
  type PoolMode,
} from "@/components/pool-filters";
import { useProgress } from "@/lib/use-progress";
import { Card } from "@/components/ui";
import { cn } from "@/lib/utils";

const COUNTS = [10, 20, 50, 0] as const; // 0 = all

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function CertPracticeBuilder({
  cert,
  questions,
}: {
  cert: Certification;
  questions: Question[];
}) {
  const [selectedDomains, setSelectedDomains] = useState<Set<string>>(
    () => new Set(cert.domains.map((d) => d.id)),
  );
  const [difficulty, setDifficulty] = useState<DifficultyFilter>("all");
  const [poolMode, setPoolMode] = useState<PoolMode>("all");
  const [count, setCount] = useState<number>(20);
  const [session, setSession] = useState<Question[] | null>(null);
  const progress = useProgress();

  const domainIds = cert.domains.map((d) => d.id);
  const perDomain = useMemo(() => {
    const m = new Map<string, number>();
    for (const q of questions) m.set(q.domain, (m.get(q.domain) ?? 0) + 1);
    return m;
  }, [questions]);

  const basePool = useMemo(
    () =>
      questions.filter(
        (q) =>
          selectedDomains.has(q.domain) &&
          (difficulty === "all" || q.difficulty === difficulty),
      ),
    [questions, selectedDomains, difficulty],
  );
  const poolCounts = usePoolCounts(basePool);
  const pool = useMemo(
    () => applyPoolFilter(basePool, poolMode, progress),
    [basePool, poolMode, progress],
  );

  function toggleDomain(id: string) {
    setSelectedDomains((s) => {
      const next = new Set(s);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  if (session) {
    return <PracticeSession questions={session} topic={cert.id} />;
  }

  const effective = count === 0 ? pool.length : Math.min(count, pool.length);

  return (
    <Card>
      <h2 className="font-semibold">Build a practice set</h2>
      <p className="mt-1 text-sm text-muted">
        Pick domains, difficulty, and set size — questions are drawn randomly
        from the {cert.code} bank.
      </p>

      <div className="mt-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted">
          Domains
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {domainIds.map((id) => {
            const d = getDomain(id as DomainId);
            const on = selectedDomains.has(id);
            return (
              <button
                key={id}
                type="button"
                onClick={() => toggleDomain(id)}
                aria-pressed={on}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-sm transition-colors",
                  on
                    ? "border-accent bg-accent-soft text-accent"
                    : "border-border text-muted hover:border-slate-300",
                )}
              >
                {d?.name ?? id}
                <span className="ml-1 text-xs opacity-70">
                  ({perDomain.get(id) ?? 0})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">
            Pool
          </p>
          <div className="mt-2">
            <PoolModeButtons
              value={poolMode}
              onChange={setPoolMode}
              mistakesCount={poolCounts.mistakes}
              unseenCount={poolCounts.unseen}
            />
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">
            Difficulty
          </p>
          <div className="mt-2">
            <DifficultyButtons value={difficulty} onChange={setDifficulty} />
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">
            Set size
          </p>
          <div className="mt-2 flex gap-1 rounded-lg bg-slate-100 p-1 text-sm">
            {COUNTS.map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setCount(n)}
                aria-pressed={count === n}
                className={cn(
                  "rounded-md px-3 py-1.5 transition-colors",
                  count === n
                    ? "bg-white font-medium text-foreground shadow-sm"
                    : "text-muted hover:text-foreground",
                )}
              >
                {n === 0 ? "All" : n}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={() => setSession(shuffle(pool).slice(0, effective))}
          disabled={effective === 0}
          className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Play className="h-4 w-4" aria-hidden />
          Start {effective} question{effective === 1 ? "" : "s"}
        </button>
        <span className="text-sm text-muted">
          {pool.length} question{pool.length === 1 ? "" : "s"} match your filters
        </span>
      </div>
    </Card>
  );
}
