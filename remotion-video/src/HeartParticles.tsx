import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { COLORS_BREASTFEEDING } from "./Typography";

export const HeartParticles: React.FC<{ opacity?: number }> = ({ opacity = 1.0 }) => {
  const frame = useCurrentFrame();

  const hearts = Array.from({ length: 16 }).map((_, i) => {
    const seed = i * 99;
    const initialX = 150 + (seed % 750);
    const initialY = 1300 + ((seed * 4) % 350);

    const speedY = 1.5 + (i % 3) * 0.7;
    const speedX = Math.sin((frame + seed) / 15) * 25;

    const yPos = initialY - ((frame * speedY) % 650);
    const xPos = initialX + speedX;

    const heartOpacity = interpolate(
      (frame + i * 15) % 80,
      [0, 40, 80],
      [0.1, 0.85, 0.05],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );

    const scale = 0.8 + (i % 4) * 0.4;

    return (
      <div
        key={i}
        className="absolute pointer-events-none"
        style={{
          left: `${xPos}px`,
          top: `${yPos}px`,
          opacity: heartOpacity * opacity,
          transform: `scale(${scale})`,
        }}
      >
        <svg className="w-10 h-10 drop-shadow-lg" viewBox="0 0 24 24" fill={COLORS_BREASTFEEDING.terracotta}>
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </div>
    );
  });

  return <div className="absolute inset-0 pointer-events-none z-20">{hearts}</div>;
};
