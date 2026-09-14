import { ImageResponse } from "next/og";

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
          background: "#f6f1e8",
          color: "#111111",
          padding: "64px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, fontWeight: 700, letterSpacing: 2 }}>
          <div style={{ display: "flex" }}>JILLU KLOSET</div>
          <div style={{ display: "flex", color: "#2f6fff" }}>CLOSET DROP 001</div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 76, fontWeight: 700, lineHeight: 1.02 }}>
            <div style={{ display: "flex" }}>PRE-LOVED.</div>
            <div style={{ display: "flex", color: "#ff3e8e" }}>RE-LOVED.</div>
          </div>
          <div style={{ display: "flex", fontSize: 260, fontWeight: 700, color: "#111111" }}>12</div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, fontWeight: 600 }}>
          <div style={{ display: "flex" }}>THE CLOSET OPENS IN 12 DAYS</div>
          <div style={{ display: "flex", color: "#142ca6" }}>JOIN THE DROP →</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
