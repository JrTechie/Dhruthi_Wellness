import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { AkhilaAvatar } from "./AkhilaAvatar";

export const PreconceptionCover: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animations
  const bgOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  
  const headlineSpring = spring({
    frame: frame - 15,
    fps,
    config: { damping: 14, mass: 0.8 },
  });

  const subSpring = spring({
    frame: frame - 30,
    fps,
    config: { damping: 14, mass: 0.8 },
  });

  const footerSpring = spring({
    frame: frame - 45,
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
        opacity: bgOpacity,
      }}
    >
      {/* Background Soft Glow Orbs */}
      <div
        style={{
          position: "absolute",
          top: -100,
          left: -100,
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(197,160,89,0.18) 0%, rgba(0,0,0,0) 70%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 200,
          left: -150,
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,255,157,0.12) 0%, rgba(0,0,0,0) 70%)",
        }}
      />

      {/* Brand Header */}
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
            DHRUTHI WELLNESS
          </span>
        </div>
      </div>

      {/* Main Cover Typography on Left/Center */}
      <div
        style={{
          position: "absolute",
          left: 70,
          top: 420,
          width: 520,
        }}
      >
        {/* Main Headline */}
        <div
          style={{
            transform: `translateY(${interpolate(headlineSpring, [0, 1], [40, 0])}px)`,
            opacity: headlineSpring,
          }}
        >
          <h1
            style={{
              fontFamily: "Italiana, Georgia, serif",
              fontSize: 76,
              fontWeight: 400,
              lineHeight: 1.1,
              color: "#FFFFFF",
              margin: 0,
              letterSpacing: "-0.5px",
            }}
          >
            ARE YOU
            <br />
            <span style={{ color: "#C5A059", fontWeight: 700 }}>PLANNING</span>
            <br />
            TO CONCEIVE? 🌸
          </h1>
        </div>

        {/* Supporting Line */}
        <div
          style={{
            marginTop: 40,
            transform: `translateY(${interpolate(subSpring, [0, 1], [30, 0])}px)`,
            opacity: subSpring,
          }}
        >
          <p
            style={{
              fontFamily: "Outfit, sans-serif",
              fontSize: 32,
              fontWeight: 400,
              lineHeight: 1.4,
              color: "#D1E0D7",
              margin: 0,
              borderLeft: "3px solid #00FF9D",
              paddingLeft: 20,
            }}
          >
            What you should know before you start trying
          </p>
        </div>

        {/* Series Identity at Bottom */}
        <div
          style={{
            marginTop: 220,
            transform: `translateY(${interpolate(footerSpring, [0, 1], [30, 0])}px)`,
            opacity: footerSpring,
          }}
        >
          <div
            style={{
              fontFamily: "Outfit, sans-serif",
              fontWeight: 800,
              fontSize: 22,
              color: "#C5A059",
              letterSpacing: 2,
              marginBottom: 8,
              textTransform: "uppercase",
            }}
          >
            FROM PRECONCEPTION TO CONCEPTION
          </div>
          <div
            style={{
              fontFamily: "Outfit, sans-serif",
              fontWeight: 500,
              fontSize: 24,
              color: "#FFFFFF",
            }}
          >
            Evidence-Based Fertility Nutrition Series
          </div>
        </div>
      </div>

      {/* Akhila Avatar on Right Side */}
      <AkhilaAvatar expressionMode="warm" showCredentials={true} />
    </div>
  );
};
