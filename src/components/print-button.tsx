"use client";

import { Printer } from "lucide-react";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-accent"
      data-no-print
    >
      <Printer className="h-4 w-4" aria-hidden />
      Print / save as PDF
    </button>
  );
}
