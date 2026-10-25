import { describe, expect, it } from "vitest";
import { generateStudyPlan } from "@/lib/study-plan";

const base = {
  experience: "beginner" as const,
  hoursPerWeek: 6,
  weakTopics: ["iam-and-access-control"],
};

describe("generateStudyPlan", () => {
  it("produces a week-by-week plan ending before the target date", () => {
    const today = new Date("2026-10-25T00:00:00Z");
    const plan = generateStudyPlan(
      { ...base, targetDate: "2026-12-06" },
      today,
    );
    expect(plan.totalWeeks).toBe(6);
    expect(plan.weeks).toHaveLength(6);
    expect(plan.finalReviewWeek).toBe(true);
    expect(plan.weeks[plan.weeks.length - 1].focus).toContain("Final review");
  });

  it("includes a foundation week for beginners", () => {
    const plan = generateStudyPlan(
      { ...base, targetDate: "2026-12-06" },
      new Date("2026-10-25"),
    );
    expect(plan.weeks[0].focus).toContain("fundamentals");
  });

  it("skips the foundation week for experienced users", () => {
    const plan = generateStudyPlan(
      { ...base, experience: "aws-hands-on", targetDate: "2026-12-06" },
      new Date("2026-10-25"),
    );
    expect(plan.weeks[0].focus).toContain("Secure");
  });

  it("caps at 12 weeks with a note", () => {
    const plan = generateStudyPlan(
      { ...base, targetDate: "2027-10-25" },
      new Date("2026-10-25"),
    );
    expect(plan.totalWeeks).toBe(12);
    expect(plan.notes.length).toBeGreaterThan(0);
  });

  it("handles a past/near target date gracefully", () => {
    const plan = generateStudyPlan(
      { ...base, targetDate: "2026-10-26" },
      new Date("2026-10-25"),
    );
    expect(plan.totalWeeks).toBe(1);
    expect(plan.weeks).toHaveLength(1);
  });
});
