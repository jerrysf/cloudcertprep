import type { Metadata } from "next";
import { MockExamBuilder } from "@/components/mock-exam-builder";
import { Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "Free AWS Mock Exams — Timed Practice Tests",
  description:
    "Configure a timed or untimed mock exam across 9 AWS certifications. Balanced question selection by official domain weights, flagging, and a full results breakdown.",
  alternates: { canonical: "/mock-exam" },
};

export default function MockExamPage() {
  return (
    <Container className="py-10">
      <h1 className="text-3xl font-bold tracking-tight">Mock Exam</h1>
      <p className="mt-2 max-w-2xl text-muted">
        Simulate the real exam: a balanced mix of questions at your
        certification&apos;s official pace. Question order is randomized, you
        can flag questions for review, and your progress survives a page
        refresh.
      </p>
      <div className="mt-8">
        <MockExamBuilder />
      </div>
    </Container>
  );
}
