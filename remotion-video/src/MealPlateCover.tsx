import React from "react";
import { interpolate, staticFile, useCurrentFrame } from "remotion";

export const MealPlateCover: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        position: "absolute",
        width: 1080,
        height: 1920,
        overflow: "hidden",
        backgroundColor: "#000000",
      }}
    >
      {/* 100% Full-Screen Clean User Poster (11-8-26.png) - Zero Overlays */}
      <img
        src={staticFile("assets/11-8-26.png")}
        alt="Dhruthi Wellness Meal Box Cover Poster"
        style={{
          position: "absolute",
          inset: 0,
          width: 1080,
          height: 1920,
          objectFit: "cover",
          objectPosition: "center center",
          transform: `scale(${interpolate(frame, [0, 90], [1.0, 1.04])})`,
        }}
      />
    </div>
  );
};
