"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Clock, Flag, Send } from "lucide-react";
import type { Question } from "@/lib/content/schema";
import { domainStats, scoreExam, secondsRemaining } from "@/lib/exam";
import {
  EXAM_SESSION_PREFIX,
  getProgressStore,
  recordActivityDay,
  type ExamSession,
} from "@/lib/storage";
import { useMounted } from "@/lib/use-progress";
import { ANALYTICS_EVENTS, track } from "@/lib/analytics";
import { cn, formatDuration } from "@/lib/utils";
import { QuestionView } from "@/components/question-view";
import { Card } from "@/components/ui";

export function MockExamSession({
  examId,
  questionBank,
}: {
  examId: string;
  questionBank: Question[];
}) {
  const mounted = useMounted();
  if (!mounted) {
    return (
      <Card>
        <p className="text-sm text-muted">Loading exam session…</p>
      </Card>
    );
  }
  return <SessionInner examId={examId} questionBank={questionBank} />;
}

function loadSession(examId: string): ExamSession | null {
  try {
    const raw = window.localStorage.getItem(`${EXAM_SESSION_PREFIX}${examId}`);
    return raw ? (JSON.parse(raw) as ExamSession) : null;
  } catch {
    return null;
  }
}

function SessionInner({
  examId,
  questionBank,
}: {
  examId: string;
  questionBank: Question[];
}) {
  const router = useRouter();
  const [session, setSession] = useState<ExamSession | null>(() =>
    loadSession(examId),
  );
  const [now, setNow] = useState<number>(() => Date.now());
  const sessionRef = useRef<ExamSession | null>(session);
  const submitRef = useRef<() => void>(() => {});

  useEffect(() => {
    sessionRef.current = session;
  }, [session]);

  const persist = useCallback((s: ExamSession) => {
    window.localStorage.setItem(
      `${EXAM_SESSION_PREFIX}${s.id}`,
      JSON.stringify(s),
    );
    setSession(s);
  }, []);

  const questions =
    session?.questionIds
      .map((id) => questionBank.find((q) => q.id === id))
      .filter((q): q is Question => !!q) ?? [];
  const question = questions[session?.currentIndex ?? 0];

  const finish = useCallback(() => {
    const cur = sessionRef.current;
    if (!cur || cur.submitted) return;
    const qs = cur.questionIds
      .map((id) => questionBank.find((q) => q.id === id))
      .filter((q): q is Question => !!q);
    const scored = scoreExam(qs, cur.answers);
    const stats = domainStats(qs, cur.answers);
    const timeSpent = Math.max(
      0,
      Math.floor((Date.now() - new Date(cur.startedAt).getTime()) / 1000),
    );
    const result = {
      id: cur.id,
      examId: cur.id,
      finishedAt: new Date().toISOString(),
      totalQuestions: scored.total,
      answered: scored.answered,
      correct: scored.correct,
      scorePercent: scored.scorePercent,
      timeSpentSeconds: timeSpent,
      timed: cur.timed,
      domainBreakdown: Object.fromEntries(
        stats.map((s) => [
          s.domain,
          {
            total: s.total,
            correct: s.correct,
            incorrect: s.incorrect,
            unanswered: s.unanswered,
          },
        ]),
      ),
      answers: scored.answersDetail,
    };
    const store = getProgressStore();
    const data = store.load();
    data.examResults = data.examResults.filter((r) => r.examId !== cur.id);
    data.examResults.push(result);
    for (const q of qs) {
      const sel = cur.answers[q.id] ?? [];
      if (sel.length > 0) {
        data.attempts.push({
          questionId: q.id,
          correct: result.answers.find((a) => a.questionId === q.id)!.correct,
          answeredAt: new Date().toISOString(),
          domain: q.domain,
          topic: q.topic,
        });
      }
    }
    recordActivityDay(data);
    store.save(data);
    const done = { ...cur, submitted: true };
    window.localStorage.setItem(
      `${EXAM_SESSION_PREFIX}${cur.id}`,
      JSON.stringify(done),
    );
    setSession(done);
    track(ANALYTICS_EVENTS.examComplete, {
      count: scored.total,
      answered: scored.answered,
    });
    router.push(`/results/${cur.id}`);
  }, [questionBank, router]);

  useEffect(() => {
    submitRef.current = finish;
  }, [finish]);

  // Redirect to results if this session was already submitted
  useEffect(() => {
    if (session?.submitted) router.replace(`/results/${examId}`);
  }, [session?.submitted, examId, router]);

  // Countdown + auto-submit on expiry
  const timed = !!session?.timed;
  const durationSeconds = session?.durationSeconds ?? null;
  const startedAt = session?.startedAt ?? null;
  useEffect(() => {
    if (!timed || !durationSeconds || !startedAt) return;
    const startedMs = new Date(startedAt).getTime();
    const tick = () => {
      setNow(Date.now());
      if (secondsRemaining(startedMs, durationSeconds, Date.now()) <= 0) {
        submitRef.current();
      }
    };
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, [timed, durationSeconds, startedAt]);

  // Warn before leaving an unfinished exam
  const submitted = !!session?.submitted;
  const hasSession = !!session;
  useEffect(() => {
    if (!hasSession || submitted) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [hasSession, submitted]);

  if (!session) {
    return (
      <Card>
        <p className="font-semibold">Exam session not found</p>
        <p className="mt-1 text-sm text-muted">
          This exam may have been cleared or created on another device. Start a
          new mock exam to continue.
        </p>
      </Card>
    );
  }
  if (!question) return null;

  const remaining =
    session.timed && session.durationSeconds
      ? secondsRemaining(
          new Date(session.startedAt).getTime(),
          session.durationSeconds,
          now,
        )
      : null;
  const answeredCount = Object.values(session.answers).filter(
    (a) => a.length > 0,
  ).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-sm text-muted">
          Question{" "}
          <span className="font-semibold text-foreground">
            {session.currentIndex + 1}
          </span>{" "}
          of {questions.length} · {answeredCount} answered ·{" "}
          {session.flagged.length} flagged
        </div>
        {remaining !== null ? (
          <div
            className={cn(
              "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-semibold tabular-nums",
              remaining < 300 ? "bg-red-100 text-red-800" : "bg-slate-100",
            )}
            role="timer"
            aria-label="Time remaining"
          >
            <Clock className="h-4 w-4" aria-hidden />
            {formatDuration(remaining)}
          </div>
        ) : (
          <div className="text-sm text-muted">Untimed</div>
        )}
      </div>

      <Card>
        <QuestionView
          question={question}
          selected={session.answers[question.id] ?? []}
          onSelectionChange={(sel) =>
            persist({
              ...session,
              answers: { ...session.answers, [question.id]: sel },
            })
          }
          showActions={false}
        />
      </Card>

      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() =>
            persist({
              ...session,
              currentIndex: Math.max(0, session.currentIndex - 1),
            })
          }
          disabled={session.currentIndex === 0}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-sm font-medium disabled:opacity-40"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden /> Previous
        </button>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() =>
              persist({
                ...session,
                flagged: session.flagged.includes(question.id)
                  ? session.flagged.filter((f) => f !== question.id)
                  : [...session.flagged, question.id],
              })
            }
            aria-pressed={session.flagged.includes(question.id)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-lg border px-4 py-2 text-sm font-medium",
              session.flagged.includes(question.id)
                ? "border-amber-400 bg-amber-50 text-amber-800"
                : "border-border",
            )}
          >
            <Flag className="h-4 w-4" aria-hidden />
            {session.flagged.includes(question.id)
              ? "Flagged"
              : "Flag for review"}
          </button>
          {session.currentIndex === questions.length - 1 ? (
            <button
              type="button"
              onClick={finish}
              className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-blue-800"
            >
              <Send className="h-4 w-4" aria-hidden /> Submit exam
            </button>
          ) : (
            <button
              type="button"
              onClick={() =>
                persist({
                  ...session,
                  currentIndex: Math.min(
                    questions.length - 1,
                    session.currentIndex + 1,
                  ),
                })
              }
              className="inline-flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-sm font-medium"
            >
              Next <ArrowRight className="h-4 w-4" aria-hidden />
            </button>
          )}
        </div>
      </div>

      <Card>
        <p className="mb-3 text-sm font-medium">All questions</p>
        <div className="flex flex-wrap gap-1.5">
          {questions.map((q, i) => {
            const answered = (session.answers[q.id] ?? []).length > 0;
            const flagged = session.flagged.includes(q.id);
            return (
              <button
                key={q.id}
                type="button"
                onClick={() => persist({ ...session, currentIndex: i })}
                aria-label={`Question ${i + 1}${answered ? ", answered" : ""}${flagged ? ", flagged" : ""}`}
                aria-current={i === session.currentIndex ? "true" : undefined}
                className={cn(
                  "relative h-9 w-9 rounded-md border text-xs font-medium",
                  i === session.currentIndex
                    ? "border-accent bg-accent text-white"
                    : answered
                      ? "border-accent/50 bg-accent-soft text-accent"
                      : "border-border text-muted",
                )}
              >
                {i + 1}
                {flagged ? (
                  <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-amber-400" />
                ) : null}
              </button>
            );
          })}
        </div>
        <button
          type="button"
          onClick={finish}
          className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-blue-800"
        >
          <Send className="h-4 w-4" aria-hidden /> Submit exam now
        </button>
      </Card>
    </div>
  );
}
