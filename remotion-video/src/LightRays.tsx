import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

export const LightRays: React.FC<{ opacity?: number }> = ({ opacity = 1 }) => {
  const frame = useCurrentFrame();

  const pulse = interpolate(Math.sin(frame * 0.03), [-1, 1], [0.35, 0.65]);

  return (
    <AbsoluteFill className="pointer-events-none z-10 overflow-hidden" style={{ opacity }}>
      {/* Top right volumetric sun glow bloom */}
      <div
        className="absolute -top-32 -right-32 w-[750px] h-[750px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(255, 253, 249, 0.45) 0%, rgba(247, 225, 223, 0.25) 40%, transparent 75%)",
          filter: "blur(60px)",
          opacity: pulse,
        }}
      />
      {/* Soft diagonal light ray stream */}
      <div
        className="absolute -top-40 -right-20 w-[1200px] h-[450px] pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(255, 253, 249, 0.28) 0%, rgba(245, 230, 232, 0.12) 50%, transparent 80%)",
          transform: "rotate(-25deg)",
          filter: "blur(40px)",
          opacity: pulse * 0.85,
        }}
      />
    </AbsoluteFill>
  );
};
