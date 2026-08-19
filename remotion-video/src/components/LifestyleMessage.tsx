import React from "react";
import { interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";

export const LifestyleMessage: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Subtle pan effect
  const imageScale = interpolate(frame, [0, 105], [1.0, 1.06], {
    extrapolateRight: "clamp",
  });

  const step2Opacity = interpolate(frame, [50, 68], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const textSpring1 = spring({
    frame: frame - 8,
    fps,
    config: { damping: 14, mass: 0.8 },
  });

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
      {/* Background Atmosphere */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${staticFile("assets/midmrng.jpeg")})`,
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
          STEP 03 • MID-MORNING REFRESHMENT
        </div>
      </div>

      {/* Main Uncropped Meal Frame */}
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
          src={staticFile("assets/midmrng.jpeg")}
          alt="Mid-Morning Fruit Bowl"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            transform: `scale(${imageScale})`,
          }}
        />

        {/* Feature Tag */}
        <div
          style={{
            position: "absolute",
            bottom: 32,
            left: 32,
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
          🍎 Antioxidants & Fiber Energy Boost
        </div>
      </div>

      {/* Lower Glassmorphism Panel - Sequential Working Professional Copy */}
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
            backgroundColor: "rgba(15, 23, 42, 0.9)",
            border: "1px solid rgba(52, 211, 153, 0.35)",
            backdropFilter: "blur(20px)",
            padding: "26px 44px",
            borderRadius: 28,
            boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
            minWidth: 820,
          }}
        >
          {frame < 55 ? (
            <div style={{ opacity: interpolate(textSpring1, [0, 1], [0, 1]) }}>
              <span
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: "#34D399",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: 6,
                }}
              >
                For Busy Working Professionals
              </span>
              <h2
                style={{
                  fontSize: 38,
                  fontWeight: 800,
                  color: "#F8FAFC",
                  margin: 0,
                  letterSpacing: "-0.01em",
                }}
              >
                Busy schedule? <span style={{ color: "#34D399" }}>Healthy eating can still be simple.</span>
              </h2>
            </div>
          ) : (
            <div style={{ opacity: step2Opacity }}>
              <span
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: "#A7F3D0",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: 6,
                }}
              >
                Practical Everyday Wellness
              </span>
              <h2
                style={{
                  fontSize: 42,
                  fontWeight: 800,
                  color: "#F8FAFC",
                  margin: 0,
                  letterSpacing: "-0.01em",
                }}
              >
                Simple meals. <span style={{ color: "#34D399" }}>Smart nutrition.</span>
              </h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
