import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { ARTICLES } from "@/lib/content/articles";
import { getDomain } from "@/lib/content/domains";
import { Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "In-Depth AWS Architecture Articles — SAA-C03",
  description:
    "Detailed, exam-aligned articles on AWS architecture decisions: storage classes, database selection, high availability, disaster recovery, and cost optimization.",
  alternates: { canonical: "/learn" },
};

export default function LearnPage() {
  return (
    <Container className="py-10">
      <h1 className="text-3xl font-bold tracking-tight">Learn AWS Architecture</h1>
      <p className="mt-2 max-w-2xl text-muted">
        In-depth articles that teach the architectural reasoning behind exam
        questions — not just what to pick, but why.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {ARTICLES.map((a) => {
          const domain = getDomain(a.domain);
          return (
            <Link
              key={a.slug}
              href={`/learn/${a.slug}`}
              className="group rounded-xl border border-border bg-white p-6 transition-shadow hover:shadow-md"
            >
              <div className="flex items-center justify-between text-xs text-muted">
                <span className="font-medium text-accent">
                  Domain {domain.number}: {domain.name}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" aria-hidden />
                  {a.readingMinutes} min read
                </span>
              </div>
              <h2 className="mt-2 text-lg font-semibold group-hover:text-accent">
                {a.title}
              </h2>
              <p className="mt-2 text-sm text-muted">{a.description}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-accent">
                Read article
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </span>
            </Link>
          );
        })}
      </div>
    </Container>
  );
}
