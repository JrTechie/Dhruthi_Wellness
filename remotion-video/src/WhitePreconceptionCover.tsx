import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { AkhilaAvatar } from "./AkhilaAvatar";

export const WhitePreconceptionCover: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bgOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  
  const headlineSpring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 14, mass: 0.8 },
  });

  const subSpring = spring({
    frame: frame - 25,
    fps,
    config: { damping: 14, mass: 0.8 },
  });

  const footerSpring = spring({
    frame: frame - 40,
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
        opacity: bgOpacity,
        overflow: "hidden",
      }}
    >
      {/* 1. Full-Picture Background Image */}
      <Img
        src={staticFile("assets/full_cover_bg.png")}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1080,
          height: 1920,
          objectFit: "cover",
        }}
      />

      {/* 2. Soft White Gradient Overlay for Contrast & Readability */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1080,
          height: 1920,
          background: "linear-gradient(135deg, rgba(250,249,245,0.92) 0%, rgba(250,249,245,0.75) 50%, rgba(250,249,245,0.45) 100%)",
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
          zIndex: 10,
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            border: "1.5px solid #C5A059",
            borderRadius: 25,
            padding: "10px 26px",
            display: "flex",
            alignItems: "center",
            gap: 10,
            boxShadow: "0 6px 20px rgba(15,36,28,0.1)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: "#C5A059",
            }}
          />
          <span
            style={{
              fontFamily: "Outfit, sans-serif",
              fontWeight: 800,
              fontSize: 22,
              color: "#C5A059",
              letterSpacing: 1.5,
            }}
          >
            DHRUTHI WELLNESS
          </span>
        </div>
      </div>

      {/* Main Cover Text Card for High Readability */}
      <div
        style={{
          position: "absolute",
          left: 65,
          top: 360,
          width: 530,
          zIndex: 10,
        }}
      >
        {/* Main Headline */}
        <div
          style={{
            transform: `translateY(${interpolate(headlineSpring, [0, 1], [40, 0])}px)`,
            opacity: headlineSpring,
            backgroundColor: "rgba(255, 255, 255, 0.94)",
            border: "2px solid rgba(197, 160, 89, 0.5)",
            borderRadius: 36,
            padding: "36px 32px",
            boxShadow: "0 20px 50px rgba(15,36,28,0.12)",
            backdropFilter: "blur(16px)",
          }}
        >
          <h1
            style={{
              fontFamily: "Italiana, Georgia, serif",
              fontSize: 72,
              fontWeight: 400,
              lineHeight: 1.1,
              color: "#0F241C",
              margin: 0,
            }}
          >
            ARE YOU
            <br />
            <span style={{ color: "#C5A059", fontWeight: 700 }}>PLANNING</span>
            <br />
            TO CONCEIVE? 🌸
          </h1>

          <div
            style={{
              marginTop: 28,
              borderLeft: "4px solid #00A86B",
              paddingLeft: 18,
            }}
          >
            <p
              style={{
                fontFamily: "Outfit, sans-serif",
                fontSize: 26,
                fontWeight: 500,
                lineHeight: 1.4,
                color: "#2D3748",
                margin: 0,
              }}
            >
              What you should know before you start trying
            </p>
          </div>
        </div>

        {/* Series Banner Card */}
        <div
          style={{
            marginTop: 40,
            transform: `translateY(${interpolate(footerSpring, [0, 1], [30, 0])}px)`,
            opacity: footerSpring,
            backgroundColor: "rgba(255, 255, 255, 0.94)",
            border: "1.5px solid rgba(197, 160, 89, 0.5)",
            borderRadius: 28,
            padding: "22px 28px",
            boxShadow: "0 15px 35px rgba(15,36,28,0.1)",
            backdropFilter: "blur(14px)",
          }}
        >
          <div
            style={{
              fontFamily: "Outfit, sans-serif",
              fontWeight: 800,
              fontSize: 18,
              color: "#C5A059",
              letterSpacing: 2,
              marginBottom: 6,
              textTransform: "uppercase",
            }}
          >
            FROM PRECONCEPTION TO CONCEPTION
          </div>
          <div
            style={{
              fontFamily: "Outfit, sans-serif",
              fontWeight: 700,
              fontSize: 22,
              color: "#0F241C",
            }}
          >
            Evidence-Based Fertility Nutrition Series
          </div>
        </div>
      </div>

      {/* Akhila Avatar on Right Side */}
      <AkhilaAvatar expressionMode="warm" showCredentials={true} theme="white" />
    </div>
  );
};
