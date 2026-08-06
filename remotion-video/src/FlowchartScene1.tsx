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
import { FlowchartConnector } from "./FlowchartConnector";
import { GlassCard } from "./GlassCard";
import { loadFonts } from "./Typography";

export const FlowchartScene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const fonts = loadFonts();

  const bgScale = interpolate(frame, [0, durationInFrames], [1.0, 1.05], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const sprHeader = spring({ frame, fps, config: { damping: 18, mass: 0.6, stiffness: 90 } });
  const sprTitle = spring({ frame: frame - 10, fps, config: { damping: 18, mass: 0.6, stiffness: 90 } });
  const sprNodes = spring({ frame: frame - 35, fps, config: { damping: 18, mass: 0.6, stiffness: 90 } });

  return (
    <AbsoluteFill className="bg-[#090D16] overflow-hidden select-none relative flex items-center justify-center">
      {/* Background Photography: Brightened image so background photos are clearly visible */}
      <Img
        src={staticFile("assets/fc_bg_scene1.png")}
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
          01 / 06
        </span>
      </div>

      {/* Central Content Container */}
      <AbsoluteFill className="z-30 flex flex-col items-center justify-center px-12 pt-24 pb-12 h-full w-full">
        
        {/* Header Block: Category Badge + 64px Title + Subtitle */}
        <div className="w-full max-w-[760px] flex flex-col items-center text-center mb-6">
          <div style={{ opacity: sprHeader }} className="mb-4">
            <span className="text-xs font-extrabold tracking-widest text-[#FF7597] uppercase bg-slate-900/80 backdrop-blur-md px-6 py-2 rounded-full border border-white/30 shadow-md">
              Maternal Nutrition Guide
            </span>
          </div>

          <div
            style={{ opacity: sprTitle, transform: `translateY(${interpolate(sprTitle, [0, 1], [-15, 0])}px)` }}
            className="mb-4 text-center"
          >
            <h1
              style={{ fontFamily: fonts.cormorant, color: "#FFFFFF" }}
              className="text-[64px] font-extrabold leading-[1.12] tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]"
            >
              Breast Milk is <span style={{ color: "#FF7597" }}>Mostly Water 💧</span>
            </h1>
          </div>

          <p
            style={{ fontFamily: fonts.body, color: "#FFFFFF", lineHeight: "1.4" }}
            className="text-2xl font-semibold max-w-[680px] drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] text-center"
          >
            Understanding milk composition is key to maintaining maternal energy and optimal lactation.
          </p>
        </div>

        {/* Sequential Flowchart Pill Nodes (Frosted Glassmorphism) */}
        <div
          className="w-full max-w-[720px] flex flex-col items-center justify-center space-y-1 mb-6"
          style={{ opacity: sprNodes, transform: `translateY(${interpolate(sprNodes, [0, 1], [20, 0])}px)` }}
        >
          {/* Node 1 */}
          <GlassCard className="p-5 px-8 flex flex-col items-center justify-center text-center w-full min-h-[72px]">
            <span style={{ fontFamily: fonts.outfit, color: "#FFFFFF" }} className="text-2xl font-bold tracking-wide drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
              Breastfeeding 🤱
            </span>
            <span style={{ fontFamily: fonts.body, color: "#F1F5F9" }} className="text-base font-semibold mt-0.5 drop-shadow-sm">
              High fluid turnover & consumption
            </span>
          </GlassCard>

          <FlowchartConnector delay={15} length={22} label="Requires" />

          {/* Node 2 */}
          <GlassCard className="p-5 px-8 flex flex-col items-center justify-center text-center w-full min-h-[72px]">
            <span style={{ fontFamily: fonts.outfit, color: "#FFFFFF" }} className="text-2xl font-bold tracking-wide drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
              Breast Milk 🥛
            </span>
            <span style={{ fontFamily: fonts.body, color: "#F1F5F9" }} className="text-base font-semibold mt-0.5 drop-shadow-sm">
              Nutrient-rich maternal matrix
            </span>
          </GlassCard>

          <FlowchartConnector delay={30} length={22} label="Composed of" />

          {/* Node 3 */}
          <GlassCard className="p-6 px-8 flex flex-col items-center justify-center text-center w-full border-2 border-[#FF7597] shadow-[0_0_25px_rgba(255,117,151,0.4)]">
            <span style={{ fontFamily: fonts.outfit, color: "#FFFFFF" }} className="text-3xl font-extrabold tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
              Mostly Water 💧
            </span>
            <span className="text-base font-extrabold text-white bg-[#FF7597] px-5 py-1.5 rounded-full shadow-md mt-2">
              ~87–90% Water Content
            </span>
          </GlassCard>
        </div>

        {/* Bottom CTA / Takeaway */}
        <div className="w-full max-w-[720px] text-center">
          <span style={{ fontFamily: fonts.body, color: "#FFFFFF" }} className="text-sm font-extrabold bg-slate-900/85 backdrop-blur-md px-7 py-3 rounded-full border border-white/30 shadow-xl inline-block drop-shadow-sm">
            🌿 Priority: Replenish fluids consistently throughout your nursing day.
          </span>
        </div>

      </AbsoluteFill>
    </AbsoluteFill>
  );
};
