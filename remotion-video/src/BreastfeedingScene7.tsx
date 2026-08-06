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

export const BreastfeedingScene7: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fonts = loadFonts();

  const duration = 5.5 * fps; // 165 frames
  const progress = frame / duration;

  // Crossfade into final end logo card around frame 90
  const logoPhase = interpolate(frame, [80, 105], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const spr1 = spring({
    frame: frame - 4,
    fps,
    config: { damping: 16, mass: 0.7, stiffness: 85 },
  });
  const t1Y = interpolate(spr1, [0, 1], [30, 0]);
  const t1O = interpolate(spr1, [0, 1], [0, 1]);

  const sprLogo = spring({
    frame: frame - 90,
    fps,
    config: { damping: 15, mass: 0.7, stiffness: 80 },
  });
  const logoY = interpolate(sprLogo, [0, 1], [40, 0]);

  return (
    <AbsoluteFill className="bg-[#FAF6F0] overflow-hidden select-none z-10">
      
      {/* Scene 7A: Mother Cuddling & Kissing Forehead */}
      <div className="absolute inset-0" style={{ opacity: 1 - logoPhase }}>
        <Img
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ transform: `scale(${1.0 + progress * 0.05})` }}
          src={staticFile("assets/breastfeeding_scene3_forehead_kiss.png")}
        />

        <BokehParticles count={15} opacity={0.7} />

        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(43, 43, 43, 0.25) 0%, transparent 40%, rgba(43, 43, 43, 0.55) 100%)",
          }}
        />

        <BotanicalLeaves opacity={0.85} />

        {/* Text Cards */}
        <AbsoluteFill className="z-30 flex flex-col justify-end items-center px-16 pb-36 text-center">
          <div
            className="w-full max-w-[900px]"
            style={{ transform: `translateY(${t1Y}px)`, opacity: t1O }}
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
                Small Sips. Big Difference. 🌸
              </h2>
              <p
                style={{
                  fontFamily: fonts.body,
                  color: EDITORIAL_COLORS.babyPink,
                }}
                className="text-[30px] font-medium mt-3"
              >
                A well-hydrated mother supports her own health and breastfeeding.
              </p>
            </GlassCard>
          </div>
        </AbsoluteFill>
      </div>

      {/* Scene 7B: Luxury Canva-Style Dhruthi Wellness End Card */}
      <div
        className="absolute inset-0 bg-[#FAF6F0] flex flex-col items-center justify-center px-16 text-center z-40"
        style={{ opacity: logoPhase }}
      >
        <BotanicalLeaves opacity={0.9} />

        {/* Soft Radial Glow */}
        <div
          className="absolute w-[850px] h-[850px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(245, 230, 232, 0.7) 0%, rgba(232, 180, 184, 0.25) 50%, transparent 80%)",
            filter: "blur(50px)",
          }}
        />

        <div
          className="z-50 flex flex-col items-center max-w-[950px]"
          style={{ transform: `translateY(${logoY}px)` }}
        >
          {/* Main Brand Title */}
          <h1
            style={{
              fontFamily: fonts.cormorant,
              color: EDITORIAL_COLORS.espressoDeep,
            }}
            className="text-[92px] font-bold tracking-[0.16em] uppercase leading-none mb-3"
          >
            DHRUTHI WELLNESS
          </h1>

          {/* Rose Line Accent */}
          <div className="w-48 h-1 bg-[#E8B4B8] rounded-full my-4" />

          {/* Slogan */}
          <p
            style={{
              fontFamily: fonts.body,
              color: EDITORIAL_COLORS.roseGold,
            }}
            className="text-[32px] font-semibold tracking-[0.2em] uppercase mb-8"
          >
            Nourishing Mothers • Nurturing Futures
          </p>

          {/* Instagram Follow Call-to-Action Glass Card */}
          <GlassCard className="px-10 py-6 max-w-[880px]" variant="light">
            <p
              style={{
                fontFamily: fonts.body,
                color: EDITORIAL_COLORS.charcoalDark,
              }}
              className="text-[32px] font-semibold leading-relaxed"
            >
              Follow <span className="font-bold text-[#E8B4B8]">@dhruthiwellness</span> for trusted nutrition guidance.
            </p>
          </GlassCard>
        </div>
      </div>
    </AbsoluteFill>
  );
};
