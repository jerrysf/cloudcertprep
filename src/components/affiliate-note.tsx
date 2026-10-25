import Link from "next/link";
import { track, ANALYTICS_EVENTS } from "@/lib/analytics";
import { affiliateLinksFor } from "@/lib/affiliate";

/** Renders configured affiliate links for a context, or nothing if none are set. */
export function AffiliateBlock({
  context,
}: {
  context: "resources" | "article" | "study-plan";
}) {
  const links = affiliateLinksFor(context);
  if (links.length === 0) return null;
  return (
    <aside className="rounded-xl border border-border bg-card p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted">
        Recommended resources{" "}
        <Link href="/affiliate-disclosure" className="underline">
          (ad)
        </Link>
      </p>
      <ul className="mt-3 space-y-3">
        {links.map((l) => (
          <li key={l.id}>
            <a
              href={l.url}
              target="_blank"
              rel="sponsored noopener noreferrer"
              onClick={() => track(ANALYTICS_EVENTS.affiliateClick, { id: l.id })}
              className="text-sm font-medium text-accent hover:underline"
            >
              {l.label}
            </a>
            <p className="text-xs text-muted">{l.description}</p>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-muted">
        We may earn a commission at no cost to you. See our{" "}
        <Link href="/affiliate-disclosure" className="underline">
          affiliate disclosure
        </Link>
        .
      </p>
    </aside>
  );
}
