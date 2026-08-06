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

export const BalancedPlateScene5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fonts = loadFonts();

  const totalFrames = 150; // 5s * 30fps
  const progress = frame / totalFrames;

  // Overhead master camera pull-up zoom
  const scale = interpolate(progress, [0, 1], [1.12, 1.0]);
  const panY = interpolate(progress, [0, 1], [-20, 0]);

  // Staggered pill badge spring entrances
  const tag1 = spring({ frame, fps, config: { damping: 12 } });
  const tag2 = spring({ frame: frame - 15, fps, config: { damping: 12 } });
  const tag3 = spring({ frame: frame - 30, fps, config: { damping: 12 } });
  const tag4 = spring({ frame: frame - 45, fps, config: { damping: 12 } });

  return (
    <AbsoluteFill className="overflow-hidden bg-[#121916]">
      {/* Background Image: Overhead Master Shot with Sides (Vibrant 85% Brightness) */}
      <Img
        className="absolute inset-0 w-full h-full object-cover object-center"
        style={{
          transform: `scale(${scale}) translateY(${panY}px)`,
          filter: "brightness(0.85) contrast(1.03)",
        }}
        src={staticFile("assets/balanced_plate_complete_sides.png")}
      />

      {/* Radial Soft Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/40 via-transparent to-black/20" />

      {/* Centered Top Header */}
      <div className="absolute top-16 z-30 w-full flex justify-center">
        <div className="px-8 py-3.5 rounded-full bg-black/40 backdrop-blur-md border border-white/25 shadow-2xl">
          <span
            style={{ fontFamily: fonts.outfit }}
            className="text-2xl font-extrabold text-white uppercase tracking-wider drop-shadow-md"
          >
            Complete Your Daily Meal ✨
          </span>
        </div>
      </div>

      {/* Floating Translucent Side Badges (35% Opacity) */}

      {/* Tag 1: Hydration (Water) */}
      <div
        className="absolute top-36 left-8 z-30 flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-black/35 backdrop-blur-md border border-blue-400/50 shadow-xl"
        style={{
          opacity: interpolate(tag1, [0, 1], [0, 1]),
          transform: `scale(${interpolate(tag1, [0, 1], [0.8, 1])})`,
        }}
      >
        <span className="text-2xl">💧</span>
        <span className="text-lg font-bold text-white drop-shadow">Hydration</span>
      </div>

      {/* Tag 2: Probiotics (Curd) */}
      <div
        className="absolute top-36 right-8 z-30 flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-black/35 backdrop-blur-md border border-amber-400/50 shadow-xl"
        style={{
          opacity: interpolate(tag2, [0, 1], [0, 1]),
          transform: `scale(${interpolate(tag2, [0, 1], [0.8, 1])})`,
        }}
      >
        <span className="text-2xl">🥣</span>
        <span className="text-lg font-bold text-white drop-shadow">Probiotics</span>
      </div>

      {/* Tag 3: Micronutrients (Fresh Fruits) */}
      <div
        className="absolute bottom-36 left-8 z-30 flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-black/35 backdrop-blur-md border border-red-400/50 shadow-xl"
        style={{
          opacity: interpolate(tag3, [0, 1], [0, 1]),
          transform: `scale(${interpolate(tag3, [0, 1], [0.8, 1])})`,
        }}
      >
        <span className="text-2xl">🍎</span>
        <span className="text-lg font-bold text-white drop-shadow">Micronutrients</span>
      </div>

      {/* Tag 4: Healthy Fats (Almonds / Nuts) */}
      <div
        className="absolute bottom-36 right-8 z-30 flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-black/35 backdrop-blur-md border border-[#88A08D]/50 shadow-xl"
        style={{
          opacity: interpolate(tag4, [0, 1], [0, 1]),
          transform: `scale(${interpolate(tag4, [0, 1], [0.8, 1])})`,
        }}
      >
        <span className="text-2xl">🥑</span>
        <span className="text-lg font-bold text-white drop-shadow">Healthy Fats</span>
      </div>
    </AbsoluteFill>
  );
};
