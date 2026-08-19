import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { AkhilaAvatar } from "./AkhilaAvatar";
import metadata from "../public/assets/full_preconception_metadata.json";

export const FullPreconceptionScene4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const lineObj = metadata.lines["4"];
  const envelopeValue = lineObj && lineObj.envelope && lineObj.envelope[frame] ? lineObj.envelope[frame] : 0;

  const titleSpring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 14, mass: 0.8 },
  });

  const steps = [
    { step: "STEP 1", title: "Comprehensive Biomarker Panel", desc: "Screen Thyroid, HbA1c, Ferritin, Vitamin D & MTHFR variants.", color: "#00FF9D", delay: 30 },
    { step: "STEP 2", title: "Active Methylfolate & CoQ10", desc: "Switch to 5-MTHF and fuel mitochondrial egg/sperm energy.", color: "#00E5FF", delay: 130 },
    { step: "STEP 3", title: "Lower Systemic Inflammation", desc: "Anti-inflammatory Mediterranean macro balance & gut care.", color: "#C5A059", delay: 230 },
    { step: "STEP 4", title: "Reduce Cortisol for Progesterone", desc: "Circadian sleep & stress management for luteal support.", color: "#FBD6E6", delay: 330 }
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
            ACTION PROTOCOL
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
          SCENE 04
        </span>
      </div>

      <div
        style={{
          position: "absolute",
          left: 70,
          top: 320,
          width: 530,
          transform: `translateY(${interpolate(titleSpring, [0, 1], [40, 0])}px)`,
          opacity: titleSpring,
        }}
      >
        <h2
          style={{
            fontFamily: "Italiana, Georgia, serif",
            fontSize: 58,
            fontWeight: 400,
            lineHeight: 1.1,
            color: "#FFFFFF",
            margin: 0,
            marginBottom: 6,
          }}
        >
          4-Step Preconception Protocol
        </h2>

        <p
          style={{
            fontFamily: "Outfit, sans-serif",
            fontSize: 22,
            fontWeight: 600,
            color: "#00FF9D",
            margin: 0,
            marginBottom: 24,
          }}
        >
          EVIDENCE-BASED PREPARATION STEPS
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {steps.map((s, idx) => {
            const stSpring = spring({
              frame: frame - s.delay,
              fps,
              config: { damping: 14, mass: 0.8 },
            });

            return (
              <div
                key={idx}
                style={{
                  transform: `translateX(${interpolate(stSpring, [0, 1], [-40, 0])}px)`,
                  opacity: stSpring,
                  backgroundColor: "rgba(15, 36, 28, 0.85)",
                  border: `1.5px solid ${s.color}44`,
                  borderRadius: 20,
                  padding: 20,
                  backdropFilter: "blur(10px)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 4,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Outfit, sans-serif",
                      fontWeight: 800,
                      fontSize: 16,
                      color: "#08120E",
                      backgroundColor: s.color,
                      borderRadius: 10,
                      padding: "4px 10px",
                    }}
                  >
                    {s.step}
                  </span>
                  <span
                    style={{
                      fontFamily: "Outfit, sans-serif",
                      fontWeight: 700,
                      fontSize: 22,
                      color: "#FFFFFF",
                    }}
                  >
                    {s.title}
                  </span>
                </div>
                <div
                  style={{
                    fontFamily: "Outfit, sans-serif",
                    fontSize: 20,
                    color: "#D1E0D7",
                    lineHeight: 1.3,
                    paddingLeft: 4,
                  }}
                >
                  {s.desc}
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
