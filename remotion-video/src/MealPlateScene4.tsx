import React from "react";
import { interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";

export const MealPlateScene4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Scale and text step transitions
  const imageScale = interpolate(frame, [0, 120], [1.0, 1.05], {
    extrapolateRight: "clamp",
  });

  const step2Opacity = interpolate(frame, [55, 75], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const textSpring1 = spring({
    frame: frame - 10,
    fps,
    config: { damping: 14, mass: 0.8 },
  });

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
      {/* Background Blur */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${staticFile("assets/evening.jpeg")})`,
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
          background: "radial-gradient(circle, rgba(16, 185, 129, 0.22) 0%, rgba(0,0,0,0) 70%)",
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
          MEAL 5 • EVENING REFRESHMENT
        </div>
      </div>

      {/* Uncropped Meal Display Frame */}
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
          src={staticFile("assets/evening.jpeg")}
          alt="Evening Snack Plate"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            transform: `scale(${imageScale})`,
          }}
        />

        {/* Floating Callout Badges */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            right: 36,
            backgroundColor: "rgba(6, 30, 22, 0.9)",
            border: "1px solid rgba(52, 211, 153, 0.4)",
            backdropFilter: "blur(12px)",
            padding: "12px 24px",
            borderRadius: 18,
            fontSize: 16,
            fontWeight: 700,
            color: "#A7F3D0",
            boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
          }}
        >
          🍵 Healthy Cravings & Evening Energy
        </div>
      </div>

      {/* Lower Typography Card Sequence */}
      <div
        style={{
          position: "absolute",
          bottom: 110,
          left: 54,
          width: 972,
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "inline-block",
            backgroundColor: "rgba(6, 22, 16, 0.88)",
            border: "1px solid rgba(52, 211, 153, 0.35)",
            backdropFilter: "blur(16px)",
            padding: "24px 44px",
            borderRadius: 28,
            boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
            minWidth: 780,
          }}
        >
          {frame < 60 ? (
            <div style={{ opacity: interpolate(textSpring1, [0, 1], [0, 1]) }}>
              <span
                style={{
                  fontSize: 20,
                  fontWeight: 600,
                  color: "#9CA3AF",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: 6,
                }}
              >
                No Restrictive Rules
              </span>
              <h2
                style={{
                  fontSize: 40,
                  fontWeight: 800,
                  color: "#FFFFFF",
                  margin: 0,
                  letterSpacing: "-0.01em",
                }}
              >
                Not a random diet plan.
              </h2>
            </div>
          ) : (
            <div style={{ opacity: step2Opacity }}>
              <span
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: "#34D399",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: 6,
                }}
              >
                Personalized Metabolic Care
              </span>
              <h2
                style={{
                  fontSize: 40,
                  fontWeight: 800,
                  color: "#FFFFFF",
                  margin: 0,
                  letterSpacing: "-0.01em",
                }}
              >
                Nutrition tailored to your goals.
              </h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
