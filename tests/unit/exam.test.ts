import { describe, expect, it } from "vitest";
import {
  createExamSession,
  domainStats,
  evaluateAnswer,
  isExpired,
  scoreExam,
  secondsRemaining,
  selectExamQuestions,
} from "@/lib/exam";
import { PUBLISHED_QUESTIONS } from "@/lib/content/questions";
import type { Question } from "@/lib/content/schema";

const singleQ: Question = {
  id: "saa-test-001",
  slug: "test-single",
  cert: "saa-c03",
  domain: "design-secure-architectures",
  topic: "iam-and-access-control",
  difficulty: "easy",
  format: "single-choice",
  question: "Which option is correct for this test question scenario?",
  options: [
    { id: "A", text: "Right" },
    { id: "B", text: "Wrong 1" },
    { id: "C", text: "Wrong 2" },
    { id: "D", text: "Wrong 3" },
  ],
  correctAnswers: ["A"],
  explanation: "A is correct because this is a deliberately written test explanation.",
  optionExplanations: {
    A: "Correct option explanation here.",
    B: "Wrong option explanation here.",
    C: "Wrong option explanation here.",
    D: "Wrong option explanation here.",
  },
  services: ["AWS IAM"],
  references: [{ title: "IAM", url: "https://docs.aws.amazon.com/IAM/" }],
  estimatedMinutes: 1,
  reviewStatus: "published",
  lastReviewed: "2026-10-25",
};

const multiQ: Question = {
  ...singleQ,
  id: "saa-test-002",
  slug: "test-multi",
  format: "multiple-response",
  correctAnswers: ["A", "C"],
};

describe("evaluateAnswer", () => {
  it("accepts the exact correct answer for single-choice", () => {
    expect(evaluateAnswer(singleQ, ["A"])).toBe(true);
  });

  it("rejects wrong single-choice answers", () => {
    expect(evaluateAnswer(singleQ, ["B"])).toBe(false);
    expect(evaluateAnswer(singleQ, [])).toBe(false);
    expect(evaluateAnswer(singleQ, ["A", "B"])).toBe(false);
  });

  it("requires the exact answer set for multiple-response", () => {
    expect(evaluateAnswer(multiQ, ["A", "C"])).toBe(true);
    expect(evaluateAnswer(multiQ, ["C", "A"])).toBe(true); // order irrelevant
    expect(evaluateAnswer(multiQ, ["A"])).toBe(false); // partial credit: none
    expect(evaluateAnswer(multiQ, ["A", "C", "D"])).toBe(false); // extras fail
    expect(evaluateAnswer(multiQ, ["B", "D"])).toBe(false);
    expect(evaluateAnswer(multiQ, [])).toBe(false);
  });
});

describe("timer math", () => {
  it("computes remaining seconds", () => {
    expect(secondsRemaining(0, 600, 100_000)).toBe(500);
    expect(secondsRemaining(0, 600, 0)).toBe(600);
    expect(secondsRemaining(0, 600, 601_000)).toBe(0); // clamps at 0
  });

  it("detects expiration exactly at zero", () => {
    expect(isExpired(0, 600, 600_000)).toBe(true);
    expect(isExpired(0, 600, 599_999)).toBe(false);
  });
});

describe("scoreExam", () => {
  const bank = [singleQ, multiQ];

  it("counts correct and answered, computes percent", () => {
    const r = scoreExam(bank, { "saa-test-001": ["A"], "saa-test-002": ["A", "C"] });
    expect(r.correct).toBe(2);
    expect(r.answered).toBe(2);
    expect(r.total).toBe(2);
    expect(r.scorePercent).toBe(100);
  });

  it("unanswered questions are not correct", () => {
    const r = scoreExam(bank, { "saa-test-001": ["B"] });
    expect(r.correct).toBe(0);
    expect(r.answered).toBe(1);
    expect(r.scorePercent).toBe(0);
  });

  it("handles an empty exam", () => {
    const r = scoreExam([], {});
    expect(r.scorePercent).toBe(0);
    expect(r.total).toBe(0);
  });
});

describe("domainStats", () => {
  it("buckets correct/incorrect/unanswered per domain", () => {
    const stats = domainStats(
      [singleQ, multiQ],
      { "saa-test-001": ["A"], "saa-test-002": ["B"] },
    );
    expect(stats).toHaveLength(1);
    const s = stats[0];
    expect(s.total).toBe(2);
    expect(s.correct).toBe(1);
    expect(s.incorrect).toBe(1);
    expect(s.unanswered).toBe(0);
  });
});

describe("selectExamQuestions", () => {
  it("returns the requested count when the bank is large enough", () => {
    const picked = selectExamQuestions(PUBLISHED_QUESTIONS, 10, undefined, 42);
    expect(picked).toHaveLength(10);
    expect(new Set(picked.map((q) => q.id)).size).toBe(10);
  });

  it("is deterministic for a given seed", () => {
    const a = selectExamQuestions(PUBLISHED_QUESTIONS, 10, undefined, 7).map((q) => q.id);
    const b = selectExamQuestions(PUBLISHED_QUESTIONS, 10, undefined, 7).map((q) => q.id);
    expect(a).toEqual(b);
  });

  it("respects a domain filter", () => {
    const picked = selectExamQuestions(
      PUBLISHED_QUESTIONS,
      5,
      ["design-secure-architectures"],
      1,
    );
    expect(picked).toHaveLength(5);
    expect(picked.every((q) => q.domain === "design-secure-architectures")).toBe(true);
  });

  it("caps at the available pool size", () => {
    const picked = selectExamQuestions(PUBLISHED_QUESTIONS, 10_000);
    expect(picked).toHaveLength(PUBLISHED_QUESTIONS.length);
  });
});

describe("createExamSession", () => {
  it("creates a session with shuffled question ids and zeroed state", () => {
    const s = createExamSession(PUBLISHED_QUESTIONS.slice(0, 5), true, 600);
    expect(s.questionIds).toHaveLength(5);
    expect(s.timed).toBe(true);
    expect(s.durationSeconds).toBe(600);
    expect(s.answers).toEqual({});
    expect(s.flagged).toEqual([]);
    expect(s.submitted).toBe(false);
    expect(s.id).toMatch(/^exam-/);
  });
});
