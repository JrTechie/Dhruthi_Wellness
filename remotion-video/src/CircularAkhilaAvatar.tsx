import React from "react";
import { Img, staticFile } from "remotion";

interface CircularAkhilaAvatarProps {
  showCredentials?: boolean;
}

export const CircularAkhilaAvatar: React.FC<CircularAkhilaAvatarProps> = ({
  showCredentials = true,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        right: 60,
        top: 540,
        width: 360,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        zIndex: 50,
      }}
    >
      {/* Static Visualizer Ring */}
      <div
        style={{
          position: "absolute",
          top: 0,
          width: 340,
          height: 340,
          borderRadius: "50%",
          border: "2px solid #C5A059",
          opacity: 0.5,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          width: 340,
          height: 340,
          borderRadius: "50%",
          border: "2px dashed #00FF9D",
          opacity: 0.4,
        }}
      />

      {/* Clean Static Circular Avatar Frame using Akcrop.png */}
      <div
        style={{
          position: "relative",
          width: 340,
          height: 340,
          borderRadius: "50%",
          overflow: "hidden",
          border: "4px solid #C5A059",
          boxShadow: "0 20px 50px rgba(0,0,0,0.5), 0 0 35px rgba(197,160,89,0.35)",
          backgroundColor: "#0F241C",
        }}
      >
        {/* Base Cropped Portrait Image */}
        <Img
          src={staticFile("assets/akcrop.png")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>

      {/* Verified Credentials Pill */}
      {showCredentials && (
        <div
          style={{
            marginTop: 20,
            backgroundColor: "rgba(15, 36, 28, 0.92)",
            border: "1.5px solid #C5A059",
            borderRadius: 24,
            padding: "10px 22px",
            display: "flex",
            alignItems: "center",
            gap: 10,
            boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: "50%",
              backgroundColor: "#00FF9D",
              color: "#08120E",
              fontSize: 12,
              fontWeight: 800,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ✓
          </div>
          <div>
            <div
              style={{
                fontFamily: "Outfit, sans-serif",
                fontWeight: 700,
                fontSize: 17,
                color: "#FFFFFF",
                lineHeight: 1.2,
              }}
            >
              Dt. Akhila Konakalla
            </div>
            <div
              style={{
                fontFamily: "Outfit, sans-serif",
                fontWeight: 600,
                fontSize: 13,
                color: "#C5A059",
                lineHeight: 1.2,
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
