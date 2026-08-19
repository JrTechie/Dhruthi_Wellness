import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { BrandHeader } from "./BrandHeader";
import { SceneAkhilaAvatar } from "./SceneAkhilaAvatar";
import { loadFonts } from "./Typography";

// CSS-based realistic 2-line Pregnancy Test Kit component
const PregnancyKitFloating: React.FC<{ frame: number; fps: number; isEmbedded?: boolean }> = ({ frame, fps, isEmbedded }) => {
  // Slide in from frame 120, slide out after frame 270
  const entrance = spring({
    frame: frame - 120,
    fps,
    config: { damping: 12, mass: 0.5 },
  });
  
  const exit = spring({
    frame: frame - 270,
    fps,
    config: { damping: 12, mass: 0.5 },
  });

  const translateY = interpolate(entrance - exit, [0, 1], [300, 0]);
  const opacity = interpolate(entrance - exit, [0, 1], [0, 1]);

  return (
    <div
      style={isEmbedded ? {
        transform: `scale(${entrance - exit})`,
        opacity,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 24,
      } : {
        position: "absolute",
        left: "50%",
        bottom: 80,
        transform: `translateX(-50%) translateY(${translateY}px)`,
        opacity,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        zIndex: 100,
      }}
    >
      {/* Realistic Plastic Test Device */}
      <div
        style={{
          width: 480,
          height: 100,
          borderRadius: 50,
          backgroundColor: "#FAF9F5",
          border: "4px solid #C5A059",
          boxShadow: "0 15px 40px rgba(0,0,0,0.35)",
          display: "flex",
          alignItems: "center",
          padding: "0 30px",
          position: "relative",
        }}
      >
        {/* Sample Well (Left Round Window) */}
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            backgroundColor: "#E2E8F0",
            border: "3px inset rgba(0,0,0,0.15)",
            boxShadow: "inset 0 3px 6px rgba(0,0,0,0.1)",
            marginRight: 40,
          }}
        />

        {/* Plastic Grip Lines */}
        <div style={{ display: "flex", gap: 6, marginRight: 40 }}>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                width: 4,
                height: 50,
                backgroundColor: "#E2E8F0",
                borderRadius: 2,
              }}
            />
          ))}
        </div>

        {/* Test Result Oval Window (2 Pink Lines) */}
        <div
          style={{
            width: 140,
            height: 46,
            borderRadius: 23,
            backgroundColor: "#EDF2F7",
            border: "3px inset rgba(0,0,0,0.15)",
            boxShadow: "inset 0 3px 6px rgba(0,0,0,0.1)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 28,
            position: "relative",
          }}
        >
          {/* Line 1: Control Line (Dark Pink) */}
          <div
            style={{
              width: 5,
              height: 32,
              backgroundColor: "#FF5C8A",
              borderRadius: 2,
              boxShadow: "0 0 4px rgba(255, 92, 138, 0.5)",
            }}
          />
          {/* Line 2: Test Line (Dark Pink - Positive!) */}
          <div
            style={{
              width: 5,
              height: 32,
              backgroundColor: "#FF5C8A",
              borderRadius: 2,
              boxShadow: "0 0 4px rgba(255, 92, 138, 0.5)",
            }}
          />

          {/* Window Marks */}
          <span style={{ position: "absolute", left: 16, fontSize: 10, fontWeight: 800, color: "#A0AEC0" }}>C</span>
          <span style={{ position: "absolute", right: 16, fontSize: 10, fontWeight: 800, color: "#A0AEC0" }}>T</span>
        </div>

        {/* Cap Separation Line on Right */}
        <div
          style={{
            position: "absolute",
            right: 100,
            width: 4,
            height: "100%",
            backgroundColor: "#C5A059",
            opacity: 0.6,
          }}
        />
      </div>
    </div>
  );
};

export const RelevantScene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fonts = loadFonts();

  const duration = 10.0 * fps;
  const progress = frame / duration;

  const scale = interpolate(progress, [0, 1], [1.0, 1.08]);

  const s1 = spring({ frame: frame - 10, fps, config: { damping: 14, mass: 0.6 } });
  const s2 = spring({ frame: frame - 25, fps, config: { damping: 14, mass: 0.6 } });
  const s3 = spring({ frame: frame - 45, fps, config: { damping: 12, mass: 0.7 } });

  const brandOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

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
      {/* 1. Background Image */}
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
        src={staticFile("assets/relevant_scene1_bg.png")}
      />

      {/* 2. Soft Gradient shade */}
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
      <SceneAkhilaAvatar />

      {/* Center-Oriented Professional Content Card */}
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
        {/* Title Grid - Brighter & More Highlighted */}
        <div
          style={{
            transform: `translateY(${interpolate(s1, [0, 1], [30, 0])}px)`,
            opacity: s1,
          }}
        >
          <div
            style={{
              fontFamily: fonts.body,
              fontWeight: 800,
              fontSize: 22,
              color: "#C5A059",
              letterSpacing: 2,
              marginBottom: 8,
              textShadow: "0 2px 10px rgba(0,0,0,0.5)",
            }}
          >
            CORE FERTILITY PRINCIPLE
          </div>

          <h2
            style={{
              fontFamily: fonts.cormorant,
              fontSize: 76,
              fontWeight: 800,
              lineHeight: 1.1,
              color: "#FFFFFF",
              margin: 0,
              textShadow: "0 6px 25px rgba(0,0,0,0.9), 0 0 20px rgba(197, 160, 89, 0.4)",
            }}
          >
            Preparation Starts Before Conception
          </h2>
        </div>

        {/* Translucent Gold Glassmorphic Card */}
        <div
          style={{
            transform: `translateY(${interpolate(s2, [0, 1], [30, 0])}px)`,
            opacity: s2,
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
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: fonts.body,
              fontSize: 36,
              fontWeight: 800,
              lineHeight: 1.55,
              color: "#0F241C",
              margin: 0,
              marginBottom: 28,
            }}
          >
            Are you planning to conceive? Remember—pregnancy preparation shouldn't begin with a positive test.
          </p>

          <div
            style={{
              transform: `scale(${interpolate(s3, [0, 1], [0.95, 1])})`,
              opacity: s3,
              backgroundColor: "#C5A059",
              border: "2px solid rgba(255, 255, 255, 0.4)",
              borderRadius: 20,
              padding: "18px 32px",
              display: "inline-block",
              boxShadow: "0 8px 24px rgba(197, 160, 89, 0.35)",
            }}
          >
            <span
              style={{
                fontFamily: fonts.body,
                fontWeight: 800,
                fontSize: 28,
                color: "#FAF9F5",
                letterSpacing: 1.5,
              }}
            >
              IT BEGINS BEFORE CONCEPTION
            </span>
          </div>

          {/* Pregnancy Kit embedded right below the button grid in same page */}
          <PregnancyKitFloating frame={frame} fps={fps} isEmbedded={true} />
        </div>
      </div>
    </div>
  );
};
