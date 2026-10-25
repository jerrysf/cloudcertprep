import type { Metadata } from "next";
import { ALL_QUESTIONS } from "@/lib/content/questions";
import { MockExamSession } from "@/components/mock-exam-session";
import { Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "Mock Exam in Progress",
  robots: { index: false, follow: false },
};

interface Props {
  params: Promise<{ id: string }>;
}

export default async function MockExamRunPage({ params }: Props) {
  const { id } = await params;
  return (
    <Container className="py-10">
      <h1 className="sr-only">Mock exam</h1>
      <MockExamSession examId={id} questionBank={ALL_QUESTIONS} />
    </Container>
  );
}
