/**
 * Configurable ad placement. Disabled by default — enable only after ad-network
 * approval by setting NEXT_PUBLIC_ADS_ENABLED=true and wiring the provider
 * script + consent flow. Renders nothing when disabled so no empty blocks
 * degrade the layout.
 */
export function AdSlot({ slot }: { slot: string }) {
  if (process.env.NEXT_PUBLIC_ADS_ENABLED !== "true") return null;
  return (
    <div
      data-ad-slot={slot}
      aria-hidden
      className="my-6 rounded-lg border border-dashed border-border p-4 text-center text-xs text-muted"
    >
      Advertisement
    </div>
  );
}
