import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";
import Link from "next/link";
import { TOPICS, getTopic } from "@/lib/content/topics";
import { CERTIFICATIONS, getCertification } from "@/lib/content/certifications";
import { publishedByCert, publishedByTopic } from "@/lib/content/questions";
import { getDomain } from "@/lib/content/domains";
import { PracticeSession } from "@/components/practice-session";
import { CertPracticeBuilder } from "@/components/cert-practice-builder";
import { Breadcrumbs, Container } from "@/components/ui";
import { breadcrumbJsonLd } from "@/lib/jsonld";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  const topicParams = TOPICS.filter(
    (t) => publishedByTopic(t.slug).length > 0,
  ).map((t) => ({ slug: t.slug }));
  const certParams = CERTIFICATIONS.filter(
    (c) => publishedByCert(c.id).length > 0,
  ).map((c) => ({ slug: c.id }));
  return [...topicParams, ...certParams];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const topic = getTopic(slug);
  if (topic) {
    const count = publishedByTopic(slug).length;
    const cert = getCertification(topic.cert);
    return pageMetadata({
      title: `${topic.name} Practice Questions — ${cert?.code ?? "Cloud"}`,
      description: `${count} free practice questions on ${topic.name.toLowerCase()} for the ${cert?.name ?? "cloud certification"} exam, with full explanations and official documentation references.`,
      path: `/practice/${slug}`,
    });
  }
  const cert = getCertification(slug);
  if (!cert) return {};
  const count = publishedByCert(cert.id).length;
  return pageMetadata({
    title: `${cert.code} Practice Questions — Custom Practice Sets`,
    description: `${count} free ${cert.name} practice questions with explanations. Build custom sets by exam domain, difficulty, and question count.`,
    path: `/practice/${slug}`,
  });
}

export default async function TopicPracticePage({ params }: Props) {
  const { slug } = await params;
  const topic = getTopic(slug);

  if (!topic) {
    const cert = getCertification(slug);
    if (!cert) notFound();
    const questions = publishedByCert(cert.id);
    if (questions.length === 0) notFound();
    return (
      <Container className="py-10">
        <Breadcrumbs
          items={[
            { label: "Practice", href: "/practice" },
            { label: cert.code },
          ]}
        />
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {cert.code} practice
            </h1>
            <p className="mt-2 max-w-2xl text-muted">
              {cert.name} — {questions.length} reviewed questions across{" "}
              {cert.domains.length} domains. Filter by domain and difficulty,
              or drill a single topic below.
            </p>
          </div>
          <Link
            href={`/certifications/${cert.id}`}
            className="text-sm text-accent hover:underline"
          >
            {cert.code} exam guide →
          </Link>
        </div>
        <div className="mt-8">
          <CertPracticeBuilder cert={cert} questions={questions} />
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              breadcrumbJsonLd([
                { label: "Practice", href: "/practice" },
                { label: cert.code, href: `/practice/${slug}` },
              ]),
            ),
          }}
        />
      </Container>
    );
  }

  const questions = publishedByTopic(slug);
  if (questions.length === 0) notFound();
  const domain = getDomain(topic.domain);

  return (
    <Container className="py-10">
      <Breadcrumbs
        items={[
          { label: "Practice", href: "/practice" },
          { label: topic.name },
        ]}
      />
      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{topic.name}</h1>
          <p className="mt-2 max-w-2xl text-muted">{topic.description}</p>
          <p className="mt-1 text-xs text-muted">
            Domain {domain.number}: {domain.name} · {domain.weight}% of exam ·{" "}
            {questions.length} questions
          </p>
        </div>
        <Link
          href="/practice"
          className="text-sm text-accent hover:underline"
        >
          All practice topics →
        </Link>
      </div>
      <div className="mt-8">
        <PracticeSession questions={questions} topic={slug} />
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { label: "Practice", href: "/practice" },
              { label: topic.name, href: `/practice/${slug}` },
            ]),
          ),
        }}
      />
    </Container>
  );
}
