import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { CERTIFICATIONS } from "@/lib/content/certifications";
import { Container, VendorBadge } from "@/components/ui";

export const metadata: Metadata = pageMetadata({
  title: "AWS vs Azure Certification Comparison — Which Cloud Cert First?",
  description:
    "Side-by-side comparisons of the four cross-cloud certification pairs: CLF-C02 vs AZ-900, AIF-C01 vs AI-900, SAA-C03 vs AZ-104, and SAP-C02 vs AZ-305 — cost, difficulty, scope, and which to take first.",
  path: "/compare",
});

interface Pair {
  tier: string;
  awsId: string;
  azureId: string;
  articleSlug: string;
  angle: string;
}

const PAIRS: Pair[] = [
  {
    tier: "Foundational — Cloud basics",
    awsId: "clf-c02",
    azureId: "az-900",
    articleSlug: "clf-c02-vs-az-900",
    angle:
      "Both are vocabulary exams over 60-90 days of study. Pick by employer ecosystem — or take both for under $200 total.",
  },
  {
    tier: "Foundational — AI",
    awsId: "aif-c01",
    azureId: "ai-900",
    articleSlug: "aif-c01-vs-ai-900",
    angle:
      "Roughly 80% shared AI vocabulary. AIF-C01 is a third Bedrock services; AI-900 spreads evenly across five domains including vision and NLP.",
  },
  {
    tier: "Associate — The flagship pair",
    awsId: "saa-c03",
    azureId: "az-104",
    articleSlug: "saa-c03-vs-az-104",
    angle:
      "SAA tests architecture judgment ('design the right thing'); AZ-104 tests operational precision ('actually run the thing'). Different jobs, not reskins.",
  },
  {
    tier: "Expert — Solutions architecture",
    awsId: "sap-c02",
    azureId: "az-305",
    articleSlug: "sap-c02-vs-az-305",
    angle:
      "SAP is one 180-minute endurance exam. AZ-305 requires AZ-104 first — a two-stage path costing ~$330 total.",
  },
];

function cert(id: string) {
  return CERTIFICATIONS.find((c) => c.id === id)!;
}

export default function ComparePage() {
  return (
    <Container className="py-10">
      <h1 className="text-3xl font-bold tracking-tight">
        AWS vs Azure: Certification Comparison Hub
      </h1>
      <p className="mt-2 max-w-2xl text-muted">
        The four most-compared cross-cloud certification pairs — real differences in
        scope, cost, difficulty, and career fit, plus practice banks for both sides.
      </p>

      <div className="mt-8 grid gap-6">
        {PAIRS.map((pair) => {
          const aws = cert(pair.awsId);
          const azure = cert(pair.azureId);
          return (
            <section
              key={pair.articleSlug}
              className="rounded-xl border border-border bg-white p-6"
            >
              <h2 className="text-xs font-semibold uppercase tracking-wide text-muted">
                {pair.tier}
              </h2>
              <div className="mt-3 grid gap-4 md:grid-cols-2">
                {[aws, azure].map((c) => (
                  <div
                    key={c.id}
                    className="rounded-lg border border-border p-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 font-semibold text-accent">
                        <VendorBadge vendor={c.vendor} />
                        {c.vendor === "azure" ? c.code : `AWS ${c.code}`}
                      </span>
                      <span className="rounded-full bg-surface px-2 py-0.5 text-xs text-muted">
                        {c.vendor === "azure" ? "Azure" : "AWS"} · {c.level}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-muted">{c.name}</p>
                    <p className="mt-2 text-xs text-muted">
                      {c.questionCount} questions · {c.durationMinutes} min · $
                      {c.costUsd}
                    </p>
                    <div className="mt-3 flex gap-3 text-sm">
                      <Link
                        href={`/certifications/${c.id}`}
                        className="font-medium text-accent hover:underline"
                      >
                        Certification hub
                      </Link>
                      <Link
                        href={`/practice/${c.id}`}
                        className="font-medium text-accent hover:underline"
                      >
                        Practice bank
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm text-muted">{pair.angle}</p>
              <Link
                href={`/learn/${pair.articleSlug}`}
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
              >
                <BookOpen className="h-4 w-4" aria-hidden />
                Read the full {aws.code} vs {azure.code} breakdown
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </section>
          );
        })}
      </div>

      <section className="mt-10 rounded-xl border border-border bg-surface p-6">
        <h2 className="text-lg font-semibold">The short version</h2>
        <p className="mt-2 text-sm text-muted">
          AWS certifications are more numerous and slightly deeper per exam; Azure
          certifications map more directly to enterprise IT roles (especially where
          Microsoft 365/Entra already live). The highest-leverage path for most
          candidates: one foundational cert in your employer&rsquo;s ecosystem, then the
          associate cert — and add the cross-cloud counterpart later only if your
          org runs multi-cloud.
        </p>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "AWS vs Azure Certification Comparison",
            description:
              "Side-by-side comparisons of cross-cloud certification pairs across foundational, associate, and expert tiers.",
            numberOfItems: PAIRS.length,
          }),
        }}
      />
    </Container>
  );
}
