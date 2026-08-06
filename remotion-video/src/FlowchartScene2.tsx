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
import { GlassCard } from "./GlassCard";
import { loadFonts } from "./Typography";

export const FlowchartScene2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const fonts = loadFonts();

  const bgScale = interpolate(frame, [0, durationInFrames], [1.0, 1.05], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const sprHeader = spring({ frame, fps, config: { damping: 18, mass: 0.6, stiffness: 90 } });
  const sprTitle = spring({ frame: frame - 10, fps, config: { damping: 18, mass: 0.6, stiffness: 90 } });
  const sprHero = spring({ frame: frame - 25, fps, config: { damping: 18, mass: 0.6, stiffness: 90 } });
  const sprGrid = spring({ frame: frame - 45, fps, config: { damping: 18, mass: 0.6, stiffness: 90 } });

  const items = [
    {
      emoji: "🥥",
      name: "Coconut Water",
      detail: "Natural Electrolytes",
    },
    {
      emoji: "🥛",
      name: "Buttermilk",
      detail: "Probiotics & Minerals",
    },
    {
      emoji: "🍲",
      name: "Clear Soups",
      detail: "Nourishing Broths",
    },
    {
      emoji: "🍋",
      name: "Lemon Water",
      detail: "Vitamin C Refresh",
    },
  ];

  return (
    <AbsoluteFill className="bg-[#090D16] overflow-hidden select-none relative flex items-center justify-center">
      {/* Background Photography: Brightened image filter */}
      <Img
        src={staticFile("assets/fc_bg_scene2.png")}
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          transform: `scale(${bgScale})`,
          filter: "brightness(0.85) contrast(1.08) saturate(1.08)",
        }}
      />

      {/* Subtle Frosted Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.28) 0%, rgba(0, 0, 0, 0.55) 100%)",
        }}
      />

      {/* Top Header Bar: Fixed Pinned at Top */}
      <div
        className="absolute top-12 left-12 right-12 z-50 flex items-center justify-between pointer-events-none"
        style={{ opacity: sprHeader, transform: `translateY(${interpolate(sprHeader, [0, 1], [-15, 0])}px)` }}
      >
        <div className="flex items-center gap-2 px-5 py-2 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/30 shadow-lg">
          <span className="text-xs font-black tracking-widest text-white uppercase drop-shadow-sm">
            Dhruthi Wellness 🌿
          </span>
        </div>
        <span className="text-xs font-bold tracking-widest text-[#FF7597] uppercase bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/30 shadow-lg">
          02 / 06
        </span>
      </div>

      {/* Central Safe Zone Container */}
      <AbsoluteFill className="z-30 flex flex-col items-center justify-center px-12 pt-24 pb-12 h-full w-full">
        
        {/* Category + 64px Title + Subtitle */}
        <div className="w-full max-w-[760px] flex flex-col items-center text-center mb-6">
          <div style={{ opacity: sprHeader }} className="mb-4">
            <span className="text-xs font-extrabold tracking-widest text-[#FF7597] uppercase bg-slate-900/80 backdrop-blur-md px-6 py-2 rounded-full border border-white/30 shadow-md">
              Hydration Protocol
            </span>
          </div>

          <div style={{ opacity: sprTitle, transform: `translateY(${interpolate(sprTitle, [0, 1], [-15, 0])}px)` }} className="mb-4 text-center">
            <h1 style={{ fontFamily: fonts.cormorant, color: "#FFFFFF" }} className="text-[64px] font-extrabold leading-[1.12] tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
              Daily Fluid <span style={{ color: "#FF7597" }}>Targets & Sources</span>
            </h1>
          </div>

          <p style={{ fontFamily: fonts.body, color: "#FFFFFF", lineHeight: "1.4" }} className="text-2xl font-semibold max-w-[680px] drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] text-center">
            Aim for 2.5 to 3.5 liters daily by combining pure water with diverse hydrating drinks.
          </p>
        </div>

        {/* Hero Primary Target Card */}
        <div className="w-full max-w-[720px] mb-6" style={{ opacity: sprHero, transform: `scale(${interpolate(sprHero, [0, 1], [0.95, 1])})` }}>
          <GlassCard className="p-6 flex flex-col items-center justify-center text-center">
            <span style={{ fontFamily: fonts.outfit, color: "#FFFFFF" }} className="text-3xl font-extrabold tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
              2.5–3.5 Liters Daily Target 🎯
            </span>
            <span style={{ fontFamily: fonts.body, color: "#F1F5F9" }} className="text-xl font-semibold mt-1 drop-shadow-md text-center">
              Essential daily intake for nursing mothers to sustain lactation & stamina.
            </span>
          </GlassCard>
        </div>

        {/* Equal 2x2 Grid of Fluid Sources */}
        <div className="w-full max-w-[720px] grid grid-cols-2 gap-6 mb-6" style={{ opacity: sprGrid, transform: `translateY(${interpolate(sprGrid, [0, 1], [20, 0])}px)` }}>
          {items.map((item, idx) => (
            <GlassCard key={idx} className="p-6 flex flex-col items-center justify-center text-center min-h-[150px]">
              <span className="text-4xl mb-2">{item.emoji}</span>
              <span style={{ fontFamily: fonts.outfit, color: "#FFFFFF" }} className="text-[26px] font-extrabold tracking-wide drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
                {item.name}
              </span>
              <span style={{ fontFamily: fonts.body, color: "#F1F5F9" }} className="text-lg font-semibold mt-1 drop-shadow-sm">
                {item.detail}
              </span>
            </GlassCard>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="w-full max-w-[720px] text-center">
          <span style={{ fontFamily: fonts.body, color: "#FFFFFF" }} className="text-sm font-extrabold bg-slate-900/85 backdrop-blur-md px-7 py-3 rounded-full border border-white/30 shadow-xl inline-block drop-shadow-sm">
            🌿 Variety boosts adherence and provides essential natural minerals.
          </span>
        </div>

      </AbsoluteFill>
    </AbsoluteFill>
  );
};
