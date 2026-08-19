import React from "react";
import { interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";

export const MealPlateScene5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Slow zoom-out effect
  const bgScale = interpolate(frame, [0, 135], [1.08, 1.0], {
    extrapolateRight: "clamp",
  });

  const logoSpring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 14, mass: 0.8 },
  });

  const textSpring = spring({
    frame: frame - 25,
    fps,
    config: { damping: 14, mass: 0.8 },
  });

  const ctaSpring = spring({
    frame: frame - 45,
    fps,
    config: { damping: 15, mass: 0.9 },
  });

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
        backgroundColor: "#050C09",
        fontFamily: "'Outfit', 'Inter', sans-serif",
        color: "#FFFFFF",
        overflow: "hidden",
      }}
    >
      {/* Background Ambient Gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at center, rgba(16, 185, 129, 0.18) 0%, rgba(5, 12, 9, 0.95) 75%)",
          transform: `scale(${bgScale})`,
        }}
      />

      {/* Background Decorative Rings */}
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 950,
          height: 950,
          borderRadius: "50%",
          border: "1px solid rgba(52, 211, 153, 0.12)",
          pointerEvents: "none",
        }}
      />

      {/* Top Dhruthi Wellness Logo */}
      <div
        style={{
          position: "absolute",
          top: 90,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          transform: `scale(${logoSpring})`,
        }}
      >
        <img
          src={staticFile("assets/Logo_D_bright.png")}
          alt="Dhruthi Wellness Logo"
          style={{ height: 110, objectFit: "contain", filter: "drop-shadow(0 6px 20px rgba(16,185,129,0.3))" }}
        />
        <h1
          style={{
            fontSize: 36,
            fontWeight: 900,
            letterSpacing: "0.18em",
            color: "#FFFFFF",
            margin: "18px 0 0 0",
            textTransform: "uppercase",
          }}
        >
          DHRUTHI WELLNESS
        </h1>
        <p
          style={{
            fontSize: 15,
            fontWeight: 700,
            letterSpacing: "0.25em",
            color: "#34D399",
            margin: "6px 0 0 0",
            textTransform: "uppercase",
          }}
        >
          Customized Metabolic & Nutrition Therapy
        </p>
      </div>

      {/* 5-Meal Chronological Showcase Grid (No Cropping) */}
      <div
        style={{
          position: "absolute",
          top: 410,
          left: 54,
          width: 972,
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <div style={{ fontSize: 15, fontWeight: 800, letterSpacing: "0.15em", color: "#A7F3D0", textTransform: "uppercase", textAlign: "center" }}>
          Complete Office Woman's Daily Meal Flow
        </div>

        {/* Top 3 Meals Grid (Detox, Breakfast, Mid-Morning) */}
        <div style={{ display: "flex", gap: 14, justifyContent: "center" }}>
          {meals.slice(0, 3).map((m, idx) => (
            <div
              key={idx}
              style={{
                width: 300,
                height: 360,
                borderRadius: 24,
                backgroundColor: "rgba(15, 23, 42, 0.8)",
                border: "1px solid rgba(52, 211, 153, 0.3)",
                boxShadow: "0 12px 30px rgba(0,0,0,0.5)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: 10,
              }}
            >
              <div style={{ width: "100%", height: 300, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img
                  src={staticFile(`assets/${m.file}`)}
                  alt={m.title}
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
              </div>
              <span style={{ fontSize: 14, fontWeight: 700, color: "#6EE7B7", marginTop: 4, letterSpacing: "0.05em" }}>
                {idx + 1}. {m.title}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom 2 Meals Grid (Lunch & Evening Snack) */}
        <div style={{ display: "flex", gap: 14, justifyContent: "center" }}>
          {meals.slice(3, 5).map((m, idx) => (
            <div
              key={idx}
              style={{
                width: 458,
                height: 360,
                borderRadius: 24,
                backgroundColor: "rgba(15, 23, 42, 0.8)",
                border: "1px solid rgba(52, 211, 153, 0.3)",
                boxShadow: "0 12px 30px rgba(0,0,0,0.5)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: 10,
              }}
            >
              <div style={{ width: "100%", height: 300, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img
                  src={staticFile(`assets/${m.file}`)}
                  alt={m.title}
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
              </div>
              <span style={{ fontSize: 14, fontWeight: 700, color: "#6EE7B7", marginTop: 4, letterSpacing: "0.05em" }}>
                {idx + 4}. {m.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Tagline & Final CTA */}
      <div
        style={{
          position: "absolute",
          bottom: 120,
          left: 54,
          width: 972,
          textAlign: "center",
          transform: `scale(${textSpring})`,
        }}
      >
        <h2
          style={{
            fontSize: 36,
            fontWeight: 800,
            color: "#FFFFFF",
            margin: "0 0 16px 0",
            letterSpacing: "-0.01em",
          }}
        >
          Eat better. <span style={{ color: "#34D399" }}>Nourish better.</span> Live better.
        </h2>

        {/* CTA Button Badge */}
        <div
          style={{
            display: "inline-block",
            backgroundColor: "#059669",
            border: "1px solid rgba(110, 231, 183, 0.5)",
            padding: "16px 36px",
            borderRadius: 999,
            boxShadow: "0 12px 32px rgba(16,185,129,0.4)",
            transform: `scale(${ctaSpring})`,
          }}
        >
          <span style={{ fontSize: 18, fontWeight: 800, color: "#FFFFFF", letterSpacing: "0.06em", textTransform: "uppercase" }}>
            Your Health • Your Plan • Your Journey
          </span>
        </div>

        {/* Dr. Akhila Signature Tag */}
        <div style={{ marginTop: 20, display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
          <img
            src={staticFile("assets/akhi_sign_transparent.png")}
            alt="Dr. Akhila Konakalla Signature"
            style={{ height: 42, objectFit: "contain", filter: "brightness(2)" }}
          />
          <span style={{ fontSize: 14, fontWeight: 600, color: "#A7F3D0", letterSpacing: "0.05em" }}>
            Dr. Akhila Konakalla • Chief Dietitian
          </span>
        </div>
      </div>
    </div>
  );
};
