import type { Metadata } from "next";
import { FLASHCARDS } from "@/lib/content/flashcards";
import { FlashcardsDeck } from "@/components/flashcards-deck";
import { Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "AWS Certification Flashcards — Quick Recall Practice",
  description:
    "Free flashcards for AWS certification exams covering service distinctions, security controls, resilience patterns, and cost levers — SAA-C03, CLF-C02, and more.",
  alternates: { canonical: "/flashcards" },
};

export default function FlashcardsPage() {
  return (
    <Container className="py-10">
      <h1 className="text-3xl font-bold tracking-tight">Flashcards</h1>
      <p className="mt-2 max-w-2xl text-muted">
        {FLASHCARDS.length} quick-recall cards covering the distinctions the
        exam tests most. Flip a card, then honestly mark whether you knew it —
        your marks are saved locally.
      </p>
      <div className="mt-8">
        <FlashcardsDeck />
      </div>
    </Container>
  );
}
