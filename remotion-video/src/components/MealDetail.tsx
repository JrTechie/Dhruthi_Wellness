import React from "react";
import { interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";

export const MealDetail: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Diagonal camera shift & subtle scale
  const imageScale = interpolate(frame, [0, 90], [1.0, 1.06], {
    extrapolateRight: "clamp",
  });

  const panX = interpolate(frame, [0, 90], [-10, 10], {
    extrapolateRight: "clamp",
  });

  const textSpring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 14, mass: 0.8 },
  });

  const textY = interpolate(textSpring, [0, 1], [30, 0]);
  const textOpacity = interpolate(textSpring, [0, 1], [0, 1]);

  return (
    <div
      style={{
        position: "absolute",
        width: 1080,
        height: 1920,
        backgroundColor: "#0B132B",
        fontFamily: "'Outfit', 'Inter', sans-serif",
        color: "#FFFFFF",
        overflow: "hidden",
      }}
    >
      {/* Background Layer: Soft Blurred Atmosphere */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${staticFile("assets/breakfast.jpeg")})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(50px) brightness(0.32)",
          transform: `scale(${imageScale})`,
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
            style={{ height: 48, objectFit: "contain" }}
          />
          <span style={{ fontSize: 16, fontWeight: 800, letterSpacing: "0.15em", color: "#F8FAFC" }}>
            DHRUTHI WELLNESS
          </span>
        </div>
        <div
          style={{
            backgroundColor: "rgba(16, 185, 129, 0.2)",
            border: "1px solid rgba(52, 211, 153, 0.4)",
            padding: "8px 18px",
            borderRadius: 999,
            fontSize: 13,
            fontWeight: 800,
            color: "#6EE7B7",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          STEP 02 • SUSTAINED ENERGY BREAKFAST
        </div>
      </div>

      {/* Main Uncropped Meal Display Frame */}
      <div
        style={{
          position: "absolute",
          top: 170,
          left: 54,
          width: 972,
          height: 1320,
          borderRadius: 36,
          overflow: "hidden",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          boxShadow: "0 35px 70px rgba(0, 0, 0, 0.6)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(15, 23, 42, 0.75)",
          backdropFilter: "blur(20px)",
        }}
      >
        <img
          src={staticFile("assets/breakfast.jpeg")}
          alt="Nutritious Breakfast"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            transform: `scale(${imageScale}) translateX(${panX}px)`,
          }}
        />

        {/* Feature Tag */}
        <div
          style={{
            position: "absolute",
            bottom: 32,
            right: 32,
            backgroundColor: "rgba(6, 78, 59, 0.9)",
            border: "1px solid rgba(52, 211, 153, 0.4)",
            backdropFilter: "blur(12px)",
            padding: "10px 22px",
            borderRadius: 999,
            fontSize: 15,
            fontWeight: 700,
            color: "#A7F3D0",
            letterSpacing: "0.06em",
          }}
        >
          ⚡ High Quality Protein & Complex Carbs
        </div>
      </div>

      {/* Lower Glassmorphism Panel */}
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
            backgroundColor: "rgba(15, 23, 42, 0.88)",
            border: "1px solid rgba(52, 211, 153, 0.3)",
            backdropFilter: "blur(20px)",
            padding: "24px 44px",
            borderRadius: 28,
            boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
          }}
        >
          <h2
            style={{
              fontSize: 42,
              fontWeight: 800,
              color: "#F8FAFC",
              margin: 0,
              letterSpacing: "-0.01em",
            }}
          >
            Designed for <span style={{ color: "#34D399" }}>real routines.</span>
          </h2>
        </div>
      </div>
    </div>
  );
};
