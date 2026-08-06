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

export const Scene5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fonts = loadFonts();

  // Duration is 6.0 seconds (180 frames)
  const duration = 6.0 * fps;
  const progress = frame / duration;

  // 1. Ken Burns Effect: Zoom and pan
  const scale = interpolate(progress, [0, 1], [1.0, 1.11]);
  const panX = 0;
  const panY = interpolate(progress, [0, 1], [0, -20]);

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
  const dividerW = interpolate(springTitle, [0, 1], [0, 280]);

  // Brand Name & Subtitle enters at 1.0s (30 frames)
  const springBrand = spring({
    frame: frame - 30,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 90 },
  });
  const bY = interpolate(springBrand, [0, 1], [30, 0]);
  const bO = interpolate(springBrand, [0, 1], [0, 1]);

  // Button CTA enters at 1.6s (48 frames) with spring
  const springBtn = spring({
    frame: frame - 48,
    fps,
    config: { damping: 12, mass: 0.5, stiffness: 100 },
  });
  const btnY = interpolate(springBtn, [0, 1], [30, 0]);
  const btnO = interpolate(springBtn, [0, 1], [0, 1]);

  // Active pulsing after entry
  const pulse = frame > 48 ? 1.0 + 0.025 * Math.sin((frame - 48) / 8) : 1.0;

  // Closing Handle & Note enters at 2.2s (66 frames)
  const springClosing = spring({
    frame: frame - 66,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 90 },
  });
  const closingY = interpolate(springClosing, [0, 1], [25, 0]);
  const closingO = interpolate(springClosing, [0, 1], [0, 1]);

  return (
    <AbsoluteFill className="bg-black overflow-hidden flex flex-col justify-center items-center py-24 px-10">
      {/* Background Image with Ken Burns */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          transform: `scale(${scale}) translate(${panX}px, ${panY}px)`,
          backgroundImage: `url(${staticFile("assets/scene5_refreshed_woman.png")})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Darkened overlay */}
      <div className="absolute inset-0 bg-black/35" />

      {/* Glassmorphic Container Card */}
      <GlassCard
        className="w-full max-w-[940px] flex flex-col justify-center items-center text-center p-14 px-8 z-10"
        style={{
          transform: `translateY(${cardY}px)`,
          opacity: cardO,
        }}
      >
        {/* Main Title Message */}
        <div
          style={{
            transform: `translateY(${tTitleY}px)`,
            opacity: tTitleO,
            fontFamily: fonts.italiana,
          }}
          className="flex flex-col items-center mb-10"
        >
          <h2 style={{ color: COLORS.textMain }} className="text-[76px] font-light leading-none">
            Sleep Better.
          </h2>
          <h2 style={{ color: COLORS.textMain }} className="text-[76px] font-light leading-none mb-6">
            Eat Smarter.
          </h2>
          {/* Champagne divider */}
          <div
            style={{
              width: `${dividerW}px`,
              backgroundColor: COLORS.textHighlight,
              height: "2.5px",
            }}
            className="rounded-full"
          />
        </div>

        {/* Brand Banner */}
        <div
          style={{
            transform: `translateY(${bY}px)`,
            opacity: bO,
            fontFamily: fonts.outfit,
          }}
          className="mb-12"
        >
          <h3 style={{ color: COLORS.textHighlight }} className="text-[44px] font-bold tracking-widest uppercase mb-2">
            Dhruthi Wellness
          </h3>
          <p style={{ color: COLORS.textSub }} className="text-[28px] font-light tracking-wide">
            Evidence-Based Nutrition & Lifestyle
          </p>
        </div>

        {/* Pulsing CTA Button */}
        <div
          style={{
            transform: `translateY(${btnY}px) scale(${pulse})`,
            opacity: btnO,
            fontFamily: fonts.outfit,
          }}
          className="mb-14 cursor-pointer"
        >
          <div
            style={{
              backgroundColor: COLORS.primary,
              boxShadow: "0 10px 30px -5px rgba(110, 139, 99, 0.4)",
            }}
            className="px-14 py-5 rounded-full inline-block border border-white/10 active:scale-95 transition-transform"
          >
            <span style={{ color: COLORS.textMain }} className="text-[32px] font-bold tracking-wide">
              Book Your Consultation
            </span>
          </div>
        </div>

        {/* Contact handle & Closing script note */}
        <div
          style={{
            transform: `translateY(${closingY}px)`,
            opacity: closingO,
          }}
          className="border-t border-white/10 pt-8 w-full flex flex-col items-center"
        >
          <p
            style={{
              color: COLORS.textHighlight,
              fontFamily: fonts.handwritten,
            }}
            className="text-[44px] tracking-wide mb-2"
          >
            Follow @DhruthiWellness
          </p>
          <p
            style={{
              color: COLORS.textSub,
              fontFamily: fonts.outfit,
            }}
            className="text-[26px] font-normal leading-normal"
          >
            Your journey to balance begins here.
          </p>
        </div>
      </GlassCard>
    </AbsoluteFill>
  );
};
