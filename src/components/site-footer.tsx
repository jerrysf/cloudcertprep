import Link from "next/link";
import { Cloud } from "lucide-react";
import { AWS_TRADEMARK_DISCLAIMER, SITE } from "@/lib/site";
import { CERTIFICATIONS } from "@/lib/content/certifications";

const PRODUCT_LINKS = [
  { label: "Practice Questions", href: "/practice" },
  { label: "Question Bank", href: "/questions" },
  { label: "Mock Exams", href: "/mock-exam" },
  { label: "Flashcards", href: "/flashcards" },
  { label: "Study Plan", href: "/study-plan" },
  { label: "Progress", href: "/progress" },
];

const RESOURCE_LINKS = [
  { label: "Certifications", href: "/certifications" },
  { label: "Cert Roadmap", href: "/certifications/roadmap" },
  { label: "Study Guides", href: "/services" },
  { label: "Articles", href: "/learn" },
  { label: "SAA-C03 Exam Guide", href: "/learn/saa-c03-exam-guide" },
  { label: "Cheat Sheet", href: "/learn/saa-c03-cheat-sheet" },
  { label: "RSS Feed", href: "/feed.xml" },
];

const LEGAL_LINKS = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Use", href: "/terms" },
  { label: "Affiliate Disclosure", href: "/affiliate-disclosure" },
  { label: "Disclaimer", href: "/disclaimer" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2 font-semibold">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent text-white">
                <Cloud className="h-3.5 w-3.5" aria-hidden />
              </span>
              {SITE.name}
            </div>
            <p className="mt-3 max-w-xs text-sm text-muted">{SITE.tagline}</p>
            <p className="mt-4 text-xs leading-relaxed text-muted">
              {AWS_TRADEMARK_DISCLAIMER}
            </p>
          </div>

          <nav aria-label="Product">
            <h3 className="text-sm font-semibold">Product</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {PRODUCT_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Resources">
            <h3 className="text-sm font-semibold">Resources</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {RESOURCE_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Legal">
            <h3 className="text-sm font-semibold">Company</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {LEGAL_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE.name}. Original practice content
            aligned to published exam guides — always verify against official
            AWS documentation.
          </p>
          <p className="flex flex-wrap gap-x-3 gap-y-1">
            {CERTIFICATIONS.slice(0, 5).map((c) => (
              <Link
                key={c.id}
                href={`/certifications/${c.id}`}
                className="hover:text-foreground"
              >
                {c.code}
              </Link>
            ))}
          </p>
        </div>
      </div>
    </footer>
  );
}
