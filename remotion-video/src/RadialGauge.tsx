import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { EDITORIAL_COLORS, loadFonts } from "./Typography";

interface GaugeProps {
  value: number;
  label: string;
  sublabel?: string;
  color?: string;
  delayFrames?: number;
}

export const RadialGauge: React.FC<GaugeProps> = ({
  value,
  label,
  sublabel = "",
  color = EDITORIAL_COLORS.coral,
  delayFrames = 10,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fonts = loadFonts();

  const sp = spring({
    frame: frame - delayFrames,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 80 },
  });

  const progress = interpolate(sp, [0, 1], [0, value]);
  const strokeDash = (progress / 100) * 283;

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-3xl border border-black/10 shadow-lg">
      <div className="relative w-36 h-36 flex items-center justify-center mb-3">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="#E2EEE7"
            strokeWidth="9"
            fill="transparent"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke={color}
            strokeWidth="9"
            strokeDasharray={`${strokeDash} 283`}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>
        <span
          style={{ fontFamily: fonts.outfit, color: EDITORIAL_COLORS.obsidian }}
          className="absolute text-3xl font-extrabold"
        >
          {Math.round(progress)}%
        </span>
      </div>
      <span
        style={{ fontFamily: fonts.outfit, color: EDITORIAL_COLORS.emerald }}
        className="text-2xl font-bold uppercase tracking-wider text-center"
      >
        {label}
      </span>
      {sublabel && (
        <span
          style={{ fontFamily: fonts.outfit, color: "#666" }}
          className="text-lg font-medium text-center"
        >
          {sublabel}
        </span>
      )}
    </div>
  );
};
