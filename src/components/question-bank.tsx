"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge, Card } from "@/components/ui";

export interface BankQuestion {
  id: string;
  slug: string;
  difficulty: string;
  text: string;
}

export interface BankTopic {
  slug: string;
  name: string;
  questions: BankQuestion[];
}

export interface BankDomain {
  id: string;
  number: number;
  name: string;
  weight: number;
  topics: BankTopic[];
}

export interface BankCertGroup {
  certId: string;
  code: string;
  name: string;
  domains: BankDomain[];
  count: number;
}

export function QuestionBankBrowser({
  groups,
  total,
}: {
  groups: BankCertGroup[];
  total: number;
}) {
  const [certFilter, setCertFilter] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return groups
      .filter((g) => !certFilter || g.certId === certFilter)
      .map((g) => {
        if (!q) return g;
        const domains = g.domains
          .map((d) => ({
            ...d,
            topics: d.topics
              .map((t) => ({
                ...t,
                questions: t.questions.filter((qq) =>
                  qq.text.toLowerCase().includes(q),
                ),
              }))
              .filter((t) => t.questions.length > 0),
          }))
          .filter((d) => d.topics.length > 0);
        const count = domains.reduce(
          (n, d) =>
            n + d.topics.reduce((m, t) => m + t.questions.length, 0),
          0,
        );
        return { ...g, domains, count };
      })
      .filter((g) => g.count > 0);
  }, [groups, certFilter, query]);

  const filteredTotal = visible.reduce((n, g) => n + g.count, 0);
  const searching = query.trim().length > 0;

  return (
    <div>
      <div className="sticky top-16 z-30 -mx-4 border-b border-border bg-background/95 px-4 py-3 backdrop-blur-md sm:mx-0 sm:rounded-xl sm:border sm:px-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="relative flex-1">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
              aria-hidden
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search questions…"
              className="w-full rounded-lg border border-border bg-white py-2 pl-9 pr-3 text-sm shadow-sm transition-colors focus:border-accent focus:outline-none"
              aria-label="Search questions"
            />
          </label>
          <div
            className="flex flex-wrap gap-1.5"
            role="group"
            aria-label="Filter by certification"
          >
            <button
              type="button"
              onClick={() => setCertFilter(null)}
              aria-pressed={certFilter === null}
              className={cn(
                "rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                certFilter === null
                  ? "bg-accent text-white shadow-sm"
                  : "bg-slate-100 text-muted hover:bg-slate-200 hover:text-foreground",
              )}
            >
              All
            </button>
            {groups.map((g) => (
              <button
                key={g.certId}
                type="button"
                onClick={() =>
                  setCertFilter(certFilter === g.certId ? null : g.certId)
                }
                aria-pressed={certFilter === g.certId}
                className={cn(
                  "rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                  certFilter === g.certId
                    ? "bg-accent text-white shadow-sm"
                    : "bg-slate-100 text-muted hover:bg-slate-200 hover:text-foreground",
                )}
              >
                {g.code}
              </button>
            ))}
          </div>
        </div>
        {(searching || certFilter) && (
          <p className="mt-2 text-xs text-muted" role="status">
            {filteredTotal} of {total} questions shown
          </p>
        )}
      </div>

      <div className="mt-10 space-y-12">
        {visible.length === 0 ? (
          <Card className="text-sm text-muted">
            No questions match
            {searching ? ` “${query.trim()}”` : ""}. Try a different search or
            clear the certification filter.
          </Card>
        ) : (
          visible.map((g) => (
            <section key={g.certId} id={g.certId}>
              <div className="flex flex-wrap items-baseline gap-3">
                <h2 className="text-xl font-semibold">
                  <Link
                    href={`/certifications/${g.certId}`}
                    className="hover:text-accent"
                  >
                    {g.code}
                  </Link>
                </h2>
                <span className="text-sm text-muted">{g.name}</span>
                <Badge tone="accent">{g.count} questions</Badge>
              </div>
              <div className="mt-4 space-y-6">
                {g.domains.map((d) => (
                  <div key={d.id}>
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">
                      Domain {d.number}: {d.name} ({d.weight}%)
                    </h3>
                    <div className="mt-3 space-y-4">
                      {d.topics.map((t) => (
                        <Card key={t.slug}>
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <h4 className="font-medium">{t.name}</h4>
                            <Link
                              href={`/practice/${t.slug}`}
                              className="text-sm text-accent hover:underline"
                            >
                              Practice this topic →
                            </Link>
                          </div>
                          <ul className="mt-3 space-y-2">
                            {t.questions.map((q) => (
                              <li
                                key={q.id}
                                className="flex items-baseline gap-2 text-sm"
                              >
                                <Badge>{q.difficulty}</Badge>
                                <Link
                                  href={`/questions/${q.slug}`}
                                  className="text-muted hover:text-accent"
                                >
                                  {q.text}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))
        )}
      </div>
    </div>
  );
}
