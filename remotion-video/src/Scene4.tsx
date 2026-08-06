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

export const Scene4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fonts = loadFonts();

  // Duration is 7.0 seconds (210 frames)
  const duration = 7.0 * fps;
  const progress = frame / duration;

  // 1. Ken Burns Effect: Zoom and pan
  const scale = interpolate(progress, [0, 1], [1.0, 1.16]);
  const panX = interpolate(progress, [0, 1], [0, 35]);
  const panY = interpolate(progress, [0, 1], [0, 30]);

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

  // Habit 1 enters at 0.9s (27 frames)
  const springHabit1 = spring({
    frame: frame - 27,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 90 },
  });
  const h1Y = interpolate(springHabit1, [0, 1], [30, 0]);
  const h1O = interpolate(springHabit1, [0, 1], [0, 1]);

  // Habit 2 enters at 1.7s (51 frames)
  const springHabit2 = spring({
    frame: frame - 51,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 90 },
  });
  const h2Y = interpolate(springHabit2, [0, 1], [30, 0]);
  const h2O = interpolate(springHabit2, [0, 1], [0, 1]);

  // Habit 3 enters at 2.5s (75 frames)
  const springHabit3 = spring({
    frame: frame - 75,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 90 },
  });
  const h3Y = interpolate(springHabit3, [0, 1], [30, 0]);
  const h3O = interpolate(springHabit3, [0, 1], [0, 1]);

  // Bottom Tag enters at 3.2s (96 frames)
  const springTag = spring({
    frame: frame - 96,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 95 },
  });
  const tagY = interpolate(springTag, [0, 1], [25, 0]);
  const tagO = interpolate(springTag, [0, 1], [0, 1]);

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
          backgroundImage: `url(${staticFile("assets/scene5_refreshed_breakfast.png")})`,
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
        className="w-full max-w-[940px] flex flex-col justify-center items-center text-center p-14 px-8 z-10"
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
          Reset Your Baseline
        </h2>

        {/* Habit List */}
        <div className="w-full flex flex-col items-center space-y-8 mb-12">
          
          {/* Habit 1 */}
          <div
            style={{
              transform: `translateY(${h1Y}px)`,
              opacity: h1O,
              fontFamily: fonts.outfit,
            }}
            className="flex flex-col items-center max-w-[760px]"
          >
            <h3 style={{ color: COLORS.textMain }} className="text-[34px] font-bold mb-1">
              1. Prioritize 7 to 9 Hours of Sleep
            </h3>
            <p style={{ color: COLORS.textHighlight }} className="text-[26px] font-normal">
              Re-balances metabolic hormones naturally.
            </p>
          </div>

          {/* Habit 2 */}
          <div
            style={{
              transform: `translateY(${h2Y}px)`,
              opacity: h2O,
              fontFamily: fonts.outfit,
            }}
            className="flex flex-col items-center max-w-[760px]"
          >
            <h3 style={{ color: COLORS.textMain }} className="text-[34px] font-bold mb-1">
              2. Stabilize Your Appetite
            </h3>
            <p style={{ color: COLORS.textHighlight }} className="text-[26px] font-normal">
              Fewer morning cravings and late-night snacking.
            </p>
          </div>

          {/* Habit 3 */}
          <div
            style={{
              transform: `translateY(${h3Y}px)`,
              opacity: h3O,
              fontFamily: fonts.outfit,
            }}
            className="flex flex-col items-center max-w-[760px]"
          >
            <h3 style={{ color: COLORS.textMain }} className="text-[34px] font-bold mb-1">
              3. Sustainable Habits
            </h3>
            <p style={{ color: COLORS.textHighlight }} className="text-[26px] font-normal">
              Nourish your body, starting with your rhythm.
            </p>
          </div>
        </div>

        {/* Bottom Handwritten Tag Line */}
        <p
          style={{
            color: COLORS.textSub,
            fontFamily: fonts.handwritten,
            transform: `translateY(${tagY}px)`,
            opacity: tagO,
          }}
          className="text-[44px] tracking-wide border-t border-white/10 pt-8 w-full"
        >
          Nourish. Rest. Reset.
        </p>
      </GlassCard>
    </AbsoluteFill>
  );
};
