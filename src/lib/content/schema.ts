import { z } from "zod";

/**
 * Domain ids are defined per certification in certifications.ts and are
 * globally unique across certs (e.g. "design-secure-architectures" for
 * SAA-C03, "clf-cloud-concepts" for CLF-C02).
 */
export const domainSchema = z.string().min(1);
export type DomainId = string;

export const CERTIFICATION_IDS = [
  "saa-c03",
  "clf-c02",
  "aif-c01",
  "dva-c02",
  "soa-c03",
  "dea-c01",
  "scs-c02",
  "ans-c01",
  "sap-c02",
] as const;

export const certificationSchema = z.enum(CERTIFICATION_IDS);
export type CertificationId = z.infer<typeof certificationSchema>;

export const difficultySchema = z.enum(["easy", "medium", "hard"]);
export type Difficulty = z.infer<typeof difficultySchema>;

export const questionFormatSchema = z.enum([
  "single-choice",
  "multiple-response",
]);
export type QuestionFormat = z.infer<typeof questionFormatSchema>;

export const reviewStatusSchema = z.enum([
  "draft",
  "reviewed",
  "published",
  "retired",
]);
export type ReviewStatus = z.infer<typeof reviewStatusSchema>;

const optionSchema = z.object({
  id: z.string().regex(/^[A-E]$/, "Option ids must be A-E"),
  text: z.string().min(1),
});

const referenceSchema = z.object({
  title: z.string().min(1),
  url: z.url().startsWith("https://"),
});

export const questionSchema = z
  .object({
    id: z
      .string()
      .regex(
        /^[a-z]{2,4}-[a-z0-9]+(?:-[a-z0-9]+)*$/i,
        "ids look like saa-sec-001",
      ),
    slug: z
      .string()
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "kebab-case slug"),
    cert: certificationSchema,
    domain: domainSchema,
    topic: z.string().min(1),
    subtopic: z.string().optional(),
    difficulty: difficultySchema,
    format: questionFormatSchema,
    question: z.string().min(20),
    options: z.array(optionSchema).min(4).max(6),
    correctAnswers: z.array(z.string()).min(1),
    explanation: z.string().min(40),
    optionExplanations: z.record(z.string(), z.string().min(10)),
    services: z.array(z.string()).min(1),
    references: z.array(referenceSchema).min(1),
    estimatedMinutes: z.number().int().min(1).max(10),
    reviewStatus: reviewStatusSchema,
    lastReviewed: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  })
  .superRefine((q, ctx) => {
    const optionIds = new Set(q.options.map((o) => o.id));
    if (optionIds.size !== q.options.length) {
      ctx.addIssue({ code: "custom", message: "duplicate option ids" });
    }
    for (const ans of q.correctAnswers) {
      if (!optionIds.has(ans)) {
        ctx.addIssue({
          code: "custom",
          message: `correctAnswer ${ans} has no matching option`,
        });
      }
    }
    for (const key of Object.keys(q.optionExplanations)) {
      if (!optionIds.has(key)) {
        ctx.addIssue({
          code: "custom",
          message: `optionExplanations key ${key} has no matching option`,
        });
      }
    }
    for (const opt of q.options) {
      if (!q.optionExplanations[opt.id]) {
        ctx.addIssue({
          code: "custom",
          message: `missing explanation for option ${opt.id}`,
        });
      }
    }
    if (q.format === "single-choice" && q.correctAnswers.length !== 1) {
      ctx.addIssue({
        code: "custom",
        message: "single-choice questions must have exactly one correct answer",
      });
    }
    if (q.format === "multiple-response" && q.correctAnswers.length < 2) {
      ctx.addIssue({
        code: "custom",
        message: "multiple-response questions need at least two correct answers",
      });
    }
  });

export type Question = z.infer<typeof questionSchema>;
export type QuestionOption = z.infer<typeof optionSchema>;
export type QuestionReference = z.infer<typeof referenceSchema>;

/** Validate a bank of questions for cross-question invariants. */
export function validateQuestionBank(questions: Question[]): string[] {
  const errors: string[] = [];
  const ids = new Set<string>();
  const slugs = new Set<string>();
  for (const q of questions) {
    const parsed = questionSchema.safeParse(q);
    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        errors.push(`${q.id ?? "unknown"}: ${issue.message}`);
      }
      continue;
    }
    if (ids.has(q.id)) errors.push(`duplicate question id: ${q.id}`);
    if (slugs.has(q.slug)) errors.push(`duplicate question slug: ${q.slug}`);
    ids.add(q.id);
    slugs.add(q.slug);
  }
  return errors;
}
