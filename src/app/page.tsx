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
import { PUBLISHED_QUESTIONS } from "@/lib/content/questions";
import { ARTICLES } from "@/lib/content/articles";
import { SITE } from "@/lib/site";
import { DashboardPreview } from "@/components/progress-dashboard";
import { Badge, ButtonLink, Card, Container, SectionHeading } from "@/components/ui";

const FEATURED_TOPICS = TOPICS.slice(0, 6);

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-border bg-gradient-to-b from-accent-soft to-background">
        <Container className="py-16 sm:py-24">
          <div className="max-w-3xl">
            <Badge tone="accent">
              {EXAM.name} ({EXAM.code})
            </Badge>
            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
              Prepare for the AWS Solutions Architect Associate Exam
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              Practice AWS architecture scenarios, understand why each answer is
              correct, and build confidence with free study resources.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/practice" className="px-6 py-3 text-base">
                Start Free Practice
              </ButtonLink>
              <ButtonLink
                href="/services"
                variant="secondary"
                className="px-6 py-3 text-base"
              >
                Explore Study Guides
              </ButtonLink>
            </div>
            <p className="mt-6 text-xs text-muted">
              Free. No account required. Progress stays in your browser.
            </p>
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

      {/* Featured topics */}
      <section className="py-14">
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
                className="group rounded-xl border border-border bg-white p-5 transition-shadow hover:shadow-md"
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
