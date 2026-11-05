"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import { ANALYTICS_EVENTS, track } from "@/lib/analytics";

const W = 1200;
const H = 630;

function drawScoreCard(opts: {
  certCode: string;
  percent: number;
  passing: boolean;
  correct: number;
  total: number;
  timed: boolean;
  domainBars: Array<{ name: string; pct: number }>;
}): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;

  // background
  ctx.fillStyle = "#f8fafc";
  ctx.fillRect(0, 0, W, H);
  // top accent bar
  ctx.fillStyle = "#1d4ed8";
  ctx.fillRect(0, 0, W, 12);

  // brand
  ctx.fillStyle = "#1d4ed8";
  ctx.font = "bold 34px system-ui, -apple-system, sans-serif";
  ctx.fillText("CloudCertPrep", 60, 80);
  ctx.fillStyle = "#64748b";
  ctx.font = "22px system-ui, -apple-system, sans-serif";
  ctx.fillText(`${opts.certCode} mock exam result`, 60, 118);

  // score ring
  const cx = 190;
  const cy = 330;
  const r = 110;
  const lw = 26;
  ctx.lineWidth = lw;
  ctx.lineCap = "round";
  ctx.strokeStyle = "#e2e8f0";
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.stroke();
  ctx.strokeStyle = opts.passing ? "#059669" : "#1d4ed8";
  ctx.beginPath();
  ctx.arc(
    cx,
    cy,
    r,
    -Math.PI / 2,
    -Math.PI / 2 + (Math.PI * 2 * Math.min(100, opts.percent)) / 100,
  );
  ctx.stroke();
  ctx.fillStyle = "#0f172a";
  ctx.font = "bold 72px system-ui, -apple-system, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(`${Math.round(opts.percent)}%`, cx, cy + 8);
  ctx.font = "20px system-ui, -apple-system, sans-serif";
  ctx.fillStyle = "#64748b";
  ctx.fillText(
    opts.passing ? "at passing range" : "below passing range",
    cx,
    cy + 46,
  );

  // right column: stats + domain bars
  ctx.textAlign = "left";
  ctx.fillStyle = "#0f172a";
  ctx.font = "bold 30px system-ui, -apple-system, sans-serif";
  ctx.fillText(
    `${opts.correct} / ${opts.total} correct${opts.timed ? " · timed" : " · untimed"}`,
    430,
    210,
  );

  const bars = opts.domainBars.slice(0, 5);
  bars.forEach((b, i) => {
    const y = 270 + i * 58;
    ctx.fillStyle = "#475569";
    ctx.font = "20px system-ui, -apple-system, sans-serif";
    const label =
      b.name.length > 34 ? `${b.name.slice(0, 31)}…` : b.name;
    ctx.fillText(label, 430, y);
    // bar track
    ctx.fillStyle = "#e2e8f0";
    ctx.fillRect(430, y + 10, 560, 14);
    ctx.fillStyle = b.pct >= 70 ? "#10b981" : "#f87171";
    ctx.fillRect(430, y + 10, (560 * Math.min(100, b.pct)) / 100, 14);
    ctx.fillStyle = "#475569";
    ctx.font = "bold 18px system-ui, -apple-system, sans-serif";
    ctx.fillText(`${Math.round(b.pct)}%`, 1010, y + 23);
    ctx.font = "20px system-ui, -apple-system, sans-serif";
  });

  // footer CTA
  ctx.fillStyle = "#1d4ed8";
  ctx.font = "bold 24px system-ui, -apple-system, sans-serif";
  ctx.fillText("Free practice → cloudcertprep.cloud", 60, 580);

  return canvas;
}

export function ScoreCardButton(props: {
  certCode: string;
  percent: number;
  passing: boolean;
  correct: number;
  total: number;
  timed: boolean;
  domainBars: Array<{ name: string; pct: number }>;
}) {
  const [busy, setBusy] = useState(false);

  function download() {
    setBusy(true);
    try {
      const canvas = drawScoreCard(props);
      const a = document.createElement("a");
      a.download = `cloudcertprep-${props.certCode.toLowerCase()}-score.png`;
      a.href = canvas.toDataURL("image/png");
      a.click();
      track(ANALYTICS_EVENTS.scoreCardDownload, { cert: props.certCode });
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      type="button"
      onClick={download}
      disabled={busy}
      className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-slate-50 disabled:opacity-50"
    >
      <Download className="h-4 w-4" aria-hidden />
      Score card
    </button>
  );
}
