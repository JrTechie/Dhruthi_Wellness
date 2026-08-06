import React from "react";
import { useCurrentFrame } from "remotion";
import { COLORS_BREASTFEEDING } from "./Typography";

export const NeuralNetwork: React.FC<{ opacity?: number }> = ({ opacity = 1.0 }) => {
  const frame = useCurrentFrame();

  const pulse1 = Math.sin(frame / 10) * 0.25 + 0.75;
  const pulse2 = Math.cos(frame / 12) * 0.25 + 0.75;
  const pulse3 = Math.sin(frame / 8 + 1) * 0.3 + 0.7;

  return (
    <div
      className="absolute top-[28%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 w-[650px] h-[650px] pointer-events-none"
      style={{ opacity }}
    >
      <svg className="w-full h-full" viewBox="0 0 500 500" fill="none">
        {/* Soft Glowing Ambient Backlight Aura */}
        <circle
          cx="250"
          cy="250"
          r="140"
          fill="url(#softBrainAura)"
          opacity="0.5"
        />

        {/* Synaptic Connection Lines */}
        <line x1="250" y1="250" x2="170" y2="170" stroke={COLORS_BREASTFEEDING.goldGlow} strokeWidth="1.5" opacity="0.6" strokeDasharray="3 3" />
        <line x1="250" y1="250" x2="330" y2="170" stroke={COLORS_BREASTFEEDING.goldGlow} strokeWidth="1.5" opacity="0.6" strokeDasharray="3 3" />
        <line x1="250" y1="250" x2="150" y2="290" stroke={COLORS_BREASTFEEDING.goldGlow} strokeWidth="1.5" opacity="0.6" strokeDasharray="3 3" />
        <line x1="250" y1="250" x2="350" y2="290" stroke={COLORS_BREASTFEEDING.goldGlow} strokeWidth="1.5" opacity="0.6" strokeDasharray="3 3" />
        <line x1="250" y1="250" x2="250" y2="140" stroke={COLORS_BREASTFEEDING.goldGlow} strokeWidth="1.5" opacity="0.5" strokeDasharray="3 3" />

        {/* Inter-synapse Arcs */}
        <line x1="170" y1="170" x2="250" y2="140" stroke={COLORS_BREASTFEEDING.terracotta} strokeWidth="1" opacity="0.4" />
        <line x1="330" y1="170" x2="250" y2="140" stroke={COLORS_BREASTFEEDING.terracotta} strokeWidth="1" opacity="0.4" />
        <line x1="170" y1="170" x2="150" y2="290" stroke={COLORS_BREASTFEEDING.goldGlow} strokeWidth="1" opacity="0.3" />
        <line x1="330" y1="170" x2="350" y2="290" stroke={COLORS_BREASTFEEDING.goldGlow} strokeWidth="1" opacity="0.3" />

        {/* Pulsing Concentric Halo Rings */}
        <circle cx="250" cy="250" r={45 * pulse1} stroke={COLORS_BREASTFEEDING.goldGlow} strokeWidth="1.5" fill="none" opacity="0.7" />
        <circle cx="250" cy="250" r={85 * pulse2} stroke={COLORS_BREASTFEEDING.goldGlow} strokeWidth="1" fill="none" opacity="0.4" strokeDasharray="6 6" />

        {/* Central Core Glowing Star Node */}
        <circle cx="250" cy="250" r="12" fill={COLORS_BREASTFEEDING.goldGlow} opacity="0.9" />
        <circle cx="250" cy="250" r="5" fill="#FFF" opacity="0.95" />

        {/* Outer Synaptic Glowing Nodes */}
        <g style={{ opacity: pulse1 }}>
          <circle cx="170" cy="170" r="7" fill={COLORS_BREASTFEEDING.goldGlow} />
          <circle cx="170" cy="170" r="14" stroke={COLORS_BREASTFEEDING.goldGlow} strokeWidth="1" fill="none" opacity="0.5" />
        </g>
        
        <g style={{ opacity: pulse2 }}>
          <circle cx="330" cy="170" r="7" fill={COLORS_BREASTFEEDING.goldGlow} />
          <circle cx="330" cy="170" r="14" stroke={COLORS_BREASTFEEDING.goldGlow} strokeWidth="1" fill="none" opacity="0.5" />
        </g>

        <g style={{ opacity: pulse3 }}>
          <circle cx="150" cy="290" r="8" fill={COLORS_BREASTFEEDING.terracotta} />
          <circle cx="150" cy="290" r="16" stroke={COLORS_BREASTFEEDING.terracotta} strokeWidth="1" fill="none" opacity="0.5" />
        </g>

        <g style={{ opacity: pulse1 }}>
          <circle cx="350" cy="290" r="8" fill={COLORS_BREASTFEEDING.terracotta} />
          <circle cx="350" cy="290" r="16" stroke={COLORS_BREASTFEEDING.terracotta} strokeWidth="1" fill="none" opacity="0.5" />
        </g>

        <g style={{ opacity: pulse2 }}>
          <circle cx="250" cy="140" r="6" fill={COLORS_BREASTFEEDING.goldGlow} />
        </g>

        <defs>
          <radialGradient id="softBrainAura" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#E5B869" stopOpacity="0.4" />
            <stop offset="60%" stopColor="#D9826C" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#2E3F35" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
};
