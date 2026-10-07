import { ImageResponse } from "next/og";
export const runtime = "edge";
export const size = { width: 1200, height: 630 };

export default function Image() {
  return new ImageResponse(
    <div style={{ background: "#0F1E1C", width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "60px" }}>
      <div style={{ color: "#4FD1C5", fontSize: "22px", fontWeight: 600, marginBottom: "16px" }}>casetivo.com</div>
      <div style={{ color: "white", fontSize: "58px", fontWeight: 800, lineHeight: 1.1, marginBottom: "20px" }}>Base64 Encoder &amp; Decoder</div>
      <div style={{ color: "#9CA3AF", fontSize: "26px" }}>Encode to or decode from Base64 format — free online</div>
      <div style={{ position: "absolute", bottom: "40px", right: "60px", background: "#2E8A7E", color: "white", padding: "10px 24px", borderRadius: "8px", fontSize: "18px" }}>Free Tool</div>
    </div>,
    { ...size }
  );
}
