import React from "react";
import { interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";

export const MealPlateScene3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Smooth split presentation or transition from Mid-morning to Lunch
  const switchProgress = interpolate(frame, [50, 70], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const activeImage = switchProgress < 0.5 ? "midmrng.jpeg" : "lunch.jpeg";
  const activeLabel = switchProgress < 0.5 ? "MEAL 3 • MID-MORNING SNACK" : "MEAL 4 • BALANCED LUNCH THALI";

  const imageScale = interpolate(frame, [0, 120], [1.0, 1.05], {
    extrapolateRight: "clamp",
  });

  const textSpring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 14, mass: 0.8 },
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
      {/* Dynamic Ambient Blur */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${staticFile(`assets/${activeImage}`)})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(60px) brightness(0.35)",
          transform: "scale(1.2)",
          transition: "background-image 0.4s ease",
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
          {activeLabel}
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
          src={staticFile(`assets/${activeImage}`)}
          alt="Meal Plate"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            transform: `scale(${imageScale})`,
            transition: "opacity 0.3s ease",
          }}
        />

        {/* Feature Pill Overlay */}
        <div
          style={{
            position: "absolute",
            top: 32,
            right: 32,
            backgroundColor: "rgba(6, 78, 59, 0.85)",
            border: "1px solid rgba(52, 211, 153, 0.4)",
            backdropFilter: "blur(12px)",
            padding: "10px 22px",
            borderRadius: 999,
            fontSize: 15,
            fontWeight: 700,
            color: "#A7F3D0",
            letterSpacing: "0.05em",
          }}
        >
          {switchProgress < 0.5 ? "🍎 Antioxidant & Fibre Boost" : "🥗 Perfect Macro Ratio"}
        </div>
      </div>

      {/* Typography Card */}
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
          <h2
            style={{
              fontSize: 42,
              fontWeight: 800,
              color: "#FFFFFF",
              margin: 0,
              letterSpacing: "-0.01em",
            }}
          >
            Designed around <span style={{ color: "#34D399" }}>YOU.</span>
          </h2>
          <p
            style={{
              fontSize: 19,
              fontWeight: 500,
              color: "#A7F3D0",
              margin: "8px 0 0 0",
              letterSpacing: "0.03em",
            }}
          >
            Sustained focus & energy through your busy workday
          </p>
        </div>
      </div>
    </div>
  );
};
