import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PUBLISHED_QUESTIONS } from "@/lib/content/questions";
import { TOPICS, topicsByCert } from "@/lib/content/topics";
import { publishedByTopic } from "@/lib/content/questions";
import { CERTIFICATIONS } from "@/lib/content/certifications";
import { PracticeHub } from "@/components/practice-hub";
import { Badge, Card, Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "Practice Questions — AWS Certification Practice Exams",
  description:
    "Free AWS certification practice questions with detailed explanations for every option — SAA-C03, Cloud Practitioner, AI Practitioner, and more. Filter by domain, topic, difficulty, and format.",
  alternates: { canonical: "/practice" },
};

export default function PracticePage() {
  const topicsWithQuestions = TOPICS.filter(
    (t) => publishedByTopic(t.slug).length > 0,
  );
  const byCert = CERTIFICATIONS.map((c) => ({
    cert: c,
    topics: topicsByCert(c.id).filter((t) =>
      topicsWithQuestions.includes(t),
    ),
  })).filter((g) => g.topics.length > 0);
  return (
    <Container className="py-10">
      <h1 className="text-3xl font-bold tracking-tight">Practice Questions</h1>
      <p className="mt-2 max-w-2xl text-muted">
        {PUBLISHED_QUESTIONS.length} original, reviewed questions across{" "}
        {byCert.length} certifications. Every question includes per-option
        explanations and links to official AWS documentation. Free, no account
        needed.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Practice by topic</h2>
      <div className="mt-4 space-y-8">
        {byCert.map(({ cert, topics }) => (
          <section key={cert.id}>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">
              <Link
                href={`/certifications/${cert.id}`}
                className="hover:text-accent"
              >
                {cert.code}
              </Link>{" "}
              — {cert.name.replace("AWS Certified ", "")}
            </h3>
            <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {topics.map((t) => (
                <Link
                  key={t.slug}
                  href={`/practice/${t.slug}`}
                  className="group rounded-xl border border-border bg-white p-4 transition-shadow hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{t.name}</span>
                    <span className="flex items-center gap-1 text-xs text-muted">
                      <Badge>{publishedByTopic(t.slug).length}</Badge>
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                    </span>
                  </div>
                  <p className="mt-1 line-clamp-2 text-xs text-muted">
                    {t.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>

      <h2 className="mt-10 text-xl font-semibold">Browse all questions</h2>
      <div className="mt-4">
        <PracticeHub questions={PUBLISHED_QUESTIONS} />
      </div>

      <Card className="mt-10 text-sm text-muted">
        Prefer to read first?{" "}
        <Link href="/questions" className="font-medium text-accent hover:underline">
          Browse the full question bank
        </Link>{" "}
        with answers and explanations — or{" "}
        <Link href="/mock-exam" className="font-medium text-accent hover:underline">
          take a timed mock exam
        </Link>{" "}
        for a balanced mix across domains with a full results breakdown.
      </Card>
    </Container>
  );
}
