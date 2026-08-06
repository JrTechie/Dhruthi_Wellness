import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { GlassCard } from "./GlassCard";
import { COLORS, loadFonts } from "./Typography";

export const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fonts = loadFonts();

  // Duration is 6.0 seconds (180 frames)
  const duration = 6.0 * fps;
  const progress = frame / duration;

  // 1. Ken Burns Effect: Zoom-out and subtle pan
  const scale = interpolate(progress, [0, 1], [1.18, 1.0]);
  const panX = interpolate(progress, [0, 1], [30, 0]);
  const panY = interpolate(progress, [0, 1], [-25, 0]);

  // 2. Spring animation for the GlassCard container
  const springCard = spring({
    frame,
    fps,
    config: { damping: 16, mass: 0.8, stiffness: 85 },
  });
  const cardY = interpolate(springCard, [0, 1], [100, 0]);
  const cardO = interpolate(springCard, [0, 1], [0, 1]);

  // Title enters at 0.4s (12 frames)
  const springTitle = spring({
    frame: frame - 12,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 90 },
  });
  const tTitleY = interpolate(springTitle, [0, 1], [35, 0]);
  const tTitleO = interpolate(springTitle, [0, 1], [0, 1]);

  // Main statement enters at 1.0s (30 frames)
  const springStatement = spring({
    frame: frame - 30,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 90 },
  });
  const tStatementY = interpolate(springStatement, [0, 1], [30, 0]);
  const tStatementO = interpolate(springStatement, [0, 1], [0, 1]);

  // Scientific Fact (Gold) enters at 1.6s (48 frames) with a pop scale
  const springFact = spring({
    frame: frame - 48,
    fps,
    config: { damping: 12, mass: 0.5, stiffness: 110 },
  });
  const tFactScale = interpolate(springFact, [0, 1], [0.85, 1.0]);
  const tFactO = interpolate(springFact, [0, 1], [0, 1]);

  // Footnote (Script font) enters at 2.2s (66 frames)
  const springFootnote = spring({
    frame: frame - 66,
    fps,
    config: { damping: 15, mass: 0.6, stiffness: 85 },
  });
  const tFootnoteY = interpolate(springFootnote, [0, 1], [25, 0]);
  const tFootnoteO = interpolate(springFootnote, [0, 1], [0, 1]);

  // Top brand handle opacity (fade in)
  const brandOpacity = interpolate(frame, [0, 15], [0, 0.65], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="bg-black overflow-hidden flex flex-col justify-center items-center py-24 px-10">
      {/* Background Image with Ken Burns */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          transform: `scale(${scale}) translate(${panX}px, ${panY}px)`,
          backgroundImage: `url(${staticFile("assets/scene2_chips_uncertain.png")})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Darkened overlay for legibility */}
      <div className="absolute inset-0 bg-black/35" />

      {/* Brand Handle */}
      <div
        className="absolute top-20 flex items-center justify-center space-x-3 w-full z-20"
        style={{
          opacity: brandOpacity,
          fontFamily: fonts.outfit,
        }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-white" />
        <span className="text-white text-2xl tracking-widest font-light">
          @dhruthi_wellness
        </span>
        <div className="w-1.5 h-1.5 rounded-full bg-white" />
      </div>

      {/* Glassmorphic Container Card */}
      <GlassCard
        className="w-full max-w-[940px] flex flex-col justify-center items-center text-center p-14 px-10 z-10"
        style={{
          transform: `translateY(${cardY}px)`,
          opacity: cardO,
        }}
      >
        {/* Title */}
        <h2
          style={{
            color: COLORS.textMain,
            fontFamily: fonts.italiana,
            transform: `translateY(${tTitleY}px)`,
            opacity: tTitleO,
          }}
          className="text-[84px] font-light leading-none mb-10"
        >
          Sleep & Cravings
        </h2>

        {/* Description Statement */}
        <p
          style={{
            color: COLORS.textSub,
            fontFamily: fonts.outfit,
            transform: `translateY(${tStatementY}px)`,
            opacity: tStatementO,
          }}
          className="text-[36px] font-normal leading-relaxed mb-12 max-w-[780px]"
        >
          When sleep goes down, your brain's reward centers demand quick energy.
        </p>

        {/* Scientific Fact (Statistic Pop) */}
        <div
          style={{
            transform: `scale(${tFactScale})`,
            opacity: tFactO,
            fontFamily: fonts.outfit,
            borderColor: "rgba(255, 255, 255, 0.12)",
          }}
          className="bg-white/5 border rounded-2xl py-6 px-10 mb-12 shadow-inner"
        >
          <p
            style={{ color: COLORS.textHighlight }}
            className="text-[48px] font-bold tracking-tight leading-none"
          >
            Appetite & cravings spike by 45%
          </p>
        </div>

        {/* Footnote (Handwritten/Script) */}
        <p
          style={{
            color: COLORS.textSub,
            fontFamily: fonts.handwritten,
            transform: `translateY(${tFootnoteY}px)`,
            opacity: tFootnoteO,
          }}
          className="text-[44px] tracking-wide"
        >
          It is biology, not willpower.
        </p>
      </GlassCard>
    </AbsoluteFill>
  );
};
