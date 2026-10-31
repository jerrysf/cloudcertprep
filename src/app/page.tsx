import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  ClipboardList,
  Layers,
  Target,
  Timer,
} from "lucide-react";
import { DOMAINS, EXAM } from "@/lib/content/domains";
import { TOPICS } from "@/lib/content/topics";
import {
  PUBLISHED_QUESTIONS,
  publishedByCert,
} from "@/lib/content/questions";
import { CERTIFICATIONS } from "@/lib/content/certifications";
import { ARTICLES } from "@/lib/content/articles";
import { SITE } from "@/lib/site";
import { DashboardPreview } from "@/components/progress-dashboard";
import { Badge, ButtonLink, Card, CertLevelBadge, Container, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const FEATURED_TOPICS = TOPICS.slice(0, 6);

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-accent-soft via-blue-50 to-background">
        <div
          className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-accent/10 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -left-24 top-40 h-64 w-64 rounded-full bg-blue-300/20 blur-3xl"
          aria-hidden
        />
        <Container className="relative py-16 sm:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
            <div className="max-w-3xl">
              <Badge tone="accent">
                {CERTIFICATIONS.length} AWS certifications covered
              </Badge>
              <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
                Prepare for the AWS Solutions Architect Associate Exam
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-muted">
                Practice AWS architecture scenarios, understand why each answer
                is correct, and build confidence with free study resources.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="/practice" className="px-6 py-3 text-base">
                  Start Free Practice
                </ButtonLink>
                <ButtonLink
                  href="/certifications"
                  variant="secondary"
                  className="px-6 py-3 text-base"
                >
                  Explore Certifications
                </ButtonLink>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted">
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  {PUBLISHED_QUESTIONS.length} reviewed questions
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  {CERTIFICATIONS.length} certifications
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  Free, no account required
                </span>
              </div>
            </div>

            {/* Product preview: mini question card */}
            <div
              aria-hidden
              className="relative mx-auto hidden w-full max-w-sm lg:block"
            >
              <div className="absolute -inset-4 rounded-3xl bg-accent/5" />
              <div className="relative rotate-1 rounded-2xl border border-border bg-white p-5 shadow-xl">
                <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wide">
                  <span className="rounded-full bg-accent-soft px-2 py-0.5 text-accent">
                    SAA-C03
                  </span>
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-muted">
                    Single choice
                  </span>
                </div>
                <p className="mt-3 text-sm font-semibold leading-snug">
                  A company needs durable object storage for user uploads…
                </p>
                <div className="mt-3 space-y-2">
                  {[
                    { letter: "A", ok: false },
                    { letter: "B", ok: true },
                    { letter: "C", ok: false },
                    { letter: "D", ok: false },
                  ].map((o) => (
                    <div
                      key={o.letter}
                      className={
                        o.ok
                          ? "flex items-center gap-2.5 rounded-lg border-2 border-emerald-500 bg-emerald-50 p-2.5 text-xs"
                          : "flex items-center gap-2.5 rounded-lg border-2 border-border p-2.5 text-xs"
                      }
                    >
                      <span
                        className={
                          o.ok
                            ? "flex h-5 w-5 items-center justify-center rounded bg-emerald-600 text-[10px] font-bold text-white"
                            : "flex h-5 w-5 items-center justify-center rounded bg-slate-100 text-[10px] font-bold text-slate-500"
                        }
                      >
                        {o.letter}
                      </span>
                      <span
                        className={
                          o.ok ? "font-medium text-emerald-900" : "text-muted"
                        }
                      >
                        {o.ok
                          ? "Amazon S3 with versioning"
                          : `Option ${o.letter}`}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex items-center gap-1.5 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-800">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Correct — every option explained
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Dashboard preview */}
      <section className="py-12">
        <Container>
          <SectionHeading
            eyebrow="Your progress"
            title="A learning dashboard that reflects your real work"
            description={`${PUBLISHED_QUESTIONS.length} reviewed practice questions available. Your completed questions, accuracy, and review list appear below as you practice.`}
          />
          <div className="mt-6">
            <DashboardPreview />
          </div>
        </Container>
      </section>

      {/* Exam domains */}
      <section className="border-t border-border bg-card py-14">
        <Container>
          <SectionHeading
            eyebrow="Exam blueprint"
            title={`The four ${EXAM.code} domains`}
            description={`${EXAM.questionCount} questions in ${EXAM.durationMinutes} minutes. Weights shown are the official percentages of scored content from the AWS exam guide.`}
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {DOMAINS.map((d) => {
              const count = PUBLISHED_QUESTIONS.filter(
                (q) => q.domain === d.id,
              ).length;
              return (
                <Card key={d.id}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-accent">
                        Domain {d.number} · {d.weight}% of exam
                      </p>
                      <h3 className="mt-1 text-lg font-semibold">{d.name}</h3>
                      <p className="mt-1 text-sm text-muted">{d.summary}</p>
                    </div>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                      {count} questions
                    </span>
                  </div>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Certifications */}
      <section className="py-14">
        <Container>
          <SectionHeading
            eyebrow="All certifications"
            title="Choose your AWS certification"
            description="Practice banks, exam guides, and domain breakdowns for every AWS certification we cover."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CERTIFICATIONS.map((c) => {
              const count = publishedByCert(c.id).length;
              return (
                <Link
                  key={c.id}
                  href={`/certifications/${c.id}`}
                  className="group rounded-xl border border-border bg-white p-5 transition-all duration-150 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="font-mono text-sm font-semibold text-accent">
                        {c.code}
                      </span>
                      <h3 className="mt-1 font-semibold leading-snug">
                        {c.name.replace("AWS Certified ", "")}
                      </h3>
                    </div>
                    <ArrowRight
                      className="mt-1 h-4 w-4 shrink-0 text-muted transition-transform group-hover:translate-x-1 group-hover:text-accent"
                      aria-hidden
                    />
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <CertLevelBadge level={c.level} />
                    <span className="text-xs text-muted">
                      {count > 0
                        ? `${count} questions`
                        : "Coming soon"}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Featured topics */}
      <section className="border-t border-border bg-card py-14">
        <Container>
          <SectionHeading
            eyebrow="Practice topics"
            title="Featured learning topics"
            description="Focused question sets that build the architectural reasoning the exam tests."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURED_TOPICS.map((t) => (
              <Link
                key={t.slug}
                href={`/practice/${t.slug}`}
                className="group rounded-xl border border-border bg-white p-5 transition-all duration-150 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{t.name}</h3>
                  <ArrowRight
                    className="h-4 w-4 text-muted transition-transform group-hover:translate-x-1 group-hover:text-accent"
                    aria-hidden
                  />
                </div>
                <p className="mt-2 text-sm text-muted">{t.description}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* How it works */}
      <section className="border-t border-border bg-card py-14">
        <Container>
          <SectionHeading eyebrow="Method" title="How it works" />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: ClipboardList,
                title: "Practice",
                text: "Work through scenario-based questions by domain and topic.",
              },
              {
                icon: BookOpen,
                title: "Review explanations",
                text: "Every option — right and wrong — gets a reasoned explanation with AWS doc links.",
              },
              {
                icon: Target,
                title: "Identify weak areas",
                text: "Accuracy by domain and topic shows exactly where to focus next.",
              },
              {
                icon: Timer,
                title: "Practice again",
                text: "Timed mock exams and flashcards lock in the reasoning.",
              },
            ].map((step) => (
              <Card key={step.title}>
                <step.icon className="h-6 w-6 text-accent" aria-hidden />
                <h3 className="mt-3 font-semibold">{step.title}</h3>
                <p className="mt-1 text-sm text-muted">{step.text}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Free resources */}
      <section className="py-14">
        <Container>
          <SectionHeading
            eyebrow="Free resources"
            title="Study guides and in-depth articles"
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <Card>
              <div className="flex items-center gap-2">
                <Layers className="h-5 w-5 text-accent" aria-hidden />
                <h3 className="font-semibold">Service study guides</h3>
              </div>
              <ul className="mt-3 space-y-2">
                {ARTICLES.slice(0, 4).map((a) => (
                  <li key={a.slug}>
                    <Link
                      href={`/learn/${a.slug}`}
                      className="text-sm text-accent hover:underline"
                    >
                      {a.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-4">
                <ButtonLink href="/services" variant="ghost" className="px-0">
                  Browse all service guides →
                </ButtonLink>
              </div>
            </Card>
            <Card>
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-accent" aria-hidden />
                <h3 className="font-semibold">More ways to study</h3>
              </div>
              <ul className="mt-3 space-y-3 text-sm">
                <li>
                  <Link href="/mock-exam" className="font-medium text-accent hover:underline">
                    Timed mock exams
                  </Link>
                  <span className="text-muted"> — exam-paced question sets with a results breakdown.</span>
                </li>
                <li>
                  <Link href="/flashcards" className="font-medium text-accent hover:underline">
                    Flashcards
                  </Link>
                  <span className="text-muted"> — quick-recall cards for key service distinctions.</span>
                </li>
                <li>
                  <Link href="/study-plan" className="font-medium text-accent hover:underline">
                    Study plan generator
                  </Link>
                  <span className="text-muted"> — a week-by-week schedule built around your exam date.</span>
                </li>
              </ul>
            </Card>
          </div>
          <p className="mt-8 text-xs leading-relaxed text-muted">
            {SITE.name} is an independent study resource and is not affiliated
            with, endorsed by, or sponsored by Amazon Web Services. Always
            confirm exam details in the{" "}
            <a
              href={EXAM.examGuideUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline"
            >
              official AWS exam guide
            </a>
            .
          </p>
        </Container>
      </section>
    </>
  );
}
