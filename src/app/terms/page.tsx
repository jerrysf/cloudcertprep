import type { Metadata } from "next";
import { Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of use for CloudCertPrep's free AWS certification study resources.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <Container className="max-w-3xl py-10">
      <h1 className="text-3xl font-bold tracking-tight">Terms of Use</h1>
      <p className="mt-2 text-sm text-muted">Last updated: October 25, 2026</p>
      <div className="mt-6 space-y-5 leading-relaxed text-slate-700">
        <section>
          <h2 className="text-xl font-semibold text-foreground">The service</h2>
          <p className="mt-2">
            CloudCertPrep provides free practice questions, explanations, mock
            exams, and study resources for AWS certification preparation. The
            service is provided &quot;as is&quot; without warranties of any
            kind.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground">No guarantee of exam results</h2>
          <p className="mt-2">
            Practice scores on this site are estimates using simple percentage
            scoring. They do not replicate AWS&apos;s scaled scoring, and using
            this site does not guarantee passing any certification exam. Exam
            content and requirements can change — always verify against official
            AWS documentation and the current exam guide.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground">Acceptable use</h2>
          <p className="mt-2">
            Do not scrape, bulk-copy, or republish our original question
            content. Do not use the site to violate AWS&apos;s certification
            agreement, including sharing or seeking real exam content
            (&quot;exam dumps&quot;).
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground">Intellectual property</h2>
          <p className="mt-2">
            All original practice questions, explanations, and articles are the
            property of CloudCertPrep. AWS and all related marks are trademarks
            of Amazon.com, Inc. or its affiliates — see our{" "}
            <a href="/disclaimer" className="text-accent hover:underline">
              disclaimer
            </a>
            .
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground">Limitation of liability</h2>
          <p className="mt-2">
            To the maximum extent permitted by law, CloudCertPrep is not liable
            for exam outcomes, lost data (including locally stored progress), or
            any indirect damages arising from use of the site.
          </p>
        </section>
      </div>
    </Container>
  );
}
