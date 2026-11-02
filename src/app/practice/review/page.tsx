import type { Metadata } from "next";
import { ReviewSession } from "@/components/review-session";
import { Breadcrumbs, Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "Review Queue — Bookmarked & Flagged Questions",
  description:
    "Re-attempt your bookmarked and flagged questions — a focused review queue built from your own marks.",
  alternates: { canonical: "/practice/review" },
  robots: { index: false, follow: false },
};

export default function ReviewPage() {
  return (
    <Container className="py-10">
      <Breadcrumbs
        items={[
          { label: "Practice", href: "/practice" },
          { label: "Review queue" },
        ]}
      />
      <div className="mt-4">
        <h1 className="text-3xl font-bold tracking-tight">Review queue</h1>
        <p className="mt-2 max-w-2xl text-muted">
          Every question you&apos;ve bookmarked or flagged — re-attempt them
          here until the queue is clear.
        </p>
      </div>
      <div className="mt-8">
        <ReviewSession />
      </div>
    </Container>
  );
}
