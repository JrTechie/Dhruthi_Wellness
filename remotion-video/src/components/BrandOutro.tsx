import React from "react";
import { interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";

export const BrandOutro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Subtle zoom-out
  const bgScale = interpolate(frame, [0, 90], [1.08, 1.0], {
    extrapolateRight: "clamp",
  });

  const logoSpring = spring({
    frame: frame - 6,
    fps,
    config: { damping: 14, mass: 0.8 },
  });

  const textSpring = spring({
    frame: frame - 20,
    fps,
    config: { damping: 14, mass: 0.8 },
  });

  const ctaSpring = spring({
    frame: frame - 38,
    fps,
    config: { damping: 15, mass: 0.9 },
  });

  return (
    <div
      style={{
        position: "absolute",
        width: 1080,
        height: 1920,
        backgroundColor: "#050C09",
        fontFamily: "'Outfit', 'Inter', sans-serif",
        color: "#FFFFFF",
        overflow: "hidden",
      }}
    >
      {/* Radial Atmosphere */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at center, rgba(16, 185, 129, 0.22) 0%, rgba(5, 12, 9, 0.96) 75%)",
          transform: `scale(${bgScale})`,
        }}
      />

      {/* Decorative Outer Ring */}
      <div
        style={{
          position: "absolute",
          top: "42%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 960,
          height: 960,
          borderRadius: "50%",
          border: "1px solid rgba(52, 211, 153, 0.15)",
          pointerEvents: "none",
        }}
      />

      {/* Brand Lockup Header */}
      <div
        style={{
          position: "absolute",
          top: 140,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          transform: `scale(${interpolate(logoSpring, [0, 1], [0.9, 1])})`,
          opacity: interpolate(logoSpring, [0, 1], [0, 1]),
        }}
      >
        <img
          src={staticFile("assets/Logo_D_bright.png")}
          alt="Dhruthi Wellness Logo"
          style={{ height: 130, objectFit: "contain", filter: "drop-shadow(0 8px 24px rgba(16,185,129,0.35))" }}
        />
        <h1
          style={{
            fontSize: 42,
            fontWeight: 900,
            letterSpacing: "0.18em",
            color: "#FFFFFF",
            margin: "20px 0 0 0",
            textTransform: "uppercase",
          }}
        >
          DHRUTHI WELLNESS
        </h1>
        <p
          style={{
            fontSize: 16,
            fontWeight: 700,
            letterSpacing: "0.25em",
            color: "#34D399",
            margin: "8px 0 0 0",
            textTransform: "uppercase",
          }}
        >
          Personalized Nutrition & Diet Therapy
        </p>
      </div>

      {/* Center Copy Block */}
      <div
        style={{
          position: "absolute",
          top: 660,
          left: 54,
          width: 972,
          textAlign: "center",
          transform: `translateY(${interpolate(textSpring, [0, 1], [30, 0])}px)`,
          opacity: interpolate(textSpring, [0, 1], [0, 1]),
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.85)",
            border: "1px solid rgba(52, 211, 153, 0.35)",
            backdropFilter: "blur(20px)",
            padding: "44px 48px",
            borderRadius: 36,
            boxShadow: "0 30px 60px rgba(0, 0, 0, 0.6)",
          }}
        >
          <div style={{ fontSize: 50, fontWeight: 900, color: "#F8FAFC", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
            HEALTHY EATING.
          </div>
          <div style={{ fontSize: 60, fontWeight: 900, color: "#34D399", letterSpacing: "-0.02em", marginTop: 4 }}>
            MADE SIMPLE.
          </div>

          <div style={{ width: 100, height: 4, backgroundColor: "#10B981", borderRadius: 2, margin: "24px auto" }} />

          <p style={{ fontSize: 24, fontWeight: 600, color: "#CBD5E1", margin: 0, letterSpacing: "0.02em" }}>
            Personalized nutrition for your lifestyle.
          </p>
        </div>
      </div>

      {/* Final CTA Button Badge & Signature */}
      <div
        style={{
          position: "absolute",
          bottom: 150,
          left: 54,
          width: 972,
          textAlign: "center",
          transform: `scale(${interpolate(ctaSpring, [0, 1], [0.9, 1])})`,
          opacity: interpolate(ctaSpring, [0, 1], [0, 1]),
        }}
      >
        <div
          style={{
            display: "inline-block",
            backgroundColor: "#059669",
            border: "1px solid rgba(110, 231, 183, 0.5)",
            padding: "18px 40px",
            borderRadius: 999,
            boxShadow: "0 14px 36px rgba(16,185,129,0.45)",
          }}
        >
          <span style={{ fontSize: 20, fontWeight: 800, color: "#FFFFFF", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            Your Health • Your Plan • Your Journey
          </span>
        </div>

        {/* Signature Tag */}
        <div style={{ marginTop: 28, display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
          <img
            src={staticFile("assets/akhi_sign_transparent.png")}
            alt="Dr. Akhila Konakalla Signature"
            style={{ height: 46, objectFit: "contain", filter: "brightness(2)" }}
          />
          <span style={{ fontSize: 16, fontWeight: 600, color: "#A7F3D0", letterSpacing: "0.05em" }}>
            Dr. Akhila Konakalla • Chief Dietitian
          </span>
        </div>
      </div>
    </div>
  );
};
