import type { Metadata } from "next";
import { Container, Card } from "@/components/ui";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Report a question issue, suggest a topic, or contact the CloudCertPrep team.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <Container className="max-w-3xl py-10">
      <h1 className="text-3xl font-bold tracking-tight">Contact & Feedback</h1>
      <p className="mt-3 leading-relaxed text-slate-700">
        Found a questionable answer, a broken link, or a topic you&apos;d like
        covered? We want to hear about it — content quality is the whole point
        of this site.
      </p>
      <Card className="mt-6 space-y-4 text-sm leading-relaxed">
        <div>
          <h2 className="font-semibold text-foreground">Report a question issue</h2>
          <p className="mt-1 text-muted">
            Use the flag button on any question to mark it for review. For
            detailed corrections (especially with AWS documentation references),
            email us — include the question ID shown in reviews.
          </p>
        </div>
        <div>
          <h2 className="font-semibold text-foreground">Email</h2>
          <p className="mt-1 text-muted">
            <a
              href="mailto:hello@cloudcertprep.com"
              className="text-accent hover:underline"
            >
              hello@cloudcertprep.com
            </a>
          </p>
        </div>
        <div>
          <h2 className="font-semibold text-foreground">Suggest content</h2>
          <p className="mt-1 text-muted">
            Request practice topics, service guides, or article subjects via
            email. We prioritize coverage gaps in the official exam guide.
          </p>
        </div>
      </Card>
    </Container>
  );
}
