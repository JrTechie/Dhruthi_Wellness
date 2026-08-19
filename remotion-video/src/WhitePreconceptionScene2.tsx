import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { AkhilaAvatar } from "./AkhilaAvatar";
import metadata from "../public/assets/white_preconception_metadata.json";

export const WhitePreconceptionScene2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const lineObj = metadata.lines["2"];
  const envelopeValue = lineObj && lineObj.envelope && lineObj.envelope[frame] ? lineObj.envelope[frame] : 0;

  const titleSpring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 14, mass: 0.8 },
  });

  const pillars = [
    { label: "Optimizing Nutrition", icon: "🥗", color: "#00A86B", delay: 30 },
    { label: "Checking Nutrient Needs", icon: "🧪", color: "#0088FF", delay: 90 },
    { label: "Supporting Metabolic Health", icon: "⚡", color: "#C5A059", delay: 160 },
    { label: "Reproductive Health", icon: "🌸", color: "#E05688", delay: 230 },
    { label: "Lifestyle & Medical Factors", icon: "🌿", color: "#00A86B", delay: 300 },
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
      {/* 1. Full-Picture Background Image */}
      <Img
        src={staticFile("assets/pregnant_woman_window_bump.png")}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1080,
          height: 1920,
          objectFit: "cover",
        }}
      />

      {/* 2. Soft Gradient Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1080,
          height: 1920,
          background: "linear-gradient(135deg, rgba(250,249,245,0.92) 0%, rgba(250,249,245,0.8) 50%, rgba(250,249,245,0.5) 100%)",
        }}
      />

      {/* Header Pill */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 60,
          display: "flex",
          alignItems: "center",
          gap: 16,
          zIndex: 10,
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            border: "1.5px solid #C5A059",
            borderRadius: 25,
            padding: "8px 24px",
            display: "flex",
            alignItems: "center",
            gap: 10,
            boxShadow: "0 6px 20px rgba(15,36,28,0.08)",
            backdropFilter: "blur(10px)",
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: "#0088FF",
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
            CLINICAL PILLARS
          </span>
        </div>
        <span
          style={{
            fontFamily: "Outfit, sans-serif",
            fontWeight: 700,
            fontSize: 20,
            color: "#4A5568",
          }}
        >
          DAY 01
        </span>
      </div>

      {/* Left Column Content */}
      <div
        style={{
          position: "absolute",
          left: 65,
          top: 340,
          width: 530,
          transform: `translateY(${interpolate(titleSpring, [0, 1], [40, 0])}px)`,
          opacity: titleSpring,
          zIndex: 10,
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.92)",
            border: "2px solid rgba(197, 160, 89, 0.4)",
            borderRadius: 32,
            padding: "28px 32px",
            boxShadow: "0 15px 40px rgba(15,36,28,0.1)",
            backdropFilter: "blur(14px)",
            marginBottom: 20,
          }}
        >
          <h2
            style={{
              fontFamily: "Italiana, Georgia, serif",
              fontSize: 56,
              fontWeight: 400,
              lineHeight: 1.1,
              color: "#0F241C",
              margin: 0,
              marginBottom: 6,
            }}
          >
            Preconception Health
          </h2>

          <p
            style={{
              fontFamily: "Outfit, sans-serif",
              fontSize: 22,
              fontWeight: 700,
              color: "#C5A059",
              margin: 0,
            }}
          >
            WHAT PREPARATION TRULY INVOLVES
          </p>
        </div>

        {/* 5 Animated Pillars List */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
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
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  border: `1.5px solid ${item.color}55`,
                  borderRadius: 20,
                  padding: "14px 22px",
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  boxShadow: "0 10px 25px rgba(15,36,28,0.08)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <div
                  style={{
                    fontSize: 26,
                    width: 44,
                    height: 44,
                    borderRadius: 14,
                    backgroundColor: `${item.color}15`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </div>
                <div
                  style={{
                    fontFamily: "Outfit, sans-serif",
                    fontWeight: 700,
                    fontSize: 22,
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

      {/* Akhila Avatar on Right Side */}
      <AkhilaAvatar
        envelopeValue={envelopeValue}
        expressionMode="explanatory"
        showCredentials={true}
        theme="white"
      />
    </div>
  );
};
