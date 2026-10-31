import type { Metadata } from "next";
import Link from "next/link";
import { PUBLISHED_QUESTIONS } from "@/lib/content/questions";
import { CERTIFICATIONS } from "@/lib/content/certifications";
import { getDomain } from "@/lib/content/domains";
import { getTopic } from "@/lib/content/topics";
import { Badge, Card, Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "AWS Certification Question Bank — All Practice Questions",
  description:
    "Browse every reviewed AWS certification practice question on CloudCertPrep — SAA-C03, Cloud Practitioner, AI Practitioner, and more — organized by certification, domain, and topic.",
  alternates: { canonical: "/questions" },
};

export default function QuestionsIndexPage() {
  const byCert = CERTIFICATIONS.map((c) => ({
    cert: c,
    questions: PUBLISHED_QUESTIONS.filter((q) => q.cert === c.id),
  })).filter((g) => g.questions.length > 0);

  return (
    <Container className="py-10">
      <h1 className="text-3xl font-bold tracking-tight">
        AWS certification question bank
      </h1>
      <p className="mt-3 max-w-2xl text-muted">
        {PUBLISHED_QUESTIONS.length} reviewed practice questions across{" "}
        {byCert.length} certifications. Each question includes the scenario,
        the correct answer, and an explanation of why every option is right or
        wrong.
      </p>

      <div className="mt-10 space-y-12">
        {byCert.map(({ cert, questions }) => {
          const byDomain = new Map<string, typeof questions>();
          for (const q of questions) {
            const list = byDomain.get(q.domain) ?? [];
            list.push(q);
            byDomain.set(q.domain, list);
          }
          return (
            <section key={cert.id} id={cert.id}>
              <div className="flex flex-wrap items-baseline gap-3">
                <h2 className="text-xl font-semibold">
                  <Link
                    href={`/certifications/${cert.id}`}
                    className="hover:text-accent"
                  >
                    {cert.code}
                  </Link>
                </h2>
                <span className="text-sm text-muted">
                  {cert.name.replace("AWS Certified ", "")}
                </span>
                <Badge tone="accent">{questions.length} questions</Badge>
              </div>
              <div className="mt-4 space-y-6">
                {[...byDomain.entries()].map(([domainId, domainQs]) => {
                  const domain = getDomain(domainId);
                  const byTopic = new Map<string, typeof domainQs>();
                  for (const q of domainQs) {
                    const list = byTopic.get(q.topic) ?? [];
                    list.push(q);
                    byTopic.set(q.topic, list);
                  }
                  return (
                    <div key={domainId}>
                      <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">
                        Domain {domain.number}: {domain.name} ({domain.weight}%)
                      </h3>
                      <div className="mt-3 space-y-4">
                        {[...byTopic.entries()].map(([topicSlug, qs]) => {
                          const topic = getTopic(topicSlug);
                          return (
                            <Card key={topicSlug}>
                              <div className="flex flex-wrap items-center justify-between gap-2">
                                <h4 className="font-medium">
                                  {topic?.name ?? topicSlug}
                                </h4>
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
                    </div>
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
