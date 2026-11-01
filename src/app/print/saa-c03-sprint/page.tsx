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
  title: "SAA-C03 Sprint Pack — Print",
  robots: { index: false, follow: false },
};

const WEEKS: SprintPlanWeek[] = [
  {
    week: "Week 1",
    focus: "Compute, storage & networking foundations",
    tasks: [
      "EC2 placement/instance types, EBS vs instance store vs EFS, S3 storage classes and lifecycle rules",
      "VPC fundamentals: subnets, route tables, NAT, security groups vs NACLs",
      "Learn the ALB/NLB/GLB distinction and Route 53 routing policies",
      "Drill the compute/storage/networking topic sets — log every miss for week 4",
    ],
  },
  {
    week: "Week 2",
    focus: "Databases & decoupling",
    tasks: [
      "RDS vs Aurora vs DynamoDB vs ElastiCache — and when read replicas vs caching is the answer",
      "SQS vs SNS vs EventBridge vs Kinesis — the decoupling decision tree is the exam's favorite",
      "Practice multi-AZ and multi-region database scenarios",
      "First timed mock exam at week's end — note the domains where you score under 70%",
    ],
  },
  {
    week: "Week 3",
    focus: "Security, resilience & cost",
    tasks: [
      "IAM deep-dive: roles vs users vs policies, KMS envelope encryption, Secrets Manager vs Parameter Store",
      "HA patterns: health checks, auto scaling policies, backup vs pilot-light vs warm-standby DR",
      "Cost levers: Savings Plans vs RIs vs Spot, storage tiering, transfer costs",
      "Drill your weak domains from the week-2 mock — 80% of exam value lives in scenario judgment",
    ],
  },
  {
    week: "Week 4",
    focus: "Mock exams & polish",
    tasks: [
      "Two full timed mock exams — review EVERY explanation, including questions you got right by guessing",
      "Re-attempt your mistake queue until it's empty",
      "Skim the cheat sheet daily; rewrite the decision rules from memory once",
      "Final 48 hours: light review only — sleep and logistics beat cramming",
    ],
  },
];

const CHECKLIST = [
  "Confirm booking details and required ID — names must match exactly",
  "Online proctored? Run the Pearson VUE system test a day early; test centers: arrive 15 min early",
  "You get 130 minutes for 65 questions — pace at ~2 min/question and flag generously",
  "Scenario questions: identify the constraint keywords first — 'most cost-effective', 'least operational overhead', 'highest availability' change the answer",
  "Eliminate wrong options before choosing — most questions have two obviously wrong answers",
  "Multi-answer questions tell you how many to select — partial credit doesn't exist",
  "Never leave blanks — unanswered = guaranteed wrong",
];

export default function SaaSprintPrint() {
  const cert = getCertification("saa-c03");
  const cheatSheet = getArticle("saa-c03-cheat-sheet");
  if (!cert || !cheatSheet) notFound();
  const byDomain = cert.domains.map((d) =>
    publishedByCert(cert.id).filter((q) => q.domain === d.id).slice(0, 3),
  );
  const drill = byDomain.flat().slice(0, 12);
  return (
    <SprintPack
      cert={cert}
      planTitle="Four-week sprint plan"
      planIntro="SAA-C03 is scenario judgment, not trivia: the exam hands you a requirement set and asks which architecture fits best. Four weeks at 5–7 hours a week works for someone with IT fundamentals — weight your time by the domain percentages and spend the last week almost entirely on mock exams."
      weeks={WEEKS}
      cheatSheet={cheatSheet}
      drill={drill}
      checklist={CHECKLIST}
    />
  );
}
