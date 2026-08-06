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

export const FlowchartScene5: React.FC = () => {
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

  const warnings = [
    {
      emoji: "👄",
      title: "Dry Mouth",
      desc: "Parched or sticky lips",
    },
    {
      emoji: "💧",
      title: "Dark Urine",
      desc: "Concentrated amber color",
    },
    {
      emoji: "🤕",
      title: "Headaches",
      desc: "Dull throbbing pain",
    },
    {
      emoji: "🥱",
      title: "Fatigue",
      desc: "Unusual lethargy during feeds",
    },
  ];

  return (
    <AbsoluteFill className="bg-[#090D16] overflow-hidden select-none relative flex items-center justify-center">
      {/* Background Photography: Brightened image filter */}
      <Img
        src={staticFile("assets/fc_bg_scene5.png")}
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
          05 / 06
        </span>
      </div>

      {/* Central Safe Zone Container */}
      <AbsoluteFill className="z-30 flex flex-col items-center justify-center px-12 pt-24 pb-12 h-full w-full">
        
        {/* Category + 64px Title + Subtitle */}
        <div className="w-full max-w-[760px] flex flex-col items-center text-center mb-6">
          <div style={{ opacity: sprHeader }} className="mb-4">
            <span className="text-xs font-extrabold tracking-widest text-[#FF7597] uppercase bg-slate-900/80 backdrop-blur-md px-6 py-2 rounded-full border border-white/30 shadow-md">
              Early Warning Indicators
            </span>
          </div>

          <div style={{ opacity: sprTitle, transform: `translateY(${interpolate(sprTitle, [0, 1], [-15, 0])}px)` }} className="mb-4 text-center">
            <h1 style={{ fontFamily: fonts.cormorant, color: "#FFFFFF" }} className="text-[64px] font-extrabold leading-[1.12] tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
              Recognizing <span style={{ color: "#FF7597" }}>Dehydration Signs ⚠️</span>
            </h1>
          </div>

          <p style={{ fontFamily: fonts.body, color: "#FFFFFF", lineHeight: "1.4" }} className="text-2xl font-semibold max-w-[680px] drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] text-center">
            Listen closely to subtle body warnings to prevent fluid deficits before nursing fatigue sets in.
          </p>
        </div>

        {/* Primary Alert Banner */}
        <div className="w-full max-w-[720px] mb-6" style={{ opacity: sprHero, transform: `scale(${interpolate(sprHero, [0, 1], [0.95, 1])})` }}>
          <GlassCard className="p-6 flex flex-col items-center justify-center text-center border-amber-400/60 shadow-[0_0_25px_rgba(251,191,36,0.3)]">
            <span style={{ fontFamily: fonts.outfit, color: "#FFFFFF" }} className="text-3xl font-extrabold tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
              Body Signal Awareness ⚠️
            </span>
            <span style={{ fontFamily: fonts.body, color: "#F1F5F9" }} className="text-xl font-semibold mt-1 drop-shadow-md text-center">
              Increase water intake immediately upon observing any early signal.
            </span>
          </GlassCard>
        </div>

        {/* Equal 2x2 Grid of Warning Signs */}
        <div className="w-full max-w-[720px] grid grid-cols-2 gap-6 mb-6" style={{ opacity: sprGrid, transform: `translateY(${interpolate(sprGrid, [0, 1], [20, 0])}px)` }}>
          {warnings.map((item, idx) => (
            <GlassCard key={idx} className="p-6 flex flex-col items-center justify-center text-center min-h-[150px]">
              <span className="text-4xl mb-2">{item.emoji}</span>
              <span style={{ fontFamily: fonts.outfit, color: "#FFFFFF" }} className="text-[26px] font-extrabold tracking-wide drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
                {item.title}
              </span>
              <span style={{ fontFamily: fonts.body, color: "#F1F5F9" }} className="text-lg font-semibold mt-1 drop-shadow-sm">
                {item.desc}
              </span>
            </GlassCard>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="w-full max-w-[720px] text-center">
          <span style={{ fontFamily: fonts.body, color: "#FFFFFF" }} className="text-sm font-extrabold bg-slate-900/85 backdrop-blur-md px-7 py-3 rounded-full border border-white/30 shadow-xl inline-block drop-shadow-sm">
            ⚠️ Action: Drink 1-2 full glasses of water at the first sign of dry mouth or fatigue.
          </span>
        </div>

      </AbsoluteFill>
    </AbsoluteFill>
  );
};
