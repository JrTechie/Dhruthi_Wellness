import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { EDITORIAL_COLORS } from "./Typography";

interface MarkerProps {
  children: React.ReactNode;
  delayFrames?: number;
  color?: string;
  heightPercent?: number;
}

export const MarkerHighlight: React.FC<MarkerProps> = ({
  children,
  delayFrames = 15,
  color = EDITORIAL_COLORS.coralLight,
  heightPercent = 45,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sp = spring({
    frame: frame - delayFrames,
    fps,
    config: { damping: 14, mass: 0.5, stiffness: 80 },
  });

  const widthProgress = interpolate(sp, [0, 1], [0, 100]);

  return (
    <span className="relative inline-block font-bold">
      <span
        style={{
          position: "absolute",
          bottom: "10%",
          left: 0,
          width: `${widthProgress}%`,
          height: `${heightPercent}%`,
          backgroundColor: color,
          zIndex: 0,
          borderRadius: "4px",
          transform: "rotate(-1deg)",
        }}
      />
      <span className="relative z-10">{children}</span>
    </span>
  );
};
