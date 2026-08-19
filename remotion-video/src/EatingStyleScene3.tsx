import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { BrandHeader } from "./BrandHeader";
import { CircularAkhilaAvatar } from "./CircularAkhilaAvatar";
import { COLORS_EATING, loadFonts } from "./Typography";
import metadata from "../public/assets/white_preconception_metadata.json";

export const EatingStyleScene3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fonts = loadFonts();

  const lineObj = metadata.lines["3"];
  const envelopeValue = lineObj && lineObj.envelope && lineObj.envelope[frame] ? lineObj.envelope[frame] : 0;

  const isOutro = frame > 255;

  const introSpring = spring({ frame: frame - 10, fps, config: { damping: 14, mass: 0.6 } });
  const outroSpring = spring({ frame: frame - 255, fps, config: { damping: 14, mass: 0.6 } });
  const brandOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  const duration = 12.0 * fps;
  const progress = frame / duration;
  const scale = interpolate(progress, [0, 1], [1.0, 1.15]);

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
      {/* Background Topic Image */}
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
        src={staticFile("assets/eating_style_scene3.png")}
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

      {!isOutro ? (
        /* Line 3 Active Content */
        <div
          style={{
            position: "absolute",
            left: 70,
            top: 380,
            width: 530,
            transform: `translateY(${interpolate(introSpring, [0, 1], [40, 0])}px)`,
            opacity: introSpring,
            zIndex: 10,
          }}
        >
          <div
            style={{
              fontFamily: fonts.body,
              fontWeight: 800,
              fontSize: 20,
              color: "#C5A059",
              letterSpacing: 2,
              marginBottom: 12,
            }}
          >
            WELCOME TO THE SERIES
          </div>

          <h2
            style={{
              fontFamily: fonts.cormorant,
              fontSize: 64,
              fontWeight: 600,
              lineHeight: 1.1,
              color: COLORS_EATING.linen,
              margin: 0,
              marginBottom: 32,
            }}
          >
            An Evidence-Based Fertility Journey
          </h2>

          <div
            style={{
              backgroundColor: "rgba(15, 36, 28, 0.85)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              border: "1.5px solid #00FF9D",
              borderRadius: 28,
              padding: 36,
              boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
            }}
          >
            <p
              style={{
                fontFamily: fonts.body,
                fontSize: 28,
                lineHeight: 1.5,
                color: COLORS_EATING.linen,
                fontWeight: 600,
                margin: 0,
              }}
            >
              Throughout this series, I'll take you through an evidence-based fertility nutrition journey—from preconception to conception.
            </p>
          </div>
        </div>
      ) : (
        /* Outro Final Series Frame */
        <div
          style={{
            position: "absolute",
            left: 70,
            top: 360,
            width: 530,
            transform: `translateY(${interpolate(outroSpring, [0, 1], [40, 0])}px)`,
            opacity: outroSpring,
            zIndex: 10,
          }}
        >
          <h1
            style={{
              fontFamily: fonts.cormorant,
              fontSize: 66,
              fontWeight: 600,
              lineHeight: 1.1,
              color: COLORS_EATING.linen,
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
              fontFamily: fonts.body,
              fontWeight: 600,
              fontSize: 28,
              color: "#00FF9D",
              marginBottom: 32,
            }}
          >
            Evidence-Based Fertility Nutrition Series
          </div>

          <div
            style={{
              backgroundColor: "rgba(15, 36, 28, 0.85)",
              backdropFilter: "blur(14px)",
              border: "1.5px solid #C5A059",
              borderRadius: 24,
              padding: "24px 32px",
              marginBottom: 36,
            }}
          >
            <div
              style={{
                fontFamily: fonts.body,
                fontSize: 26,
                color: COLORS_EATING.linenMuted,
                lineHeight: 1.4,
              }}
            >
              Your journey starts before conception.
            </div>
          </div>

          <div
            style={{
              display: "inline-block",
              backgroundColor: "#C5A059",
              borderRadius: 30,
              padding: "16px 36px",
              color: "#08120E",
              fontFamily: fonts.body,
              fontWeight: 800,
              fontSize: 22,
              letterSpacing: 0.5,
              boxShadow: "0 10px 25px rgba(197,160,89,0.35)",
            }}
          >
            Follow Dhruthi Wellness for Next Part 🌸
          </div>
        </div>
      )}

      {/* Circular Avatar of Dt. Akhila */}
      <CircularAkhilaAvatar showCredentials={true} />
    </div>
  );
};
