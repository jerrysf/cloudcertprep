import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { Check, ExternalLink } from "lucide-react";
import { PRODUCTS } from "@/lib/products";
import { Badge, Card, Container, SectionHeading } from "@/components/ui";
import { NewsletterForm } from "@/components/newsletter-form";

export const metadata: Metadata = pageMetadata({
  title: "Study Packs & Cheat Sheets — CloudCertPrep Shop",
  description:
    "Printable AWS certification cheat-sheet bundles and exam sprint packs — condensed references built from official exam guides, delivered as instant PDFs.",
  path: "/shop",
});

export default function ShopPage() {
  return (
    <Container className="py-10">
      <SectionHeading
        eyebrow="Shop"
        title="Study packs that travel with you"
        description="Everything on this site stays free. These packs bundle our guides into printable, offline PDFs for the final stretch before exam day — instant download, pay once."
      />

      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        {PRODUCTS.map((p) => (
          <Card
            key={p.id}
            className="flex flex-col border-2"
            hover
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="font-semibold leading-snug">{p.name}</h2>
                <p className="mt-0.5 text-xs text-muted">{p.tagline}</p>
              </div>
              {p.badge ? <Badge tone="accent">{p.badge}</Badge> : null}
            </div>
            <p className="mt-3 text-sm text-muted">{p.description}</p>
            <ul className="mt-4 space-y-1.5 text-sm">
              {p.includes.map((i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600"
                    aria-hidden
                  />
                  <span className="text-muted">{i}</span>
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-5">
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-bold">${p.priceUsd}</span>
                <span className="text-xs text-muted">one-time</span>
              </div>
              {p.url ? (
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-accent-hover"
                >
                  Buy now
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                </a>
              ) : (
                <div className="mt-3 rounded-lg border border-dashed border-border bg-slate-50 px-4 py-2.5 text-center text-sm text-muted">
                  Coming soon — join the list below for launch
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Card>
          <h2 className="font-semibold">Why buy a pack?</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li>
              <strong className="text-foreground">Offline &amp; printable</strong> — 
              read on a plane, annotate by hand, tape to your monitor the week
              before the exam.
            </li>
            <li>
              <strong className="text-foreground">Curated, not scraped</strong> — 
              same original content as the site, condensed and organized for
              revision, never real-exam dumps.
            </li>
            <li>
              <strong className="text-foreground">Supports the site</strong> — 
              packs fund question-writing; the free bank keeps growing.
            </li>
          </ul>
        </Card>
        <NewsletterForm />
      </div>

      <p className="mt-8 text-xs text-muted">
        Checkout is handled by our storefront partner; you will leave this site
        to complete purchase. Questions or refund requests:{" "}
        <Link href="/contact" className="text-accent hover:underline">
          contact us
        </Link>
        .
      </p>
    </Container>
  );
}
