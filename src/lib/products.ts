/**
 * Digital products sold via external checkout (Gumroad / Lemon Squeezy).
 * url === null renders a "coming soon" card with newsletter capture —
 * fill in the storefront link when the product is live. Never fabricate
 * availability or discounts.
 */
export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  priceUsd: number;
  url: string | null;
  includes: string[];
  badge?: string;
}

export const PRODUCTS: Product[] = [
  {
    id: "cheat-sheet-bundle",
    name: "AWS Certification Cheat Sheet Bundle",
    tagline: "All 9 certifications, one printable PDF pack",
    description:
      "Every CloudCertPrep cheat sheet in a single branded PDF bundle — CLF, AIF, SAA, DVA, CloudOps (SOA), SAP, DEA, Security, and Advanced Networking. Condensed exam-day references, organized for printing.",
    priceUsd: 12,
    url: process.env.NEXT_PUBLIC_PRODUCT_CHEAT_BUNDLE ?? null,
    includes: [
      "9 cheat sheets — one per covered certification",
      "Print-optimized layout (Letter/A4 friendly)",
      "Service distinctions, decision tables, and exam traps",
      "Free updates as new sheets are published",
    ],
    badge: "Best value",
  },
  {
    id: "clf-c02-sprint-pack",
    name: "CLF-C02 Exam Sprint Pack",
    tagline: "Cloud Practitioner — guide + sheet + question drill",
    description:
      "A focused PDF pack for CLF-C02: the exam guide condensed to a plan, the full cheat sheet, and a curated drill of the question types AWS repeats. Built for the final two weeks.",
    priceUsd: 15,
    url: process.env.NEXT_PUBLIC_PRODUCT_CLF_SPRINT ?? null,
    includes: [
      "CLF-C02 exam guide distilled to a 2-week plan",
      "Full CLF cheat sheet",
      "Curated question-type drill with explanations",
      "Test-day checklist",
    ],
  },
  {
    id: "saa-c03-sprint-pack",
    name: "SAA-C03 Exam Sprint Pack",
    tagline: "Solutions Architect Associate — the flagship pack",
    description:
      "The SAA-C03 pack: exam-day cheat sheet, a distilled prep plan, the decision rules that answer 'which service' questions, and a curated drill across all four domains.",
    priceUsd: 19,
    url: process.env.NEXT_PUBLIC_PRODUCT_SAA_SPRINT ?? null,
    includes: [
      "SAA-C03 exam guide distilled to a 4-week plan",
      "Full SAA cheat sheet",
      "Service-selection decision rules (the exam's core skill)",
      "Curated drill across all four domains",
    ],
    badge: "Most popular",
  },
];
