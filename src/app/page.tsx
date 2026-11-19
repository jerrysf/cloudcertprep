import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Check,
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
import { MiniQuiz } from "@/components/mini-quiz";
import { CountUp } from "@/components/count-up";
import { Reveal } from "@/components/reveal";
import { Badge, ButtonLink, Card, CertLevelBadge, Container, SectionHeading, VendorBadge } from "@/components/ui";

export const metadata: Metadata = pageMetadata({
  title: `${SITE.name} — Free AWS & Azure Certification Practice Exams`,
  description: SITE.description,
  path: "/",
});

const FEATURED_TOPICS = TOPICS.slice(0, 6);

const HERO_QUESTION =
  PUBLISHED_QUESTIONS.find(
    (q) =>
      q.cert === "clf-c02" &&
      q.difficulty === "easy" &&
      q.format === "single-choice" &&
      q.options.length === 4 &&
      q.question.length < 160,
  ) ?? PUBLISHED_QUESTIONS[0];

function ScoreRingVisual({ percent }: { percent: number }) {
  const r = 44;
  const c = 2 * Math.PI * r;
  const filled = (percent / 100) * c;
  return (
    <div className="relative h-28 w-28 shrink-0">
      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90" role="img" aria-label={`Score ${percent}%`}>
        <circle cx="50" cy="50" r={r} fill="none" stroke="#334155" strokeWidth="9" />
        <circle cx="50" cy="50" r={r} fill="none" stroke="#34d399" strokeWidth="9" strokeLinecap="round" strokeDasharray={`${filled} ${c}`} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold tabular-nums text-white">{percent}</span>
        <span className="-mt-0.5 text-[10px] font-medium text-slate-400">%</span>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      {/* 1 — Hero: value prop + interactive mini quiz */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-accent-soft via-blue-50 to-background">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-accent/10 blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute -left-24 top-40 h-64 w-64 rounded-full bg-blue-300/20 blur-3xl" aria-hidden />
        <Container className="relative py-16 sm:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
            <div className="max-w-3xl">
              <Badge tone="accent">
                {CERTIFICATIONS.length} AWS &amp; Azure certifications covered
              </Badge>
              <h1 className="mt-4 text-4xl font-bold tracking-[-0.03em] leading-[1.05] sm:text-6xl">
                Pass your cloud certification. On the first try.
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-muted">
                {PUBLISHED_QUESTIONS.length.toLocaleString()} free practice
                questions with real explanations — not dumps, actual
                architectural reasoning. Timed mock exams, domain analytics,
                and study guides included.
              </p>
              <div className="mt-8">
                <ButtonLink href="/practice" className="px-7 py-3.5 text-base">
                  Start practicing free
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </ButtonLink>
              </div>
              <p className="mt-3 text-xs text-muted">
                No account · No paywall · Progress stays in your browser
              </p>
            </div>

            <div className="relative mx-auto w-full max-w-md lg:max-w-sm">
              <div className="absolute -inset-4 rounded-3xl bg-accent/5" aria-hidden />
              <MiniQuiz question={HERO_QUESTION} />
            </div>
          </div>
        </Container>
      </section>

      {/* 2 — Animated proof strip */}
      <section className="border-b border-border bg-white py-10">
        <Container>
          <div className="grid grid-cols-2 gap-6 text-center sm:grid-cols-4">
            {[
              { to: PUBLISHED_QUESTIONS.length, suffix: "", label: "reviewed questions" },
              { to: CERTIFICATIONS.length, suffix: "", label: "certifications covered" },
              { to: ARTICLES.length, suffix: "", label: "guides & comparisons" },
              { to: 0, suffix: "", label: "$ — free, always", raw: "$0" },
            ].map((s) => (
              <Reveal key={s.label}>
                <p className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  {"raw" in s && s.raw ? s.raw : <CountUp to={s.to} suffix={s.suffix} />}
                </p>
                <p className="mt-1 text-xs font-medium uppercase tracking-wide text-muted">
                  {s.label}
                </p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* 3 — Pain → solution */}
      <section className="border-b border-border bg-card py-14">
        <Container>
          <div className="grid items-start gap-10 lg:grid-cols-2">
            <div>
              <SectionHeading
                eyebrow="The problem"
                title="You've read the docs. You still don't know if you're ready."
                description="Everyone fails differently — weak in security domains, shaky on pricing models. Generic flashcards won't tell you which one you are."
              />
            </div>
            <div className="space-y-3">
              {[
                "Exam dumps teach wrong answers — AWS retires question pools constantly.",
                "Reading documentation feels productive but builds zero exam intuition.",
                "You can't tell a weak domain from a strong one until it's too late.",
              ].map((pain) => (
                <Reveal key={pain}>
                  <div className="rounded-xl border border-red-200/70 bg-red-50/60 px-4 py-3 text-sm text-slate-800">
                    {pain}
                  </div>
                </Reveal>
              ))}
              <Reveal delay={80}>
                <div className="rounded-xl border border-emerald-300/70 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-900">
                  The fix: scenario questions that expose your exact weak
                  domains — with reasoning for every option, not just the right
                  one.
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* 4 — Exam blueprint (SAA flagship) */}
      <section className="py-14">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Exam blueprint"
              title={`The four ${EXAM.code} domains`}
              description={`${EXAM.questionCount} questions in ${EXAM.durationMinutes} minutes. Weights shown are the official percentages of scored content from the AWS exam guide.`}
            />
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {DOMAINS.map((d, i) => {
              const count = PUBLISHED_QUESTIONS.filter(
                (q) => q.domain === d.id,
              ).length;
              return (
                <Reveal key={d.id} delay={i * 60}>
                  <Card>
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
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* 5 — Certifications grid */}
      <section className="border-t border-border bg-card py-14">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="All certifications"
              title="Choose your certification"
              description="Practice banks, exam guides, and domain breakdowns for every certification we cover — AWS and Azure."
            />
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CERTIFICATIONS.map((c, i) => {
              const count = publishedByCert(c.id).length;
              return (
                <Reveal key={c.id} delay={(i % 3) * 50}>
                  <Link
                    href={`/certifications/${c.id}`}
                    className="group block h-full rounded-xl border border-border bg-white p-5 transition-all duration-150 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="flex items-center gap-1.5 font-mono text-sm font-semibold text-accent">
                          <VendorBadge vendor={c.vendor} />
                          {c.vendor === "azure" ? c.code : `AWS ${c.code}`}
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
                        {count > 0 ? `${count} questions` : "Coming soon"}
                      </span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* 6 — Dark readiness section */}
      <section className="border-y border-slate-800 bg-slate-900 py-16 text-white">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <Reveal>
              <p className="text-sm font-semibold uppercase tracking-wide text-emerald-400">
                Readiness, measured
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-[-0.02em] sm:text-4xl">
                Know you&apos;re ready before you book the exam.
              </h2>
              <p className="mt-3 max-w-lg leading-relaxed text-slate-300">
                Timed mock exams score every domain against the official exam
                weights. Your weakest areas surface as a review queue — so the
                last week goes to what actually needs work.
              </p>
              <div className="mt-6">
                <ButtonLink href="/mock-exam" className="px-6 py-3">
                  Take a timed mock exam
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </ButtonLink>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="rounded-2xl border border-slate-700 bg-slate-800/60 p-6 shadow-2xl">
                <div className="flex items-center gap-6">
                  <ScoreRingVisual percent={78} />
                  <div>
                    <p className="text-sm font-medium text-slate-300">
                      Estimated score — SAA-C03
                    </p>
                    <p className="mt-1 text-lg font-semibold text-emerald-400">
                      At passing range
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      51 of 65 correct · timed
                    </p>
                  </div>
                </div>
                <div className="mt-5 space-y-3">
                  {DOMAINS.map((d, i) => {
                    const pct = [92, 74, 81, 68][i] ?? 75;
                    return (
                      <div key={d.id}>
                        <div className="flex justify-between text-xs text-slate-300">
                          <span>Domain {d.number}: {d.name}</span>
                          <span>{pct}%</span>
                        </div>
                        <div className="mt-1 h-1.5 rounded-full bg-slate-700">
                          <div
                            className={
                              pct >= 70
                                ? "h-full rounded-full bg-emerald-400"
                                : "h-full rounded-full bg-red-400"
                            }
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          </div>
          <div className="mt-10">
            <DashboardPreview />
          </div>
        </Container>
      </section>

      {/* 7 — Pricing promo, loss-anchored */}
      <section className="border-b border-border bg-card py-14">
        <Container>
          <div className="relative overflow-hidden rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 via-orange-50 to-background p-8 sm:p-10">
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-amber-200/40 blur-3xl" aria-hidden />
            <div className="relative grid items-center gap-8 lg:grid-cols-[1.5fr_1fr]">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-amber-700">
                  Study packs
                </p>
                <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                  The exam costs $150. Failing it costs $300 and six weeks.
                </h2>
                <p className="mt-3 max-w-xl text-muted">
                  This bundle is $12. Every cheat sheet across our AWS
                  certifications — service distinctions, decision rules, and the
                  facts each exam repeats. Print it, annotate it, take it to
                  exam week.
                </p>
                <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-muted">
                  <li className="flex items-center gap-1.5">
                    <Check className="h-4 w-4 text-amber-700" aria-hidden />
                    9 certifications, print-optimized PDF
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="h-4 w-4 text-amber-700" aria-hidden />
                    Free updates as new sheets ship
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="h-4 w-4 text-amber-700" aria-hidden />
                    One-time purchase, instant download
                  </li>
                </ul>
              </div>
              <div className="flex flex-col items-stretch gap-3 lg:items-end">
                <div className="text-left lg:text-right">
                  <span className="text-3xl font-bold">$12</span>
                  <span className="ml-1.5 text-sm text-muted">one-time</span>
                </div>
                <ButtonLink href="/shop" className="justify-center">
                  Get the Cheat Sheet Bundle
                </ButtonLink>
                <Link
                  href="/learn/clf-c02-cheat-sheet"
                  className="text-center text-xs text-muted hover:text-accent"
                >
                  Preview a cheat sheet first →
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 8 — Latest articles */}
      <section className="py-14">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Learning hub"
              title="Latest guides & comparisons"
              description="Exam guides, service deep-dives, and decision frameworks — written from official AWS and Microsoft documentation."
            />
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[...ARTICLES]
              .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
              .slice(0, 6)
              .map((a) => (
                <Link
                  key={a.slug}
                  href={`/learn/${a.slug}`}
                  className="group flex flex-col rounded-xl border border-border bg-white p-5 transition-all duration-150 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-semibold leading-snug">{a.title}</h3>
                    <ArrowRight
                      className="mt-1 h-4 w-4 shrink-0 text-muted transition-transform group-hover:translate-x-1 group-hover:text-accent"
                      aria-hidden
                    />
                  </div>
                  <p className="mt-2 line-clamp-2 text-sm text-muted">
                    {a.description}
                  </p>
                  <span className="mt-auto pt-3 text-xs text-muted">
                    {a.readingMinutes} min read · Updated {a.updatedAt}
                  </span>
                </Link>
              ))}
          </div>
          <div className="mt-6">
            <ButtonLink href="/learn" variant="secondary">
              Browse all {ARTICLES.length} articles
            </ButtonLink>
          </div>
        </Container>
      </section>

      {/* 9 — Featured topics */}
      <section className="border-t border-border bg-card py-14">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Practice topics"
              title="Featured learning topics"
              description="Focused question sets that build the architectural reasoning the exam tests."
            />
          </Reveal>
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

      {/* 10 — How it works */}
      <section className="border-t border-border bg-card py-14">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="Method" title="How it works" />
          </Reveal>
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
                text: "Every option — right and wrong — gets a reasoned explanation with doc links.",
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
            ].map((step, i) => (
              <Reveal key={step.title} delay={i * 60}>
                <Card>
                  <step.icon className="h-6 w-6 text-accent" aria-hidden />
                  <h3 className="mt-3 font-semibold">{step.title}</h3>
                  <p className="mt-1 text-sm text-muted">{step.text}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* 11 — Free resources */}
      <section className="py-14">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Free resources"
              title="Study guides and in-depth articles"
            />
          </Reveal>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <Card>
              <div className="flex items-center gap-2">
                <Layers className="h-5 w-5 text-accent" aria-hidden />
                <h3 className="font-semibold">Service study guides</h3>
              </div>
              <p className="mt-2 text-sm text-muted">
                Per-service deep dives — when to use it, when NOT to, and the
                pricing model that shapes the exam answer.
              </p>
              <ButtonLink href="/services" variant="secondary" className="mt-4">
                Browse service guides
              </ButtonLink>
            </Card>
            <Card>
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-accent" aria-hidden />
                <h3 className="font-semibold">Cross-cloud comparisons</h3>
              </div>
              <p className="mt-2 text-sm text-muted">
                CLF vs AZ-900, SAA vs AZ-104, SAP vs AZ-305 — decision guides
                for choosing between AWS and Azure paths.
              </p>
              <ButtonLink href="/compare" variant="secondary" className="mt-4">
                Open the compare hub
              </ButtonLink>
            </Card>
          </div>
        </Container>
      </section>

      {/* 12 — Final CTA */}
      <section className="border-t border-border bg-gradient-to-b from-accent-soft to-background py-16">
        <Container className="text-center">
          <Reveal>
            <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-[-0.02em] sm:text-4xl">
              Your certification is closer than you think.
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted">
              Question banks update with every exam outline change — start free
              today and let the practice do the talking.
            </p>
            <div className="mt-8">
              <ButtonLink href="/practice" className="px-8 py-3.5 text-base">
                Start practicing free
                <ArrowRight className="h-4 w-4" aria-hidden />
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
