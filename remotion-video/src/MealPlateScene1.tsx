import React from "react";
import { interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";

export const MealPlateScene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Slow subtle push-in scale for hero presentation
  const imageScale = interpolate(frame, [0, 105], [1.0, 1.06], {
    extrapolateRight: "clamp",
  });

  // Fade and spring animations for text
  const textSpring = spring({
    frame: frame - 12,
    fps,
    config: { damping: 14, mass: 0.8 },
  });

  const badgeSpring = spring({
    frame: frame - 28,
    fps,
    config: { damping: 16, mass: 0.9 },
  });

  const textY = interpolate(textSpring, [0, 1], [40, 0]);
  const textOpacity = interpolate(textSpring, [0, 1], [0, 1]);

  return (
    <div
      style={{
        position: "absolute",
        width: 1080,
        height: 1920,
        backgroundColor: "#070E0B",
        fontFamily: "'Outfit', 'Inter', sans-serif",
        color: "#FFFFFF",
        overflow: "hidden",
      }}
    >
      {/* Background Ambient Blur Card using exact image to maintain color theme without cropping */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${staticFile("assets/detox.jpeg")})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(60px) brightness(0.35)",
          transform: "scale(1.2)",
        }}
      />

      {/* Radial Gradient Glow */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 850,
          height: 850,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(16, 185, 129, 0.22) 0%, rgba(0,0,0,0) 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Dhruthi Wellness Top Brand Header */}
      <div
        style={{
          position: "absolute",
          top: 75,
          left: 0,
          right: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          zIndex: 20,
        }}
      >
        <img
          src={staticFile("assets/Logo_D_bright.png")}
          alt="Dhruthi Wellness"
          style={{ height: 64, objectFit: "contain", filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.5))" }}
        />
        <div style={{ textAlign: "left" }}>
          <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: "0.15em", color: "#ECFDF5", textTransform: "uppercase" }}>
            DHRUTHI WELLNESS
          </div>
          <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.2em", color: "#34D399", textTransform: "uppercase" }}>
            Office Woman's Meal Plan
          </div>
        </div>
      </div>

      {/* Main Container - Uncropped Meal Display Frame */}
      <div
        style={{
          position: "absolute",
          top: 200,
          left: 54,
          width: 972,
          height: 1250,
          borderRadius: 36,
          overflow: "hidden",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          boxShadow: "0 30px 60px rgba(0, 0, 0, 0.6)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(15, 23, 42, 0.75)",
          backdropFilter: "blur(20px)",
        }}
      >
        {/* Full Image preserved without cropping */}
        <img
          src={staticFile("assets/detox.jpeg")}
          alt="Detox Drink"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            transform: `scale(${imageScale})`,
            transition: "transform 0.1s linear",
          }}
        />

        {/* Meal Tag Overlay */}
        <div
          style={{
            position: "absolute",
            top: 32,
            left: 32,
            backgroundColor: "rgba(6, 78, 59, 0.85)",
            border: "1px solid rgba(52, 211, 153, 0.4)",
            backdropFilter: "blur(12px)",
            padding: "10px 22px",
            borderRadius: 999,
            fontSize: 16,
            fontWeight: 700,
            color: "#A7F3D0",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
            transform: `scale(${badgeSpring})`,
          }}
        >
          🌅 Step 1 • Morning Detox Drink
        </div>
      </div>

      {/* Lower Typography Card - Hook Statement */}
      <div
        style={{
          position: "absolute",
          bottom: 110,
          left: 54,
          width: 972,
          textAlign: "center",
          transform: `translateY(${textY}px)`,
          opacity: textOpacity,
        }}
      >
        <div
          style={{
            display: "inline-block",
            backgroundColor: "rgba(6, 22, 16, 0.85)",
            border: "1px solid rgba(52, 211, 153, 0.3)",
            backdropFilter: "blur(16px)",
            padding: "24px 44px",
            borderRadius: 28,
            boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
          }}
        >
          <h1
            style={{
              fontSize: 42,
              fontWeight: 800,
              color: "#FFFFFF",
              margin: 0,
              lineHeight: 1.25,
              letterSpacing: "-0.01em",
            }}
          >
            Healthy eating can look this good. <span style={{ color: "#34D399" }}>✨</span>
          </h1>
          <p
            style={{
              fontSize: 20,
              fontWeight: 500,
              color: "#A7F3D0",
              margin: "10px 0 0 0",
              letterSpacing: "0.04em",
            }}
          >
            Real Client Meals • Personalized Nutrition
          </p>
        </div>
      </div>
    </div>
  );
};
