import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { BrandHeader } from "./BrandHeader";
import { CircularAkhilaAvatar } from "./CircularAkhilaAvatar";
import { COLORS_EATING, loadFonts } from "./Typography";
import metadata from "../public/assets/white_preconception_metadata.json";

export const EatingStyleScene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fonts = loadFonts();

  const lineObj = metadata.lines["1"];
  const envelopeValue = lineObj && lineObj.envelope && lineObj.envelope[frame] ? lineObj.envelope[frame] : 0;

  const duration = 11.38 * fps;
  const progress = frame / duration;

  const scale = interpolate(progress, [0, 1], [1.0, 1.15]);
  const panX = interpolate(progress, [0, 1], [0, -20]);

  const s1 = spring({ frame: frame - 10, fps, config: { damping: 14, mass: 0.6 } });
  const s2 = spring({ frame: frame - 30, fps, config: { damping: 14, mass: 0.6 } });
  const s3 = spring({ frame: frame - 180, fps, config: { damping: 12, mass: 0.7 } });

  const brandOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

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
      {/* Background Topic Image with Ken Burns Pan/Scale */}
      <Img
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1080,
          height: 1920,
          objectFit: "cover",
          transform: `scale(${scale}) translateX(${panX}px)`,
        }}
        src={staticFile("assets/eating_style_scene1.png")}
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

      {/* Main Content */}
      <div
        style={{
          position: "absolute",
          left: 70,
          top: 360,
          width: 530,
          zIndex: 10,
        }}
      >
        <div
          style={{
            transform: `translateY(${interpolate(s1, [0, 1], [50, 0])}px)`,
            opacity: s1,
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
            CORE FERTILITY PRINCIPLE
          </div>

          <h2
            style={{
              fontFamily: fonts.cormorant,
              fontSize: 66,
              fontWeight: 600,
              lineHeight: 1.1,
              color: COLORS_EATING.linen,
              margin: 0,
              marginBottom: 24,
            }}
          >
            Preparation Starts Before Conception
          </h2>
        </div>

        {/* Glass Card Text */}
        <div
          style={{
            transform: `translateY(${interpolate(s2, [0, 1], [40, 0])}px)`,
            opacity: s2,
            backgroundColor: "rgba(15, 36, 28, 0.75)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            border: "1.5px solid rgba(197, 160, 89, 0.4)",
            borderRadius: 32,
            padding: 32,
            boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
          }}
        >
          <p
            style={{
              fontFamily: fonts.body,
              fontSize: 28,
              fontWeight: 300,
              lineHeight: 1.45,
              color: COLORS_EATING.linenMuted,
              margin: 0,
              marginBottom: 24,
            }}
          >
            Pregnancy preparation shouldn't begin with a positive test.
          </p>

          <div
            style={{
              transform: `scale(${interpolate(s3, [0, 1], [0.95, 1])})`,
              opacity: s3,
              backgroundColor: "rgba(0, 255, 157, 0.15)",
              border: "1.5px solid #00FF9D",
              borderRadius: 20,
              padding: "16px 24px",
              display: "inline-block",
            }}
          >
            <span
              style={{
                fontFamily: fonts.body,
                fontWeight: 800,
                fontSize: 24,
                color: "#00FF9D",
                letterSpacing: 1,
              }}
            >
              IT BEGINS BEFORE CONCEPTION
            </span>
          </div>
        </div>
      </div>

      {/* Circular Avatar of Dt. Akhila */}
      <CircularAkhilaAvatar showCredentials={true} />
    </div>
  );
};
