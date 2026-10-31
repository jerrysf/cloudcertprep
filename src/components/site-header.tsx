import Link from "next/link";
import { Cloud } from "lucide-react";
import { SITE } from "@/lib/site";
import { NavLinks } from "@/components/nav-links";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-foreground"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-white shadow-sm">
            <Cloud className="h-4 w-4" aria-hidden />
          </span>
          <span className="tracking-tight">{SITE.name}</span>
        </Link>
        <nav
          aria-label="Primary"
          className="hidden flex-1 items-center gap-5 text-sm text-muted md:flex"
        >
          <NavLinks />
        </nav>
        <div className="ml-auto flex items-center gap-3 md:ml-0">
          <Link
            href="/practice"
            className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-accent-hover hover:shadow active:scale-[0.98]"
          >
            Start Practicing
          </Link>
        </div>
      </div>
      <nav
        aria-label="Primary mobile"
        className="flex gap-4 overflow-x-auto border-t border-border px-4 py-2 text-xs text-muted md:hidden"
      >
        <NavLinks mobile />
      </nav>
    </header>
  );
}
