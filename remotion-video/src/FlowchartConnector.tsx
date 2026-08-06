import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface FlowchartConnectorProps {
  delay?: number;
  length?: number;
  label?: string;
}

export const FlowchartConnector: React.FC<FlowchartConnectorProps> = ({
  delay = 0,
  length = 28,
  label,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const spr = spring({
    frame: frame - delay,
    fps,
    config: { damping: 18, mass: 0.5, stiffness: 90 },
  });

  const lineScale = interpolate(spr, [0, 1], [0, 1]);
  const opacity = interpolate(spr, [0.3, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div className="flex flex-col items-center justify-center my-1 relative select-none z-20">
      {label && (
        <span
          className="text-xs font-extrabold tracking-widest text-[#F472B6] uppercase mb-1 bg-slate-900/90 backdrop-blur-md px-4 py-1 rounded-full border border-white/30 shadow-md"
          style={{ opacity }}
        >
          {label}
        </span>
      )}
      <div
        className="w-[2.5px] bg-gradient-to-b from-[#F472B6] via-white to-[#F472B6] rounded-full shadow-[0_0_10px_rgba(244,114,182,0.9)]"
        style={{
          height: `${length}px`,
          transform: `scaleY(${lineScale})`,
          transformOrigin: "top center",
        }}
      />
    </div>
  );
};
