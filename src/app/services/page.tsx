import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SERVICES } from "@/lib/content/services";
import { Badge, Card, Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "AWS Service Study Guides for SAA-C03",
  description:
    "Concise study guides for the AWS services on the Solutions Architect Associate exam — when to use each service, key exam points, and comparisons.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  const categories = [...new Set(SERVICES.map((s) => s.category))];
  return (
    <Container className="py-10">
      <h1 className="text-3xl font-bold tracking-tight">AWS Service Study Guides</h1>
      <p className="mt-2 max-w-2xl text-muted">
        Exam-focused guides for the services SAA-C03 tests most: when to use
        each one, when not to, and the distinctions that show up in questions.
      </p>
      {categories.map((cat) => (
        <section key={cat} className="mt-10">
          <h2 className="text-xl font-semibold">{cat}</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.filter((s) => s.category === cat).map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group rounded-xl border border-border bg-white p-5 transition-shadow hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{s.name}</h3>
                  <ArrowRight
                    className="h-4 w-4 text-muted transition-transform group-hover:translate-x-1 group-hover:text-accent"
                    aria-hidden
                  />
                </div>
                <p className="mt-1 text-sm font-medium text-accent">
                  {s.tagline}
                </p>
                <p className="mt-2 line-clamp-3 text-sm text-muted">
                  {s.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {s.relatedTopics.slice(0, 2).map((t) => (
                    <Badge key={t}>{t.replace(/-/g, " ")}</Badge>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}
      <Card className="mt-10 text-sm text-muted">
        Looking for deeper comparisons? Read our{" "}
        <Link href="/learn" className="font-medium text-accent hover:underline">
          in-depth articles
        </Link>{" "}
        like S3 vs EBS vs EFS and RDS vs Aurora vs DynamoDB.
      </Card>
    </Container>
  );
}
