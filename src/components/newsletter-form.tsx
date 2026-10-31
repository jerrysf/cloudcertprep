"use client";

import { useState } from "react";
import { MailCheck, Send } from "lucide-react";
import { Card } from "@/components/ui";

const ENDPOINT = process.env.NEXT_PUBLIC_NEWSLETTER_ENDPOINT;

/**
 * Email capture — renders only when NEXT_PUBLIC_NEWSLETTER_ENDPOINT is set.
 * Point it at a subscription endpoint that accepts POST {email} (e.g. a
 * Buttondown/ConvertKit form action or a small serverless function).
 */
export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">(
    "idle",
  );

  if (!ENDPOINT) return null;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) return;
    setState("sending");
    try {
      const res = await fetch(ENDPOINT!, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <Card className="border-accent/40 bg-accent-soft">
        <p className="flex items-center gap-2 text-sm font-medium">
          <MailCheck className="h-4 w-4 text-success" aria-hidden />
          You&apos;re in — new questions land in your inbox.
        </p>
      </Card>
    );
  }

  return (
    <Card>
      <h2 className="font-semibold">Get new questions weekly</h2>
      <p className="mt-1 text-sm text-muted">
        Free AWS practice questions and study notes — no spam, unsubscribe
        anytime.
      </p>
      <form onSubmit={submit} className="mt-3 flex gap-2">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="min-w-0 flex-1 rounded-lg border border-border px-3 py-2 text-sm focus:border-accent focus:outline-none"
        />
        <button
          type="submit"
          disabled={state === "sending"}
          className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 disabled:opacity-60"
        >
          <Send className="h-3.5 w-3.5" aria-hidden />
          {state === "sending" ? "…" : "Subscribe"}
        </button>
      </form>
      {state === "error" ? (
        <p className="mt-2 text-xs text-red-600">
          Something went wrong — please try again.
        </p>
      ) : null}
    </Card>
  );
}
