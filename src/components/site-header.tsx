import Link from "next/link";
import { Cloud } from "lucide-react";
import { SITE } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-foreground"
        >
          <Cloud className="h-6 w-6 text-accent" aria-hidden />
          <span>{SITE.name}</span>
        </Link>
        <nav
          aria-label="Primary"
          className="hidden flex-1 items-center gap-5 text-sm text-muted md:flex"
        >
          {SITE.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-3 md:ml-0">
          <Link
            href="/practice"
            className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-800"
          >
            Start Practicing
          </Link>
        </div>
      </div>
      <nav
        aria-label="Primary mobile"
        className="flex gap-4 overflow-x-auto border-t border-border px-4 py-2 text-xs text-muted md:hidden"
      >
        {SITE.nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="whitespace-nowrap hover:text-foreground"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
