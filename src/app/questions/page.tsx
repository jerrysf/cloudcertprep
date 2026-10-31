import type { Metadata } from "next";
import { PUBLISHED_QUESTIONS } from "@/lib/content/questions";
import { CERTIFICATIONS } from "@/lib/content/certifications";
import { getDomain } from "@/lib/content/domains";
import { getTopic } from "@/lib/content/topics";
import { Container } from "@/components/ui";
import {
  QuestionBankBrowser,
  type BankCertGroup,
} from "@/components/question-bank";

export const metadata: Metadata = {
  title: "AWS Certification Question Bank — All Practice Questions",
  description:
    "Browse every reviewed AWS certification practice question on CloudCertPrep — SAA-C03, Cloud Practitioner, AI Practitioner, and more — organized by certification, domain, and topic.",
  alternates: { canonical: "/questions" },
};

export default function QuestionsIndexPage() {
  const groups: BankCertGroup[] = CERTIFICATIONS.map((c) => {
    const questions = PUBLISHED_QUESTIONS.filter((q) => q.cert === c.id);
    const byDomain = new Map<string, typeof questions>();
    for (const q of questions) {
      const list = byDomain.get(q.domain) ?? [];
      list.push(q);
      byDomain.set(q.domain, list);
    }
    const domains = [...byDomain.entries()].map(([domainId, qs]) => {
      const domain = getDomain(domainId);
      const byTopic = new Map<string, typeof qs>();
      for (const q of qs) {
        const list = byTopic.get(q.topic) ?? [];
        list.push(q);
        byTopic.set(q.topic, list);
      }
      return {
        id: domainId,
        number: domain.number,
        name: domain.name,
        weight: domain.weight,
        topics: [...byTopic.entries()].map(([slug, tqs]) => ({
          slug,
          name: getTopic(slug)?.name ?? slug,
          questions: tqs.map((q) => ({
            id: q.id,
            slug: q.slug,
            difficulty: q.difficulty,
            text: q.question,
          })),
        })),
      };
    });
    return {
      certId: c.id,
      code: c.code,
      name: c.name.replace("AWS Certified ", ""),
      domains,
      count: questions.length,
    };
  }).filter((g) => g.count > 0);

  return (
    <Container className="py-10">
      <h1 className="text-3xl font-bold tracking-tight">
        AWS certification question bank
      </h1>
      <p className="mt-3 max-w-2xl text-muted">
        {PUBLISHED_QUESTIONS.length} reviewed practice questions across{" "}
        {groups.length} certifications. Search and filter the bank, or open any
        question to see the correct answer and per-option explanations.
      </p>

      <QuestionBankBrowser
        groups={groups}
        total={PUBLISHED_QUESTIONS.length}
      />
    </Container>
  );
}
