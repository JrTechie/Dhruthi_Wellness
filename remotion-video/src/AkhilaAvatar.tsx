import React from "react";
import { Img, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";

interface AkhilaAvatarProps {
  envelopeValue?: number;
  expressionMode?: "warm" | "serious" | "confident" | "explanatory" | "smiling";
  showCredentials?: boolean;
  theme?: "dark" | "white";
}

export const AkhilaAvatar: React.FC<AkhilaAvatarProps> = ({
  envelopeValue = 0,
  expressionMode = "warm",
  showCredentials = true,
  theme = "white",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. Audio-driven mouth opening
  const mouthOpen = Math.min(1.0, envelopeValue * 4.2);

  // 2. Micro-Animations: Eye Blink every 3.5s (105 frames)
  const blinkCycle = frame % 105;
  const isBlinking = blinkCycle >= 0 && blinkCycle <= 4;

  // 3. Head Motion & Breathing
  const headTilt = Math.sin((frame / fps) * 1.5) * 1.2;
  const headBobY = Math.sin((frame / fps) * 2.0) * 4.0;
  const breathingScale = 1 + Math.sin((frame / fps) * 2.5) * 0.006;

  // 4. Expression Adjustments
  let eyebrowOffset = 0;

  if (expressionMode === "serious") {
    eyebrowOffset = 3;
  } else if (expressionMode === "confident") {
    eyebrowOffset = -1;
  } else if (expressionMode === "explanatory") {
    eyebrowOffset = -2;
  } else if (expressionMode === "smiling") {
    eyebrowOffset = -3;
  }

  // 5. Visualizer Rings Scale
  const ring1Scale = 1 + envelopeValue * 0.12;
  const ring2Scale = 1 + envelopeValue * 0.25;
  const ringOpacity = 0.35 + envelopeValue * 0.45;

  const isWhite = theme === "white";

  return (
    <div
      style={{
        position: "absolute",
        right: 50,
        top: 620,
        width: 440,
        height: 720,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        zIndex: 50,
      }}
    >
      {/* Visualizer Aura Rings */}
      <div
        style={{
          position: "absolute",
          top: 0,
          width: 440,
          height: 440,
          borderRadius: "50%",
          border: `2px solid ${isWhite ? "#C5A059" : "#C5A059"}`,
          opacity: ringOpacity,
          transform: `scale(${ring1Scale})`,
          transition: "transform 0.05s ease-out",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          width: 440,
          height: 440,
          borderRadius: "50%",
          border: `2px dashed ${isWhite ? "#00A86B" : "#00FF9D"}`,
          opacity: ringOpacity * 0.8,
          transform: `scale(${ring2Scale})`,
          transition: "transform 0.05s ease-out",
        }}
      />

      {/* Main Avatar Container */}
      <div
        style={{
          position: "relative",
          width: 440,
          height: 440,
          borderRadius: "50%",
          overflow: "hidden",
          border: `5px solid ${isWhite ? "#C5A059" : "#C5A059"}`,
          boxShadow: isWhite
            ? "0 20px 50px rgba(15,36,28,0.15), 0 0 30px rgba(197,160,89,0.25)"
            : "0 20px 50px rgba(0,0,0,0.4), 0 0 30px rgba(197,160,89,0.3)",
          transform: `translateY(${headBobY}px) rotate(${headTilt}deg) scale(${breathingScale})`,
          transition: "transform 0.05s linear",
          backgroundColor: isWhite ? "#F7F5F0" : "#0F241C",
        }}
      >
        {/* Base Portrait Image */}
        <Img
          src={staticFile("assets/dt_akhila.png")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

        {/* Dynamic Eye Blink Overlay */}
        {isBlinking && (
          <div
            style={{
              position: "absolute",
              top: "43%",
              left: "32%",
              width: "36%",
              height: "10px",
              backgroundColor: "#E2B89B",
              borderRadius: "5px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
            }}
          />
        )}

        {/* Speech Morphing Mouth Overlay */}
        {mouthOpen > 0.04 && (
          <div
            style={{
              position: "absolute",
              top: "61%",
              left: "42%",
              width: "16%",
              height: `${14 * (1 + mouthOpen * 1.5)}px`,
              backgroundColor: `rgba(60, 20, 30, ${0.7 + mouthOpen * 0.3})`,
              borderRadius: "50%",
              transform: "translateX(-50%)",
              borderTop: "2px solid #D98880",
              boxShadow: "inset 0 2px 4px rgba(0,0,0,0.6)",
              transition: "height 0.04s ease-out",
            }}
          />
        )}
      </div>

      {/* Verified Credentials Pill Below Avatar - Big & Bright */}
      {showCredentials && (
        <div
          style={{
            marginTop: 22,
            backgroundColor: "#FFFFFF",
            border: "2.5px solid #C5A059",
            borderRadius: 26,
            padding: "14px 28px",
            display: "flex",
            alignItems: "center",
            gap: 14,
            boxShadow: "0 12px 35px rgba(0, 0, 0, 0.4), 0 0 20px rgba(197, 160, 89, 0.3)",
            whiteSpace: "nowrap",
            zIndex: 60,
          }}
        >
          <div
            style={{
              width: 26,
              height: 26,
              borderRadius: "50%",
              backgroundColor: "#C5A059",
              color: "#FFFFFF",
              fontSize: 15,
              fontWeight: 900,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 8px rgba(197, 160, 89, 0.5)",
            }}
          >
            ✓
          </div>
          <div>
            <div
              style={{
                fontFamily: "Outfit, sans-serif",
                fontWeight: 900,
                fontSize: 22,
                color: "#0F241C",
                lineHeight: 1.25,
                letterSpacing: 0.3,
              }}
            >
              Dt. Akhila Konakalla
            </div>
            <div
              style={{
                fontFamily: "Outfit, sans-serif",
                fontWeight: 800,
                fontSize: 15,
                color: "#B8860B",
                lineHeight: 1.2,
                letterSpacing: 0.2,
              }}
            >
              M.Sc. Clinical Nutritionist
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
