import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { AkhilaAvatar } from "./AkhilaAvatar";
import metadata from "../public/assets/preconception_metadata.json";

export const PreconceptionScene2: React.FC = () => {
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
        backgroundColor: "#08120E",
        color: "#FFFFFF",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 60,
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(15, 36, 28, 0.9)",
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
              backgroundColor: "#00E5FF",
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
            fontWeight: 500,
            fontSize: 20,
            color: "#D1E0D7",
          }}
        >
          DAY 01
        </span>
      </div>

      <div
        style={{
          position: "absolute",
          left: 70,
          top: 340,
          width: 530,
          transform: `translateY(${interpolate(titleSpring, [0, 1], [40, 0])}px)`,
          opacity: titleSpring,
        }}
      >
        <h2
          style={{
            fontFamily: "Italiana, Georgia, serif",
            fontSize: 60,
            fontWeight: 400,
            lineHeight: 1.1,
            color: "#FFFFFF",
            margin: 0,
            marginBottom: 10,
          }}
        >
          Preconception Health
        </h2>

        <p
          style={{
            fontFamily: "Outfit, sans-serif",
            fontSize: 24,
            fontWeight: 500,
            color: "#C5A059",
            margin: 0,
            marginBottom: 36,
          }}
        >
          WHAT PREPARATION TRULY INVOLVES
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
          }}
        >
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
                  backgroundColor: "rgba(15, 36, 28, 0.85)",
                  border: `1.5px solid ${item.color}55`,
                  borderRadius: 20,
                  padding: "16px 22px",
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  backdropFilter: "blur(8px)",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
                }}
              >
                <div
                  style={{
                    fontSize: 28,
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
                    fontFamily: "Outfit, sans-serif",
                    fontWeight: 600,
                    fontSize: 24,
                    color: "#FFFFFF",
                  }}
                >
                  {item.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <AkhilaAvatar
        envelopeValue={envelopeValue}
        expressionMode="explanatory"
        showCredentials={true}
      />
    </div>
  );
};
