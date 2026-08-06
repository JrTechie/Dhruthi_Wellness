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
import { LightRays } from "./LightRays";
import { EDITORIAL_COLORS, loadFonts } from "./Typography";

export const BreastfeedingHydrationScene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fonts = loadFonts();

  const duration = 4.5 * fps;
  const progress = frame / duration;

  // Camera slow push-in (1.0 -> 1.06)
  const scale = interpolate(progress, [0, 1], [1.0, 1.06], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const springTitle = spring({
    frame: frame - 5,
    fps,
    config: { damping: 16, mass: 0.7, stiffness: 85 },
  });
  const tY = interpolate(springTitle, [0, 1], [40, 0]);
  const tO = interpolate(springTitle, [0, 1], [0, 1]);

  const springSub = spring({
    frame: frame - 22,
    fps,
    config: { damping: 16, mass: 0.7, stiffness: 85 },
  });
  const subY = interpolate(springSub, [0, 1], [30, 0]);
  const subO = interpolate(springSub, [0, 1], [0, 1]);

  return (
    <AbsoluteFill className="bg-[#FAF6F0] overflow-hidden select-none">
      {/* Background Image: Mother breastfeeding beside sunlit balcony */}
      <Img
        className="absolute inset-0 w-full h-full object-cover object-center"
        style={{ transform: `scale(${scale})` }}
        src={staticFile("assets/bf_hydration_v2_scene1_mother.png")}
      />

      <LightRays opacity={0.9} />
      <BokehParticles count={20} opacity={0.8} />

      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(43, 43, 43, 0.2) 0%, transparent 40%, rgba(43, 43, 43, 0.45) 100%)",
        }}
      />

      <BotanicalLeaves opacity={tO * 0.85} />

      {/* 9:16 Center Safe Area Container */}
      <AbsoluteFill className="z-30 flex flex-col justify-end items-center px-14 pb-36 text-center">
        <div
          className="w-full max-w-[920px]"
          style={{ transform: `translateY(${tY}px)`, opacity: tO }}
        >
          <GlassCard className="px-10 py-8" variant="light">
            <h1
              style={{
                fontFamily: fonts.cormorant,
                color: EDITORIAL_COLORS.cream,
                textShadow: "0 2px 10px rgba(0,0,0,0.3)",
              }}
              className="text-[58px] font-bold leading-tight tracking-tight mb-3"
            >
              BREAST FEEDING WITH HYDRATION 💧
            </h1>

            <div
              style={{
                transform: `translateY(${subY}px)`,
                opacity: subO,
                fontFamily: fonts.body,
                color: EDITORIAL_COLORS.babyPink,
              }}
              className="text-[32px] font-medium tracking-wide border-t border-[rgba(255,255,255,0.25)] pt-3 mt-2"
            >
              Essential Daily Guide for Nursing Mothers
            </div>
          </GlassCard>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
