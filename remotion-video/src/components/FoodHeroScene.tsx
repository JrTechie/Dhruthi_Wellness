import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FullScreenFoodImage } from "./FullScreenFoodImage";
import { CircularDhruthiLogo } from "./CircularDhruthiLogo";

export const FoodHeroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const microY = interpolate(frame, [0, 90], [0, -3]);

  const entranceSpring = spring({
    frame: frame - 6,
    fps,
    config: { damping: 16, mass: 0.8 },
  });

  const opacity = interpolate(entranceSpring, [0, 1], [0, 1]);
  const scale = interpolate(entranceSpring, [0, 1], [0.95, 1]);
  const animY = interpolate(entranceSpring, [0, 1], [10, 0]);

  return (
    <div style={{ position: "relative", width: 1080, height: 1920, fontFamily: "'Outfit', 'Inter', sans-serif" }}>
      {/* 100% Authentic Client Food Photo */}
      <FullScreenFoodImage
        src="breakfast.jpeg"
        focalX={50}
        focalY={45}
        startScale={1.02}
        endScale={1.06}
        motionType="pan-up"
        durationInFrames={90}
      />

      {/* TOP EDITORIAL BRAND BAR (SCALED UP FOR PROMINENT READABILITY) */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 50,
          right: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 30,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            backgroundColor: "rgba(6, 20, 15, 0.70)",
            border: "1.5px solid rgba(52, 211, 153, 0.45)",
            padding: "8px 22px 8px 10px",
            borderRadius: 999,
            backdropFilter: "blur(16px)",
            boxShadow: "0 8px 22px rgba(0,0,0,0.5)",
          }}
        >
          <CircularDhruthiLogo size={42} borderWidth={2.5} />
          <span style={{ fontSize: 17, fontWeight: 800, letterSpacing: "0.15em", color: "#F8FAFC" }}>
            DHRUTHI WELLNESS
          </span>
        </div>

        <div
          style={{
            backgroundColor: "rgba(6, 20, 15, 0.70)",
            border: "1.5px solid rgba(52, 211, 153, 0.45)",
            padding: "10px 22px",
            borderRadius: 999,
            fontSize: 15,
            fontWeight: 800,
            color: "#6EE7B7",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            backdropFilter: "blur(16px)",
            boxShadow: "0 8px 22px rgba(0,0,0,0.5)",
          }}
        >
          MEAL 02 OF 05
        </div>
      </div>

      {/* SINGLE PROMINENT STAGE HEADING GRID CARD (Y = 48%, FONT 54px) */}
      <div
        style={{
          position: "absolute",
          top: "48%",
          left: "50%",
          transform: `translate(-50%, calc(-50% + ${animY + microY}px)) scale(${scale})`,
          opacity,
          width: "80%",
          maxWidth: 860,
          zIndex: 35,
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(6, 78, 59, 0.88)",
            border: "2px solid rgba(110, 231, 183, 0.70)",
            backdropFilter: "blur(24px)",
            padding: "26px 44px",
            borderRadius: 30,
            textAlign: "center",
            boxShadow: "0 22px 60px rgba(0,0,0,0.70)",
          }}
        >
          <h1
            style={{
              fontSize: 54,
              fontWeight: 900,
              margin: 0,
              letterSpacing: "0.06em",
              color: "#FFFFFF",
              textTransform: "uppercase",
              textShadow: "0 4px 18px rgba(0,0,0,0.95), 0 0 28px rgba(52,211,153,0.40)",
            }}
          >
            BREAKFAST
          </h1>
        </div>
      </div>
    </div>
  );
};
