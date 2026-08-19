import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneAkhilaAvatar } from "./SceneAkhilaAvatar";

export const Day2Cover: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = frame / (3.0 * fps);
  const scale = interpolate(progress, [0, 1], [1.0, 1.06]);

  const bgOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  const badgeSpring = spring({
    frame: frame - 5,
    fps,
    config: { damping: 14, mass: 0.8 },
  });

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
        overflow: "hidden",
      }}
    >
      {/* 1. Full-Screen Background Image (Dedicated Cover Image) */}
      <Img
        src={staticFile("assets/day2_cover_bg.png")}
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

      {/* 2. Dark Gradient Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1080,
          height: 1920,
          background:
            "linear-gradient(to bottom, rgba(8, 18, 14, 0.65) 0%, rgba(8, 18, 14, 0.25) 40%, rgba(8, 18, 14, 0.40) 60%, rgba(8, 18, 14, 0.85) 100%)",
        }}
      />

      {/* Top Header Badge */}
      <div
        style={{
          position: "absolute",
          top: 95,
          left: 75,
          display: "flex",
          alignItems: "center",
          gap: 16,
          zIndex: 40,
          transform: `translateY(${interpolate(badgeSpring, [0, 1], [-20, 0])}px)`,
          opacity: badgeSpring,
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(15, 36, 28, 0.88)",
            border: "1.5px solid #C5A059",
            borderRadius: 25,
            padding: "10px 24px",
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
            DAY 2 • FERTILITY SERIES
          </span>
        </div>
      </div>

      {/* Static Presenter Avatar at Top Right */}
      <SceneAkhilaAvatar top={85} right={70} scale={0.82} />

      {/* Center Main Title */}
      <div
        style={{
          position: "absolute",
          left: 75,
          right: 75,
          top: 750,
          zIndex: 30,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 26,
        }}
      >
        {/* Main Headline */}
        <div
          style={{
            transform: `translateY(${interpolate(headlineSpring, [0, 1], [30, 0])}px)`,
            opacity: headlineSpring,
            width: "100%",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontFamily: "Italiana, Georgia, serif",
              margin: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 6,
              textShadow: "0 6px 25px rgba(0,0,0,0.9), 0 0 20px rgba(197, 160, 89, 0.35)",
            }}
          >
            <span
              style={{
                fontSize: 66,
                fontWeight: 800,
                color: "#FFFFFF",
                letterSpacing: "-0.5px",
                lineHeight: 1.1,
              }}
            >
              BEFORE YOU TRY,
            </span>
            <span
              style={{
                fontSize: 78,
                fontWeight: 800,
                color: "#C5A059",
                letterSpacing: "1px",
                lineHeight: 1.1,
              }}
            >
              UNDERSTAND
            </span>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 14,
              }}
            >
              <span
                style={{
                  fontSize: 66,
                  fontWeight: 800,
                  color: "#FFFFFF",
                  letterSpacing: "-0.5px",
                  lineHeight: 1.1,
                }}
              >
                YOUR FERTILITY
              </span>
              <span
                style={{
                  fontSize: 48,
                  lineHeight: 1,
                  display: "inline-block",
                  transform: "translateY(-2px)",
                  filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.6))",
                }}
              >
                🌿
              </span>
            </div>
          </h1>
        </div>

        {/* Translucent Subtitle Glass Box */}
        <div
          style={{
            transform: `translateY(${interpolate(subSpring, [0, 1], [20, 0])}px)`,
            opacity: subSpring,
            backgroundColor: "rgba(15, 36, 28, 0.85)",
            backdropFilter: "blur(20px) saturate(180%)",
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
            border: "1.5px solid rgba(197, 160, 89, 0.45)",
            borderLeft: "6px solid #00FF9D",
            borderRadius: 20,
            padding: "20px 30px",
            maxWidth: 880,
            width: "100%",
            boxShadow: "0 18px 45px rgba(0,0,0,0.45)",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: "Outfit, sans-serif",
              fontSize: 27,
              fontWeight: 600,
              lineHeight: 1.45,
              color: "#FFFFFF",
              margin: 0,
              letterSpacing: "0.2px",
            }}
          >
            The key biological and lifestyle factors that influence conception
          </p>
        </div>
      </div>

      {/* Bottom Branding Tag */}
      <div
        style={{
          position: "absolute",
          bottom: 70,
          left: 75,
          zIndex: 30,
          transform: `translateY(${interpolate(footerSpring, [0, 1], [20, 0])}px)`,
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
            textTransform: "uppercase",
            marginBottom: 4,
          }}
        >
          DHRUTHI WELLNESS REELS
        </div>
        <div
          style={{
            fontFamily: "Outfit, sans-serif",
            fontWeight: 600,
            fontSize: 26,
            color: "#FFFFFF",
            opacity: 0.9,
          }}
        >
          Evidence-Based Preconception Care
        </div>
      </div>
    </div>
  );
};
