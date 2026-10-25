import type { Metadata } from "next";
import { Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How CloudCertPrep handles data: local-only progress storage, no required accounts, and transparent analytics.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <Container className="max-w-3xl py-10">
      <h1 className="text-3xl font-bold tracking-tight">Privacy Policy</h1>
      <p className="mt-2 text-sm text-muted">Last updated: October 25, 2026</p>
      <div className="mt-6 space-y-5 leading-relaxed text-slate-700">
        <section>
          <h2 className="text-xl font-semibold text-foreground">What we store</h2>
          <p className="mt-2">
            CloudCertPrep does not require an account. Your practice attempts,
            exam results, bookmarks, flashcard marks, and study plan are stored
            in your browser&apos;s localStorage on your device. This data is not
            transmitted to our servers and cannot be accessed by us. Clearing
            your browser data or using the &quot;Reset all progress&quot; action
            on the Progress page permanently deletes it.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground">Analytics</h2>
          <p className="mt-2">
            If analytics are enabled on this deployment, we use a
            privacy-conscious, cookieless provider to measure aggregate events
            such as page views, practice-session starts, and mock-exam
            completions. We do not send your answers, question contents, or any
            personal learning details to third parties. If analytics are not
            enabled, no tracking occurs at all.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground">Advertising & affiliates</h2>
          <p className="mt-2">
            If display advertising is enabled in the future, the ad network may
            use cookies subject to its own policies and your consent choices.
            Affiliate links, where present, are marked and covered by our{" "}
            <a href="/affiliate-disclosure" className="text-accent hover:underline">
              affiliate disclosure
            </a>
            .
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground">Data we never collect</h2>
          <p className="mt-2">
            We do not collect names, email addresses, payment information, or
            any sensitive personal data through the core learning features. If
            you email us, we use your address only to respond.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground">Contact</h2>
          <p className="mt-2">
            Questions about this policy:{" "}
            <a
              href="mailto:hello@cloudcertprep.com"
              className="text-accent hover:underline"
            >
              hello@cloudcertprep.com
            </a>
          </p>
        </section>
      </div>
    </Container>
  );
}
