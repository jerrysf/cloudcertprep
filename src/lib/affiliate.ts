/**
 * Central affiliate-link configuration.
 *
 * Add real partner links here ONLY after joining a program — never fabricate
 * partnerships. Every page that renders one of these links must also render
 * the affiliate disclosure (components/affiliate-note.tsx or the
 * /affiliate-disclosure page link in the footer).
 */

export interface AffiliateLink {
  id: string;
  label: string;
  description: string;
  url: string;
  /** where this link may appear */
  contexts: ("resources" | "article" | "study-plan")[];
}

export const AFFILIATE_LINKS: AffiliateLink[] = [
  // Intentionally empty. Example shape when enrolled in a real program:
  // {
  //   id: "example-course",
  //   label: "Recommended video course",
  //   description: "A third-party SAA-C03 video course.",
  //   url: "https://partner.example.com/course?aff=you",
  //   contexts: ["resources"],
  // },
];

export function affiliateLinksFor(
  context: AffiliateLink["contexts"][number],
): AffiliateLink[] {
  return AFFILIATE_LINKS.filter((l) => l.contexts.includes(context));
}
