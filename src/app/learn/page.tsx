import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { ARTICLES } from "@/lib/content/articles";
import { getDomain } from "@/lib/content/domains";
import { Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "AWS Certification Study Guides & In-Depth Articles",
  description:
    "Exam guides, service comparisons, cheat sheets, and deep dives across AWS certifications — learn the architectural reasoning behind exam questions.",
  alternates: { canonical: "/learn" },
};

type Category = "Exam guides" | "Cheat sheets" | "Comparisons" | "Deep dives";

function categorize(slug: string): Category {
  if (slug.endsWith("exam-guide")) return "Exam guides";
  if (slug.endsWith("cheat-sheet")) return "Cheat sheets";
  if (slug.includes("-vs-")) return "Comparisons";
  return "Deep dives";
}

const CATEGORY_ORDER: Category[] = [
  "Exam guides",
  "Comparisons",
  "Deep dives",
  "Cheat sheets",
];

export default function LearnPage() {
  const grouped = new Map<Category, typeof ARTICLES>();
  for (const a of ARTICLES) {
    const c = categorize(a.slug);
    grouped.set(c, [...(grouped.get(c) ?? []), a]);
  }

  return (
    <Container className="py-10">
      <h1 className="text-3xl font-bold tracking-tight">
        Study Guides & Articles
      </h1>
      <p className="mt-2 max-w-2xl text-muted">
        In-depth articles that teach the architectural reasoning behind exam
        questions — not just what to pick, but why.
      </p>
      {CATEGORY_ORDER.map((category) => {
        const articles = grouped.get(category);
        if (!articles?.length) return null;
        return (
          <section key={category} className="mt-10">
            <h2 className="text-xl font-semibold">
              {category}
              <span className="ml-2 text-sm font-normal text-muted">
                ({articles.length})
              </span>
            </h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {articles.map((a) => {
                const domain = getDomain(a.domain);
                return (
                  <Link
                    key={a.slug}
                    href={`/learn/${a.slug}`}
                    className="group rounded-xl border border-border bg-white p-6 transition-all hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className="flex items-center justify-between text-xs text-muted">
                      <span className="font-medium text-accent">
                        {domain ? `Domain ${domain.number}: ${domain.name}` : category}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" aria-hidden />
                        {a.readingMinutes} min read
                      </span>
                    </div>
                    <h3 className="mt-2 text-lg font-semibold group-hover:text-accent">
                      {a.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted">{a.description}</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-accent">
                      Read article
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>
        );
      })}
    </Container>
  );
}
