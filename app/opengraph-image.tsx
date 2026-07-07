import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = `${site.name} — systemutvecklare med fokus på test, QA och Java`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#050508",
          backgroundImage:
            "radial-gradient(ellipse 60% 50% at 15% 0%, rgba(139,92,246,0.28), transparent), radial-gradient(ellipse 50% 40% at 95% 15%, rgba(34,211,238,0.14), transparent)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: 940,
            borderRadius: 24,
            border: "1px solid rgba(255,255,255,0.16)",
            backgroundColor: "#0a0a12",
            boxShadow: "0 0 120px rgba(139,92,246,0.35)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "22px 30px",
              borderBottom: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <div
              style={{
                width: 18,
                height: 18,
                borderRadius: 999,
                backgroundColor: "#ff5f57",
              }}
            />
            <div
              style={{
                width: 18,
                height: 18,
                borderRadius: 999,
                backgroundColor: "#febc2e",
              }}
            />
            <div
              style={{
                width: 18,
                height: 18,
                borderRadius: 999,
                backgroundColor: "#28c840",
              }}
            />
            <div
              style={{
                display: "flex",
                marginLeft: 14,
                color: "#858da1",
                fontSize: 22,
              }}
            >
              christoffer@skrra.dev
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "44px 52px 52px",
            }}
          >
            <div style={{ display: "flex", fontSize: 30, color: "#22d3ee" }}>
              &gt; whoami
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 18,
                fontSize: 72,
                fontWeight: 700,
                color: "#e9eaf2",
              }}
            >
              {site.name}
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 14,
                fontSize: 34,
                color: "#a78bfa",
              }}
            >
              Systemutvecklare · QA · Java
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 22,
                fontSize: 25,
                color: "#a4abbd",
              }}
            >
              Testning · Automation · Minecraft/Fabric · Webbutveckling
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 40,
                fontSize: 26,
                color: "#8b5cf6",
                fontWeight: 700,
              }}
            >
              &gt;_ skrra.dev
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
