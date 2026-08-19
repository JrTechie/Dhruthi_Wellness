import React from "react";
import { staticFile } from "remotion";

export interface CircularDhruthiLogoProps {
  size?: number; // width/height in px (default: 64)
  borderWidth?: number; // border width in px (default: 2)
  showBorder?: boolean;
}

export const CircularDhruthiLogo: React.FC<CircularDhruthiLogoProps> = ({
  size = 64,
  borderWidth = 2,
  showBorder = true,
}) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        overflow: "hidden",
        backgroundColor: "#FFFFFF",
        border: showBorder ? `${borderWidth}px solid #34D399` : "none",
        boxShadow: "0 6px 20px rgba(0, 0, 0, 0.45), 0 0 15px rgba(52, 211, 153, 0.3)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <img
        src={staticFile("assets/Logo_D_bright.png")}
        alt="Dhruthi Wellness Circular Logo"
        style={{
          width: "82%",
          height: "82%",
          objectFit: "contain",
        }}
      />
    </div>
  );
};
