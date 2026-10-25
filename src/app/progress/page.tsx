import type { Metadata } from "next";
import { ProgressDashboard } from "@/components/progress-dashboard";
import { Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "Your Progress",
  description:
    "Track practice attempts, accuracy by domain and topic, study streak, bookmarks, and mock-exam history.",
  alternates: { canonical: "/progress" },
};

export default function ProgressPage() {
  return (
    <Container className="py-10">
      <h1 className="text-3xl font-bold tracking-tight">Your Progress</h1>
      <p className="mt-2 max-w-2xl text-muted">
        Progress is stored in this browser only — no account needed, nothing is
        sent to a server. Accuracy is a practice signal, not a prediction of
        your exam result.
      </p>
      <div className="mt-8">
        <ProgressDashboard />
      </div>
    </Container>
  );
}
