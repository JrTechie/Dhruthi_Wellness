import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneAkhilaAvatar } from "./SceneAkhilaAvatar";

export const Day2Scene5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = frame / (7.0 * fps);
  const scale = interpolate(progress, [0, 1], [1.0, 1.05]);

  const cardSpring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 14, mass: 0.8 },
  });

  const arrowSpring = spring({
    frame: frame - 30,
    fps,
    config: { damping: 12, mass: 0.7 },
  });

  const highlightSpring = spring({
    frame: frame - 50,
    fps,
    config: { damping: 12, mass: 0.7 },
  });

  const followSpring = spring({
    frame: frame - 70,
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
        overflow: "hidden",
      }}
    >
      {/* 1. Full-Screen Gemini Image Background (Couple holding tiny white baby booties) */}
      <Img
        src={staticFile("assets/day2_scene5_closing.png")}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1080,
          height: 1920,
          objectFit: "cover",
          transform: `scale(${scale})`,
        }}
      />

      {/* 2. Refined Dark Gradient Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1080,
          height: 1920,
          background:
            "linear-gradient(to bottom, rgba(8, 18, 14, 0.65) 0%, rgba(8, 18, 14, 0.25) 40%, rgba(8, 18, 14, 0.40) 60%, rgba(8, 18, 14, 0.88) 100%)",
        }}
      />

      {/* Top Header Badge */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 60,
          display: "flex",
          alignItems: "center",
          gap: 16,
          zIndex: 40,
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(15, 36, 28, 0.88)",
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
            SUMMARY & TAKEAWAY
          </span>
        </div>
      </div>

      {/* Static Presenter Avatar at Top Right */}
      <SceneAkhilaAvatar />

      {/* Center Main Content Container */}
      <div
        style={{
          position: "absolute",
          left: 80,
          right: 80,
          top: 480,
          zIndex: 30,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
        }}
      >
        {/* Title Header */}
        <div
          style={{
            width: "100%",
            transform: `translateY(${interpolate(cardSpring, [0, 1], [30, 0])}px)`,
            opacity: cardSpring,
          }}
        >
          <div
            style={{
              fontFamily: "Outfit, sans-serif",
              fontWeight: 800,
              fontSize: 22,
              color: "#C5A059",
              letterSpacing: 2,
              marginBottom: 6,
              textShadow: "0 2px 10px rgba(0,0,0,0.6)",
            }}
          >
            PRECONCEPTION ROADMAP
          </div>

          <h2
            style={{
              fontFamily: "Italiana, Georgia, serif",
              fontSize: 72,
              fontWeight: 800,
              lineHeight: 1.1,
              color: "#FFFFFF",
              margin: 0,
              textShadow: "0 6px 25px rgba(0,0,0,0.9), 0 0 20px rgba(197, 160, 89, 0.4)",
            }}
          >
            Start Your Journey Today
          </h2>
        </div>

        {/* Dynamic 3-Step Arrow Banner */}
        <div
          style={{
            width: "100%",
            transform: `scale(${interpolate(arrowSpring, [0, 1], [0.9, 1])})`,
            opacity: arrowSpring,
            backgroundColor: "rgba(15, 36, 28, 0.82)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "2.5px solid #C5A059",
            borderRadius: 26,
            padding: "22px 28px",
            boxShadow: "0 15px 35px rgba(0,0,0,0.4)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontFamily: "Outfit, sans-serif",
              fontWeight: 900,
              fontSize: 30,
              color: "#00FF9D",
              letterSpacing: 1.5,
              lineHeight: 1.3,
            }}
          >
            UNDERSTAND <span style={{ color: "#C5A059" }}>→</span> PREPARE{" "}
            <span style={{ color: "#C5A059" }}>→</span> CONCEIVE
          </div>
        </div>

        {/* Final Takeaway Glass Box */}
        <div
          style={{
            width: "100%",
            transform: `translateY(${interpolate(highlightSpring, [0, 1], [30, 0])}px)`,
            opacity: highlightSpring,
            backgroundColor: "rgba(15, 36, 28, 0.72)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1.5px solid rgba(197, 160, 89, 0.35)",
            borderRadius: 26,
            padding: "30px 34px",
            boxShadow: "0 18px 45px rgba(0,0,0,0.35)",
          }}
        >
          <p
            style={{
              fontFamily: "Outfit, sans-serif",
              fontSize: 30,
              fontWeight: 600,
              lineHeight: 1.45,
              color: "#FFFFFF",
              margin: 0,
            }}
          >
            Because fertility preparation begins{" "}
            <span style={{ color: "#00FF9D", fontWeight: 800 }}>
              before you start trying.
            </span>
          </p>
        </div>

        {/* Updated Follow CTA Pill Button */}
        <div
          style={{
            transform: `scale(${interpolate(followSpring, [0, 1], [0.85, 1])})`,
            opacity: followSpring,
            backgroundColor: "#C5A059",
            borderRadius: 32,
            padding: "18px 36px",
            color: "#08120E",
            fontFamily: "Outfit, sans-serif",
            fontWeight: 800,
            fontSize: 22,
            letterSpacing: 0.5,
            boxShadow: "0 15px 35px rgba(197, 160, 89, 0.4)",
            marginTop: 8,
            textAlign: "center",
          }}
        >
          Follow Dhruthi Wellness for evidence-based nutrition from preconception to conception 🌸
        </div>
      </div>
    </div>
  );
};
