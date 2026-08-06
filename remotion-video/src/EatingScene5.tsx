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
import { BrandHeader } from "./BrandHeader";
import { COLORS_EATING, loadFonts } from "./Typography";

export const EatingScene5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fonts = loadFonts();

  const duration = 9.0 * fps;
  const progress = frame / duration;

  const scale = interpolate(progress, [0, 1], [1.0, 1.11]);
  const panX = 0;
  const panY = interpolate(progress, [0, 1], [0, -20]);

  const springTitle = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 90 },
  });
  const tTitleY = interpolate(springTitle, [0, 1], [30, 0]);
  const tTitleO = interpolate(springTitle, [0, 1], [0, 1]);
  const dividerW = interpolate(springTitle, [0, 1], [0, 280]);

  const springBrand = spring({
    frame: frame - 18,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 90 },
  });
  const bY = interpolate(springBrand, [0, 1], [30, 0]);
  const bO = interpolate(springBrand, [0, 1], [0, 1]);

  const springBtn = spring({
    frame: frame - 36,
    fps,
    config: { damping: 12, mass: 0.5, stiffness: 100 },
  });
  const btnY = interpolate(springBtn, [0, 1], [30, 0]);
  const btnO = interpolate(springBtn, [0, 1], [0, 1]);

  const pulse = frame > 36 ? 1.0 + 0.025 * Math.sin((frame - 36) / 8) : 1.0;

  const springClosing = spring({
    frame: frame - 54,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 90 },
  });
  const closingY = interpolate(springClosing, [0, 1], [25, 0]);
  const closingO = interpolate(springClosing, [0, 1], [0, 1]);

  const brandOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="bg-black overflow-hidden flex flex-col justify-center items-center py-24 px-16">
      {/* Background Image */}
      <Img
        className="absolute inset-0 w-full h-full object-cover object-center"
        style={{
          transform: `scale(${scale}) translate(${panX}px, ${panY}px)`,
        }}
        src={staticFile("assets/eating_scene5_wellness.png")}
      />

      {/* Darkened overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Highlighted Brand Header Badge */}
      <BrandHeader opacity={brandOpacity} />

      {/* Floating Content Layout */}
      <AbsoluteFill className="flex flex-col justify-center items-center px-12 text-center select-none z-10 pt-16">
        
        {/* Main Title Message */}
        <div
          style={{
            transform: `translateY(${tTitleY}px)`,
            opacity: tTitleO,
            fontFamily: fonts.cormorant,
          }}
          className="flex flex-col items-center mb-8"
        >
          <h2 style={{ color: COLORS_EATING.linen }} className="text-[84px] font-semibold leading-none tracking-tight">
            Master Mindful Eating.
          </h2>
          <h2 style={{ color: COLORS_EATING.linen }} className="text-[84px] font-semibold leading-none mb-6 tracking-tight">
            Nourish Your Body.
          </h2>
          {/* Amber divider */}
          <div
            style={{
              width: `${dividerW}px`,
              backgroundColor: COLORS_EATING.amber,
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
            fontFamily: fonts.body,
            backgroundColor: "rgba(24, 20, 16, 0.70)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "2px solid #D96B43",
            boxShadow: "0 8px 32px rgba(217, 107, 67, 0.35)"
          }}
          className="mb-8 p-6 px-12 rounded-3xl"
        >
          <h3 style={{ color: COLORS_EATING.amber }} className="text-[54px] font-extrabold tracking-widest uppercase mb-1">
            @DhruthiWellness
          </h3>
          <p style={{ color: COLORS_EATING.linenMuted }} className="text-[28px] font-light tracking-wide">
            Evidence-Based Nutrition & Metabolic Health
          </p>
        </div>

        {/* Pulsing CTA Button */}
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
              backgroundColor: COLORS_EATING.amber,
              boxShadow: "0 15px 40px -10px rgba(217, 107, 67, 0.45)",
            }}
            className="px-16 py-6 rounded-full inline-block border border-white/10"
          >
            <span style={{ color: COLORS_EATING.linen }} className="text-[36px] font-extrabold tracking-wide uppercase">
              Book Nutrition Assessment
            </span>
          </div>
        </div>

        {/* Contact handle & Closing script note */}
        <div
          style={{
            transform: `translateY(${closingY}px)`,
            opacity: closingO,
            backgroundColor: "rgba(24, 20, 16, 0.50)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1.5px solid rgba(250, 246, 240, 0.12)"
          }}
          className="p-6 rounded-2xl w-[640px] flex flex-col items-center shadow-lg"
        >
          <p
            style={{
              color: COLORS_EATING.sage,
              fontFamily: fonts.accentHandwritten,
            }}
            className="text-[56px] tracking-wide mb-1 leading-none"
          >
            Follow @DhruthiWellness
          </p>
          <p
            style={{
              color: COLORS_EATING.linenMuted,
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
