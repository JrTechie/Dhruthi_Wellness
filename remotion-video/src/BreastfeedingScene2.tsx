import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BokehParticles } from "./BokehParticles";
import { BotanicalLeaves } from "./BotanicalLeaves";
import { GlassCard } from "./GlassCard";
import { EDITORIAL_COLORS, loadFonts } from "./Typography";
import { WaterRipples } from "./WaterRipples";

export const BreastfeedingScene2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fonts = loadFonts();

  const duration = 4.5 * fps;
  const progress = frame / duration;

  // Gentle macro zoom (1.0 -> 1.07)
  const scale = interpolate(progress, [0, 1], [1.0, 1.07]);

  // Animated water flow curve (semi-transparent flowing water effect)
  const flowDash = interpolate(frame % 60, [0, 60], [0, 200]);

  // Spring animation for text card
  const spring1 = spring({
    frame: frame - 5,
    fps,
    config: { damping: 16, mass: 0.7, stiffness: 85 },
  });
  const tY = interpolate(spring1, [0, 1], [40, 0]);
  const tO = interpolate(spring1, [0, 1], [0, 1]);

  return (
    <AbsoluteFill className="bg-[#FAF6F0] overflow-hidden select-none">
      {/* Background Image: Close up water poured into glass */}
      <Img
        className="absolute inset-0 w-full h-full object-cover object-center"
        style={{ transform: `scale(${scale})` }}
        src={staticFile("assets/breastfeeding_scene2_macro_hands.png")}
      />

      {/* Water Ripple Overlay */}
      <WaterRipples opacity={0.7} />

      {/* Bokeh & Floating Particles */}
      <BokehParticles count={18} opacity={0.7} />

      {/* Soft Vignette Overlay */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(43, 43, 43, 0.15) 0%, transparent 45%, rgba(43, 43, 43, 0.45) 100%)",
        }}
      />

      {/* Animated Flowing Water Stream SVG Overlay */}
      <div className="absolute inset-0 z-20 pointer-events-none flex justify-center items-center">
        <svg viewBox="0 0 1080 1920" className="w-full h-full opacity-60">
          <path
            d="M 540 400 C 400 700, 680 1100, 540 1400"
            fill="none"
            stroke="url(#waterStreamGrad)"
            strokeWidth="8"
            strokeDasharray="30 15"
            strokeDashoffset={-flowDash}
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="waterStreamGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFDF9" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#F5E6E8" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#E8B4B8" stopOpacity="0.8" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <BotanicalLeaves opacity={tO * 0.8} />

      {/* Center Safe Area Layout Container */}
      <AbsoluteFill className="z-30 flex flex-col justify-end items-center px-16 pb-36 text-center">
        <div
          className="w-full max-w-[900px]"
          style={{
            transform: `translateY(${tY}px)`,
            opacity: tO,
          }}
        >
          <GlassCard className="px-10 py-8" variant="light">
            <h2
              style={{
                fontFamily: fonts.cormorant,
                color: EDITORIAL_COLORS.cream,
                textShadow: "0 2px 8px rgba(0,0,0,0.3)",
              }}
              className="text-[58px] font-bold leading-tight"
            >
              Breast milk is mostly water. 💧
            </h2>
            <p
              style={{
                fontFamily: fonts.body,
                color: EDITORIAL_COLORS.babyPink,
              }}
              className="text-[30px] font-medium mt-3"
            >
              Every drop of milk draws upon your body's daily hydration reserves.
            </p>
          </GlassCard>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
