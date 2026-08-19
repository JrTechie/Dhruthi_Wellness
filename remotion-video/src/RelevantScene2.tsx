import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { BrandHeader } from "./BrandHeader";
import { SceneAkhilaAvatar } from "./SceneAkhilaAvatar";
import { loadFonts } from "./Typography";

export const RelevantScene2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fonts = loadFonts();

  const duration = 12.0 * fps;
  const progress = frame / duration;

  const scale = interpolate(progress, [0, 1], [1.0, 1.08]);

  const s1 = spring({ frame: frame - 10, fps, config: { damping: 14, mass: 0.6 } });
  const brandOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  const pillars = [
    { label: "Optimizing Nutrition", icon: "🥗", delay: 20 },
    { label: "Checking Nutrient Needs", icon: "🧪", delay: 35 },
    { label: "Metabolic & Reproductive Health", icon: "⚡", delay: 50 },
    { label: "Lifestyle & Medical Factors", icon: "🌿", delay: 65 },
  ];

  return (
    <div
      style={{
        position: "absolute",
        width: 1080,
        height: 1920,
        backgroundColor: "#FAF9F5",
        color: "#0F241C",
        overflow: "hidden",
      }}
    >
      {/* 1. Background Image */}
      <Img
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1080,
          height: 1920,
          objectFit: "cover",
          transform: `scale(${scale})`,
        }}
        src={staticFile("assets/pregnant_woman_window_bump.png")}
      />

      {/* 2. Soft Gradient Shade */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1080,
          height: 1920,
          background: "linear-gradient(to bottom, rgba(20, 16, 12, 0.82) 0%, rgba(20, 16, 12, 0.3) 45%, rgba(20, 16, 12, 0.3) 55%, rgba(20, 16, 12, 0.82) 100%)",
        }}
      />

      {/* Brand Header */}
      <BrandHeader opacity={brandOpacity} />

      {/* Akhila Avatar Grid */}
      <SceneAkhilaAvatar />

      {/* Center-Oriented Card Container */}
      <div
        style={{
          position: "absolute",
          left: 80,
          right: 80,
          top: 480,
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        {/* Subtitle / Title */}
        <div
          style={{
            transform: `translateY(${interpolate(s1, [0, 1], [30, 0])}px)`,
            opacity: s1,
          }}
        >
          <div
            style={{
              fontFamily: fonts.body,
              fontWeight: 800,
              fontSize: 24,
              color: "#C5A059",
              letterSpacing: 2,
              marginBottom: 4,
              textShadow: "0 2px 10px rgba(0,0,0,0.4)",
            }}
          >
            PRECONCEPTION HEALTH
          </div>

          <h2
            style={{
              fontFamily: fonts.cormorant,
              fontSize: 70,
              fontWeight: 800,
              lineHeight: 1.1,
              color: "#FFFFFF",
              margin: 0,
              textShadow: "0 6px 25px rgba(0,0,0,0.9), 0 0 20px rgba(197, 160, 89, 0.4)",
            }}
          >
            Optimizing Key Biological Pillars
          </h2>
        </div>

        {/* 4 Staggered Glassmorphic Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateRows: "repeat(4, 1fr)",
            gap: 22,
          }}
        >
          {pillars.map((item, idx) => {
            const pSpring = spring({
              frame: frame - item.delay,
              fps,
              config: { damping: 14, mass: 0.65 },
            });

            return (
              <div
                key={idx}
                style={{
                  transform: `translateX(${interpolate(pSpring, [0, 1], [-40, 0])}px)`,
                  opacity: pSpring,
                  backgroundColor: "rgba(255, 255, 255, 0.45)",
                  backdropFilter: "blur(24px) saturate(180%)",
                  WebkitBackdropFilter: "blur(24px) saturate(180%)",
                  border: "1.5px solid rgba(255, 255, 255, 0.4)",
                  borderTop: "1.5px solid rgba(255, 255, 255, 0.6)",
                  borderRadius: 22,
                  padding: "20px 32px",
                  display: "flex",
                  alignItems: "center",
                  gap: 22,
                  boxShadow: "0 10px 25px rgba(15,36,28,0.1), inset 0 0 0 1px rgba(255,255,255,0.25)",
                }}
              >
                {/* Gold Circle Badge for Icon */}
                <div
                  style={{
                    fontSize: 32,
                    width: 60,
                    height: 60,
                    borderRadius: 16,
                    backgroundColor: "rgba(197, 160, 89, 0.15)",
                    border: "1.5px solid #C5A059",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </div>
                <div
                  style={{
                    fontFamily: fonts.body,
                    fontWeight: 800,
                    fontSize: 32,
                    color: "#0F241C",
                  }}
                >
                  {item.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
