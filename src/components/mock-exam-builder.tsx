"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { DomainId } from "@/lib/content/schema";
import { DOMAINS, EXAM } from "@/lib/content/domains";
import {
  createExamSession,
  selectExamQuestions,
} from "@/lib/exam";
import { PUBLISHED_QUESTIONS } from "@/lib/content/questions";
import { ANALYTICS_EVENTS, track } from "@/lib/analytics";
import { EXAM_SESSION_PREFIX } from "@/lib/storage";
import { Card } from "@/components/ui";

const COUNT_OPTIONS = [10, 20, 35, 65];

export function MockExamBuilder() {
  const router = useRouter();
  const [count, setCount] = useState(10);
  const [timed, setTimed] = useState(true);
  const [domains, setDomains] = useState<DomainId[]>([]);
  const available = PUBLISHED_QUESTIONS.length;
  const effectiveCount = Math.min(count, available);

  function toggleDomain(d: DomainId) {
    setDomains((cur) =>
      cur.includes(d) ? cur.filter((x) => x !== d) : [...cur, d],
    );
  }

  function start() {
    const questions = selectExamQuestions(
      PUBLISHED_QUESTIONS,
      effectiveCount,
      domains.length ? domains : undefined,
    );
    const duration = timed
      ? Math.round((EXAM.durationMinutes / EXAM.questionCount) * questions.length) * 60
      : null;
    const session = createExamSession(questions, timed, duration);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(
        `${EXAM_SESSION_PREFIX}${session.id}`,
        JSON.stringify(session),
      );
    }
    track(ANALYTICS_EVENTS.examStart, {
      count: questions.length,
      timed,
    });
    router.push(`/mock-exam/${session.id}`);
  }

  return (
    <Card className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Number of questions</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {COUNT_OPTIONS.map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setCount(n)}
              aria-pressed={count === n}
              className={
                count === n
                  ? "rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white"
                  : "rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-slate-50"
              }
            >
              {n}
              {n > available ? ` (uses all ${available})` : ""}
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs text-muted">
          The real exam has {EXAM.questionCount} questions. This practice bank
          currently contains {available} questions.
        </p>
      </div>

      <div>
        <h2 className="text-lg font-semibold">Timing</h2>
        <div className="mt-3 flex gap-2">
          <button
            type="button"
            onClick={() => setTimed(true)}
            aria-pressed={timed}
            className={
              timed
                ? "rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white"
                : "rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-slate-50"
            }
          >
            Timed — {EXAM.durationMinutes / EXAM.questionCount} min/question pace
          </button>
          <button
            type="button"
            onClick={() => setTimed(false)}
            aria-pressed={!timed}
            className={
              !timed
                ? "rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white"
                : "rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-slate-50"
            }
          >
            Untimed
          </button>
        </div>
      </div>

      <fieldset>
        <legend className="text-lg font-semibold">
          Domains{" "}
          <span className="text-sm font-normal text-muted">
            (empty = balanced mix by official weights)
          </span>
        </legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {DOMAINS.map((d) => (
            <label
              key={d.id}
              className="flex cursor-pointer items-start gap-3 rounded-lg border border-border p-3 text-sm hover:border-accent/60"
            >
              <input
                type="checkbox"
                checked={domains.includes(d.id)}
                onChange={() => toggleDomain(d.id)}
                className="mt-0.5"
              />
              <span>
                <span className="font-medium">
                  Domain {d.number}: {d.name}
                </span>
                <span className="block text-xs text-muted">{d.weight}% of exam</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <button
        type="button"
        onClick={start}
        className="w-full rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-blue-800 sm:w-auto"
      >
        Start mock exam ({effectiveCount} questions)
      </button>
      <p className="text-xs text-muted">
        Practice scores are estimates only and do not replicate AWS&apos;s
        official scaled scoring (100–1000, passing 720).
      </p>
    </Card>
  );
}
