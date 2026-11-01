import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCertification } from "@/lib/content/certifications";
import { getArticle } from "@/lib/content/articles";
import { publishedByCert } from "@/lib/content/questions";
import {
  SprintPack,
  type SprintPlanWeek,
} from "@/components/print/sprint-pack";

export const metadata: Metadata = {
  title: "CLF-C02 Sprint Pack — Print",
  robots: { index: false, follow: false },
};

const WEEKS: SprintPlanWeek[] = [
  {
    week: "Week 1",
    focus: "Cloud concepts + core services",
    tasks: [
      "Learn the six cloud advantages and the shared responsibility model cold — they're on every exam",
      "Build your service vocabulary: one line each for EC2, S3, RDS, DynamoDB, Lambda, VPC, CloudFront, IAM, CloudWatch",
      "Drill the Cloud Essentials and Core Services topic sets — aim for 80%+ before moving on",
      "Note every service you confuse (SNS vs SQS, CloudTrail vs CloudWatch) — those become your week-2 targets",
    ],
  },
  {
    week: "Week 2",
    focus: "Security, billing & final review",
    tasks: [
      "Master shared responsibility boundaries — especially for managed services like RDS",
      "Learn billing tools cold: Cost Explorer vs Budgets vs Pricing Calculator vs CUR",
      "Memorize support plan tiers (Developer / Business / Enterprise) and Trusted Advisor's five categories",
      "Take a timed mock exam, re-attempt every miss, then skim the cheat sheet the night before",
    ],
  },
];

const CHECKLIST = [
  "Confirm your exam booking — online proctoring or test center — and the start time in your timezone",
  "Two forms of ID ready (primary government photo ID + secondary), names matching your booking",
  "If testing online: run the Pearson VUE system test, clear your desk, close all apps",
  "Sleep. The exam is recognition, not recall under pressure",
  "Read each question twice — 'which service BEST fits' and 'LEAST cost' qualifiers flip answers",
  "Flag uncertain questions and return at the end — 90 minutes for 65 questions is generous",
  "Remember: no penalty for guessing. Never leave a question blank",
];

export default function ClfSprintPrint() {
  const cert = getCertification("clf-c02");
  const cheatSheet = getArticle("clf-c02-cheat-sheet");
  if (!cert || !cheatSheet) notFound();
  const byDomain = cert.domains.map((d) =>
    publishedByCert(cert.id).filter((q) => q.domain === d.id).slice(0, 3),
  );
  const drill = byDomain.flat().slice(0, 12);
  return (
    <SprintPack
      cert={cert}
      planTitle="Two-week sprint plan"
      planIntro="CLF-C02 rewards vocabulary recognition over depth. Two focused weeks at 45–60 minutes a day is enough for most people with basic IT exposure — spend week 1 on concepts and services, week 2 on security/billing and drilling."
      weeks={WEEKS}
      cheatSheet={cheatSheet}
      drill={drill}
      checklist={CHECKLIST}
    />
  );
}
