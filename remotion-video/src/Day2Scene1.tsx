import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneAkhilaAvatar } from "./SceneAkhilaAvatar";

export const Day2Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = frame / (7.6 * fps);
  const scale = interpolate(progress, [0, 1], [1.0, 1.05]);

  const cardSpring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 14, mass: 0.8 },
  });

  const textSpring = spring({
    frame: frame - 25,
    fps,
    config: { damping: 12, mass: 0.7 },
  });

  return (
    <div
      style={{
        position: "absolute",
        width: 1080,
        height: 1920,
        backgroundColor: "#08120E",
        color: "#FFFFFF",
        overflow: "hidden",
      }}
    >
      {/* 1. Full-Screen Gemini Image Background (Couple Close Together) */}
      <Img
        src={staticFile("assets/day2_scene1_ovulation.png")}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1080,
          height: 1920,
          objectFit: "cover",
          transform: `scale(${scale})`,
        }}
      />

      {/* 2. Refined Dark Gradient Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1080,
          height: 1920,
          background:
            "linear-gradient(to bottom, rgba(8, 18, 14, 0.65) 0%, rgba(8, 18, 14, 0.25) 40%, rgba(8, 18, 14, 0.40) 60%, rgba(8, 18, 14, 0.85) 100%)",
        }}
      />

      {/* Top Header Badge */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 60,
          display: "flex",
          alignItems: "center",
          gap: 16,
          zIndex: 40,
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(15, 36, 28, 0.88)",
            border: "1.5px solid #C5A059",
            borderRadius: 25,
            padding: "8px 24px",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: "#00FF9D",
            }}
          />
          <span
            style={{
              fontFamily: "Outfit, sans-serif",
              fontWeight: 700,
              fontSize: 20,
              color: "#C5A059",
              letterSpacing: 1.5,
            }}
          >
            SCREEN 01 • BEYOND OVULATION
          </span>
        </div>
      </div>

      {/* Static Presenter Avatar at Top Right */}
      <SceneAkhilaAvatar />

      {/* Center Main Content Container (Positioned comfortably without obscuring couple faces) */}
      <div
        style={{
          position: "absolute",
          left: 80,
          right: 80,
          top: 500,
          zIndex: 30,
          display: "flex",
          flexDirection: "column",
          gap: 22,
        }}
      >
        {/* Title Header */}
        <div
          style={{
            transform: `translateY(${interpolate(cardSpring, [0, 1], [30, 0])}px)`,
            opacity: cardSpring,
          }}
        >
          <div
            style={{
              fontFamily: "Outfit, sans-serif",
              fontWeight: 800,
              fontSize: 22,
              color: "#C5A059",
              letterSpacing: 2,
              marginBottom: 6,
              textShadow: "0 2px 10px rgba(0,0,0,0.6)",
            }}
          >
            CORE FERTILITY FACTOR
          </div>

          <h2
            style={{
              fontFamily: "Italiana, Georgia, serif",
              fontSize: 74,
              fontWeight: 800,
              lineHeight: 1.1,
              color: "#FFFFFF",
              margin: 0,
              textShadow: "0 6px 25px rgba(0,0,0,0.9), 0 0 20px rgba(197, 160, 89, 0.4)",
            }}
          >
            Beyond the Ovulation Kit
          </h2>
        </div>

        {/* Center Translucent Glassmorphic Card */}
        <div
          style={{
            transform: `scale(${interpolate(textSpring, [0, 1], [0.95, 1])})`,
            opacity: textSpring,
            backgroundColor: "rgba(15, 36, 28, 0.75)",
            backdropFilter: "blur(20px) saturate(180%)",
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
            border: "1.5px solid rgba(197, 160, 89, 0.45)",
            borderRadius: 26,
            padding: "36px 42px",
            boxShadow: "0 18px 45px rgba(0,0,0,0.35)",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: "Outfit, sans-serif",
              fontSize: 36,
              fontWeight: 700,
              lineHeight: 1.45,
              color: "#00FF9D",
              margin: 0,
              textShadow: "0 2px 10px rgba(0,0,0,0.6)",
            }}
          >
            Fertility is influenced by more than just ovulation.
          </p>
        </div>
      </div>
    </div>
  );
};
