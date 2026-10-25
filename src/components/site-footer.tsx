import Link from "next/link";
import { Cloud } from "lucide-react";
import { AWS_TRADEMARK_DISCLAIMER, SITE } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-md">
            <div className="flex items-center gap-2 font-semibold">
              <Cloud className="h-5 w-5 text-accent" aria-hidden />
              {SITE.name}
            </div>
            <p className="mt-2 text-sm text-muted">{SITE.tagline}</p>
            <p className="mt-4 text-xs leading-relaxed text-muted">
              {AWS_TRADEMARK_DISCLAIMER}
            </p>
          </div>
          <nav aria-label="Footer" className="text-sm">
            <ul className="grid grid-cols-2 gap-x-10 gap-y-2">
              {SITE.footer.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/learn" className="text-muted hover:text-foreground">
                  Learn Articles
                </Link>
              </li>
              <li>
                <Link
                  href="/study-plan"
                  className="text-muted hover:text-foreground"
                >
                  Study Plan
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <p className="mt-8 border-t border-border pt-6 text-xs text-muted">
          © {new Date().getFullYear()} {SITE.name}. Practice content is original
          and aligned to the published exam guide — always verify against the
          official AWS documentation.
        </p>
      </div>
    </footer>
  );
}
