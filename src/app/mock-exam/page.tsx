import type { Metadata } from "next";
import { EXAM } from "@/lib/content/domains";
import { MockExamBuilder } from "@/components/mock-exam-builder";
import { Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "Free SAA-C03 Mock Exam — Timed Practice Tests",
  description:
    "Configure a timed or untimed AWS Solutions Architect Associate mock exam. Balanced question selection across the four official domains with a full results breakdown.",
  alternates: { canonical: "/mock-exam" },
};

export default function MockExamPage() {
  return (
    <Container className="py-10">
      <h1 className="text-3xl font-bold tracking-tight">Mock Exam</h1>
      <p className="mt-2 max-w-2xl text-muted">
        Simulate the real {EXAM.code} experience: a balanced mix of{" "}
        {EXAM.questionCount}-style questions at exam pace (
        {EXAM.durationMinutes} minutes for the full exam). Question order is
        randomized; you can flag questions for review and your progress survives
        a page refresh.
      </p>
      <div className="mt-8">
        <MockExamBuilder />
      </div>
    </Container>
  );
}
