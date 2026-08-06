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
import { COLORS_STRESS, loadFonts } from "./Typography";

export const StressScene5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fonts = loadFonts();

  // Duration is 7.0 seconds (210 frames)
  const duration = 7.0 * fps;
  const progress = frame / duration;

  // 1. Ken Burns Effect: Zoom and pan
  const scale = interpolate(progress, [0, 1], [1.0, 1.11]);
  const panX = 0;
  const panY = interpolate(progress, [0, 1], [0, -20]);

  // 2. Spring animations for staggered content entry
  // Title enters at 0s
  const springTitle = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 90 },
  });
  const tTitleY = interpolate(springTitle, [0, 1], [30, 0]);
  const tTitleO = interpolate(springTitle, [0, 1], [0, 1]);
  const dividerW = interpolate(springTitle, [0, 1], [0, 280]);

  // Brand Name & Subtitle enters at 0.6s (18 frames)
  const springBrand = spring({
    frame: frame - 18,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 90 },
  });
  const bY = interpolate(springBrand, [0, 1], [30, 0]);
  const bO = interpolate(springBrand, [0, 1], [0, 1]);

  // Button CTA enters at 1.2s (36 frames) with spring
  const springBtn = spring({
    frame: frame - 36,
    fps,
    config: { damping: 12, mass: 0.5, stiffness: 100 },
  });
  const btnY = interpolate(springBtn, [0, 1], [30, 0]);
  const btnO = interpolate(springBtn, [0, 1], [0, 1]);

  // Active pulsing after entry
  const pulse = frame > 36 ? 1.0 + 0.025 * Math.sin((frame - 36) / 8) : 1.0;

  // Closing Handle & Note enters at 1.8s (54 frames)
  const springClosing = spring({
    frame: frame - 54,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 90 },
  });
  const closingY = interpolate(springClosing, [0, 1], [25, 0]);
  const closingO = interpolate(springClosing, [0, 1], [0, 1]);

  return (
    <AbsoluteFill className="bg-black overflow-hidden flex flex-col justify-center items-center py-24 px-16">
      {/* Background Image with Ken Burns */}
      <Img
        className="absolute inset-0 w-full h-full object-cover object-center"
        style={{
          transform: `scale(${scale}) translate(${panX}px, ${panY}px)`,
        }}
        src={staticFile("assets/stress_scene5_wellness.png")}
      />

      {/* Darkened overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Floating Content Layout (No giant card) */}
      <AbsoluteFill className="flex flex-col justify-center items-center px-12 text-center select-none z-10 pt-10">
        
        {/* Main Title Message */}
        <div
          style={{
            transform: `translateY(${tTitleY}px)`,
            opacity: tTitleO,
            fontFamily: fonts.cormorant,
          }}
          className="flex flex-col items-center mb-8"
        >
          <h2 style={{ color: COLORS_STRESS.linen }} className="text-[84px] font-semibold leading-none tracking-tight">
            Manage Stress.
          </h2>
          <h2 style={{ color: COLORS_STRESS.linen }} className="text-[84px] font-semibold leading-none mb-6 tracking-tight">
            Balance Hormones.
          </h2>
          {/* Terracotta divider */}
          <div
            style={{
              width: `${dividerW}px`,
              backgroundColor: COLORS_STRESS.terracotta,
              height: "2.5px",
            }}
            className="rounded-full"
          />
        </div>

        {/* Brand Banner (Glassmorphic) */}
        <div
          style={{
            transform: `translateY(${bY}px)`,
            opacity: bO,
            fontFamily: fonts.body,
            backgroundColor: "rgba(27, 23, 19, 0.45)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1.5px solid rgba(250, 246, 240, 0.12)"
          }}
          className="mb-8 p-6 px-12 rounded-3xl"
        >
          <h3 style={{ color: COLORS_STRESS.terracotta }} className="text-[48px] font-bold tracking-widest uppercase mb-1">
            Dhruthi Wellness
          </h3>
          <p style={{ color: COLORS_STRESS.linenMuted }} className="text-[28px] font-light tracking-wide">
            Evidence-Based Nutrition & Lifestyle
          </p>
        </div>

        {/* Pulsing CTA Button (High Contrast Solid Terracotta Block) */}
        <div
          style={{
            transform: `translateY(${btnY}px) scale(${pulse})`,
            opacity: btnO,
            fontFamily: fonts.body,
          }}
          className="mb-10 cursor-pointer"
        >
          <div
            style={{
              backgroundColor: COLORS_STRESS.terracotta,
              boxShadow: "0 15px 40px -10px rgba(200, 130, 107, 0.45)",
            }}
            className="px-16 py-6 rounded-full inline-block border border-white/10"
          >
            <span style={{ color: COLORS_STRESS.linen }} className="text-[36px] font-extrabold tracking-wide uppercase">
              Book Your Consultation
            </span>
          </div>
        </div>

        {/* Contact handle & Closing script note (Glassmorphic Bottom Bar) */}
        <div
          style={{
            transform: `translateY(${closingY}px)`,
            opacity: closingO,
            backgroundColor: "rgba(27, 23, 19, 0.45)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1.5px solid rgba(250, 246, 240, 0.12)"
          }}
          className="p-6 rounded-2xl w-[640px] flex flex-col items-center shadow-lg"
        >
          <p
            style={{
              color: COLORS_STRESS.sage,
              fontFamily: fonts.accentHandwritten,
            }}
            className="text-[56px] tracking-wide mb-1 leading-none"
          >
            Follow @DhruthiWellness
          </p>
          <p
            style={{
              color: COLORS_STRESS.linenMuted,
              fontFamily: fonts.body,
            }}
            className="text-[26px] font-normal leading-normal"
          >
            Your journey to balance begins here.
          </p>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
