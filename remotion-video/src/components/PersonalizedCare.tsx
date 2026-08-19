import React from "react";
import { interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";

export const PersonalizedCare: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const textSpring = spring({
    frame: frame - 8,
    fps,
    config: { damping: 14, mass: 0.8 },
  });

  const textY = interpolate(textSpring, [0, 1], [30, 0]);
  const textOpacity = interpolate(textSpring, [0, 1], [0, 1]);

  const meals = [
    { title: "Detox", file: "detox.jpeg" },
    { title: "Breakfast", file: "breakfast.jpeg" },
    { title: "Mid-Mrng", file: "midmrng.jpeg" },
    { title: "Lunch", file: "lunch.jpeg" },
    { title: "Snack", file: "evening.jpeg" },
  ];

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
      {/* Background Radial Glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.2) 0%, rgba(11, 19, 43, 0.95) 75%)",
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
          PERSONALIZED CARE
        </div>
      </div>

      {/* 5-Meal Horizontal Carousel View (Uncropped) */}
      <div
        style={{
          position: "absolute",
          top: 220,
          left: 54,
          width: 972,
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        <div style={{ fontSize: 16, fontWeight: 800, letterSpacing: "0.15em", color: "#A7F3D0", textTransform: "uppercase", textAlign: "center" }}>
          Tailored to your body, goals & daily schedule
        </div>

        {/* Floating 5 Meal Cards */}
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center" }}>
          {meals.map((m, idx) => {
            const cardSpring = spring({
              frame: frame - (idx * 6),
              fps,
              config: { damping: 15, mass: 0.8 },
            });

            return (
              <div
                key={idx}
                style={{
                  width: 300,
                  height: 380,
                  borderRadius: 24,
                  backgroundColor: "rgba(15, 23, 42, 0.85)",
                  border: "1px solid rgba(52, 211, 153, 0.35)",
                  boxShadow: "0 15px 35px rgba(0,0,0,0.5)",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: 10,
                  transform: `scale(${interpolate(cardSpring, [0, 1], [0.85, 1])})`,
                  opacity: interpolate(cardSpring, [0, 1], [0, 1]),
                }}
              >
                <div style={{ width: "100%", height: 320, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <img
                    src={staticFile(`assets/${m.file}`)}
                    alt={m.title}
                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                  />
                </div>
                <span style={{ fontSize: 14, fontWeight: 800, color: "#6EE7B7", marginTop: 4, letterSpacing: "0.05em" }}>
                  {m.title}
                </span>
              </div>
            );
          })}
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
            backgroundColor: "rgba(15, 23, 42, 0.9)",
            border: "1px solid rgba(52, 211, 153, 0.35)",
            backdropFilter: "blur(20px)",
            padding: "26px 44px",
            borderRadius: 28,
            boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
          }}
        >
          <span style={{ fontSize: 16, fontWeight: 700, color: "#9CA3AF", letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: 4 }}>
            Not A Generic Template Plan
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
            Personalized nutrition <span style={{ color: "#34D399" }}>for your lifestyle.</span>
          </h2>
        </div>
      </div>
    </div>
  );
};
