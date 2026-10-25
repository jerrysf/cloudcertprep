import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const alt = "CloudCertPrep — AWS Solutions Architect Associate practice";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 34,
            fontWeight: 700,
          }}
        >
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              background: "#3b82f6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30,
            }}
          >
            ☁
          </div>
          {SITE.name}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 62, fontWeight: 800, lineHeight: 1.1 }}>
            Pass the AWS Solutions Architect Associate exam
          </div>
          <div
            style={{
              marginTop: 20,
              fontSize: 30,
              color: "#bfdbfe",
            }}
          >
            Free practice questions · Mock exams · Study plans
          </div>
        </div>
        <div style={{ fontSize: 24, color: "#93c5fd" }}>
          {SITE.tagline}
        </div>
      </div>
    ),
    size,
  );
}
