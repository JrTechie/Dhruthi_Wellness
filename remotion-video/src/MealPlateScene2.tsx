import React from "react";
import { interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";

export const MealPlateScene2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Gentle horizontal pan / scale effect
  const imageScale = interpolate(frame, [0, 120], [1.0, 1.05], {
    extrapolateRight: "clamp",
  });

  const textSpring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 14, mass: 0.8 },
  });

  const badge1Spring = spring({
    frame: frame - 25,
    fps,
    config: { damping: 15, mass: 0.8 },
  });

  const badge2Spring = spring({
    frame: frame - 40,
    fps,
    config: { damping: 15, mass: 0.8 },
  });

  const textY = interpolate(textSpring, [0, 1], [35, 0]);
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
      {/* Background Ambient Blur */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${staticFile("assets/breakfast.jpeg")})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(60px) brightness(0.35)",
          transform: "scale(1.2)",
        }}
      />

      {/* Radial Glow */}
      <div
        style={{
          position: "absolute",
          top: "35%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 900,
          height: 900,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(52, 211, 153, 0.2) 0%, rgba(0,0,0,0) 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Top Header */}
      <div
        style={{
          position: "absolute",
          top: 75,
          left: 54,
          right: 54,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 20,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <img
            src={staticFile("assets/Logo_D_bright.png")}
            alt="Dhruthi Logo"
            style={{ height: 56, objectFit: "contain" }}
          />
          <span style={{ fontSize: 18, fontWeight: 700, letterSpacing: "0.12em", color: "#ECFDF5" }}>
            DHRUTHI WELLNESS
          </span>
        </div>
        <div
          style={{
            backgroundColor: "rgba(16, 185, 129, 0.2)",
            border: "1px solid rgba(52, 211, 153, 0.4)",
            padding: "8px 18px",
            borderRadius: 999,
            fontSize: 14,
            fontWeight: 700,
            color: "#6EE7B7",
            letterSpacing: "0.05em",
          }}
        >
          MEAL 2 • BREAKFAST
        </div>
      </div>

      {/* Main Uncropped Image Frame */}
      <div
        style={{
          position: "absolute",
          top: 180,
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
        <img
          src={staticFile("assets/breakfast.jpeg")}
          alt="Nutritious Breakfast Plate"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            transform: `scale(${imageScale})`,
          }}
        />

        {/* Nutrition Callout Badges */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            left: 36,
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(6, 30, 22, 0.9)",
              border: "1px solid rgba(52, 211, 153, 0.4)",
              backdropFilter: "blur(12px)",
              padding: "10px 20px",
              borderRadius: 16,
              fontSize: 15,
              fontWeight: 700,
              color: "#A7F3D0",
              boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
              transform: `scale(${badge1Spring})`,
            }}
          >
            🍳 High Quality Protein & Complex Carbs
          </div>
          <div
            style={{
              backgroundColor: "rgba(6, 30, 22, 0.9)",
              border: "1px solid rgba(52, 211, 153, 0.4)",
              backdropFilter: "blur(12px)",
              padding: "10px 20px",
              borderRadius: 16,
              fontSize: 15,
              fontWeight: 700,
              color: "#A7F3D0",
              boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
              transform: `scale(${badge2Spring})`,
            }}
          >
            ⚡ Sustained Morning Workday Energy
          </div>
        </div>
      </div>

      {/* Bottom Typography */}
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
            padding: "22px 40px",
            borderRadius: 28,
            boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
          }}
        >
          <h2
            style={{
              fontSize: 38,
              fontWeight: 800,
              color: "#FFFFFF",
              margin: 0,
              letterSpacing: "0.02em",
            }}
          >
            Balanced. <span style={{ color: "#34D399" }}>Nutritious.</span> Personalized.
          </h2>
        </div>
      </div>
    </div>
  );
};
