import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CircularDhruthiLogo } from "./CircularDhruthiLogo";

export const BrandOutroV2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const microY = interpolate(frame, [0, 180], [0, -4]);

  const entranceSpring = spring({
    frame: frame - 4,
    fps,
    config: { damping: 16, mass: 0.8 },
  });

  const opacity = interpolate(entranceSpring, [0, 1], [0, 1]);
  const scale = interpolate(entranceSpring, [0, 1], [0.95, 1]);
  const animY = interpolate(entranceSpring, [0, 1], [10, 0]);

  const ctaSpring = spring({
    frame: frame - 22,
    fps,
    config: { damping: 15, mass: 0.9 },
  });

  const actionButtonsSpring = spring({
    frame: frame - 36,
    fps,
    config: { damping: 15, mass: 0.9 },
  });

  const docSpring = spring({
    frame: frame - 48,
    fps,
    config: { damping: 15, mass: 0.9 },
  });

  return (
    <div
      style={{
        position: "relative",
        width: 1080,
        height: 1920,
        fontFamily: "'Outfit', 'Inter', sans-serif",
        overflow: "hidden",
        background: "linear-gradient(145deg, #02120C 0%, #062E21 45%, #03140E 100%)",
        color: "#FFFFFF",
      }}
    >
      {/* Ambient Radial Lighting for Luxury Medical Feel */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 900,
          height: 900,
          background: "radial-gradient(circle, rgba(52, 211, 153, 0.18) 0%, rgba(0,0,0,0) 70%)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />

      {/* ALL CONTENT PERFECTLY CENTERED IN THE MIDDLE OF THE PAGE (Y = 50%) */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, calc(-50% + ${animY + microY}px)) scale(${scale})`,
          opacity,
          width: "86%",
          maxWidth: 920,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          zIndex: 30,
        }}
      >
        {/* BRAND LOGO LOCKUP */}
        <CircularDhruthiLogo size={135} borderWidth={4} />

        <h1
          style={{
            fontSize: 50,
            fontWeight: 900,
            letterSpacing: "0.16em",
            color: "#FFFFFF",
            margin: "20px 0 0 0",
            textTransform: "uppercase",
            textShadow: "0 4px 20px rgba(0,0,0,0.85), 0 0 30px rgba(52,211,153,0.25)",
          }}
        >
          DHRUTHI WELLNESS
        </h1>

        <div
          style={{
            marginTop: 12,
            backgroundColor: "rgba(6, 78, 59, 0.75)",
            border: "1px solid rgba(52, 211, 153, 0.5)",
            padding: "8px 26px",
            borderRadius: 999,
            fontSize: 14,
            fontWeight: 800,
            letterSpacing: "0.2em",
            color: "#A7F3D0",
            textTransform: "uppercase",
            backdropFilter: "blur(16px)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
          }}
        >
          PERSONALIZED NUTRITION & CLINICAL DIET THERAPY
        </div>

        {/* MAIN CARD CONTAINER */}
        <div
          style={{
            marginTop: 28,
            backgroundColor: "rgba(6, 26, 20, 0.78)",
            border: "1.5px solid rgba(52, 211, 153, 0.40)",
            backdropFilter: "blur(24px)",
            padding: "38px 44px",
            borderRadius: 36,
            width: "100%",
            boxShadow: "0 30px 75px rgba(0, 0, 0, 0.75)",
          }}
        >
          <div
            style={{
              fontSize: 36,
              fontWeight: 900,
              color: "#F8FAFC",
              letterSpacing: "-0.01em",
              lineHeight: 1.2,
            }}
          >
            HEALTHY EATING MADE SIMPLE
          </div>
          <div
            style={{
              fontSize: 44,
              fontWeight: 900,
              color: "#34D399",
              letterSpacing: "-0.01em",
              lineHeight: 1.2,
              marginTop: 6,
              textShadow: "0 4px 24px rgba(0,0,0,0.9), 0 0 30px rgba(52,211,153,0.35)",
            }}
          >
            FOR WORKING LIVES
          </div>

          <div
            style={{
              width: 100,
              height: 3,
              backgroundColor: "#10B981",
              borderRadius: 2,
              margin: "20px auto 20px auto",
            }}
          />

          {/* Consultation CTA Button */}
          <div
            style={{
              transform: `scale(${interpolate(ctaSpring, [0, 1], [0.9, 1])})`,
              opacity: interpolate(ctaSpring, [0, 1], [0, 1]),
            }}
          >
            <div
              style={{
                display: "inline-block",
                backgroundColor: "#059669",
                border: "1.5px solid rgba(110, 231, 183, 0.6)",
                padding: "16px 36px",
                borderRadius: 999,
                boxShadow: "0 12px 28px rgba(0,0,0,0.5), 0 0 20px rgba(52,211,153,0.3)",
              }}
            >
              <span
                style={{
                  fontSize: 16,
                  fontWeight: 900,
                  color: "#FFFFFF",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                BOOK YOUR PERSONALIZED CONSULTATION
              </span>
            </div>
          </div>

          {/* SOCIAL ENGAGEMENT ACTION BUTTONS: LIKE, SHARE, SAVE */}
          <div
            style={{
              marginTop: 26,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 16,
              transform: `scale(${interpolate(actionButtonsSpring, [0, 1], [0.9, 1])})`,
              opacity: interpolate(actionButtonsSpring, [0, 1], [0, 1]),
            }}
          >
            {/* LIKE BUTTON */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(52, 211, 153, 0.35)",
                padding: "10px 20px",
                borderRadius: 999,
                fontSize: 14,
                fontWeight: 800,
                color: "#F8FAFC",
                letterSpacing: "0.06em",
                backdropFilter: "blur(12px)",
              }}
            >
              <span style={{ fontSize: 18 }}>❤️</span> LIKE
            </div>

            {/* SHARE BUTTON */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(52, 211, 153, 0.35)",
                padding: "10px 20px",
                borderRadius: 999,
                fontSize: 14,
                fontWeight: 800,
                color: "#F8FAFC",
                letterSpacing: "0.06em",
                backdropFilter: "blur(12px)",
              }}
            >
              <span style={{ fontSize: 18 }}>↗️</span> SHARE
            </div>

            {/* SAVE BUTTON */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(52, 211, 153, 0.35)",
                padding: "10px 20px",
                borderRadius: 999,
                fontSize: 14,
                fontWeight: 800,
                color: "#6EE7B7",
                letterSpacing: "0.06em",
                backdropFilter: "blur(12px)",
              }}
            >
              <span style={{ fontSize: 18 }}>📌</span> SAVE FOR LATER
            </div>
          </div>
        </div>

        {/* AUTHOR CREDENTIALS BADGE */}
        <div
          style={{
            marginTop: 24,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(6, 26, 20, 0.85)",
            border: "1px solid rgba(52, 211, 153, 0.45)",
            padding: "12px 32px",
            borderRadius: 999,
            backdropFilter: "blur(20px)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
            transform: `scale(${interpolate(docSpring, [0, 1], [0.9, 1])})`,
            opacity: interpolate(docSpring, [0, 1], [0, 1]),
          }}
        >
          <span style={{ fontSize: 16, fontWeight: 800, color: "#A7F3D0", letterSpacing: "0.05em" }}>
            Dt. Akhila Konakalla • Chief Dietitian & Clinical Nutritionist
          </span>
        </div>
      </div>
    </div>
  );
};
