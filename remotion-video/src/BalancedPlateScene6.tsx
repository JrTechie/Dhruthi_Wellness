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
import { loadFonts } from "./Typography";

export const BalancedPlateScene6: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fonts = loadFonts();

  const totalFrames = 150; // 5s * 30fps
  const progress = frame / totalFrames;

  // Background slow zoom
  const scale = interpolate(progress, [0, 1], [1.0, 1.08]);

  // Spring text animation sequence
  const t1 = spring({ frame, fps, config: { damping: 14 } });
  const t2 = spring({ frame: frame - 25, fps, config: { damping: 14 } });
  const t3 = spring({ frame: frame - 50, fps, config: { damping: 14 } });
  const logoSpring = spring({ frame: frame - 70, fps, config: { damping: 14 } });

  return (
    <AbsoluteFill className="overflow-hidden bg-[#121916] flex flex-col items-center justify-center p-8">
      {/* Dimmed Background Master Shot */}
      <Img
        className="absolute inset-0 w-full h-full object-cover object-center opacity-35 blur-md"
        style={{ transform: `scale(${scale})` }}
        src={staticFile("assets/balanced_plate_complete_sides.png")}
      />

      {/* Dark Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#121916] via-[#121916]/80 to-transparent z-10" />

      {/* Centered Content Container */}
      <div className="relative z-20 flex flex-col items-center text-center space-y-7 max-w-lg">
        {/* Main Headline 1 */}
        <div
          style={{
            opacity: interpolate(t1, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(t1, [0, 1], [30, 0])}px)`,
          }}
        >
          <span
            style={{ fontFamily: fonts.outfit }}
            className="text-4xl font-extrabold text-white block mb-2 drop-shadow-md"
          >
            One Plate. Complete Nutrition.
          </span>
          <span
            style={{ fontFamily: fonts.italiana }}
            className="text-3xl text-[#D9A05B] block font-bold drop-shadow-md"
          >
            Eat Smart. Live Better.
          </span>
        </div>

        {/* CTA Banner 2 (35% Opacity Ultra-Transparent Glass) */}
        <div
          className="px-7 py-4.5 rounded-3xl bg-black/35 backdrop-blur-md border border-white/25 shadow-2xl"
          style={{
            opacity: interpolate(t2, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(t2, [0, 1], [30, 0])}px)`,
          }}
        >
          <span
            style={{ fontFamily: fonts.body }}
            className="text-2xl font-bold text-white flex items-center justify-center gap-2.5 drop-shadow"
          >
            Save this guide for your next meal ❤️
          </span>
        </div>

        {/* Sub-CTA 3 */}
        <div
          style={{
            opacity: interpolate(t3, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(t3, [0, 1], [30, 0])}px)`,
          }}
        >
          <span
            style={{ fontFamily: fonts.body }}
            className="text-xl text-neutral-300 font-medium leading-relaxed block drop-shadow"
          >
            Follow <span className="text-[#88A08D] font-extrabold">@Dhruthi Wellness</span> for simple, science-backed nutrition tips.
          </span>
        </div>

        {/* Logo Endcard Badge */}
        <div
          className="pt-4"
          style={{
            opacity: interpolate(logoSpring, [0, 1], [0, 1]),
            transform: `scale(${interpolate(logoSpring, [0, 1], [0.8, 1])})`,
          }}
        >
          <div className="flex items-center gap-4 px-8 py-4 rounded-full bg-[#5C7862] text-white shadow-2xl border border-white/30">
            <span className="w-4 h-4 rounded-full bg-[#D9A05B] animate-ping" />
            <span
              style={{ fontFamily: fonts.outfit }}
              className="text-2xl font-extrabold tracking-widest uppercase"
            >
              Dhruthi Wellness
            </span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
