import { questionSchema, validateQuestionBank, type CertificationId, type DomainId, type Difficulty, type Question } from "../schema";
import { secureQuestions } from "./secure";
import { resilientQuestions } from "./resilient";
import { highPerformingQuestions } from "./high-performing";
import { costOptimizedQuestions } from "./cost-optimized";
import { clfQuestions } from "./clf";
import { aifQuestions } from "./aif";
import { dvaQuestions } from "./dva";
import { soaQuestions } from "./soa";
import { deaQuestions } from "./dea";
import { scsQuestions } from "./scs";
import { ansQuestions } from "./ans";
import { sapQuestions } from "./sap";

export const ALL_QUESTIONS: Question[] = [
  ...secureQuestions,
  ...resilientQuestions,
  ...highPerformingQuestions,
  ...costOptimizedQuestions,
  ...clfQuestions,
  ...aifQuestions,
  ...dvaQuestions,
  ...soaQuestions,
  ...deaQuestions,
  ...scsQuestions,
  ...ansQuestions,
  ...sapQuestions,
];

/** Parsed + cross-validated. Throws at import time if content is invalid. */
export function assertBankValid(questions: Question[] = ALL_QUESTIONS): void {
  const schemaErrors: string[] = [];
  for (const q of questions) {
    const r = questionSchema.safeParse(q);
    if (!r.success) {
      for (const i of r.error.issues) schemaErrors.push(`${q.id}: ${i.message}`);
    }
  }
  const bankErrors = validateQuestionBank(questions);
  const all = [...schemaErrors, ...bankErrors];
  if (all.length) {
    throw new Error(`Invalid question bank:\n${all.join("\n")}`);
  }
}

export const PUBLISHED_QUESTIONS = ALL_QUESTIONS.filter(
  (q) => q.reviewStatus === "published" || q.reviewStatus === "reviewed",
);

export const QUESTION_BY_ID = new Map(ALL_QUESTIONS.map((q) => [q.id, q]));

export function publishedByTopic(topicSlug: string): Question[] {
  return PUBLISHED_QUESTIONS.filter((q) => q.topic === topicSlug);
}

export function publishedByDomain(domain: DomainId): Question[] {
  return PUBLISHED_QUESTIONS.filter((q) => q.domain === domain);
}

export function publishedByDifficulty(d: Difficulty): Question[] {
  return PUBLISHED_QUESTIONS.filter((q) => q.difficulty === d);
}

export function publishedByCert(certId: CertificationId): Question[] {
  return PUBLISHED_QUESTIONS.filter((q) => q.cert === certId);
}
