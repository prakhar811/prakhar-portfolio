import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const alt = `${profile.name} — ${profile.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
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
          background: "radial-gradient(900px 500px at 85% 15%, rgba(224,164,88,0.22), #07080b 65%)",
          color: "#ece6da",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 22, letterSpacing: 8, color: "#8f8b82", textTransform: "uppercase" }}>
          PRKH / Software × Intelligence
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 148, fontWeight: 700, lineHeight: 0.9, letterSpacing: -6, textTransform: "uppercase" }}>
            {profile.firstName}
          </div>
          <div style={{ fontSize: 148, fontWeight: 700, lineHeight: 0.9, letterSpacing: -6, textTransform: "uppercase", color: "#ead9b5" }}>
            {profile.lastName}
          </div>
        </div>
        <div style={{ fontSize: 30, color: "#e0a458" }}>
          {`${profile.title} · ${profile.education.shortDegree} @ ${profile.education.shortSchool}`}
        </div>
      </div>
    ),
    size,
  );
}
