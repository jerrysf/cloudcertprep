import type { DomainId } from "./schema";
import {
  ALL_DOMAINS,
  getCertification,
  type CertDomain,
} from "./certifications";

export type ExamDomain = CertDomain;

/**
 * SAA-C03 is the flagship certification; its exam metadata and domain list are
 * re-exported here for the SAA-focused pages (mock exam, homepage, study plan).
 * Verified against the official SAA-C03 exam guide — re-verify before every
 * content update (docs/exam-verification.md).
 */
export const SAA = getCertification("saa-c03")!;

export const EXAM = {
  code: SAA.code,
  name: SAA.name,
  questionCount: SAA.questionCount,
  durationMinutes: SAA.durationMinutes,
  costUsd: SAA.costUsd,
  passingScaledScore: SAA.passingScaledScore,
  scaledScoreRange: SAA.scaledScoreRange,
  examGuideUrl: SAA.examGuideUrl,
};

export const DOMAINS: ExamDomain[] = SAA.domains;

/** Look up a domain by id across ALL certifications (ids are globally unique). */
export function getDomain(id: DomainId): ExamDomain {
  const domain = ALL_DOMAINS.find((d) => d.id === id);
  if (!domain) throw new Error(`Unknown domain: ${id}`);
  return domain;
}
