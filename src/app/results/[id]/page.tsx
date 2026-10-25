import type { Metadata } from "next";
import { ALL_QUESTIONS } from "@/lib/content/questions";
import { ResultsView } from "@/components/results-view";
import { Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "Exam Results",
  robots: { index: false, follow: false },
};

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ResultsPage({ params }: Props) {
  const { id } = await params;
  return (
    <Container className="py-10">
      <h1 className="text-3xl font-bold tracking-tight">Exam Results</h1>
      <div className="mt-8">
        <ResultsView resultId={id} questionBank={ALL_QUESTIONS} />
      </div>
    </Container>
  );
}
