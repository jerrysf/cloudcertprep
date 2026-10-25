import type { Metadata } from "next";
import { EXAM } from "@/lib/content/domains";
import { AWS_TRADEMARK_DISCLAIMER } from "@/lib/site";
import { Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "Certification and trademark disclaimer: CloudCertPrep is an independent study resource, not affiliated with AWS.",
  alternates: { canonical: "/disclaimer" },
};

export default function DisclaimerPage() {
  return (
    <Container className="max-w-3xl py-10">
      <h1 className="text-3xl font-bold tracking-tight">Disclaimer</h1>
      <div className="mt-6 space-y-5 leading-relaxed text-slate-700">
        <section>
          <h2 className="text-xl font-semibold text-foreground">Independence & trademarks</h2>
          <p className="mt-2">{AWS_TRADEMARK_DISCLAIMER}</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground">Original content only</h2>
          <p className="mt-2">
            All practice questions on this site are original works written for
            CloudCertPrep and aligned to the published {EXAM.code} exam guide.
            We do not reproduce, paraphrase, or distribute real certification
            exam questions, and we ask users not to share them.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground">Exam accuracy</h2>
          <p className="mt-2">
            Exam details (question count, duration, scoring, domain weights)
            were verified against the official AWS exam guide at publication
            time but can change. Always confirm at the official page:{" "}
            <a
              href={EXAM.examGuideUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              AWS Certified Solutions Architect – Associate
            </a>
            .
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground">Scoring</h2>
          <p className="mt-2">
            Practice and mock-exam scores are simple percentage estimates. AWS
            uses a scaled score of 100–1,000 with a minimum passing score of
            {` ${EXAM.passingScaledScore}`} and a compensatory model. Our
            percentages are directional indicators, not predictions or
            guarantees of exam performance.
          </p>
        </section>
      </div>
    </Container>
  );
}
