import type { Metadata } from "next";
import { Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "Affiliate Disclosure",
  description:
    "How CloudCertPrep uses affiliate links and how recommendations are selected.",
  alternates: { canonical: "/affiliate-disclosure" },
};

export default function AffiliateDisclosurePage() {
  return (
    <Container className="max-w-3xl py-10">
      <h1 className="text-3xl font-bold tracking-tight">Affiliate Disclosure</h1>
      <div className="mt-6 space-y-5 leading-relaxed text-slate-700">
        <p>
          Some pages on CloudCertPrep may contain links to third-party products
          or services — such as AWS training courses, books, or practice tools —
          for which we may earn a commission if you make a purchase. This comes
          at no additional cost to you.
        </p>
        <h2 className="text-xl font-semibold text-foreground">Our commitments</h2>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>Affiliate links are always marked and never disguised as editorial content.</li>
          <li>We only link to resources we believe are genuinely relevant to certification study.</li>
          <li>Commissions never influence which answers are marked correct or how content is reviewed.</li>
          <li>We do not claim that purchasing any product guarantees certification success.</li>
        </ul>
        <p>
          If no affiliate links appear on a page, none are active — the core
          practice content is and will remain free regardless of monetization.
        </p>
      </div>
    </Container>
  );
}
