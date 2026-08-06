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

export const BalancedPlateScene2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fonts = loadFonts();

  const totalFrames = 300; // 10s * 30fps
  const progress = frame / totalFrames;

  // Camera Orbit & Zoom
  const scale = interpolate(progress, [0, 1], [1.05, 1.18]);
  const rotate = interpolate(progress, [0, 1], [0, 3]);

  // Spring animation for main header card
  const springCard = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 90 },
  });
  const cardOpacity = interpolate(springCard, [0, 1], [0, 1]);
  const cardY = interpolate(springCard, [0, 1], [40, 0]);

  // Staggered bullet points given plenty of reading time
  const b1 = spring({ frame: frame - 20, fps, config: { damping: 14 } });
  const b2 = spring({ frame: frame - 40, fps, config: { damping: 14 } });
  const b3 = spring({ frame: frame - 60, fps, config: { damping: 14 } });

  // Floating leaf particles
  const leafY1 = Math.sin(frame * 0.05) * 12;
  const leafY2 = Math.cos(frame * 0.04) * 14;

  return (
    <AbsoluteFill className="overflow-hidden bg-[#121916]">
      {/* Background Image: Plate with 50% Vegetables (Vibrant 85% Brightness) */}
      <Img
        className="absolute inset-0 w-full h-full object-cover object-center"
        style={{
          transform: `scale(${scale}) rotate(${rotate}deg)`,
          filter: "brightness(0.85) contrast(1.03)",
        }}
        src={staticFile("assets/balanced_plate_vegetables.png")}
      />

      {/* Soft Radial Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.50) 100%)",
        }}
      />

      {/* Subtle Division Line Indicator */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 opacity-40">
        <svg viewBox="0 0 500 500" className="w-[440px] h-[440px]">
          <circle
            cx="250"
            cy="250"
            r="200"
            fill="none"
            stroke="#88A08D"
            strokeWidth="3"
            strokeDasharray="6 6"
          />
          <line
            x1="250"
            y1="50"
            x2="250"
            y2="450"
            stroke="#88A08D"
            strokeWidth="4"
            strokeDasharray="8 4"
          />
        </svg>
      </div>

      {/* Top Header Tag */}
      <div className="absolute top-16 left-8 z-30 flex items-center gap-3 px-6 py-2.5 rounded-full bg-black/40 backdrop-blur-md border border-white/25 shadow-xl">
        <span className="w-3.5 h-3.5 rounded-full bg-[#88A08D]" />
        <span
          style={{ fontFamily: fonts.body }}
          className="text-lg font-bold tracking-widest text-white uppercase drop-shadow"
        >
          Step 1: Fill 1/2 of Your Plate
        </span>
      </div>

      {/* Floating Animated Leaf Icons */}
      <div
        className="absolute top-36 right-12 z-20 text-4xl drop-shadow"
        style={{ transform: `translateY(${leafY1}px)` }}
      >
        🌿
      </div>
      <div
        className="absolute bottom-36 left-10 z-20 text-4xl drop-shadow"
        style={{ transform: `translateY(${leafY2}px)` }}
      >
        🥬
      </div>

      {/* Ultra-Transparent Dark Glass Card Overlay (35% Opacity - Bottom Left) */}
      <div
        className="absolute bottom-16 left-8 z-30 w-[450px]"
        style={{
          opacity: cardOpacity,
          transform: `translateY(${cardY}px)`,
        }}
      >
        <div className="w-full p-7 rounded-3xl bg-black/35 backdrop-blur-md border border-white/25 shadow-2xl">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/20">
            <span
              style={{ fontFamily: fonts.outfit }}
              className="text-4xl font-extrabold text-white flex items-center gap-3 drop-shadow-md"
            >
              🥦 50% Vegetables
            </span>
            <span className="px-4 py-1.5 rounded-full bg-[#5C7862]/85 text-white text-sm font-extrabold uppercase tracking-wider shadow">
              Half Plate
            </span>
          </div>

          <div className="space-y-3.5">
            <div
              className="flex items-center gap-3.5 text-2xl font-bold text-white drop-shadow-md"
              style={{ opacity: interpolate(b1, [0, 1], [0, 1]) }}
            >
              <span className="w-3 h-3 rounded-full bg-[#88A08D]" />
              Rich in Fiber & Digestive Roughage
            </div>
            <div
              className="flex items-center gap-3.5 text-2xl font-bold text-white drop-shadow-md"
              style={{ opacity: interpolate(b2, [0, 1], [0, 1]) }}
            >
              <span className="w-3 h-3 rounded-full bg-[#88A08D]" />
              Packed with Essential Vitamins & Minerals
            </div>
            <div
              className="flex items-center gap-3.5 text-2xl font-bold text-white drop-shadow-md"
              style={{ opacity: interpolate(b3, [0, 1], [0, 1]) }}
            >
              <span className="w-3 h-3 rounded-full bg-[#88A08D]" />
              Supports Digestion, Gut Health & Immunity
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
