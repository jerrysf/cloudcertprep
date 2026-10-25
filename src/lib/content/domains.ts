import type { DomainId } from "./schema";

export interface ExamDomain {
  id: DomainId;
  number: number;
  name: string;
  weight: number; // percentage of scored content
  summary: string;
  taskStatements: string[];
}

/**
 * Verified against the official AWS Certified Solutions Architect - Associate
 * (SAA-C03) exam guide (aws.amazon.com/certification/certified-solutions-architect-associate).
 * Re-verify before every content update — see docs/exam-verification.md.
 */
export const EXAM = {
  code: "SAA-C03",
  name: "AWS Certified Solutions Architect – Associate",
  questionCount: 65,
  durationMinutes: 130,
  costUsd: 150,
  passingScaledScore: 720,
  scaledScoreRange: [100, 1000] as const,
  examGuideUrl:
    "https://aws.amazon.com/certification/certified-solutions-architect-associate/",
};

export const DOMAINS: ExamDomain[] = [
  {
    id: "design-secure-architectures",
    number: 1,
    name: "Design Secure Architectures",
    weight: 30,
    summary:
      "Design secure access to AWS resources, secure workloads and applications, and apply appropriate data security controls.",
    taskStatements: [
      "Design secure access to AWS resources",
      "Design secure workloads and applications",
      "Determine appropriate data security controls",
    ],
  },
  {
    id: "design-resilient-architectures",
    number: 2,
    name: "Design Resilient Architectures",
    weight: 26,
    summary:
      "Design scalable, loosely coupled, highly available, and fault-tolerant architectures with appropriate disaster recovery.",
    taskStatements: [
      "Design scalable and loosely coupled architectures",
      "Design highly available and/or fault-tolerant architectures",
      "Design multi-tier architectures",
      "Choose appropriate disaster recovery (DR) solutions",
    ],
  },
  {
    id: "design-high-performing-architectures",
    number: 3,
    name: "Design High-Performing Architectures",
    weight: 24,
    summary:
      "Choose high-performing compute, storage, database, and network solutions that scale with workload demand.",
    taskStatements: [
      "Determine high-performing and/or scalable storage solutions",
      "Design high-performing and elastic compute solutions",
      "Determine high-performing database solutions",
      "Determine high-performing and/or scalable network architectures",
      "Determine high-performing data ingestion and transformation solutions",
    ],
  },
  {
    id: "design-cost-optimized-architectures",
    number: 4,
    name: "Design Cost-Optimized Architectures",
    weight: 20,
    summary:
      "Design cost-optimized storage, compute, database, and network architectures for workload requirements.",
    taskStatements: [
      "Design cost-optimized storage solutions",
      "Design cost-optimized compute solutions",
      "Design cost-optimized database solutions",
      "Design cost-optimized network architectures",
    ],
  },
];

export function getDomain(id: DomainId): ExamDomain {
  const domain = DOMAINS.find((d) => d.id === id);
  if (!domain) throw new Error(`Unknown domain: ${id}`);
  return domain;
}
