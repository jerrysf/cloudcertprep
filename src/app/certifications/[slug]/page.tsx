import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  Clock,
  DollarSign,
  ExternalLink,
  FileText,
  Target,
} from "lucide-react";
import {
  CERTIFICATIONS,
  getCertification,
} from "@/lib/content/certifications";
import { publishedByCert, publishedByTopic } from "@/lib/content/questions";
import { ARTICLES } from "@/lib/content/articles";
import { topicsByCert } from "@/lib/content/topics";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { Badge, Breadcrumbs, Card, CertLevelBadge, Container } from "@/components/ui";
import { AffiliateBlock } from "@/components/affiliate-note";
import { NewsletterForm } from "@/components/newsletter-form";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return CERTIFICATIONS.map((c) => ({ slug: c.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cert = getCertification(slug);
  if (!cert) return {};
  return {
    title: `${cert.code} Practice Questions & Exam Guide — ${cert.name.replace("AWS Certified ", "")}`,
    description: `${cert.name}: ${cert.questionCount} questions, ${cert.durationMinutes} minutes, $${cert.costUsd}. Free practice questions with explanations, domain weights, and study guidance.`,
    alternates: { canonical: `/certifications/${slug}` },
  };
}

export default async function CertificationPage({ params }: Props) {
  const { slug } = await params;
  const cert = getCertification(slug);
  if (!cert) notFound();

  const questions = publishedByCert(cert.id);
  const topics = topicsByCert(cert.id);
  const hasExamGuide = ARTICLES.some((a) => a.slug === `${cert.id}-exam-guide`);
  const topicQuestions = (topicSlug: string) =>
    publishedByTopic(topicSlug).length;

  return (
    <Container className="py-10">
      <Breadcrumbs
        items={[
          { label: "Certifications", href: "/certifications" },
          { label: cert.code },
        ]}
      />

      <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div>
          <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 p-7 text-white sm:p-9">
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="accent">{cert.code}</Badge>
              <CertLevelBadge level={cert.level} />
              {!cert.verified ? (
                <Badge tone="warning">Details pending re-verification</Badge>
              ) : null}
            </div>
            <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              {cert.name}
            </h1>
            <p className="mt-3 max-w-2xl text-slate-300">
              {cert.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/practice"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-sm transition-all hover:bg-slate-100 active:scale-[0.98]"
              >
                Start practicing free
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              {hasExamGuide ? (
                <Link
                  href={`/learn/${cert.id}-exam-guide`}
                  className="inline-flex items-center gap-2 rounded-lg border border-white/25 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-white/10 active:scale-[0.98]"
                >
                  Read the exam guide
                </Link>
              ) : null}
            </div>
            <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-white/10 pt-6 sm:grid-cols-4">
              {[
                {
                  icon: FileText,
                  label: "Exam questions",
                  value: `${cert.questionCount}`,
                },
                {
                  icon: Clock,
                  label: "Duration",
                  value: `${cert.durationMinutes} min`,
                },
                {
                  icon: DollarSign,
                  label: "Exam cost",
                  value: `$${cert.costUsd} USD`,
                },
                {
                  icon: Target,
                  label: "Passing score",
                  value: `${cert.passingScaledScore}/${cert.scaledScoreRange[1]}`,
                },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label}>
                  <dt className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Icon className="h-3.5 w-3.5" aria-hidden />
                    {label}
                  </dt>
                  <dd className="mt-1 text-lg font-bold">{value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-xs text-slate-400">
              {questions.length} reviewed practice questions live on this site ·{" "}
              <a
                href={cert.examGuideUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-slate-200 underline decoration-slate-500 underline-offset-2 hover:text-white"
              >
                Official AWS certification page
                <ExternalLink className="h-3 w-3" aria-hidden />
              </a>
            </p>
          </div>

          <h2 className="mt-10 text-xl font-semibold">
            Exam domains and weights
          </h2>
          <div className="mt-4 space-y-3">
            {cert.domains.map((d) => (
              <div
                key={d.id}
                className="rounded-xl border border-border bg-white p-4"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">
                    Domain {d.number}: {d.name}
                  </span>
                  <Badge tone="accent">{d.weight}%</Badge>
                </div>
                {d.summary ? (
                  <p className="mt-1 text-sm text-muted">{d.summary}</p>
                ) : null}
                <div className="mt-2 h-1.5 rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-accent to-blue-400"
                    style={{ width: `${d.weight}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <h2 className="mt-10 text-xl font-semibold">Practice topics</h2>
          {questions.length === 0 ? (
            <Card className="mt-4 text-sm text-muted">
              Practice questions for {cert.code} are being reviewed and will be
              published soon. In the meantime, explore the{" "}
              <Link href="/questions" className="text-accent hover:underline">
                SAA-C03 question bank
              </Link>
              .
            </Card>
          ) : (
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {topics.map((t) => (
                <Link
                  key={t.slug}
                  href={`/practice/${t.slug}`}
                  className="group rounded-xl border border-border bg-white p-4 transition-all duration-150 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{t.name}</span>
                    <span className="flex items-center gap-1 text-xs text-muted">
                      <Badge>{topicQuestions(t.slug)}</Badge>
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                    </span>
                  </div>
                  <p className="mt-1 line-clamp-2 text-xs text-muted">
                    {t.description}
                  </p>
                </Link>
              ))}
            </div>
          )}

          <Card className="mt-10">
            <h2 className="text-lg font-semibold">
              How to prepare for {cert.code}
            </h2>
            <ol className="mt-4 space-y-4">
              {[
                {
                  step: "Learn the blueprint",
                  text: "Start with the domain weights above — they tell you exactly where exam points are concentrated.",
                  href: cert.examGuideUrl,
                  linkLabel: "Official exam page",
                  external: true,
                },
                {
                  step: "Study the core services",
                  text: "Work through service-focused study guides for the services that appear most in this exam's questions.",
                  href: "/services",
                  linkLabel: "Service study guides",
                },
                {
                  step: "Practice by topic",
                  text: "Take focused question sets per topic, read every per-option explanation — including why wrong answers are wrong.",
                  href: "/practice",
                  linkLabel: "All practice topics",
                },
                {
                  step: "Simulate the real exam",
                  text: `Take a timed mock exam at real pace (~${Math.round((cert.durationMinutes / cert.questionCount) * 10) / 10} min per question) and review every miss.`,
                  href: "/mock-exam",
                  linkLabel: "Mock exams",
                },
                {
                  step: "Close the gaps",
                  text: "Use your domain breakdown to find weak areas, bookmark tricky questions, and re-drill them before exam day.",
                  href: "/study-plan",
                  linkLabel: "Build a study plan",
                },
              ].map((item, i) => (
                <li key={item.step} className="flex gap-3.5">
                  <span
                    aria-hidden
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-soft text-sm font-bold text-accent"
                  >
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-medium">{item.step}</p>
                    <p className="mt-0.5 text-sm text-muted">{item.text}</p>
                    {item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 inline-flex items-center gap-1 text-sm text-accent hover:underline"
                      >
                        {item.linkLabel}
                        <ExternalLink className="h-3 w-3" aria-hidden />
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        className="mt-1 inline-block text-sm text-accent hover:underline"
                      >
                        {item.linkLabel} →
                      </Link>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </Card>

          {questions.length > 0 ? (
            <div className="mt-8 rounded-xl border border-accent/30 bg-accent-soft p-6">
              <p className="font-semibold">
                {questions.length} reviewed {cert.code} questions available
              </p>
              <p className="mt-1 text-sm text-muted">
                Practice interactively, or browse every question with answers
                and explanations.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href={`/questions`}
                  className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-accent-hover hover:shadow active:scale-[0.98]"
                >
                  Browse question bank
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
                <Link
                  href="/mock-exam"
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-white px-4 py-2 text-sm font-medium shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50 active:scale-[0.98]"
                >
                  Take a mock exam
                </Link>
              </div>
            </div>
          ) : null}
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <Card>
            <h2 className="text-sm font-semibold">Other certifications</h2>
            <ul className="mt-2 space-y-1.5">
              {CERTIFICATIONS.filter((c) => c.id !== cert.id)
                .slice(0, 6)
                .map((c) => (
                  <li key={c.id}>
                    <Link
                      href={`/certifications/${c.id}`}
                      className="text-sm text-muted hover:text-accent"
                    >
                      {c.code} — {c.name.replace("AWS Certified ", "")}
                    </Link>
                  </li>
                ))}
              <li>
                <Link
                  href="/certifications"
                  className="text-sm font-medium text-accent hover:underline"
                >
                  View all certifications →
                </Link>
              </li>
            </ul>
          </Card>
          <NewsletterForm />
          <AffiliateBlock context="article" />
        </aside>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { label: "Certifications", href: "/certifications" },
              { label: cert.code, href: `/certifications/${slug}` },
            ]),
          ),
        }}
      />
    </Container>
  );
}
