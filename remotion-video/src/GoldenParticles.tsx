import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { COLORS_BREASTFEEDING } from "./Typography";

export const GoldenParticles: React.FC = () => {
  const frame = useCurrentFrame();

  const particles = Array.from({ length: 24 }).map((_, i) => {
    const seed = i * 137.5;
    const initialX = 200 + (seed % 600);
    const initialY = 1100 + ((seed * 3) % 400);

    const speedY = 1.2 + (i % 3) * 0.8;
    const speedX = Math.sin((frame + seed) / 20) * 20;

    const yPos = initialY - ((frame * speedY) % 500);
    const xPos = initialX + speedX;

    const particleOpacity = interpolate(
      (frame + i * 10) % 60,
      [0, 30, 60],
      [0.2, 0.9, 0.1],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );

    const size = 6 + (i % 5) * 3;

    return (
      <div
        key={i}
        className="absolute rounded-full pointer-events-none"
        style={{
          left: `${xPos}px`,
          top: `${yPos}px`,
          width: `${size}px`,
          height: `${size}px`,
          backgroundColor: COLORS_BREASTFEEDING.goldGlow,
          opacity: particleOpacity,
          boxShadow: `0 0 16px ${COLORS_BREASTFEEDING.goldGlow}, 0 0 30px #FFF`,
          transform: "scale(1.1)",
        }}
      />
    );
  });

  return <div className="absolute inset-0 pointer-events-none z-20">{particles}</div>;
};
