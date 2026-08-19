import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { AkhilaAvatar } from "./AkhilaAvatar";
import metadata from "../public/assets/preconception_metadata.json";

export const PreconceptionScene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const lineObj = metadata.lines["1"];
  const envelopeValue = lineObj && lineObj.envelope && lineObj.envelope[frame] ? lineObj.envelope[frame] : 0;

  let expressionMode: "warm" | "serious" | "confident" = "warm";
  if (frame > 70 && frame <= 210) {
    expressionMode = "serious";
  } else if (frame > 210) {
    expressionMode = "confident";
  }

  const cardSpring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 14, mass: 0.8 },
  });

  const highlightSpring = spring({
    frame: frame - 180,
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
            PRE-CONCEPTION CARE
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
          top: 380,
          width: 520,
          transform: `translateY(${interpolate(cardSpring, [0, 1], [40, 0])}px)`,
          opacity: cardSpring,
        }}
      >
        <div
          style={{
            fontFamily: "Outfit, sans-serif",
            fontWeight: 800,
            fontSize: 20,
            color: "#C5A059",
            letterSpacing: 2,
            marginBottom: 16,
          }}
        >
          CORE FERTILITY PRINCIPLE
        </div>

        <h2
          style={{
            fontFamily: "Italiana, Georgia, serif",
            fontSize: 64,
            fontWeight: 400,
            lineHeight: 1.15,
            color: "#FFFFFF",
            margin: 0,
            marginBottom: 36,
          }}
        >
          Preparation Starts Before Conception
        </h2>

        <div
          style={{
            backgroundColor: "rgba(15, 36, 28, 0.85)",
            border: "1.5px solid rgba(197, 160, 89, 0.4)",
            borderRadius: 32,
            padding: 36,
            backdropFilter: "blur(10px)",
            boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
          }}
        >
          <div
            style={{
              fontFamily: "Outfit, sans-serif",
              fontSize: 28,
              lineHeight: 1.5,
              color: "#D1E0D7",
              marginBottom: 28,
            }}
          >
            Pregnancy preparation shouldn't begin with a positive test.
          </div>

          <div
            style={{
              transform: `scale(${interpolate(highlightSpring, [0, 1], [0.95, 1])})`,
              opacity: highlightSpring,
              backgroundColor: "rgba(0, 255, 157, 0.15)",
              border: "2px solid #00FF9D",
              borderRadius: 20,
              padding: "16px 24px",
              display: "inline-block",
            }}
          >
            <span
              style={{
                fontFamily: "Outfit, sans-serif",
                fontWeight: 800,
                fontSize: 26,
                color: "#00FF9D",
                letterSpacing: 1,
              }}
            >
              IT BEGINS BEFORE CONCEPTION
            </span>
          </div>
        </div>
      </div>

      <AkhilaAvatar
        envelopeValue={envelopeValue}
        expressionMode={expressionMode}
        showCredentials={true}
      />
    </div>
  );
};
