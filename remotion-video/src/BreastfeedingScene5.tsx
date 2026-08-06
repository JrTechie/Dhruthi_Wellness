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

export const BreastfeedingScene5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fonts = loadFonts();

  const duration = 5.5 * fps;
  const progress = frame / duration;

  const scale = interpolate(progress, [0, 1], [1.0, 1.05]);

  const warningSigns = [
    { icon: "💧", label: "Dry lips" },
    { icon: "🧪", label: "Dark yellow urine" },
    { icon: "🤕", label: "Headache" },
    { icon: "😴", label: "Fatigue" },
    { icon: "🌀", label: "Dizziness" },
    { icon: "🌵", label: "Feeling unusually thirsty" },
  ];

  const sprHeader = spring({
    frame: frame - 4,
    fps,
    config: { damping: 16, mass: 0.7, stiffness: 85 },
  });
  const hY = interpolate(sprHeader, [0, 1], [30, 0]);
  const hO = interpolate(sprHeader, [0, 1], [0, 1]);

  return (
    <AbsoluteFill className="bg-[#1A1A1D] overflow-hidden select-none">
      {/* Background Image: Dark minimal editorial backdrop */}
      <Img
        className="absolute inset-0 w-full h-full object-cover object-center opacity-80"
        style={{ transform: `scale(${scale})` }}
        src={staticFile("assets/breastfeeding_scene5_dehydration_dark.png")}
      />

      <BokehParticles count={14} opacity={0.5} />

      {/* Dark Vignette Overlay */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, rgba(20, 20, 20, 0.4) 0%, rgba(10, 10, 12, 0.85) 90%)",
        }}
      />

      <BotanicalLeaves opacity={0.4} />

      {/* Center Safe Area Layout */}
      <AbsoluteFill className="z-30 flex flex-col justify-center items-center px-10 py-32 text-center">
        
        {/* Section Header */}
        <div
          className="mb-5 max-w-[900px]"
          style={{ transform: `translateY(${hY}px)`, opacity: hO }}
        >
          <GlassCard className="px-8 py-5" variant="dark">
            <h2
              style={{
                fontFamily: fonts.cormorant,
                color: "#FFFFFF",
                textShadow: "0 3px 12px rgba(0,0,0,0.8)",
              }}
              className="text-[44px] font-bold tracking-tight"
            >
              These can be signs of dehydration. ⚠️
            </h2>
            <p
              style={{
                fontFamily: fonts.body,
                color: EDITORIAL_COLORS.babyPink,
                textShadow: "0 2px 8px rgba(0,0,0,0.7)",
              }}
              className="text-[24px] font-medium mt-1"
            >
              Listen closely to your body's subtle signals
            </p>
          </GlassCard>
        </div>

        {/* 6 Minimal Healthcare Warning Grid Cards */}
        <div className="w-full max-w-[900px] grid grid-cols-2 gap-3">
          {warningSigns.map((item, idx) => {
            const spr = spring({
              frame: frame - 12 - idx * 6,
              fps,
              config: { damping: 16, mass: 0.7, stiffness: 85 },
            });
            const cardY = interpolate(spr, [0, 1], [30, 0]);
            const cardO = interpolate(spr, [0, 1], [0, 1]);

            return (
              <div
                key={idx}
                style={{
                  transform: `translateY(${cardY}px)`,
                  opacity: cardO,
                }}
              >
                <GlassCard className="px-4 py-3.5 flex items-center space-x-3 text-left" variant="dark">
                  <span className="text-[34px] leading-none">{item.icon}</span>
                  <span
                    style={{
                      fontFamily: fonts.body,
                      color: "#FFFFFF",
                      textShadow: "0 2px 6px rgba(0,0,0,0.7)",
                    }}
                    className="text-[24px] font-semibold leading-tight"
                  >
                    {item.label}
                  </span>
                </GlassCard>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

