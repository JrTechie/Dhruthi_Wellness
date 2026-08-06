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

export const BreastfeedingHydrationScene3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fonts = loadFonts();

  const duration = 5.5 * fps;
  const progress = frame / duration;

  const scale = interpolate(progress, [0, 1], [1.0, 1.05]);

  const fillPercent = interpolate(frame, [15, 120], [25, 90], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const drinks = [
    { icon: "💧", title: "Water", desc: "Pure baseline hydration" },
    { icon: "🥥", title: "Fresh Coconut Water", desc: "Natural electrolytes & minerals" },
    { icon: "🥛", title: "Buttermilk", desc: "Cooling & gut-friendly" },
    { icon: "🍲", title: "Homemade Vegetable Soup", desc: "Warm & nutrient-dense" },
    { icon: "🍋", title: "Lemon Water", desc: "Without excess sugar" },
  ];

  const springTitle = spring({
    frame: frame - 4,
    fps,
    config: { damping: 16, mass: 0.7, stiffness: 85 },
  });
  const titleY = interpolate(springTitle, [0, 1], [30, 0]);
  const titleO = interpolate(springTitle, [0, 1], [0, 1]);

  return (
    <AbsoluteFill className="bg-[#FAF6F0] overflow-hidden select-none">
      {/* Background Image: Flat-lay food photography on cream linen table */}
      <Img
        className="absolute inset-0 w-full h-full object-cover object-center"
        style={{ transform: `scale(${scale})` }}
        src={staticFile("assets/bf_hydration_v2_scene3_drinks_flatlay.png")}
      />

      <BokehParticles count={15} opacity={0.65} />

      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(43, 43, 43, 0.35) 0%, transparent 35%, rgba(43, 43, 43, 0.65) 100%)",
        }}
      />

      <BotanicalLeaves opacity={0.8} />

      {/* 9:16 Center Safe Area Container */}
      <AbsoluteFill className="z-30 flex flex-col justify-end items-center px-10 pb-32 text-center">
        
        {/* Daily Goal & Bottle Section */}
        <div
          className="mb-3 w-full max-w-[900px]"
          style={{ transform: `translateY(${titleY}px)`, opacity: titleO }}
        >
          <GlassCard className="px-6 py-4 flex flex-col items-center" variant="light">
            <div className="flex items-center justify-center space-x-6 mb-2">
              <div className="relative w-14 h-24 border-2 border-white/80 rounded-xl p-1 overflow-hidden shadow-inner bg-black/20">
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-6 h-2 bg-white/80 rounded-t-md" />
                <div
                  className="absolute bottom-0 left-0 right-0 rounded-b-lg bg-gradient-to-t from-[#E8B4B8] to-[#F7E1DF] transition-all duration-300 opacity-90"
                  style={{ height: `${fillPercent}%` }}
                />
                <span className="absolute inset-0 flex items-center justify-center text-[15px] font-bold text-white z-10 drop-shadow">
                  3.0L
                </span>
              </div>

              <div className="text-left">
                <h2
                  style={{ fontFamily: fonts.cormorant, color: EDITORIAL_COLORS.cream }}
                  className="text-[38px] font-bold leading-tight"
                >
                  Aim for 2.5–3.5 Litres Daily 💧
                </h2>
                <p
                  style={{ fontFamily: fonts.body, color: EDITORIAL_COLORS.babyPink }}
                  className="text-[22px] font-medium"
                >
                  Include a variety of clean, nourishing fluids
                </p>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* 5 Hydrating Drink Cards */}
        <div className="w-full max-w-[900px] flex flex-col space-y-2.5">
          {drinks.map((item, idx) => {
            const spr = spring({
              frame: frame - 15 - idx * 8,
              fps,
              config: { damping: 16, mass: 0.7, stiffness: 85 },
            });
            const itemY = interpolate(spr, [0, 1], [30, 0]);
            const itemO = interpolate(spr, [0, 1], [0, 1]);

            return (
              <div
                key={idx}
                style={{
                  transform: `translateY(${itemY}px)`,
                  opacity: itemO,
                }}
              >
                <GlassCard className="px-5 py-3 flex items-center justify-between" variant="light">
                  <div className="flex items-center space-x-3.5">
                    <span className="text-[34px] leading-none">{item.icon}</span>
                    <div className="text-left">
                      <h3
                        style={{
                          fontFamily: fonts.cormorant,
                          color: EDITORIAL_COLORS.cream,
                        }}
                        className="text-[28px] font-bold leading-tight"
                      >
                        {item.title}
                      </h3>
                      <p
                        style={{
                          fontFamily: fonts.body,
                          color: EDITORIAL_COLORS.babyPink,
                        }}
                        className="text-[20px] font-medium opacity-90"
                      >
                        {item.desc}
                      </p>
                    </div>
                  </div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#E8B4B8] shadow-sm" />
                </GlassCard>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
