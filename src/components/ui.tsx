import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto max-w-6xl px-4 sm:px-6", className)}>
      {children}
    </div>
  );
}

export function Card({
  children,
  className,
  hover = false,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-white p-6 shadow-sm transition-all duration-150",
        hover && "hover:-translate-y-0.5 hover:shadow-md hover:border-slate-300",
        className,
      )}
    >
      {children}
    </div>
  );
}

export type BadgeTone =
  | "neutral"
  | "accent"
  | "success"
  | "danger"
  | "warning"
  | "violet"
  | "emerald"
  | "amber";

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: BadgeTone;
  className?: string;
}) {
  const tones: Record<BadgeTone, string> = {
    neutral: "bg-slate-100 text-slate-700 ring-slate-200",
    accent: "bg-accent-soft text-accent ring-blue-200",
    success: "bg-emerald-50 text-emerald-800 ring-emerald-200",
    danger: "bg-red-50 text-red-800 ring-red-200",
    warning: "bg-amber-50 text-amber-800 ring-amber-200",
    violet: "bg-violet-50 text-violet-800 ring-violet-200",
    emerald: "bg-emerald-50 text-emerald-800 ring-emerald-200",
    amber: "bg-amber-50 text-amber-800 ring-amber-200",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Consistent color coding for certification levels across the site. */
export function CertLevelBadge({
  level,
  className,
}: {
  level: "foundational" | "associate" | "professional" | "specialty" | string;
  className?: string;
}) {
  const styles: Record<string, { label: string; cls: string }> = {
    foundational: {
      label: "Foundational",
      cls: "bg-emerald-50 text-emerald-800 ring-emerald-200",
    },
    associate: {
      label: "Associate",
      cls: "bg-accent-soft text-accent ring-blue-200",
    },
    professional: {
      label: "Professional",
      cls: "bg-violet-50 text-violet-800 ring-violet-200",
    },
    specialty: {
      label: "Specialty",
      cls: "bg-amber-50 text-amber-800 ring-amber-200",
    },
  };
  const s = styles[level] ?? {
    label: level,
    cls: "bg-slate-100 text-slate-700 ring-slate-200",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset",
        s.cls,
        className,
      )}
    >
      {s.label}
    </span>
  );
}

const btnBase =
  "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-150 active:scale-[0.98]";

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
}) {
  const styles = {
    primary:
      "bg-accent text-white shadow-sm hover:bg-accent-hover hover:shadow",
    secondary:
      "border border-border bg-white text-foreground shadow-sm hover:border-slate-300 hover:bg-slate-50",
    ghost: "text-accent hover:bg-accent-soft",
  };
  return (
    <Link href={href} className={cn(btnBase, styles[variant], className)}>
      {children}
    </Link>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-2xl">
      {eyebrow ? (
        <p className="text-sm font-semibold uppercase tracking-wide text-accent">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-2 text-muted">{description}</p>
      ) : null}
    </div>
  );
}

export function Breadcrumbs({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-muted">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-1.5">
            {i > 0 && <span aria-hidden>/</span>}
            {item.href ? (
              <Link
                href={item.href}
                className="rounded-sm transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-foreground">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
