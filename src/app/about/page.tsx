import type { Metadata } from "next";
import { Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "About",
  description:
    "CloudCertPrep is a free, independent study platform for the AWS Certified Solutions Architect – Associate exam. Learn about our editorial standards.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <Container className="max-w-3xl py-10">
      <h1 className="text-3xl font-bold tracking-tight">About CloudCertPrep</h1>
      <div className="mt-6 space-y-4 leading-relaxed text-slate-700">
        <p>
          CloudCertPrep is a free study platform for the AWS Certified Solutions
          Architect – Associate (SAA-C03) exam. We built it because the best way
          to learn architecture decisions is to practice them — with
          explanations that teach the reasoning, not just the answer key.
        </p>
        <h2 className="pt-2 text-xl font-semibold text-foreground">
          Editorial standards
        </h2>
        <p>
          Every practice question is original — written for this site, not
          scraped from dumps or recalled exam content. Each question goes
          through a schema-validated pipeline with a review status, and only
          reviewed-and-published questions appear on the site.
        </p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>Explanations cover why each incorrect option is wrong, not only why the right one is right.</li>
          <li>Every question links to official AWS documentation for verification.</li>
          <li>Technical facts are checked against current AWS docs; anything unverifiable stays unpublished.</li>
          <li>Exam-domain weights and exam details are re-verified against the official exam guide before content updates.</li>
        </ul>
        <h2 className="pt-2 text-xl font-semibold text-foreground">
          Independence
        </h2>
        <p>
          CloudCertPrep is independently operated and is not affiliated with,
          endorsed by, or sponsored by Amazon Web Services. Exam details can
          change — always confirm against the official AWS exam guide linked
          throughout the site.
        </p>
      </div>
    </Container>
  );
}
