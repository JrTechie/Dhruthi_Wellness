import React from "react";
import { interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";

export const CoverScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Subtle parallax scale on backdrop
  const bgScale = interpolate(frame, [0, 75], [1.15, 1.05], {
    extrapolateRight: "clamp",
  });

  // Headline 1: "HEALTHY EATING."
  const line1Spring = spring({
    frame: frame - 6,
    fps,
    config: { damping: 15, mass: 0.8 },
  });

  const line1Y = interpolate(line1Spring, [0, 1], [30, 0]);
  const line1Opacity = interpolate(line1Spring, [0, 1], [0, 1]);
  const line1Blur = interpolate(line1Spring, [0, 1], [8, 0]);

  // Headline 2: "MADE SIMPLE."
  const line2Spring = spring({
    frame: frame - 22,
    fps,
    config: { damping: 14, mass: 0.8 },
  });

  const line2Y = interpolate(line2Spring, [0, 1], [35, 0]);
  const line2Opacity = interpolate(line2Spring, [0, 1], [0, 1]);
  const line2Scale = interpolate(line2Spring, [0, 1], [0.95, 1]);

  // Subtitle line
  const subSpring = spring({
    frame: frame - 40,
    fps,
    config: { damping: 16, mass: 0.9 },
  });

  const subOpacity = interpolate(subSpring, [0, 1], [0, 1]);

  // Brand tag spring
  const brandSpring = spring({
    frame,
    fps,
    config: { damping: 18, mass: 1 },
  });

  return (
    <div
      style={{
        position: "absolute",
        width: 1080,
        height: 1920,
        backgroundColor: "#0B132B",
        fontFamily: "'Outfit', 'Inter', sans-serif",
        color: "#FFFFFF",
        overflow: "hidden",
      }}
    >
      {/* Background Layer: Soft Blurred Hero Food Atmosphere */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${staticFile("assets/detox.jpeg")})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(40px) brightness(0.3)",
          transform: `scale(${bgScale})`,
        }}
      />

      {/* Radial Gradient Atmosphere */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 50% 40%, rgba(16, 185, 129, 0.22) 0%, rgba(11, 19, 43, 0.85) 60%, rgba(11, 19, 43, 0.98) 100%)",
        }}
      />

      {/* Hero Visual Card: Floating Uncropped Food Imagery in Background */}
      <div
        style={{
          position: "absolute",
          top: 240,
          left: 90,
          width: 900,
          height: 800,
          borderRadius: 36,
          overflow: "hidden",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          boxShadow: "0 40px 80px rgba(0, 0, 0, 0.6)",
          backgroundColor: "rgba(15, 23, 42, 0.6)",
          backdropFilter: "blur(12px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={staticFile("assets/detox.jpeg")}
          alt="Healthy Morning Start"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            transform: `scale(${bgScale})`,
          }}
        />
        {/* Soft Inner Shadow Vignette */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            boxShadow: "inset 0 0 80px rgba(11, 19, 43, 0.6)",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Top Header Badge */}
      <div
        style={{
          position: "absolute",
          top: 90,
          left: 0,
          right: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 14,
          opacity: interpolate(brandSpring, [0, 1], [0, 1]),
        }}
      >
        <img
          src={staticFile("assets/Logo_D_bright.png")}
          alt="Dhruthi Wellness Logo"
          style={{ height: 48, objectFit: "contain" }}
        />
        <div
          style={{
            backgroundColor: "rgba(16, 185, 129, 0.15)",
            border: "1px solid rgba(52, 211, 153, 0.35)",
            padding: "8px 20px",
            borderRadius: 999,
            fontSize: 14,
            fontWeight: 800,
            letterSpacing: "0.15em",
            color: "#A7F3D0",
            textTransform: "uppercase",
          }}
        >
          DHRUTHI WELLNESS • PERSONALIZED NUTRITION
        </div>
      </div>

      {/* Lower Glassmorphism Panel - Sequential Typography Hook */}
      <div
        style={{
          position: "absolute",
          bottom: 150,
          left: 54,
          width: 972,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            backgroundColor: "rgba(15, 23, 42, 0.88)",
            border: "1px solid rgba(52, 211, 153, 0.3)",
            backdropFilter: "blur(20px)",
            padding: "38px 48px",
            borderRadius: 36,
            boxShadow: "0 30px 60px rgba(0, 0, 0, 0.6)",
          }}
        >
          {/* Line 1: HEALTHY EATING. */}
          <div
            style={{
              fontSize: 52,
              fontWeight: 900,
              color: "#F8FAFC",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              transform: `translateY(${line1Y}px)`,
              opacity: line1Opacity,
              filter: `blur(${line1Blur}px)`,
            }}
          >
            HEALTHY EATING.
          </div>

          {/* Line 2: MADE SIMPLE. */}
          <div
            style={{
              fontSize: 64,
              fontWeight: 900,
              color: "#34D399",
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
              marginTop: 6,
              transform: `translateY(${line2Y}px) scale(${line2Scale})`,
              opacity: line2Opacity,
              textShadow: "0 4px 20px rgba(52, 211, 153, 0.3)",
            }}
          >
            MADE SIMPLE.
          </div>

          {/* Divider accent */}
          <div
            style={{
              width: 120,
              height: 4,
              backgroundColor: "#10B981",
              borderRadius: 2,
              margin: "24px auto 16px auto",
              opacity: subOpacity,
            }}
          />

          {/* Supporting line */}
          <div
            style={{
              fontSize: 22,
              fontWeight: 600,
              color: "#CBD5E1",
              letterSpacing: "0.04em",
              opacity: subOpacity,
            }}
          >
            Real meals for real working lives.
          </div>
        </div>
      </div>
    </div>
  );
};
