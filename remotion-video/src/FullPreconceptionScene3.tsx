import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { AkhilaAvatar } from "./AkhilaAvatar";
import metadata from "../public/assets/full_preconception_metadata.json";

export const FullPreconceptionScene3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const lineObj = metadata.lines["3"];
  const envelopeValue = lineObj && lineObj.envelope && lineObj.envelope[frame] ? lineObj.envelope[frame] : 0;

  const titleSpring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 14, mass: 0.8 },
  });

  const cards = [
    { num: "01", title: "Insulin Sensitivity & HbA1c", desc: "Unchecked insulin disturbs ovulation & uterine receptivity.", color: "#00FF9D", delay: 40 },
    { num: "02", title: "Thyroid (TSH < 2.5) & Prolactin", desc: "Subclinical TSH > 2.5 mIU/L can silently halt luteal support.", color: "#00E5FF", delay: 150 },
    { num: "03", title: "Micronutrient Storage", desc: "Iron, Vitamin D3, B12 & Choline reserves drive implantation.", color: "#C5A059", delay: 260 }
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
              backgroundColor: "#C5A059",
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
            CLINICAL DIAGNOSTICS
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
          SCENE 03
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
            marginBottom: 8,
          }}
        >
          Hidden Preconception Brakes
        </h2>

        <p
          style={{
            fontFamily: "Outfit, sans-serif",
            fontSize: 24,
            fontWeight: 500,
            color: "#C5A059",
            margin: 0,
            marginBottom: 30,
          }}
        >
          BIOMARKERS THAT QUIETLY DELAY CONCEPTION
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {cards.map((c, idx) => {
            const cSpring = spring({
              frame: frame - c.delay,
              fps,
              config: { damping: 14, mass: 0.8 },
            });

            return (
              <div
                key={idx}
                style={{
                  transform: `translateX(${interpolate(cSpring, [0, 1], [-40, 0])}px)`,
                  opacity: cSpring,
                  backgroundColor: "rgba(15, 36, 28, 0.85)",
                  border: `1.5px solid ${c.color}55`,
                  borderRadius: 24,
                  padding: 24,
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 18,
                  backdropFilter: "blur(10px)",
                }}
              >
                <div
                  style={{
                    fontFamily: "Outfit, sans-serif",
                    fontWeight: 800,
                    fontSize: 22,
                    color: "#08120E",
                    backgroundColor: c.color,
                    borderRadius: 14,
                    padding: "6px 14px",
                  }}
                >
                  {c.num}
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "Outfit, sans-serif",
                      fontWeight: 700,
                      fontSize: 24,
                      color: "#FFFFFF",
                      marginBottom: 6,
                    }}
                  >
                    {c.title}
                  </div>
                  <div
                    style={{
                      fontFamily: "Outfit, sans-serif",
                      fontSize: 22,
                      color: "#D1E0D7",
                      lineHeight: 1.35,
                    }}
                  >
                    {c.desc}
                  </div>
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
