import { describe, expect, it } from "vitest";
import { questionSchema, validateQuestionBank } from "@/lib/content/schema";
import {
  ALL_QUESTIONS,
  PUBLISHED_QUESTIONS,
  publishedByTopic,
} from "@/lib/content/questions";
import { TOPICS, getTopic } from "@/lib/content/topics";
import { DOMAINS } from "@/lib/content/domains";
import { ALL_DOMAINS, CERTIFICATIONS, getCertification } from "@/lib/content/certifications";
import { ARTICLES } from "@/lib/content/articles";
import { SERVICES } from "@/lib/content/services";
import { FLASHCARDS } from "@/lib/content/flashcards";

describe("question bank integrity", () => {
  it("every question passes the schema", () => {
    for (const q of ALL_QUESTIONS) {
      const r = questionSchema.safeParse(q);
      if (!r.success) {
        throw new Error(
          `${q.id} invalid: ${JSON.stringify(r.error.issues, null, 2)}`,
        );
      }
    }
  });

  it("has no cross-question invariant violations (dup ids/slugs, bad refs)", () => {
    expect(validateQuestionBank(ALL_QUESTIONS)).toEqual([]);
  });

  it("has meaningful coverage in every exam domain", () => {
    for (const d of DOMAINS) {
      const count = PUBLISHED_QUESTIONS.filter((q) => q.domain === d.id).length;
      expect(count, `${d.id} should have questions`).toBeGreaterThanOrEqual(5);
    }
  });

  it("every published question's topic exists in the registry", () => {
    for (const q of PUBLISHED_QUESTIONS) {
      expect(getTopic(q.topic), q.id).toBeDefined();
    }
  });

  it("every question's cert exists, domain matches the cert, and topic is consistent", () => {
    for (const q of PUBLISHED_QUESTIONS) {
      const cert = getCertification(q.cert);
      expect(cert, `${q.id} → unknown cert ${q.cert}`).toBeDefined();
      expect(
        cert!.domains.some((d) => d.id === q.domain),
        `${q.id} → domain ${q.domain} not in ${q.cert}`,
      ).toBe(true);
      const topic = getTopic(q.topic);
      if (topic) {
        expect(topic.cert, `${q.id} topic cert mismatch`).toBe(q.cert);
        expect(topic.domain, `${q.id} topic domain mismatch`).toBe(q.domain);
      }
    }
  });

  it("every certification registry entry has valid domain ids and weights", () => {
    const domainIds = new Set<string>();
    for (const c of CERTIFICATIONS) {
      for (const d of c.domains) {
        expect(domainIds.has(d.id), `duplicate domain id ${d.id}`).toBe(false);
        domainIds.add(d.id);
        expect(d.weight).toBeGreaterThan(0);
      }
    }
  });

  it("every topic has at least one published question", () => {
    for (const t of TOPICS) {
      expect(
        publishedByTopic(t.slug).length,
        `topic ${t.slug} has no published questions`,
      ).toBeGreaterThan(0);
    }
  });

  it("only publishes reviewed content — no drafts leak", () => {
    expect(
      PUBLISHED_QUESTIONS.every(
        (q) => q.reviewStatus === "published" || q.reviewStatus === "reviewed",
      ),
    ).toBe(true);
    expect(PUBLISHED_QUESTIONS.every((q) => q.lastReviewed)).toBe(true);
  });

  it("every question links to https AWS documentation", () => {
    for (const q of ALL_QUESTIONS) {
      for (const ref of q.references) {
        expect(ref.url.startsWith("https://"), `${q.id} → ${ref.url}`).toBe(true);
      }
    }
  });

  it("includes multiple-response questions", () => {
    expect(
      PUBLISHED_QUESTIONS.filter((q) => q.format === "multiple-response").length,
    ).toBeGreaterThanOrEqual(2);
  });
});

describe("supporting content", () => {
  it("flashcards reference real domains and topics", () => {
    for (const c of FLASHCARDS) {
      expect(ALL_DOMAINS.some((d) => d.id === c.domain), c.id).toBe(true);
      expect(getTopic(c.topic), c.id).toBeDefined();
    }
  });

  it("articles reference real topics and unique slugs", () => {
    const slugs = new Set(ARTICLES.map((a) => a.slug));
    expect(slugs.size).toBe(ARTICLES.length);
    for (const a of ARTICLES) {
      expect(getTopic(a.topic), a.slug).toBeDefined();
      expect(a.sections.length).toBeGreaterThan(1);
    }
  });

  it("service guides have unique slugs and valid related topics", () => {
    const slugs = new Set(SERVICES.map((s) => s.slug));
    expect(slugs.size).toBe(SERVICES.length);
    for (const s of SERVICES) {
      for (const t of s.relatedTopics) {
        expect(getTopic(t), `${s.slug} → ${t}`).toBeDefined();
      }
      for (const c of s.compareWith) {
        expect(
          SERVICES.some((x) => x.slug === c.slug),
          `${s.slug} compares with unknown ${c.slug}`,
        ).toBe(true);
      }
    }
  });
});
