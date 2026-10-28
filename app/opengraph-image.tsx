import { ImageResponse } from "next/og"
export const alt = "Mwandu — Investing in Kenya, made clearer"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export default function OG() {
  return new ImageResponse(
    (<div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#F8F7F3", padding: 80 }}>
      <div style={{ fontSize: 64, fontWeight: 700, color: "#20221F", letterSpacing: -3 }}>mwandu</div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 84, fontWeight: 700, color: "#20221F", lineHeight: 1.05, letterSpacing: -3 }}>Investing in Kenya, made clearer.</div>
        <div style={{ marginTop: 28, fontSize: 32, color: "#6545C1" }}>Join the early access list</div></div>
    </div>), size)
}
