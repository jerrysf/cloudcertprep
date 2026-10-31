/**
 * Anonymous learning progress persisted in localStorage for the MVP.
 *
 * The `ProgressStore` interface is the seam for a future Supabase/Postgres
 * backend: implement the same interface with async persistence and swap
 * `localProgressStore` for it in `getProgressStore()`.
 *
 * Never store secrets or PII here — this data stays in the user's browser.
 */

export interface QuestionAttempt {
  questionId: string;
  correct: boolean;
  answeredAt: string; // ISO date
  domain: string;
  topic: string;
}

export interface PracticeSessionRecord {
  id: string;
  topic: string;
  startedAt: string;
  completedAt?: string;
  total: number;
  correct: number;
}

export interface ExamResult {
  id: string;
  examId: string;
  finishedAt: string;
  totalQuestions: number;
  answered: number;
  correct: number;
  scorePercent: number; // simple percent — NOT AWS scaled scoring
  timeSpentSeconds: number;
  timed: boolean;
  domainBreakdown: Record<
    string,
    { total: number; correct: number; incorrect: number; unanswered: number }
  >;
  answers: Array<{
    questionId: string;
    selected: string[];
    correct: boolean;
  }>;
}

export interface ExamSession {
  id: string;
  createdAt: string;
  questionIds: string[];
  timed: boolean;
  durationSeconds: number | null;
  startedAt: string;
  answers: Record<string, string[]>;
  flagged: string[];
  currentIndex: number;
  submitted: boolean;
}

export interface ProgressData {
  version: 1;
  attempts: QuestionAttempt[];
  sessions: PracticeSessionRecord[];
  examResults: ExamResult[];
  bookmarks: string[];
  flags: Record<string, { reason: string; flaggedAt: string }>;
  flashcardStatus: Record<string, "known" | "learning">;
  studyPlan: StoredStudyPlan | null;
  activityDays: string[]; // YYYY-MM-DD — for streaks
}

export interface StoredStudyPlan {
  createdAt: string;
  certId?: string;
  experience: string;
  hoursPerWeek: number;
  targetDate: string;
  weakTopics: string[];
  weeks: Array<{ week: number; focus: string; tasks: string[] }>;
}

const KEY = "ccp.progress.v1";

/** In-progress exam sessions live under their own keys. */
export const EXAM_SESSION_PREFIX = "ccp.exam.";

export const EMPTY_PROGRESS: ProgressData = {
  version: 1,
  attempts: [],
  sessions: [],
  examResults: [],
  bookmarks: [],
  flags: {},
  flashcardStatus: {},
  studyPlan: null,
  activityDays: [],
};

export interface ProgressStore {
  load(): ProgressData;
  save(data: ProgressData): void;
  reset(): void;
}

function safeParse(raw: string | null): ProgressData {
  if (!raw) return structuredClone(EMPTY_PROGRESS);
  try {
    const parsed = JSON.parse(raw) as Partial<ProgressData>;
    return { ...structuredClone(EMPTY_PROGRESS), ...parsed, version: 1 };
  } catch {
    return structuredClone(EMPTY_PROGRESS);
  }
}

export function createLocalStorageStore(
  storage: Pick<Storage, "getItem" | "setItem" | "removeItem">,
): ProgressStore {
  return {
    load: () => safeParse(storage.getItem(KEY)),
    save: (data) => storage.setItem(KEY, JSON.stringify(data)),
    reset: () => storage.removeItem(KEY),
  };
}

export function getProgressStore(): ProgressStore {
  if (typeof window === "undefined") {
    // SSR: in-memory no-op
    let mem = structuredClone(EMPTY_PROGRESS);
    return {
      load: () => mem,
      save: (d) => {
        mem = d;
      },
      reset: () => {
        mem = structuredClone(EMPTY_PROGRESS);
      },
    };
  }
  return createLocalStorageStore(window.localStorage);
}

export function todayKey(d = new Date()): string {
  return d.toISOString().slice(0, 10);
}

export function recordActivityDay(data: ProgressData, d = new Date()): void {
  const day = todayKey(d);
  if (!data.activityDays.includes(day)) data.activityDays.push(day);
}

export function computeStreak(activityDays: string[], today = new Date()): number {
  const days = new Set(activityDays);
  let streak = 0;
  const cursor = new Date(today);
  // streak counts consecutive days ending today or yesterday
  if (!days.has(todayKey(cursor))) {
    cursor.setDate(cursor.getDate() - 1);
    if (!days.has(todayKey(cursor))) return 0;
  }
  while (days.has(todayKey(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

export function summarize(data: ProgressData) {
  const attempted = data.attempts.length;
  const correct = data.attempts.filter((a) => a.correct).length;
  const byTopic = new Map<string, { total: number; correct: number }>();
  const byDomain = new Map<string, { total: number; correct: number }>();
  for (const a of data.attempts) {
    const t = byTopic.get(a.topic) ?? { total: 0, correct: 0 };
    t.total += 1;
    t.correct += a.correct ? 1 : 0;
    byTopic.set(a.topic, t);
    const d = byDomain.get(a.domain) ?? { total: 0, correct: 0 };
    d.total += 1;
    d.correct += a.correct ? 1 : 0;
    byDomain.set(a.domain, d);
  }
  const incorrectIds = new Set(
    data.attempts.filter((a) => !a.correct).map((a) => a.questionId),
  );
  // a question stops being "to review" once answered correctly later
  for (const a of data.attempts) {
    if (a.correct) incorrectIds.delete(a.questionId);
  }
  return {
    attempted,
    correct,
    accuracy: attempted === 0 ? null : correct / attempted,
    byTopic,
    byDomain,
    incorrectIds,
    streak: computeStreak(data.activityDays),
    bookmarked: data.bookmarks,
  };
}
