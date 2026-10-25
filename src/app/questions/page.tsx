import type { Metadata } from "next";
import Link from "next/link";
import { PUBLISHED_QUESTIONS } from "@/lib/content/questions";
import { DOMAINS, getDomain } from "@/lib/content/domains";
import { getTopic } from "@/lib/content/topics";
import { Badge, Card, Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "SAA-C03 Question Bank — All Practice Questions",
  description:
    "Browse every reviewed AWS Solutions Architect Associate (SAA-C03) practice question on CloudCertPrep, organized by exam domain and topic — with full explanations and AWS documentation.",
  alternates: { canonical: "/questions" },
};

export default function QuestionsIndexPage() {
  const byDomain = DOMAINS.map((d) => ({
    domain: d,
    questions: PUBLISHED_QUESTIONS.filter((q) => q.domain === d.id),
  })).filter((g) => g.questions.length > 0);

  return (
    <Container className="py-10">
      <h1 className="text-3xl font-bold tracking-tight">
        SAA-C03 question bank
      </h1>
      <p className="mt-3 max-w-2xl text-muted">
        {PUBLISHED_QUESTIONS.length} reviewed practice questions across all four
        official exam domains. Each question includes the scenario, the correct
        answer, and an explanation of why every option is right or wrong.
      </p>

      <div className="mt-10 space-y-10">
        {byDomain.map(({ domain, questions }) => {
          const byTopic = new Map<string, typeof questions>();
          for (const q of questions) {
            const list = byTopic.get(q.topic) ?? [];
            list.push(q);
            byTopic.set(q.topic, list);
          }
          return (
            <section key={domain.id}>
              <div className="flex flex-wrap items-baseline gap-3">
                <h2 className="text-xl font-semibold">
                  Domain {domain.number}: {domain.name}
                </h2>
                <Badge tone="accent">{domain.weight}</Badge>
                <span className="text-sm text-muted">
                  {questions.length} questions
                </span>
              </div>
              <div className="mt-4 space-y-6">
                {[...byTopic.entries()].map(([topicSlug, qs]) => {
                  const topic = getTopic(topicSlug);
                  return (
                    <Card key={topicSlug}>
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="font-medium">
                          {topic?.name ?? topicSlug}
                        </h3>
                        {topic ? (
                          <Link
                            href={`/practice/${topic.slug}`}
                            className="text-sm text-accent hover:underline"
                          >
                            Practice this topic →
                          </Link>
                        ) : null}
                      </div>
                      <ul className="mt-3 space-y-2">
                        {qs.map((q) => (
                          <li
                            key={q.id}
                            className="flex items-baseline gap-2 text-sm"
                          >
                            <Badge>{q.difficulty}</Badge>
                            <Link
                              href={`/questions/${q.slug}`}
                              className="text-muted hover:text-accent"
                            >
                              {q.question}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </Card>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </Container>
  );
}
