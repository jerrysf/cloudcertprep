"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { DOMAINS, getDomain } from "@/lib/content/domains";
import { TOPICS } from "@/lib/content/topics";
import type { DomainId, Difficulty } from "@/lib/content/schema";
import type { Question } from "@/lib/content/schema";
import { cn } from "@/lib/utils";
import { Badge, Card } from "@/components/ui";

/**
 * Client-side filtering keeps a single canonical /practice URL —
 * no indexable thin filter pages.
 */
export function PracticeHub({ questions }: { questions: Question[] }) {
  const [domain, setDomain] = useState<DomainId | "all">("all");
  const [difficulty, setDifficulty] = useState<Difficulty | "all">("all");
  const [format, setFormat] = useState<"all" | "single-choice" | "multiple-response">("all");
  const [topic, setTopic] = useState<string | "all">("all");

  const filtered = useMemo(
    () =>
      questions.filter(
        (q) =>
          (domain === "all" || q.domain === domain) &&
          (difficulty === "all" || q.difficulty === difficulty) &&
          (format === "all" || q.format === format) &&
          (topic === "all" || q.topic === topic),
      ),
    [questions, domain, difficulty, format, topic],
  );

  const topicOptions = useMemo(() => {
    const set = new Set(questions.map((q) => q.topic));
    return TOPICS.filter((t) => set.has(t.slug));
  }, [questions]);

  const selectClass =
    "rounded-lg border border-border bg-white px-3 py-2 text-sm";

  return (
    <div className="space-y-6">
      <Card>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <label className="text-sm font-medium">
            Domain
            <select
              className={cn(selectClass, "mt-1 w-full")}
              value={domain}
              onChange={(e) => {
                setDomain(e.target.value as DomainId | "all");
                setTopic("all");
              }}
            >
              <option value="all">All domains</option>
              {DOMAINS.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.number}. {d.name} ({d.weight}%)
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm font-medium">
            Topic
            <select
              className={cn(selectClass, "mt-1 w-full")}
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            >
              <option value="all">All topics</option>
              {topicOptions
                .filter((t) => domain === "all" || t.domain === domain)
                .map((t) => (
                  <option key={t.slug} value={t.slug}>
                    {t.name}
                  </option>
                ))}
            </select>
          </label>
          <label className="text-sm font-medium">
            Difficulty
            <select
              className={cn(selectClass, "mt-1 w-full")}
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as Difficulty | "all")}
            >
              <option value="all">All difficulties</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </label>
          <label className="text-sm font-medium">
            Format
            <select
              className={cn(selectClass, "mt-1 w-full")}
              value={format}
              onChange={(e) => setFormat(e.target.value as typeof format)}
            >
              <option value="all">All formats</option>
              <option value="single-choice">Single choice</option>
              <option value="multiple-response">Multiple response</option>
            </select>
          </label>
        </div>
        <p className="mt-3 text-sm text-muted">
          {filtered.length} question{filtered.length === 1 ? "" : "s"} match your
          filters.
        </p>
      </Card>

      <div className="grid gap-3">
        {filtered.map((q) => (
          <Link
            key={q.id}
            href={`/practice/${q.topic}`}
            className="group rounded-xl border border-border bg-white p-5 transition-shadow hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap gap-2">
                  <Badge tone="accent">
                    {getDomain(q.domain).name}
                  </Badge>
                  <Badge>{q.difficulty}</Badge>
                  <Badge>
                    {q.format === "multiple-response" ? "Multiple response" : "Single choice"}
                  </Badge>
                </div>
                <p className="mt-2 line-clamp-2 text-sm font-medium leading-relaxed">
                  {q.question}
                </p>
              </div>
              <ArrowRight
                className="mt-1 h-5 w-5 shrink-0 text-muted transition-transform group-hover:translate-x-1 group-hover:text-accent"
                aria-hidden
              />
            </div>
          </Link>
        ))}
        {filtered.length === 0 ? (
          <Card>
            <p className="text-sm text-muted">
              No questions match these filters yet. Try broadening your
              selection — new questions are added regularly.
            </p>
          </Card>
        ) : null}
      </div>
    </div>
  );
}
