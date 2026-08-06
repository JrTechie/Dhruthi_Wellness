import React from "react";
import { useCurrentFrame } from "remotion";
import { COLORS_BREASTFEEDING, loadFonts } from "./Typography";

export const ImmunityShield: React.FC<{ opacity?: number }> = ({ opacity = 1.0 }) => {
  const frame = useCurrentFrame();
  const fonts = loadFonts();

  const pulse = Math.sin(frame / 12) * 0.08 + 1.0;
  const rotateGlow = frame * 0.5;

  return (
    <div
      className="absolute top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center pointer-events-none"
      style={{ opacity }}
    >
      {/* Glowing immunity circle and shield icon */}
      <div
        className="relative w-72 h-72 rounded-full flex items-center justify-center"
        style={{
          transform: `scale(${pulse})`,
        }}
      >
        {/* Outer glowing pulsing aura */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(229, 184, 105, 0.45) 0%, rgba(136, 160, 141, 0.15) 60%, transparent 80%)",
            filter: "blur(20px)",
            transform: `rotate(${rotateGlow}deg)`,
          }}
        />

        {/* Outer Ring with dashed border */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            border: "2px dashed rgba(229, 184, 105, 0.7)",
            boxShadow: "0 0 30px rgba(229, 184, 105, 0.4)",
            transform: `rotate(${-rotateGlow}deg)`,
          }}
        />

        {/* Center Shield Glass Badge */}
        <div
          className="w-48 h-48 rounded-full flex flex-col items-center justify-center shadow-2xl"
          style={{
            backgroundColor: "rgba(30, 43, 36, 0.80)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "2px solid rgba(229, 184, 105, 0.8)",
            boxShadow: "0 10px 40px rgba(229, 184, 105, 0.50)",
          }}
        >
          {/* Shield Icon SVG */}
          <svg className="w-20 h-20 mb-2" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2L4 6V12C4 17.52 7.4 22.5 12 24C16.6 22.5 20 17.52 20 12V6L12 2Z"
              fill="url(#shieldGrad)"
              stroke={COLORS_BREASTFEEDING.goldGlow}
              strokeWidth="1.5"
            />
            <path
              d="M9 12L11 14L15 10"
              stroke="#FFF"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <defs>
              <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#D9826C" />
                <stop offset="100%" stopColor="#E5B869" />
              </linearGradient>
            </defs>
          </svg>
          <span
            style={{ fontFamily: fonts.body, color: COLORS_BREASTFEEDING.creamText }}
            className="text-lg font-bold uppercase tracking-widest"
          >
            IMMUNITY
          </span>
        </div>
      </div>
    </div>
  );
};
