import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { BrandHeader } from "./BrandHeader";
import { SceneAkhilaAvatar } from "./SceneAkhilaAvatar";
import { loadFonts } from "./Typography";

export const RelevantScene3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fonts = loadFonts();

  const isOutro = frame > 240;

  const introSpring = spring({ frame: frame - 10, fps, config: { damping: 14, mass: 0.6 } });
  const outroSpring = spring({ frame: frame - 240, fps, config: { damping: 14, mass: 0.6 } });
  const brandOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  const duration = 12.0 * fps;
  const progress = frame / duration;
  const scale = interpolate(progress, [0, 1], [1.0, 1.08]);

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
      {/* 1. Background Image - Scene 3 shows fertility path; Outro (Scene 4/5) shows beautiful pregnancy mother cuddle */}
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
        src={
          isOutro
            ? staticFile("assets/different_pregnant_woman_bedroom.png")
            : staticFile("assets/preconception_to_pregnancy_split.png")
        }
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
      {!isOutro && <SceneAkhilaAvatar />}

      {!isOutro ? (
        /* Line 3 Active Content: Evidence-Based Journey */
        <div
          style={{
            position: "absolute",
            left: 80,
            right: 80,
            top: 500,
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <div
            style={{
              transform: `translateY(${interpolate(introSpring, [0, 1], [30, 0])}px)`,
              opacity: introSpring,
            }}
          >
            <div
              style={{
                fontFamily: fonts.body,
                fontWeight: 800,
                fontSize: 20,
                color: "#C5A059",
                letterSpacing: 2,
                marginBottom: 8,
                textShadow: "0 2px 10px rgba(0,0,0,0.4)",
              }}
            >
              WELCOME TO THE SERIES
            </div>

            <h2
              style={{
                fontFamily: fonts.cormorant,
                fontSize: 74,
                fontWeight: 800,
                lineHeight: 1.1,
                color: "#FFFFFF",
                margin: 0,
                textShadow: "0 6px 25px rgba(0,0,0,0.9), 0 0 20px rgba(197, 160, 89, 0.4)",
              }}
            >
              An Evidence-Based Fertility Journey
            </h2>
          </div>

          {/* Translucent Gold Glassmorphic Card */}
          <div
            style={{
              transform: `translateY(${interpolate(introSpring, [0, 1], [25, 0])}px)`,
              opacity: introSpring,
              backgroundColor: "rgba(255, 255, 255, 0.45)",
              backdropFilter: "blur(24px) saturate(180%)",
              WebkitBackdropFilter: "blur(24px) saturate(180%)",
              border: "1.5px solid rgba(255, 255, 255, 0.4)",
              borderTop: "1.5px solid rgba(255, 255, 255, 0.6)",
              borderRadius: 28,
              padding: "40px 48px",
              boxShadow: "0 16px 36px rgba(15,36,28,0.12), inset 0 0 0 1px rgba(255,255,255,0.25)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <p
              style={{
                fontFamily: fonts.body,
                fontSize: 36,
                lineHeight: 1.55,
                color: "#0F241C",
                fontWeight: 800,
                margin: 0,
                textAlign: "center",
              }}
            >
              Throughout this series, I'll take you through an evidence-based fertility nutrition journey—from preconception to conception.
            </p>
          </div>
        </div>

      ) : (
        /* Outro Final Series Frame (Glassmorphic Gold) - pregnancy-related background */
        <div
          style={{
            position: "absolute",
            left: 80,
            right: 80,
            top: 780,
            transform: `translateY(${interpolate(outroSpring, [0, 1], [40, 0])}px)`,
            opacity: outroSpring,
            zIndex: 10,
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h1
            style={{
              fontFamily: fonts.cormorant,
              fontSize: 78,
              fontWeight: 800,
              lineHeight: 1.05,
              color: "#FFFFFF",
              margin: 0,
              marginBottom: 16,
              textShadow: "0 6px 25px rgba(0,0,0,0.9), 0 0 20px rgba(197, 160, 89, 0.4)",
            }}
          >
            FROM PRECONCEPTION
            <br />
            <span style={{ color: "#C5A059", fontWeight: 800 }}>TO CONCEPTION</span>
          </h1>

          <div
            style={{
              fontFamily: fonts.body,
              fontWeight: 800,
              fontSize: 32,
              color: "#C5A059",
              marginBottom: 44,
              letterSpacing: 1,
              textShadow: "0 2px 10px rgba(0,0,0,0.4)",
            }}
          >
            Evidence-Based Fertility Nutrition Series
          </div>

          <div
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.45)",
              backdropFilter: "blur(24px) saturate(180%)",
              WebkitBackdropFilter: "blur(24px) saturate(180%)",
              border: "1.5px solid rgba(197, 160, 89, 0.55)",
              borderRadius: 24,
              padding: "36px 44px",
              marginBottom: 44,
              boxShadow: "0 15px 35px rgba(0,0,0,0.15), inset 0 0 0 1px rgba(255,255,255,0.25)",
              maxWidth: 720,
            }}
          >
            <div
              style={{
                fontFamily: fonts.body,
                fontSize: 32,
                color: "#0F241C",
                lineHeight: 1.45,
                fontWeight: 800,
              }}
            >
              Your journey starts before conception.
            </div>
          </div>

          <div
            style={{
              display: "inline-block",
              backgroundColor: "#C5A059",
              borderRadius: 32,
              padding: "20px 48px",
              color: "#14100C",
              fontFamily: fonts.body,
              fontWeight: 800,
              fontSize: 28,
              letterSpacing: 1,
              boxShadow: "0 15px 35px rgba(197, 160, 89, 0.35)",
            }}
          >
            Follow Dhruthi Wellness for Next Part 🌸
          </div>
        </div>
      )}
    </div>
  );
};
