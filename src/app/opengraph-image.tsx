import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Casetivo — Free Online Text Tools";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #f7f5f0 0%, #e8f5f0 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          padding: "60px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "32px" }}>
          <div style={{ width: "64px", height: "64px", borderRadius: "16px", background: "#2d8f7a", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "white", fontSize: "32px", fontWeight: "bold" }}>T</span>
          </div>
          <span style={{ fontSize: "48px", fontWeight: "700", color: "#1a2634" }}>Casetivo</span>
        </div>
        <h1 style={{ fontSize: "52px", fontWeight: "700", color: "#1a2634", textAlign: "center", margin: "0 0 24px", lineHeight: 1.2 }}>
          Free Online Text Tools
        </h1>
        <p style={{ fontSize: "28px", color: "#5a6a7a", textAlign: "center", margin: "0 0 40px", lineHeight: 1.5, maxWidth: "800px" }}>
          60+ tools: case converters, JSON formatter, image converters, random generators &amp; more
        </p>
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
          {["Case Convert", "JSON Format", "Image Convert", "Base64", "UUID"].map((t) => (
            <div key={t} style={{ background: "#2d8f7a", color: "white", padding: "10px 24px", borderRadius: "999px", fontSize: "20px", fontWeight: "600" }}>
              {t}
            </div>
          ))}
        </div>
        <div style={{ position: "absolute", bottom: "32px", fontSize: "18px", color: "#8a9aaa" }}>
          casetivo.com
        </div>
      </div>
    ),
    { ...size }
  );
}
