import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, ExternalLink, XCircle } from "lucide-react";
import { PUBLISHED_QUESTIONS } from "@/lib/content/questions";
import { getDomain } from "@/lib/content/domains";
import { getCertification } from "@/lib/content/certifications";
import { getTopic } from "@/lib/content/topics";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { cn } from "@/lib/utils";
import { Badge, Breadcrumbs, Card, Container } from "@/components/ui";
import { AffiliateBlock } from "@/components/affiliate-note";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return PUBLISHED_QUESTIONS.map((q) => ({ slug: q.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const q = PUBLISHED_QUESTIONS.find((x) => x.slug === slug);
  if (!q) return {};
  const topic = getTopic(q.topic);
  return {
    title: `${q.question.slice(0, 60)}${q.question.length > 60 ? "…" : ""}`,
    description: `SAA-C03 practice question on ${topic?.name ?? q.topic}: see the scenario, the correct answer, and why each option is right or wrong — with official AWS documentation.`,
    alternates: { canonical: `/questions/${slug}` },
  };
}

export default async function QuestionPage({ params }: Props) {
  const { slug } = await params;
  const q = PUBLISHED_QUESTIONS.find((x) => x.slug === slug);
  if (!q) notFound();
  const domain = getDomain(q.domain);
  const topic = getTopic(q.topic);
  const cert = getCertification(q.cert)!;
  const siblings = PUBLISHED_QUESTIONS.filter(
    (x) => x.topic === q.topic && x.id !== q.id,
  ).slice(0, 4);
  const idx = PUBLISHED_QUESTIONS.indexOf(q);
  const related = PUBLISHED_QUESTIONS.filter(
    (x) => x.domain === q.domain && x.id !== q.id && x.topic !== q.topic,
  ).slice(0, 4);

  const crumbs = [
    { label: cert.code, href: `/certifications/${cert.id}` },
    ...(topic ? [{ label: topic.name, href: `/practice/${topic.slug}` }] : []),
    { label: `Question` },
  ];
  const jsonLd = breadcrumbJsonLd(crumbs);

  return (
    <Container className="py-10">
      <Breadcrumbs
        items={crumbs.map((c) =>
          "href" in c && c.href ? { label: c.label, href: c.href } : { label: c.label },
        )}
      />
      <div className="mt-4 grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
        <article className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <Link href={`/certifications/${cert.id}`}>
              <Badge tone="accent">{cert.code}</Badge>
            </Link>
            <Badge>
              Domain {domain.number}: {domain.name}
            </Badge>
            {topic ? <Badge>{topic.name}</Badge> : null}
            <Badge>{q.difficulty}</Badge>
            <Badge>
              {q.format === "multiple-response"
                ? "Multiple response"
                : "Single choice"}
            </Badge>
          </div>

          <h1 className="mt-4 text-2xl font-bold leading-snug tracking-tight">
            {q.question}
          </h1>
          {q.format === "multiple-response" ? (
            <p className="mt-2 text-sm text-muted">
              Choose {q.correctAnswers.length} answers.
            </p>
          ) : null}

          <div className="mt-6 space-y-3">
            {q.options.map((opt) => {
              const correct = q.correctAnswers.includes(opt.id);
              return (
                <div
                  key={opt.id}
                  className={cn(
                    "flex items-start gap-3 rounded-lg border p-4",
                    correct
                      ? "border-green-400 bg-green-50"
                      : "border-border bg-white",
                  )}
                >
                  {correct ? (
                    <CheckCircle2
                      className="mt-0.5 h-5 w-5 shrink-0 text-success"
                      aria-label="Correct answer"
                    />
                  ) : (
                    <XCircle
                      className="mt-0.5 h-5 w-5 shrink-0 text-slate-300"
                      aria-label="Incorrect option"
                    />
                  )}
                  <div>
                    <p className="text-sm font-medium leading-relaxed">
                      <span className="mr-1.5 font-semibold">{opt.id}.</span>
                      {opt.text}
                    </p>
                    <p className="mt-1 text-sm text-muted">
                      {q.optionExplanations[opt.id]}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <Card className="mt-8 border-accent/40 bg-accent-soft">
            <h2 className="font-semibold">Why this answer</h2>
            <p className="mt-2 text-sm leading-relaxed">{q.explanation}</p>
            <p className="mt-3 text-xs text-muted">
              Correct answer{q.correctAnswers.length > 1 ? "s" : ""}:{" "}
              {q.correctAnswers.join(", ")} · Last reviewed {q.lastReviewed}
            </p>
          </Card>

          <div className="mt-6">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
              Official AWS references
            </h2>
            <ul className="mt-2 space-y-1.5">
              {q.references.map((r) => (
                <li key={r.url}>
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-accent hover:underline"
                  >
                    {r.title}
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {topic ? (
            <div className="mt-10 rounded-xl border border-border bg-card p-6">
              <p className="font-semibold">Practice this interactively</p>
              <p className="mt-1 text-sm text-muted">
                Answer without seeing the solution first in the {topic.name}{" "}
                practice session.
              </p>
              <Link
                href={`/practice/${topic.slug}`}
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-blue-800"
              >
                Practice {topic.name}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          ) : null}
        </article>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          {siblings.length > 0 ? (
            <Card>
              <h2 className="text-sm font-semibold">
                More {topic?.name ?? "topic"} questions
              </h2>
              <ul className="mt-3 space-y-2.5">
                {siblings.map((s) => (
                  <li key={s.id}>
                    <Link
                      href={`/questions/${s.slug}`}
                      className="line-clamp-2 text-sm text-muted hover:text-accent"
                    >
                      {s.question}
                    </Link>
                  </li>
                ))}
              </ul>
            </Card>
          ) : null}
          {related.length > 0 ? (
            <Card>
              <h2 className="text-sm font-semibold">Related questions</h2>
              <ul className="mt-3 space-y-2.5">
                {related.map((s) => (
                  <li key={s.id}>
                    <Link
                      href={`/questions/${s.slug}`}
                      className="line-clamp-2 text-sm text-muted hover:text-accent"
                    >
                      {s.question}
                    </Link>
                  </li>
                ))}
              </ul>
            </Card>
          ) : null}
          <Card>
            <p className="text-xs text-muted">Question #{idx + 1} of{" "}
            {PUBLISHED_QUESTIONS.length} reviewed questions</p>
          </Card>
          <AffiliateBlock context="article" />
        </aside>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </Container>
  );
}
