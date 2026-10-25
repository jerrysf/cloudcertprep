import type { DomainId, Question } from "@/lib/content/schema";
import { getDomain } from "@/lib/content/domains";
import type { ExamResult, ExamSession } from "@/lib/storage";
import { shuffle } from "@/lib/utils";

/** Exact-match evaluation: all correct options selected, none extra. */
export function evaluateAnswer(
  question: Pick<Question, "correctAnswers">,
  selected: string[],
): boolean {
  const want = new Set(question.correctAnswers);
  const got = new Set(selected);
  if (want.size !== got.size) return false;
  for (const w of want) if (!got.has(w)) return false;
  return true;
}

export function secondsRemaining(
  startedAtMs: number,
  durationSeconds: number,
  nowMs: number,
): number {
  const elapsed = Math.floor((nowMs - startedAtMs) / 1000);
  return Math.max(0, durationSeconds - elapsed);
}

export function isExpired(
  startedAtMs: number,
  durationSeconds: number,
  nowMs: number,
): boolean {
  return secondsRemaining(startedAtMs, durationSeconds, nowMs) <= 0;
}

export interface DomainStat {
  domain: DomainId;
  total: number;
  correct: number;
  incorrect: number;
  unanswered: number;
}

export function domainStats(
  questions: Question[],
  answers: Record<string, string[]>,
): DomainStat[] {
  const byDomain = new Map<DomainId, DomainStat>();
  for (const q of questions) {
    const stat =
      byDomain.get(q.domain) ??
      ({
        domain: q.domain,
        total: 0,
        correct: 0,
        incorrect: 0,
        unanswered: 0,
      } satisfies DomainStat);
    stat.total += 1;
    const selected = answers[q.id];
    if (!selected || selected.length === 0) {
      stat.unanswered += 1;
    } else if (evaluateAnswer(q, selected)) {
      stat.correct += 1;
    } else {
      stat.incorrect += 1;
    }
    byDomain.set(q.domain, stat);
  }
  return [...byDomain.values()].sort(
    (a, b) => getDomain(a.domain).number - getDomain(b.domain).number,
  );
}

export function scoreExam(
  questions: Question[],
  answers: Record<string, string[]>,
): {
  correct: number;
  answered: number;
  total: number;
  scorePercent: number;
  answersDetail: ExamResult["answers"];
} {
  let correct = 0;
  let answered = 0;
  const detail: ExamResult["answers"] = [];
  for (const q of questions) {
    const selected = answers[q.id] ?? [];
    if (selected.length > 0) answered += 1;
    const isCorrect = selected.length > 0 && evaluateAnswer(q, selected);
    if (isCorrect) correct += 1;
    detail.push({ questionId: q.id, selected, correct: isCorrect });
  }
  return {
    correct,
    answered,
    total: questions.length,
    scorePercent: questions.length === 0 ? 0 : (correct / questions.length) * 100,
    answersDetail: detail,
  };
}

/**
 * Pick a balanced question set across domains proportional to official exam
 * weights. With small banks this degrades gracefully: fill remaining slots
 * with leftovers so we always return `count` questions when enough exist.
 */
export function selectExamQuestions(
  pool: Question[],
  count: number,
  domainFilter?: DomainId[],
  seed?: number,
): Question[] {
  const eligible = domainFilter?.length
    ? pool.filter((q) => domainFilter.includes(q.domain))
    : pool;
  const byDomain = new Map<DomainId, Question[]>();
  for (const q of shuffle(eligible, seed)) {
    const arr = byDomain.get(q.domain) ?? [];
    arr.push(q);
    byDomain.set(q.domain, arr);
  }
  const picked: Question[] = [];
  // weights renormalized over the filtered domains
  const domains = [...byDomain.keys()].sort(
    (a, b) => getDomain(a).number - getDomain(b).number,
  );
  const totalWeight = domains.reduce((s, d) => s + getDomain(d).weight, 0);
  const quota = new Map<DomainId, number>();
  let assigned = 0;
  for (const d of domains) {
    const qn = Math.min(
      Math.floor((count * getDomain(d).weight) / totalWeight),
      byDomain.get(d)!.length,
    );
    quota.set(d, qn);
    assigned += qn;
  }
  // distribute the remainder round-robin by weight order
  let i = 0;
  while (assigned < Math.min(count, eligible.length)) {
    const d = domains[i % domains.length];
    if ((quota.get(d) ?? 0) < byDomain.get(d)!.length) {
      quota.set(d, (quota.get(d) ?? 0) + 1);
      assigned += 1;
    }
    i += 1;
    if (i > domains.length * eligible.length) break; // safety
  }
  for (const d of domains) {
    picked.push(...byDomain.get(d)!.slice(0, quota.get(d) ?? 0));
  }
  return shuffle(picked, seed === undefined ? undefined : seed + 1);
}

export function newExamId(): string {
  return `exam-${Date.now().toString(36)}-${Math.random()
    .toString(36)
    .slice(2, 8)}`;
}

export function createExamSession(
  questions: Question[],
  timed: boolean,
  durationSeconds: number | null,
): ExamSession {
  return {
    id: newExamId(),
    createdAt: new Date().toISOString(),
    questionIds: questions.map((q) => q.id),
    timed,
    durationSeconds,
    startedAt: new Date().toISOString(),
    answers: {},
    flagged: [],
    currentIndex: 0,
    submitted: false,
  };
}
