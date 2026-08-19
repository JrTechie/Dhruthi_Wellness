import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { AkhilaAvatar } from "./AkhilaAvatar";
import metadata from "../public/assets/preconception_45s_metadata.json";

export const Preconception45sScene2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const lineObj = metadata.lines["2"];
  const envelopeValue = lineObj && lineObj.envelope && lineObj.envelope[frame] ? lineObj.envelope[frame] : 0;

  const titleSpring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 14, mass: 0.8 },
  });

  const card1Spring = spring({
    frame: frame - 30,
    fps,
    config: { damping: 14, mass: 0.8 },
  });

  const card2Spring = spring({
    frame: frame - 140,
    fps,
    config: { damping: 14, mass: 0.8 },
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
      {/* Background Glows */}
      <div
        style={{
          position: "absolute",
          top: -100,
          left: -100,
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,255,157,0.15) 0%, rgba(0,0,0,0) 70%)",
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
            CELLULAR MATURATION
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

      {/* Left Column Content */}
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
          The 90-Day Egg & Sperm Cycle
        </h2>

        <p
          style={{
            fontFamily: "Outfit, sans-serif",
            fontSize: 24,
            fontWeight: 500,
            color: "#00FF9D",
            margin: 0,
            marginBottom: 30,
          }}
        >
          TODAY'S NUTRITION SHAPES EGG QUALITY
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {/* Card 1: 90 Days */}
          <div
            style={{
              transform: `translateY(${interpolate(card1Spring, [0, 1], [30, 0])}px)`,
              opacity: card1Spring,
              backgroundColor: "rgba(15, 36, 28, 0.85)",
              border: "1.5px solid #00FF9D",
              borderRadius: 24,
              padding: 28,
              backdropFilter: "blur(10px)",
            }}
          >
            <div
              style={{
                fontFamily: "Outfit, sans-serif",
                fontWeight: 700,
                fontSize: 24,
                color: "#00FF9D",
                marginBottom: 8,
              }}
            >
              🥚 90 Days to Mature
            </div>
            <div
              style={{
                fontFamily: "Outfit, sans-serif",
                fontSize: 24,
                color: "#D1E0D7",
                lineHeight: 1.4,
              }}
            >
              Oocytes and sperm require 3 full months to develop. Cellular environment dictates future quality.
            </div>
          </div>

          {/* Card 2: 5-MTHF & CoQ10 */}
          <div
            style={{
              transform: `translateY(${interpolate(card2Spring, [0, 1], [30, 0])}px)`,
              opacity: card2Spring,
              backgroundColor: "rgba(15, 36, 28, 0.85)",
              border: "1.5px solid #C5A059",
              borderRadius: 24,
              padding: 28,
              backdropFilter: "blur(10px)",
            }}
          >
            <div
              style={{
                fontFamily: "Outfit, sans-serif",
                fontWeight: 700,
                fontSize: 24,
                color: "#C5A059",
                marginBottom: 8,
              }}
            >
              💊 Active Methylfolate (5-MTHF) & CoQ10
            </div>
            <div
              style={{
                fontFamily: "Outfit, sans-serif",
                fontSize: 24,
                color: "#D1E0D7",
                lineHeight: 1.4,
              }}
            >
              Active bioavailable methylfolate and mitochondrial CoQ10 fuel ATP energy for optimal cellular division.
            </div>
          </div>
        </div>
      </div>

      {/* Akhila Avatar on Right Side */}
      <AkhilaAvatar
        envelopeValue={envelopeValue}
        expressionMode="explanatory"
        showCredentials={true}
      />
    </div>
  );
};
