import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { CERTIFICATIONS, getCertification } from "@/lib/content/certifications";
import { publishedByCert } from "@/lib/content/questions";
import { ROADMAPS, type RoadmapStep } from "@/lib/content/roadmaps";
import { Badge, Breadcrumbs, CertLevelBadge, Container } from "@/components/ui";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "AWS Certification Roadmap — Recommended Path by Role",
  description:
    "Which AWS certifications to take, in which order — role-based roadmaps for Solutions Architect, DevOps, Developer, Security, Data, AI/ML, and Networking careers.",
  alternates: { canonical: "/certifications/roadmap" },
};

const LEVEL_LADDER = [
  {
    label: "Foundational",
    cls: "bg-emerald-500",
    certs: "CLF-C02 · AIF-C01",
    note: "Entry point — no experience needed",
  },
  {
    label: "Associate",
    cls: "bg-blue-500",
    certs: "SAA-C03 · DVA-C02 · SOA-C03 · DEA-C01",
    note: "Role-level skills — the main career certs",
  },
  {
    label: "Professional",
    cls: "bg-violet-500",
    certs: "SAP-C02 · DOP-C02",
    note: "Org-wide design and deep expertise",
  },
  {
    label: "Specialty",
    cls: "bg-amber-500",
    certs: "SCS-C03 · ANS-C01",
    note: "Deep dives — security, networking",
  },
];

const KIND_STYLE: Record<RoadmapStep["kind"], { label: string; cls: string }> = {
  core: { label: "Recommended", cls: "bg-accent-soft text-accent ring-blue-200" },
  optional: {
    label: "Optional",
    cls: "bg-slate-100 text-slate-600 ring-slate-200",
  },
  stretch: {
    label: "Stretch",
    cls: "bg-violet-50 text-violet-700 ring-violet-200",
  },
};

function StepCard({ step, index }: { step: RoadmapStep; index: number }) {
  const kind = KIND_STYLE[step.kind];
  const cert = step.certId ? getCertification(step.certId) : undefined;
  const code = cert?.code ?? step.externalCode!;
  const name =
    cert?.name.replace("AWS Certified ", "") ?? step.externalName ?? "";
  const level = cert?.level ?? step.externalLevel ?? "associate";
  const covered = !!cert;
  const questionCount = cert ? publishedByCert(cert.id).length : 0;

  const inner = (
    <div
      className={cn(
        "h-full rounded-xl border p-4 transition-all",
        covered
          ? "border-border bg-white hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
          : "border-dashed border-slate-300 bg-slate-50",
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <span
          className={cn(
            "font-mono text-sm font-bold",
            covered ? "text-accent" : "text-slate-400",
          )}
        >
          {code}
        </span>
        <span
          className={cn(
            "rounded-full px-2 py-0.5 text-[10px] font-semibold ring-1",
            kind.cls,
          )}
        >
          {kind.label}
        </span>
      </div>
      <p
        className={cn(
          "mt-1.5 text-sm font-semibold leading-snug",
          !covered && "text-slate-500",
        )}
      >
        {name}
      </p>
      <div className="mt-2 flex flex-wrap items-center gap-1.5">
        <CertLevelBadge level={level} />
        {covered && questionCount > 0 ? (
          <Badge>{questionCount} questions</Badge>
        ) : null}
        {!covered ? (
          <span className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
            Not covered yet
          </span>
        ) : null}
      </div>
      {step.note ? (
        <p className="mt-2 text-xs leading-relaxed text-muted">{step.note}</p>
      ) : null}
    </div>
  );

  return (
    <li className="relative flex min-w-0 flex-1 items-stretch">
      {index > 0 ? (
        <ChevronRight
          className="absolute -left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-slate-300 max-md:hidden"
          aria-hidden
        />
      ) : null}
      <span className="mr-3 mt-4 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-800 text-xs font-bold text-white">
        {index + 1}
      </span>
      {covered ? (
        <Link href={`/certifications/${cert.id}`} className="min-w-0 flex-1">
          {inner}
        </Link>
      ) : (
        <div className="min-w-0 flex-1">{inner}</div>
      )}
    </li>
  );
}

export default function RoadmapPage() {
  return (
    <Container className="py-10">
      <Breadcrumbs
        items={[
          { label: "Certifications", href: "/certifications" },
          { label: "Roadmap" },
        ]}
      />

      <h1 className="mt-4 text-3xl font-bold tracking-tight">
        AWS certification roadmaps
      </h1>
      <p className="mt-3 max-w-2xl text-muted">
        Which certifications to take — and in which order — for seven common
        AWS career paths. Solid badges link to our practice banks; dashed
        badges are AWS certs we don&apos;t cover yet.
      </p>

      {/* AWS level ladder */}
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {LEVEL_LADDER.map((lvl) => (
          <div
            key={lvl.label}
            className="rounded-xl border border-border bg-white p-4"
          >
            <div className="flex items-center gap-2">
              <span
                className={cn("h-2.5 w-2.5 rounded-full", lvl.cls)}
                aria-hidden
              />
              <span className="text-sm font-bold">{lvl.label}</span>
            </div>
            <p className="mt-1.5 font-mono text-[11px] text-muted">
              {lvl.certs}
            </p>
            <p className="mt-1 text-xs text-muted">{lvl.note}</p>
          </div>
        ))}
      </div>

      {/* Role roadmaps */}
      <div className="mt-12 space-y-10">
        {ROADMAPS.map((r) => (
          <section key={r.slug}>
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h2 className="text-xl font-bold">{r.title}</h2>
              <span className="text-sm text-muted">{r.audience}</span>
            </div>
            <p className="mt-1 max-w-3xl text-sm text-muted">{r.description}</p>
            <ol className="mt-5 flex flex-col gap-4 md:flex-row md:items-stretch md:gap-6">
              {r.steps.map((step, i) => (
                <StepCard key={i} step={step} index={i} />
              ))}
            </ol>
          </section>
        ))}
      </div>

      <div className="mt-12 rounded-xl border border-accent/30 bg-accent-soft p-6">
        <p className="font-semibold">Not sure where to start?</p>
        <p className="mt-1 text-sm text-muted">
          Most learners start with CLF-C02 (fundamentals) or jump straight to
          SAA-C03 (the most widely recognized Associate cert). Compare all
          certifications, exam costs, and domain weights on the directory.
        </p>
        <Link
          href="/certifications"
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-accent-hover active:scale-[0.98]"
        >
          Compare all {CERTIFICATIONS.length} certifications
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { label: "Certifications", href: "/certifications" },
              { label: "Roadmap", href: "/certifications/roadmap" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": ROADMAPS.map((r) => ({
              "@type": "ItemList",
              name: `AWS certification path — ${r.title}`,
              description: r.description,
              itemListOrder: "https://schema.org/ItemListOrderAscending",
              numberOfItems: r.steps.length,
              itemListElement: r.steps.map((s, i) => {
                const c = s.certId ? getCertification(s.certId) : undefined;
                return {
                  "@type": "ListItem",
                  position: i + 1,
                  name: `${c?.code ?? s.externalCode} — ${
                    c?.name ?? s.externalName
                  }`,
                  ...(c
                    ? { url: `/certifications/${c.id}` }
                    : {}),
                };
              }),
            })),
          }),
        }}
      />
    </Container>
  );
}
