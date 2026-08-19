import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { AkhilaAvatar } from "./AkhilaAvatar";
import metadata from "../public/assets/preconception_45s_metadata.json";

export const Preconception45sScene4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const lineObj = metadata.lines["4"];
  const envelopeValue = lineObj && lineObj.envelope && lineObj.envelope[frame] ? lineObj.envelope[frame] : 0;

  const isOutro = frame > 231; // Line 4 finishes at frame 231 (rel to frame 1171)

  const introSpring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 14, mass: 0.8 },
  });

  const outroSpring = spring({
    frame: frame - 231,
    fps,
    config: { damping: 14, mass: 0.8 },
  });

  return (
    <div
      style={{
        position: "absolute",
        width: 1080,
        height: 1920,
        backgroundColor: "#08120E",
        color: "#FFFFFF",
      }}
    >
      {/* Background Orbs */}
      <div
        style={{
          position: "absolute",
          top: -100,
          left: -100,
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(197,160,89,0.18) 0%, rgba(0,0,0,0) 70%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 200,
          left: -150,
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,255,157,0.15) 0%, rgba(0,0,0,0) 70%)",
        }}
      />

      {/* Header Pill */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 60,
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(15, 36, 28, 0.9)",
            border: "1.5px solid #C5A059",
            borderRadius: 25,
            padding: "8px 24px",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: "#C5A059",
            }}
          />
          <span
            style={{
              fontFamily: "Outfit, sans-serif",
              fontWeight: 700,
              fontSize: 20,
              color: "#C5A059",
              letterSpacing: 1.5,
            }}
          >
            DHRUTHI WELLNESS
          </span>
        </div>
      </div>

      {!isOutro ? (
        /* Line 4 Narration Content */
        <div
          style={{
            position: "absolute",
            left: 70,
            top: 400,
            width: 530,
            transform: `translateY(${interpolate(introSpring, [0, 1], [40, 0])}px)`,
            opacity: introSpring,
          }}
        >
          <div
            style={{
              fontFamily: "Outfit, sans-serif",
              fontWeight: 800,
              fontSize: 20,
              color: "#C5A059",
              letterSpacing: 2,
              marginBottom: 16,
            }}
          >
            START YOUR JOURNEY
          </div>

          <h2
            style={{
              fontFamily: "Italiana, Georgia, serif",
              fontSize: 64,
              fontWeight: 400,
              lineHeight: 1.15,
              color: "#FFFFFF",
              margin: 0,
              marginBottom: 36,
            }}
          >
            Give Your Future Baby The Strongest Foundation
          </h2>

          <div
            style={{
              backgroundColor: "rgba(15, 36, 28, 0.85)",
              border: "1.5px solid #00FF9D",
              borderRadius: 28,
              padding: 36,
              backdropFilter: "blur(10px)",
              boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
            }}
          >
            <div
              style={{
                fontFamily: "Outfit, sans-serif",
                fontSize: 28,
                lineHeight: 1.5,
                color: "#FFFFFF",
                fontWeight: 600,
              }}
            >
              Book your personalized preconception nutrition consultation with Dhruthi Wellness today.
            </div>
          </div>
        </div>
      ) : (
        /* Final Series Frame Outro */
        <div
          style={{
            position: "absolute",
            left: 70,
            top: 360,
            width: 530,
            transform: `translateY(${interpolate(outroSpring, [0, 1], [40, 0])}px)`,
            opacity: outroSpring,
          }}
        >
          <h1
            style={{
              fontFamily: "Italiana, Georgia, serif",
              fontSize: 66,
              fontWeight: 400,
              lineHeight: 1.1,
              color: "#FFFFFF",
              margin: 0,
              marginBottom: 16,
            }}
          >
            FROM PRECONCEPTION
            <br />
            <span style={{ color: "#C5A059", fontWeight: 700 }}>TO CONCEPTION</span>
          </h1>

          <div
            style={{
              fontFamily: "Outfit, sans-serif",
              fontWeight: 600,
              fontSize: 28,
              color: "#00FF9D",
              marginBottom: 36,
            }}
          >
            Evidence-Based Fertility Nutrition Series
          </div>

          <div
            style={{
              backgroundColor: "rgba(15, 36, 28, 0.9)",
              border: "1.5px solid #C5A059",
              borderRadius: 24,
              padding: "24px 32px",
              marginBottom: 40,
            }}
          >
            <div
              style={{
                fontFamily: "Outfit, sans-serif",
                fontSize: 26,
                color: "#D1E0D7",
                lineHeight: 1.4,
              }}
            >
              Your journey starts before conception.
            </div>
          </div>

          {/* CTA Button */}
          <div
            style={{
              display: "inline-block",
              backgroundColor: "#C5A059",
              borderRadius: 30,
              padding: "16px 36px",
              color: "#08120E",
              fontFamily: "Outfit, sans-serif",
              fontWeight: 800,
              fontSize: 22,
              letterSpacing: 0.5,
              boxShadow: "0 10px 25px rgba(197,160,89,0.3)",
            }}
          >
            Book Your Consultation Today 🌸
          </div>
        </div>
      )}

      {/* Akhila Avatar on Right Side */}
      <AkhilaAvatar
        envelopeValue={envelopeValue}
        expressionMode={isOutro ? "smiling" : "smiling"}
        showCredentials={true}
      />
    </div>
  );
};
