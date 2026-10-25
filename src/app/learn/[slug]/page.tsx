import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { ARTICLES, getArticle } from "@/lib/content/articles";
import { getTopic } from "@/lib/content/topics";
import { publishedByTopic } from "@/lib/content/questions";
import { Breadcrumbs, ButtonLink, Card, Container } from "@/components/ui";
import { AffiliateBlock } from "@/components/affiliate-note";
import { AdSlot } from "@/components/ad-slot";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { SITE } from "@/lib/site";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/learn/${slug}` },
    openGraph: { type: "article" },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  const topic = getTopic(article.topic);
  const topicQuestions = publishedByTopic(article.topic);
  const practiceCount = topicQuestions.length;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    dateModified: article.updatedAt,
    author: { "@type": "Organization", name: SITE.name, url: SITE.url },
    publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
    mainEntityOfPage: `${SITE.url}/learn/${slug}`,
  };

  return (
    <Container className="py-10">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
        <article className="max-w-3xl">
          <Breadcrumbs
            items={[
              { label: "Learn", href: "/learn" },
              { label: article.title },
            ]}
          />
          <h1 className="mt-4 text-3xl font-bold tracking-tight">
            {article.title}
          </h1>
          <p className="mt-2 text-sm text-muted">
            {article.readingMinutes} min read · Updated {article.updatedAt}
          </p>

          <div className="mt-6 space-y-8">
            {article.sections.map((s, i) => (
              <section key={i}>
                {s.heading ? (
                  <h2 className="text-xl font-semibold">{s.heading}</h2>
                ) : null}
                {s.paragraphs?.map((p, j) => (
                  <p key={j} className="mt-3 leading-relaxed text-slate-700">
                    {p}
                  </p>
                ))}
                {s.list ? (
                  <ul className="mt-3 list-disc space-y-1.5 pl-5 text-slate-700">
                    {s.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>

          <Card className="mt-10">
            <h2 className="font-semibold">Official references</h2>
            <ul className="mt-3 space-y-2">
              {article.references.map((r) => (
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
          </Card>
        </article>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          {topic && practiceCount > 0 ? (
            <Card>
              <h2 className="font-semibold">Practice this topic</h2>
              <p className="mt-1 text-sm text-muted">
                {practiceCount} questions on {topic.name}.
              </p>
              <ButtonLink
                href={`/practice/${topic.slug}`}
                className="mt-3 w-full"
              >
                Practice {topic.name}
              </ButtonLink>
            </Card>
          ) : null}
          {topicQuestions.length > 0 ? (
            <Card>
              <h2 className="font-semibold">Related questions</h2>
              <ul className="mt-2 space-y-2">
                {topicQuestions.slice(0, 3).map((q) => (
                  <li key={q.id}>
                    <Link
                      href={`/questions/${q.slug}`}
                      className="line-clamp-2 text-sm text-muted hover:text-accent"
                    >
                      {q.question}
                    </Link>
                  </li>
                ))}
              </ul>
            </Card>
          ) : null}
          <Card>
            <h2 className="font-semibold">Keep studying</h2>
            <ul className="mt-2 space-y-2 text-sm">
              <li>
                <Link href="/mock-exam" className="text-accent hover:underline">
                  Take a timed mock exam
                </Link>
              </li>
              <li>
                <Link href="/flashcards" className="text-accent hover:underline">
                  Review flashcards
                </Link>
              </li>
              <li>
                <Link href="/study-plan" className="text-accent hover:underline">
                  Build a study plan
                </Link>
              </li>
            </ul>
          </Card>
          <AffiliateBlock context="article" />
          <AdSlot slot="article-sidebar" />
        </aside>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { label: "Learn", href: "/learn" },
              { label: article.title, href: `/learn/${slug}` },
            ]),
          ),
        }}
      />
    </Container>
  );
}
