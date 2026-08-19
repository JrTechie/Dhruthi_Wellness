import React from "react";
import { Img, staticFile } from "remotion";
import { CircularAkhilaAvatar } from "./CircularAkhilaAvatar";

export const EatingStyleCover: React.FC = () => {
  return (
    <div
      style={{
        position: "absolute",
        width: 1080,
        height: 1920,
        backgroundColor: "#000000",
        color: "#FFFFFF",
        overflow: "hidden",
      }}
    >
      {/* 1. Full Cover Image from day1ferility_cover.png */}
      <Img
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1080,
          height: 1920,
          objectFit: "cover",
        }}
        src={staticFile("assets/day1fertility_cover.png")}
      />

      {/* 2. Static Circular Avatar of Dt. Akhila (No mouth or eye expressions) */}
      <CircularAkhilaAvatar showCredentials={true} />
    </div>
  );
};
