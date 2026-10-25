import type { Metadata } from "next";
import { StudyPlanForm } from "@/components/study-plan-form";
import { Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "SAA-C03 Study Plan Generator",
  description:
    "Generate a personalized week-by-week AWS Solutions Architect Associate study schedule based on your experience level, available hours, and target exam date.",
  alternates: { canonical: "/study-plan" },
};

export default function StudyPlanPage() {
  return (
    <Container className="py-10">
      <h1 className="text-3xl font-bold tracking-tight">Study Plan Generator</h1>
      <p className="mt-2 max-w-2xl text-muted">
        Answer a few questions and get a weekly schedule covering all four exam
        domains, revision checkpoints, and a final review period before your
        target date.
      </p>
      <div className="mt-8">
        <StudyPlanForm />
      </div>
    </Container>
  );
}
