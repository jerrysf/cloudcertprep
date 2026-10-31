import type { Metadata } from "next";
import { MistakesSession } from "@/components/mistakes-session";
import { Breadcrumbs, Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "Review Your Missed Questions",
  description:
    "Re-attempt the questions you've answered incorrectly — targeted review from your local practice history.",
  alternates: { canonical: "/practice/mistakes" },
  robots: { index: false, follow: false },
};

export default function MistakesPage() {
  return (
    <Container className="py-10">
      <Breadcrumbs
        items={[
          { label: "Practice", href: "/practice" },
          { label: "Review mistakes" },
        ]}
      />
      <div className="mt-4">
        <h1 className="text-3xl font-bold tracking-tight">Review mistakes</h1>
        <p className="mt-2 max-w-2xl text-muted">
          Every question you&apos;ve answered incorrectly — re-attempt them
          here. Correct answers clear them from the queue.
        </p>
      </div>
      <div className="mt-8">
        <MistakesSession />
      </div>
    </Container>
  );
}
