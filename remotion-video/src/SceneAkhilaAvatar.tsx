import React from "react";
import { Img, staticFile } from "remotion";
import { loadFonts } from "./Typography";

export interface SceneAkhilaAvatarProps {
  top?: number;
  right?: number;
  scale?: number;
  style?: React.CSSProperties;
}

export const SceneAkhilaAvatar: React.FC<SceneAkhilaAvatarProps> = ({
  top = 140,
  right = 80,
  scale = 1,
  style,
}) => {
  const fonts = loadFonts();

  return (
    <div
      style={{
        position: "absolute",
        right,
        top,
        transform: scale !== 1 ? `scale(${scale})` : undefined,
        transformOrigin: "top right",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        zIndex: 50,
        ...style,
      }}
    >
      {/* Premium Visualizer Aura */}
      <div
        style={{
          position: "absolute",
          top: -6,
          width: 212,
          height: 212,
          borderRadius: "50%",
          border: "2px solid rgba(197, 160, 89, 0.4)",
        }}
      />

      {/* Clean Static Circular Avatar */}
      <div
        style={{
          width: 200,
          height: 200,
          borderRadius: "50%",
          overflow: "hidden",
          border: "3px solid #C5A059",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.35)",
          backgroundColor: "#FAF9F5",
        }}
      >
        <Img
          src={staticFile("assets/akcrop.png")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>

      {/* Verified Name Pill Below the Avatar - Big & Bright */}
      <div
        style={{
          marginTop: 18,
          backgroundColor: "#FFFFFF",
          border: "2.5px solid #C5A059",
          borderRadius: 24,
          padding: "12px 26px",
          display: "flex",
          alignItems: "center",
          gap: 12,
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
        <div style={{ textAlign: "left" }}>
          <div
            style={{
              fontFamily: fonts.body,
              fontWeight: 900,
              fontSize: 20,
              color: "#0F241C",
              lineHeight: 1.25,
              letterSpacing: 0.3,
            }}
          >
            Dt. Akhila Konakalla
          </div>
          <div
            style={{
              fontFamily: fonts.body,
              fontWeight: 800,
              fontSize: 14,
              color: "#B8860B",
              lineHeight: 1.2,
              letterSpacing: 0.2,
            }}
          >
            M.Sc. Clinical Nutritionist
          </div>
        </div>
      </div>
    </div>
  );
};
