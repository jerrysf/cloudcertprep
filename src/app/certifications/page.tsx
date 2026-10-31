import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, DollarSign, FileText } from "lucide-react";
import { CERTIFICATIONS } from "@/lib/content/certifications";
import { publishedByCert } from "@/lib/content/questions";
import { Badge, Card, Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "AWS Certification Practice Exams — All Certifications",
  description:
    "Free practice questions and exam guides for AWS certifications — Cloud Practitioner, AI Practitioner, Solutions Architect, Developer, SysOps, Data Engineer, Security, Networking, and Professional tracks.",
  alternates: { canonical: "/certifications" },
};

const LEVEL_ORDER = [
  "foundational",
  "associate",
  "professional",
  "specialty",
] as const;

const LEVEL_LABEL: Record<string, string> = {
  foundational: "Foundational",
  associate: "Associate",
  professional: "Professional",
  specialty: "Specialty",
};

export default function CertificationsPage() {
  const grouped = LEVEL_ORDER.map((level) => ({
    level,
    certs: CERTIFICATIONS.filter((c) => c.level === level),
  })).filter((g) => g.certs.length > 0);

  return (
    <Container className="py-10">
      <h1 className="text-3xl font-bold tracking-tight">
        AWS certification practice
      </h1>
      <p className="mt-3 max-w-2xl text-muted">
        Choose your certification to see exam details, domain weights, and
        available practice questions. Every question includes per-option
        explanations and official AWS documentation links.
      </p>

      <div className="mt-10 space-y-10">
        {grouped.map(({ level, certs }) => (
          <section key={level}>
            <h2 className="text-xl font-semibold">{LEVEL_LABEL[level]}</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {certs.map((cert) => {
                const count = publishedByCert(cert.id).length;
                return (
                  <Link
                    key={cert.id}
                    href={`/certifications/${cert.id}`}
                    className="group rounded-xl border border-border bg-white p-5 transition-shadow hover:shadow-md"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-sm font-semibold text-accent">
                            {cert.code}
                          </span>
                          <Badge>{LEVEL_LABEL[cert.level]}</Badge>
                          {cert.featured ? (
                            <Badge tone="accent">Popular</Badge>
                          ) : null}
                        </div>
                        <h3 className="mt-2 font-semibold leading-snug">
                          {cert.name.replace("AWS Certified ", "")}
                        </h3>
                        <p className="mt-1 text-sm text-muted">{cert.tagline}</p>
                      </div>
                      <ArrowRight
                        className="mt-1 h-5 w-5 shrink-0 text-muted transition-transform group-hover:translate-x-1 group-hover:text-accent"
                        aria-hidden
                      />
                    </div>
                    <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted">
                      <span className="inline-flex items-center gap-1">
                        <FileText className="h-3.5 w-3.5" aria-hidden />
                        {cert.questionCount} questions
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" aria-hidden />
                        {cert.durationMinutes} min
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <DollarSign className="h-3.5 w-3.5" aria-hidden />
                        ${cert.costUsd}
                      </span>
                      <span
                        className={
                          count > 0
                            ? "font-medium text-accent"
                            : "text-muted"
                        }
                      >
                        {count} practice questions
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      <Card className="mt-10 text-sm text-muted">
        Exam details are compiled from AWS&apos;s public certification pages.
        Always confirm current exam codes, costs, and domain weights on the
        official AWS certification page before booking.
      </Card>
    </Container>
  );
}
