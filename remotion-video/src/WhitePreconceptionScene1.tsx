import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { AkhilaAvatar } from "./AkhilaAvatar";
import metadata from "../public/assets/white_preconception_metadata.json";

export const WhitePreconceptionScene1: React.FC = () => {
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
        backgroundColor: "#FAF9F5",
        color: "#0F241C",
        overflow: "hidden",
      }}
    >
      {/* 1. Full-Picture Background Image */}
      <Img
        src={staticFile("assets/preconception_to_pregnancy_split.png")}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1080,
          height: 1920,
          objectFit: "cover",
        }}
      />

      {/* 2. Soft Gradient Overlay for Maximum Readability */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1080,
          height: 1920,
          background: "linear-gradient(135deg, rgba(250,249,245,0.92) 0%, rgba(250,249,245,0.78) 50%, rgba(250,249,245,0.5) 100%)",
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
              backgroundColor: "#00A86B",
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
            fontWeight: 700,
            fontSize: 20,
            color: "#4A5568",
          }}
        >
          DAY 01
        </span>
      </div>

      {/* Left Column Content Card for Comfortable Reading */}
      <div
        style={{
          position: "absolute",
          left: 65,
          top: 360,
          width: 530,
          transform: `translateY(${interpolate(cardSpring, [0, 1], [40, 0])}px)`,
          opacity: cardSpring,
          zIndex: 10,
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.94)",
            border: "2px solid rgba(197, 160, 89, 0.5)",
            borderRadius: 36,
            padding: 36,
            boxShadow: "0 20px 50px rgba(15,36,28,0.12)",
            backdropFilter: "blur(16px)",
          }}
        >
          <div
            style={{
              fontFamily: "Outfit, sans-serif",
              fontWeight: 800,
              fontSize: 18,
              color: "#C5A059",
              letterSpacing: 2,
              marginBottom: 12,
            }}
          >
            CORE FERTILITY PRINCIPLE
          </div>

          <h2
            style={{
              fontFamily: "Italiana, Georgia, serif",
              fontSize: 60,
              fontWeight: 400,
              lineHeight: 1.15,
              color: "#0F241C",
              margin: 0,
              marginBottom: 24,
            }}
          >
            Preparation Starts Before Conception
          </h2>

          <div
            style={{
              fontFamily: "Outfit, sans-serif",
              fontSize: 26,
              lineHeight: 1.5,
              color: "#2D3748",
              marginBottom: 28,
            }}
          >
            Are you planning to conceive? Remember—pregnancy preparation shouldn't begin with a positive test.
          </div>

          <div
            style={{
              transform: `scale(${interpolate(highlightSpring, [0, 1], [0.95, 1])})`,
              opacity: highlightSpring,
              backgroundColor: "rgba(0, 168, 107, 0.08)",
              border: "2px solid #00A86B",
              borderRadius: 20,
              padding: "16px 24px",
              display: "inline-block",
            }}
          >
            <span
              style={{
                fontFamily: "Outfit, sans-serif",
                fontWeight: 800,
                fontSize: 24,
                color: "#00A86B",
                letterSpacing: 1,
              }}
            >
              IT BEGINS BEFORE CONCEPTION
            </span>
          </div>
        </div>
      </div>

      {/* Akhila Avatar on Right Side */}
      <AkhilaAvatar
        envelopeValue={envelopeValue}
        expressionMode={expressionMode}
        showCredentials={true}
        theme="white"
      />
    </div>
  );
};
