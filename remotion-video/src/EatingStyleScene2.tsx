import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { BrandHeader } from "./BrandHeader";
import { CircularAkhilaAvatar } from "./CircularAkhilaAvatar";
import { COLORS_EATING, loadFonts } from "./Typography";
import metadata from "../public/assets/white_preconception_metadata.json";

export const EatingStyleScene2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fonts = loadFonts();

  const lineObj = metadata.lines["2"];
  const envelopeValue = lineObj && lineObj.envelope && lineObj.envelope[frame] ? lineObj.envelope[frame] : 0;

  const duration = 13.80 * fps;
  const progress = frame / duration;

  const scale = interpolate(progress, [0, 1], [1.0, 1.15]);
  const panY = interpolate(progress, [0, 1], [0, -25]);

  const s1 = spring({ frame: frame - 10, fps, config: { damping: 14, mass: 0.6 } });
  const brandOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  const pillars = [
    { label: "Optimizing Nutrition", icon: "🥗", color: "#00FF9D", delay: 30 },
    { label: "Checking Nutrient Needs", icon: "🧪", color: "#00E5FF", delay: 90 },
    { label: "Supporting Metabolic Health", icon: "⚡", color: "#C5A059", delay: 160 },
    { label: "Reproductive Health", icon: "🌸", color: "#FBD6E6", delay: 230 },
    { label: "Lifestyle & Medical Factors", icon: "🌿", color: "#00FF9D", delay: 300 },
  ];

  return (
    <div
      style={{
        position: "absolute",
        width: 1080,
        height: 1920,
        backgroundColor: "#000000",
        color: "#FFFFFF",
        overflow: "hidden",
      }}
    >
      {/* Background Topic Image with Ken Burns Pan/Scale */}
      <Img
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1080,
          height: 1920,
          objectFit: "cover",
          transform: `scale(${scale}) translateY(${panY}px)`,
        }}
        src={staticFile("assets/eating_style_scene2.png")}
      />

      {/* Darkened overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1080,
          height: 1920,
          background: "linear-gradient(135deg, rgba(8,18,14,0.85) 0%, rgba(8,18,14,0.65) 50%, rgba(8,18,14,0.85) 100%)",
        }}
      />

      {/* Highlighted Brand Header */}
      <BrandHeader opacity={brandOpacity} />

      {/* Main Content */}
      <div
        style={{
          position: "absolute",
          left: 70,
          top: 340,
          width: 530,
          zIndex: 10,
        }}
      >
        <div
          style={{
            transform: `translateY(${interpolate(s1, [0, 1], [40, 0])}px)`,
            opacity: s1,
          }}
        >
          <h2
            style={{
              fontFamily: fonts.cormorant,
              fontSize: 60,
              fontWeight: 600,
              lineHeight: 1.1,
              color: COLORS_EATING.linen,
              margin: 0,
              marginBottom: 6,
            }}
          >
            Preconception Health
          </h2>

          <p
            style={{
              fontFamily: fonts.body,
              fontSize: 22,
              fontWeight: 700,
              color: "#C5A059",
              margin: 0,
              marginBottom: 28,
            }}
          >
            WHAT PREPARATION TRULY INVOLVES
          </p>
        </div>

        {/* 5 Animated Pillars List */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {pillars.map((item, idx) => {
            const pSpring = spring({
              frame: frame - item.delay,
              fps,
              config: { damping: 14, mass: 0.8 },
            });

            return (
              <div
                key={idx}
                style={{
                  transform: `translateX(${interpolate(pSpring, [0, 1], [-40, 0])}px)`,
                  opacity: pSpring,
                  backgroundColor: "rgba(15, 36, 28, 0.82)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  border: `1.5px solid ${item.color}55`,
                  borderRadius: 20,
                  padding: "16px 22px",
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
                }}
              >
                <div
                  style={{
                    fontSize: 26,
                    width: 44,
                    height: 44,
                    borderRadius: 14,
                    backgroundColor: "rgba(255,255,255,0.08)",
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
                    fontWeight: 600,
                    fontSize: 24,
                    color: COLORS_EATING.linen,
                  }}
                >
                  {item.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Circular Avatar of Dt. Akhila */}
      <CircularAkhilaAvatar showCredentials={true} />
    </div>
  );
};
