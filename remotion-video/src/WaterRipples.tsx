import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

export const WaterRipples: React.FC<{ opacity?: number }> = ({ opacity = 1 }) => {
  const frame = useCurrentFrame();

  // 3 staggered expanding ripple rings
  const ring1Scale = interpolate(frame % 90, [0, 90], [0.3, 2.2]);
  const ring1Opacity = interpolate(frame % 90, [0, 20, 90], [0, 0.45, 0]);

  const ring2Scale = interpolate((frame + 30) % 90, [0, 90], [0.3, 2.2]);
  const ring2Opacity = interpolate((frame + 30) % 90, [0, 20, 90], [0, 0.4, 0]);

  const ring3Scale = interpolate((frame + 60) % 90, [0, 90], [0.3, 2.2]);
  const ring3Opacity = interpolate((frame + 60) % 90, [0, 20, 90], [0, 0.35, 0]);

  return (
    <AbsoluteFill
      className="pointer-events-none z-15 flex justify-center items-center overflow-hidden"
      style={{ opacity }}
    >
      <div
        className="absolute rounded-full border border-[rgba(255,255,255,0.6)]"
        style={{
          width: "450px",
          height: "450px",
          transform: `scale(${ring1Scale})`,
          opacity: ring1Opacity,
          boxShadow: "0 0 20px rgba(148, 168, 154, 0.4), inset 0 0 15px rgba(255, 255, 255, 0.5)",
        }}
      />
      <div
        className="absolute rounded-full border border-[rgba(245,230,232,0.6)]"
        style={{
          width: "450px",
          height: "450px",
          transform: `scale(${ring2Scale})`,
          opacity: ring2Opacity,
          boxShadow: "0 0 20px rgba(232, 180, 184, 0.35), inset 0 0 15px rgba(255, 255, 255, 0.4)",
        }}
      />
      <div
        className="absolute rounded-full border border-[rgba(255,255,255,0.5)]"
        style={{
          width: "450px",
          height: "450px",
          transform: `scale(${ring3Scale})`,
          opacity: ring3Opacity,
          boxShadow: "0 0 20px rgba(255, 255, 255, 0.3)",
        }}
      />
    </AbsoluteFill>
  );
};
