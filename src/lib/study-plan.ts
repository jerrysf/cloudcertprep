import { DOMAINS } from "@/lib/content/domains";
import type { DomainId } from "@/lib/content/schema";

export interface StudyPlanInput {
  experience: "beginner" | "some-it" | "aws-hands-on";
  hoursPerWeek: number;
  targetDate: string; // YYYY-MM-DD
  weakTopics: string[]; // topic slugs
}

export interface StudyWeek {
  week: number;
  start: string;
  end: string;
  focus: string;
  tasks: string[];
  checkpoint: boolean;
}

export interface StudyPlan {
  weeks: StudyWeek[];
  totalWeeks: number;
  finalReviewWeek: boolean;
  notes: string[];
}

/** Round target date to whole study weeks starting next Monday. */
export function generateStudyPlan(
  input: StudyPlanInput,
  today = new Date(),
): StudyPlan {
  const target = new Date(input.targetDate + "T00:00:00Z");
  const start = new Date(
    Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()),
  );
  const msPerWeek = 7 * 24 * 60 * 60 * 1000;
  let totalWeeks = Math.max(
    1,
    Math.ceil((target.getTime() - start.getTime()) / msPerWeek),
  );
  const notes: string[] = [];
  if (totalWeeks > 12) {
    totalWeeks = 12;
    notes.push(
      "Plans are capped at 12 weeks — extend by repeating weak-domain cycles.",
    );
  }
  const needsFoundation = input.experience === "beginner";
  const domainCycle: { domain: DomainId; label: string }[] = [
    { domain: "design-secure-architectures", label: "Design Secure Architectures" },
    {
      domain: "design-resilient-architectures",
      label: "Design Resilient Architectures",
    },
    {
      domain: "design-high-performing-architectures",
      label: "Design High-Performing Architectures",
    },
    {
      domain: "design-cost-optimized-architectures",
      label: "Design Cost-Optimized Architectures",
    },
  ];
  const weeks: StudyWeek[] = [];
  const hasFinalReview = totalWeeks >= 2;
  const studyWeeks = hasFinalReview ? totalWeeks - 1 : totalWeeks;
  for (let w = 0; w < totalWeeks; w++) {
    const weekStart = new Date(start.getTime() + w * msPerWeek);
    const weekEnd = new Date(weekStart.getTime() + 6 * 24 * 60 * 60 * 1000);
    const iso = (d: Date) => d.toISOString().slice(0, 10);
    const isLast = w === totalWeeks - 1;
    if (isLast && hasFinalReview) {
      weeks.push({
        week: w + 1,
        start: iso(weekStart),
        end: iso(weekEnd),
        focus: "Final review and exam logistics",
        checkpoint: true,
        tasks: [
          "Take a full timed mock exam and review every incorrect answer",
          "Re-attempt all bookmarked and previously missed questions",
          "Review your flashcards marked 'still learning'",
          "Confirm exam registration, ID requirements, and testing setup",
        ],
      });
      continue;
    }
    const tasks: string[] = [];
    let focus: string;
    if (w === 0 && needsFoundation) {
      focus = "AWS fundamentals and core services";
      tasks.push(
        "Learn core services: IAM, EC2, S3, VPC, RDS, Lambda, CloudWatch",
        "Read the overview of the four exam domains",
        `Complete 10–15 easy practice questions (${input.hoursPerWeek}h/week pace)`,
      );
    } else {
      const idx = needsFoundation ? w - 1 : w;
      const dc = domainCycle[Math.min(idx, domainCycle.length - 1)];
      const domain = DOMAINS.find((d) => d.id === dc.domain)!;
      focus = `${dc.label} (${domain.weight}% of exam)`;
      tasks.push(
        `Study the key services and patterns in ${dc.label}`,
        "Complete the topic practice sets for this domain",
        "Mark difficult questions and read every explanation",
      );
      if (idx >= domainCycle.length) {
        focus = "Weak-area reinforcement";
        tasks.unshift(
          "Revisit your weakest topics from the progress dashboard",
        );
      }
    }
    for (const slug of input.weakTopics) {
      if (w === 0 || w === Math.floor(studyWeeks / 2)) {
        tasks.push(`Extra review: ${slug.replace(/-/g, " ")}`);
      }
    }
    const checkpoint = (w + 1) % 3 === 0;
    if (checkpoint) {
      tasks.push("Checkpoint: take a 15-question timed quiz on this domain");
    }
    weeks.push({
      week: w + 1,
      start: iso(weekStart),
      end: iso(weekEnd),
      focus,
      tasks,
      checkpoint,
    });
  }
  return { weeks, totalWeeks, finalReviewWeek: hasFinalReview, notes };
}
