import React from "react";
import { useCurrentFrame } from "remotion";
import { EDITORIAL_COLORS } from "./Typography";

export const BotanicalLeaves: React.FC<{ opacity?: number }> = ({ opacity = 1.0 }) => {
  const frame = useCurrentFrame();
  const sway = Math.sin(frame / 30) * 4;

  return (
    <div
      className="absolute inset-0 pointer-events-none z-30 overflow-hidden"
      style={{ opacity }}
    >
      {/* Top Left Delicate Botanical Stem */}
      <svg
        className="absolute top-12 left-8 w-56 h-56"
        style={{ transform: `rotate(${sway}deg)` }}
        viewBox="0 0 200 200"
        fill="none"
      >
        <path
          d="M30 170 C 60 120, 100 80, 160 30"
          stroke={EDITORIAL_COLORS.sage}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Leaf pairs */}
        <path
          d="M60 125 C 40 100, 30 110, 60 125 Z"
          fill={EDITORIAL_COLORS.softRose}
          opacity="0.65"
        />
        <path
          d="M90 95 C 110 75, 120 85, 90 95 Z"
          fill={EDITORIAL_COLORS.sage}
          opacity="0.65"
        />
        <path
          d="M120 65 C 100 45, 90 55, 120 65 Z"
          fill={EDITORIAL_COLORS.babyPink}
          opacity="0.75"
        />
        <path
          d="M145 42 C 160 25, 170 35, 145 42 Z"
          fill={EDITORIAL_COLORS.sage}
          opacity="0.75"
        />
      </svg>

      {/* Bottom Right Delicate Botanical Stem */}
      <svg
        className="absolute bottom-16 right-8 w-64 h-64"
        style={{ transform: `rotate(${-sway}deg) scaleX(-1)` }}
        viewBox="0 0 200 200"
        fill="none"
      >
        <path
          d="M30 170 C 60 120, 100 80, 160 30"
          stroke={EDITORIAL_COLORS.roseGold}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M60 125 C 40 100, 30 110, 60 125 Z"
          fill={EDITORIAL_COLORS.softRose}
          opacity="0.6"
        />
        <path
          d="M90 95 C 110 75, 120 85, 90 95 Z"
          fill={EDITORIAL_COLORS.sage}
          opacity="0.6"
        />
        <path
          d="M120 65 C 100 45, 90 55, 120 65 Z"
          fill={EDITORIAL_COLORS.babyPink}
          opacity="0.7"
        />
      </svg>
    </div>
  );
};

