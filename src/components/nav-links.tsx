"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { SITE } from "@/lib/site";

export function NavLinks({ mobile = false }: { mobile?: boolean }) {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  if (mobile) {
    return (
      <>
        {SITE.nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive(item.href) ? "page" : undefined}
            className={cn(
              "whitespace-nowrap transition-colors hover:text-foreground",
              isActive(item.href) && "font-semibold text-accent",
            )}
          >
            {item.label}
          </Link>
        ))}
      </>
    );
  }

  return (
    <>
      {SITE.nav.map((item) => {
        const active = isActive(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "relative py-1 transition-colors hover:text-foreground",
              active && "font-semibold text-foreground",
            )}
          >
            {item.label}
            <span
              aria-hidden
              className={cn(
                "absolute inset-x-0 -bottom-[5px] h-0.5 rounded-full bg-accent transition-opacity",
                active ? "opacity-100" : "opacity-0",
              )}
            />
          </Link>
        );
      })}
    </>
  );
}
