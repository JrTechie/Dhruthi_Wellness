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

// Dynamic bouncing arrow component
const BouncingArrowDown: React.FC<{ opacity: number; delay: number; frame: number }> = ({
  opacity,
  delay,
  frame,
}) => {
  const bounce = frame > delay ? 5 * Math.sin((frame - delay) / 6) : 0;
  return (
    <div
      style={{
        opacity,
        transform: `translateY(${bounce}px)`,
        color: COLORS.textHighlight,
      }}
      className="my-3 flex justify-center"
    >
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="12" y1="5" x2="12" y2="19" />
        <polyline points="19 12 12 19 5 12" />
      </svg>
    </div>
  );
};

export const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fonts = loadFonts();

  // Duration is 7.0 seconds (210 frames)
  const duration = 7.0 * fps;
  const progress = frame / duration;

  // 1. Ken Burns Effect: Zoom and pan
  const scale = interpolate(progress, [0, 1], [1.0, 1.13]);
  const panX = interpolate(progress, [0, 1], [0, -35]);
  const panY = interpolate(progress, [0, 1], [0, 10]);

  // 2. Spring animation for container card
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
  const tTitleY = interpolate(springTitle, [0, 1], [30, 0]);
  const tTitleO = interpolate(springTitle, [0, 1], [0, 1]);

  // Step 1: Sleep Deprivation enters at 0.9s (27 frames)
  const springStep1 = spring({
    frame: frame - 27,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 90 },
  });
  const s1Y = interpolate(springStep1, [0, 1], [30, 0]);
  const s1O = interpolate(springStep1, [0, 1], [0, 1]);

  // Arrow 1 enters at 1.4s (42 frames)
  const arrow1Opacity = interpolate(frame, [42, 52], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Step 2: Ghrelin (Hunger) enters at 1.7s (51 frames)
  const springStep2 = spring({
    frame: frame - 51,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 95 },
  });
  const s2Y = interpolate(springStep2, [0, 1], [25, 0]);
  const s2O = interpolate(springStep2, [0, 1], [0, 1]);

  // Arrow 2 enters at 2.2s (66 frames)
  const arrow2Opacity = interpolate(frame, [66, 76], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Step 3: Leptin (Fullness) enters at 2.5s (75 frames)
  const springStep3 = spring({
    frame: frame - 75,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 95 },
  });
  const s3Y = interpolate(springStep3, [0, 1], [25, 0]);
  const s3O = interpolate(springStep3, [0, 1], [0, 1]);

  // Summary sentence enters at 3.0s (90 frames)
  const springSummary = spring({
    frame: frame - 90,
    fps,
    config: { damping: 15, mass: 0.7, stiffness: 85 },
  });
  const summaryY = interpolate(springSummary, [0, 1], [20, 0]);
  const summaryO = interpolate(springSummary, [0, 1], [0, 1]);

  // Brand handle opacity
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
          backgroundImage: `url(${staticFile("assets/scene3_consultation_dietitian.png")})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Darkened overlay */}
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
        className="w-full max-w-[940px] flex flex-col justify-center items-center text-center p-12 px-8 z-10"
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
          className="text-[76px] font-light leading-none mb-12"
        >
          The Hormonal Cycle
        </h2>

        {/* Step List Container */}
        <div className="w-full flex flex-col items-center mb-10">
          
          {/* Step 1 */}
          <div
            style={{
              transform: `translateY(${s1Y}px)`,
              opacity: s1O,
              fontFamily: fonts.outfit,
            }}
            className="flex items-center space-x-4 bg-white/5 border border-white/5 px-8 py-4 rounded-xl w-[580px] justify-center"
          >
            <span style={{ color: COLORS.textMain }} className="text-[34px] font-bold">
              1. Sleep Deprivation
            </span>
          </div>

          {/* Arrow 1 */}
          <BouncingArrowDown opacity={arrow1Opacity} delay={42} frame={frame} />

          {/* Step 2 */}
          <div
            style={{
              transform: `translateY(${s2Y}px)`,
              opacity: s2O,
              fontFamily: fonts.outfit,
            }}
            className="flex items-center space-x-4 bg-white/5 border border-white/5 px-8 py-4 rounded-xl w-[580px] justify-center"
          >
            <span style={{ color: COLORS.textHighlight }} className="text-[34px] font-bold flex items-center">
              2. Spikes Ghrelin (Hunger)
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3.5"
                className="ml-3 inline"
              >
                <line x1="12" y1="19" x2="12" y2="5" />
                <polyline points="5 12 12 5 19 12" />
              </svg>
            </span>
          </div>

          {/* Arrow 2 */}
          <BouncingArrowDown opacity={arrow2Opacity} delay={66} frame={frame} />

          {/* Step 3 */}
          <div
            style={{
              transform: `translateY(${s3Y}px)`,
              opacity: s3O,
              fontFamily: fonts.outfit,
            }}
            className="flex items-center space-x-4 bg-white/5 border border-white/5 px-8 py-4 rounded-xl w-[580px] justify-center"
          >
            <span style={{ color: COLORS.textSub }} className="text-[34px] font-bold flex items-center">
              3. Suppresses Leptin (Fullness)
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3.5"
                className="ml-3 inline"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <polyline points="19 12 12 19 5 12" />
              </svg>
            </span>
          </div>
        </div>

        {/* Summary Statement */}
        <p
          style={{
            color: COLORS.textMain,
            fontFamily: fonts.outfit,
            transform: `translateY(${summaryY}px)`,
            opacity: summaryO,
          }}
          className="text-[32px] font-normal leading-relaxed max-w-[700px] border-t border-white/10 pt-8"
        >
          Your body is chemically programmed
          <br />
          to crave{" "}
          <span style={{ color: COLORS.textHighlight }} className="font-semibold">
            quick-energy carbs.
          </span>
        </p>
      </GlassCard>
    </AbsoluteFill>
  );
};
