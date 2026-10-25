import { ButtonLink, Container } from "@/components/ui";

export default function NotFound() {
  return (
    <Container className="py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-accent">
        404
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight">Page not found</h1>
      <p className="mt-3 text-muted">
        This page doesn&apos;t exist — but your exam prep can continue.
      </p>
      <div className="mt-6 flex justify-center gap-3">
        <ButtonLink href="/practice">Practice questions</ButtonLink>
        <ButtonLink href="/" variant="secondary">
          Home
        </ButtonLink>
      </div>
    </Container>
  );
}
