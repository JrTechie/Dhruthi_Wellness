import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { AkhilaAvatar } from "./AkhilaAvatar";
import metadata from "../public/assets/white_preconception_metadata.json";

export const WhitePreconceptionScene3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const lineObj = metadata.lines["3"];
  const envelopeValue = lineObj && lineObj.envelope && lineObj.envelope[frame] ? lineObj.envelope[frame] : 0;

  const isOutro = frame > 255;

  const introSpring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 14, mass: 0.8 },
  });

  const outroSpring = spring({
    frame: frame - 255,
    fps,
    config: { damping: 14, mass: 0.8 },
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
        src={
          isOutro
            ? staticFile("assets/different_pregnant_woman_bedroom.png")
            : staticFile("assets/preconception_to_pregnancy_split.png")
        }
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
          background: "linear-gradient(135deg, rgba(250,249,245,0.92) 0%, rgba(250,249,245,0.78) 50%, rgba(250,249,245,0.48) 100%)",
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
            SERIES INTRODUCTION
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

      {!isOutro ? (
        /* Line 3 Active Content */
        <div
          style={{
            position: "absolute",
            left: 65,
            top: 360,
            width: 530,
            transform: `translateY(${interpolate(introSpring, [0, 1], [40, 0])}px)`,
            opacity: introSpring,
            zIndex: 10,
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.94)",
              border: "2px solid rgba(0, 168, 107, 0.5)",
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
              WELCOME TO THE SERIES
            </div>

            <h2
              style={{
                fontFamily: "Italiana, Georgia, serif",
                fontSize: 58,
                fontWeight: 400,
                lineHeight: 1.15,
                color: "#0F241C",
                margin: 0,
                marginBottom: 24,
              }}
            >
              An Evidence-Based Fertility Journey
            </h2>

            <div
              style={{
                fontFamily: "Outfit, sans-serif",
                fontSize: 26,
                lineHeight: 1.5,
                color: "#0F241C",
                fontWeight: 600,
                backgroundColor: "rgba(0, 168, 107, 0.06)",
                borderLeft: "4px solid #00A86B",
                borderRadius: "0 16px 16px 0",
                padding: "20px 24px",
              }}
            >
              Throughout this series, I'll take you through an evidence-based fertility nutrition journey—from preconception to conception.
            </div>
          </div>
        </div>
      ) : (
        /* Outro Final Series Frame */
        <div
          style={{
            position: "absolute",
            left: 65,
            top: 360,
            width: 530,
            transform: `translateY(${interpolate(outroSpring, [0, 1], [40, 0])}px)`,
            opacity: outroSpring,
            zIndex: 10,
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              border: "2px solid #C5A059",
              borderRadius: 36,
              padding: 36,
              boxShadow: "0 20px 50px rgba(15,36,28,0.12)",
              backdropFilter: "blur(16px)",
            }}
          >
            <h1
              style={{
                fontFamily: "Italiana, Georgia, serif",
                fontSize: 64,
                fontWeight: 400,
                lineHeight: 1.1,
                color: "#0F241C",
                margin: 0,
                marginBottom: 16,
              }}
            >
              FROM PRECONCEPTION
              <br />
              <span style={{ color: "#C5A059", fontWeight: 700 }}>TO CONCEPTION</span>
            </h1>

            <div
              style={{
                fontFamily: "Outfit, sans-serif",
                fontWeight: 700,
                fontSize: 26,
                color: "#00A86B",
                marginBottom: 24,
              }}
            >
              Evidence-Based Fertility Nutrition Series
            </div>

            <div
              style={{
                fontFamily: "Outfit, sans-serif",
                fontSize: 24,
                color: "#2D3748",
                lineHeight: 1.4,
                marginBottom: 28,
              }}
            >
              Your journey starts before conception.
            </div>

            <div
              style={{
                display: "inline-block",
                backgroundColor: "#C5A059",
                borderRadius: 30,
                padding: "16px 36px",
                color: "#FFFFFF",
                fontFamily: "Outfit, sans-serif",
                fontWeight: 800,
                fontSize: 22,
                letterSpacing: 0.5,
                boxShadow: "0 10px 25px rgba(197,160,89,0.35)",
              }}
            >
              Follow Dhruthi Wellness for Next Part 🌸
            </div>
          </div>
        </div>
      )}

      {/* Akhila Avatar on Right Side */}
      <AkhilaAvatar
        envelopeValue={envelopeValue}
        expressionMode={isOutro ? "smiling" : "smiling"}
        showCredentials={true}
        theme="white"
      />
    </div>
  );
};
