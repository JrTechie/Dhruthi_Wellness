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

export const BreastfeedingScene4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fonts = loadFonts();

  const duration = 5.5 * fps;
  const progress = frame / duration;

  // Gentle camera movement (1.05 -> 1.0)
  const scale = interpolate(progress, [0, 1], [1.05, 1.0]);

  const habits = [
    { icon: "🪑", text: "Keep a reusable bottle beside your nursing chair" },
    { icon: "🥥", text: "Reach for fresh coconut water or cooling buttermilk" },
    { icon: "✨", text: "Take gentle sips after every nursing session" },
  ];

  const sprCard = spring({
    frame: frame - 5,
    fps,
    config: { damping: 16, mass: 0.7, stiffness: 85 },
  });
  const cardY = interpolate(sprCard, [0, 1], [40, 0]);
  const cardO = interpolate(sprCard, [0, 1], [0, 1]);

  return (
    <AbsoluteFill className="bg-[#FAF6F0] overflow-hidden select-none">
      {/* Background Image: Mother drinking water from reusable bottle in sunlit Scandinavian room */}
      <Img
        className="absolute inset-0 w-full h-full object-cover object-center"
        style={{ transform: `scale(${scale})` }}
        src={staticFile("assets/breastfeeding_scene4_mother_drinking.png")}
      />

      <BokehParticles count={18} opacity={0.7} />

      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(43, 43, 43, 0.2) 0%, transparent 40%, rgba(43, 43, 43, 0.55) 100%)",
        }}
      />

      <BotanicalLeaves opacity={cardO * 0.85} />

      {/* Center Safe Area Layout */}
      <AbsoluteFill className="z-30 flex flex-col justify-end items-center px-10 pb-36 text-center">
        <div
          className="w-full max-w-[900px]"
          style={{ transform: `translateY(${cardY}px)`, opacity: cardO }}
        >
          <GlassCard className="px-8 py-7 flex flex-col items-center" variant="light">
            <h2
              style={{
                fontFamily: fonts.cormorant,
                color: EDITORIAL_COLORS.cream,
                textShadow: "0 2px 8px rgba(0,0,0,0.3)",
              }}
              className="text-[48px] font-bold leading-tight mb-2"
            >
              Stay hydrated throughout the day. 🌸
            </h2>

            <p
              style={{
                fontFamily: fonts.body,
                color: EDITORIAL_COLORS.babyPink,
              }}
              className="text-[26px] font-medium mb-4"
            >
              Small habits make a big difference.
            </p>

            {/* List of gentle daily habits */}
            <div className="w-full flex flex-col space-y-2.5 mt-1 text-left">
              {habits.map((item, idx) => {
                const itemSpr = spring({
                  frame: frame - 15 - idx * 8,
                  fps,
                  config: { damping: 16, mass: 0.7, stiffness: 85 },
                });
                const iY = interpolate(itemSpr, [0, 1], [25, 0]);
                const iO = interpolate(itemSpr, [0, 1], [0, 1]);

                return (
                  <div
                    key={idx}
                    className="flex items-center space-x-3 bg-black/20 rounded-xl px-4 py-2.5 border border-white/20"
                    style={{ transform: `translateY(${iY}px)`, opacity: iO }}
                  >
                    <span className="text-[26px]">{item.icon}</span>
                    <span
                      style={{ fontFamily: fonts.body, color: EDITORIAL_COLORS.cream }}
                      className="text-[22px] font-medium leading-snug"
                    >
                      {item.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </GlassCard>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

