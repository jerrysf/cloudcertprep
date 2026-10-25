import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, ExternalLink, X } from "lucide-react";
import { SERVICES, getService } from "@/lib/content/services";
import { getTopic } from "@/lib/content/topics";
import { publishedByTopic } from "@/lib/content/questions";
import { Breadcrumbs, Card, Container } from "@/components/ui";
import { SITE } from "@/lib/site";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: `${service.name} Study Guide — When to Use It (SAA-C03)`,
    description: `${service.tagline}. ${service.description.slice(0, 140)}…`,
    alternates: { canonical: `/services/${slug}` },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${service.name} Study Guide`,
    description: service.tagline,
    author: { "@type": "Organization", name: SITE.name, url: SITE.url },
    publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
    mainEntityOfPage: `${SITE.url}/services/${slug}`,
  };

  return (
    <Container className="py-10">
      <Breadcrumbs
        items={[
          { label: "Study Guides", href: "/services" },
          { label: service.name },
        ]}
      />
      <div className="mt-4 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-accent">
          {service.category}
        </p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight">{service.name}</h1>
        <p className="mt-1 text-lg font-medium text-muted">{service.tagline}</p>
        <p className="mt-4 leading-relaxed">{service.description}</p>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="flex items-center gap-2 font-semibold">
            <Check className="h-5 w-5 text-success" aria-hidden /> When to use it
          </h2>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm">
            {service.whenToUse.map((w) => (
              <li key={w}>{w}</li>
            ))}
          </ul>
        </Card>
        <Card>
          <h2 className="flex items-center gap-2 font-semibold">
            <X className="h-5 w-5 text-danger" aria-hidden /> When NOT to use it
          </h2>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm">
            {service.whenNotToUse.map((w) => (
              <li key={w}>{w}</li>
            ))}
          </ul>
        </Card>
      </div>

      <Card className="mt-6">
        <h2 className="font-semibold">Key exam points</h2>
        <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm">
          {service.keyExamPoints.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </Card>

      {service.compareWith.length > 0 ? (
        <Card className="mt-6">
          <h2 className="font-semibold">Compared with</h2>
          <ul className="mt-3 space-y-3 text-sm">
            {service.compareWith.map((c) => {
              const other = getService(c.slug);
              return (
                <li key={c.slug}>
                  <Link
                    href={`/services/${c.slug}`}
                    className="font-medium text-accent hover:underline"
                  >
                    {other?.name ?? c.slug}
                  </Link>
                  <span className="text-muted"> — {c.note}</span>
                </li>
              );
            })}
          </ul>
        </Card>
      ) : null}

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="font-semibold">Practice these topics</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {service.relatedTopics.map((t) => {
              const topic = getTopic(t);
              const count = publishedByTopic(t).length;
              if (!topic || count === 0) return null;
              return (
                <Link
                  key={t}
                  href={`/practice/${t}`}
                  className="rounded-full border border-accent/40 bg-accent-soft px-3 py-1.5 text-sm text-accent hover:bg-blue-100"
                >
                  {topic.name} ({count} questions)
                </Link>
              );
            })}
          </div>
        </Card>
        <Card>
          <h2 className="font-semibold">Official documentation</h2>
          <ul className="mt-3 space-y-2">
            {service.references.map((r) => (
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
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </Container>
  );
}
