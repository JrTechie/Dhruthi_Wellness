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

export const BalancedPlateScene4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fonts = loadFonts();

  const totalFrames = 270; // 9s * 30fps
  const progress = frame / totalFrames;

  // Slow camera pan and subtle tilt zoom
  const scale = interpolate(progress, [0, 1], [1.05, 1.18]);
  const panY = interpolate(progress, [0, 1], [0, 15]);

  // Spring animation for main card
  const springCard = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 90 },
  });
  const cardOpacity = interpolate(springCard, [0, 1], [0, 1]);
  const cardY = interpolate(springCard, [0, 1], [40, 0]);

  // Staggered bullet points given plenty of reading time
  const b1 = spring({ frame: frame - 18, fps, config: { damping: 14 } });
  const b2 = spring({ frame: frame - 36, fps, config: { damping: 14 } });
  const b3 = spring({ frame: frame - 54, fps, config: { damping: 14 } });

  return (
    <AbsoluteFill className="overflow-hidden bg-[#121916]">
      {/* Background Image: Plate with Veggies + Protein + Carbs (Vibrant 85% Brightness) */}
      <Img
        className="absolute inset-0 w-full h-full object-cover object-center"
        style={{
          transform: `scale(${scale}) translateY(${panY}px)`,
          filter: "brightness(0.85) contrast(1.03)",
        }}
        src={staticFile("assets/balanced_plate_carbs.png")}
      />

      {/* Soft Radial Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.50) 100%)",
        }}
      />

      {/* Top Header Tag */}
      <div className="absolute top-16 left-8 z-30 flex items-center gap-3 px-6 py-2.5 rounded-full bg-black/40 backdrop-blur-md border border-white/25 shadow-xl">
        <span className="w-3.5 h-3.5 rounded-full bg-[#D9A05B]" />
        <span
          style={{ fontFamily: fonts.body }}
          className="text-lg font-bold tracking-widest text-white uppercase drop-shadow"
        >
          Step 3: Add 1/4 Complex Carbs
        </span>
      </div>

      {/* Floating Animated Carb Icons */}
      <div className="absolute top-44 left-10 z-20 text-4xl drop-shadow">
        🍚
      </div>
      <div className="absolute top-36 right-10 z-20 text-4xl drop-shadow">
        🌾
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
              className="text-3xl font-extrabold text-white flex items-center gap-2 drop-shadow-md"
            >
              🍚 25% Healthy Carbs
            </span>
            <span className="px-4 py-1.5 rounded-full bg-[#D9A05B]/90 text-[#121916] text-sm font-extrabold uppercase tracking-wider shadow">
              Quarter Plate
            </span>
          </div>

          <div className="space-y-3.5">
            <div
              className="flex items-center gap-3.5 text-2xl font-bold text-white drop-shadow-md"
              style={{ opacity: interpolate(b1, [0, 1], [0, 1]) }}
            >
              <span className="w-3 h-3 rounded-full bg-[#D9A05B]" />
              Sustained, Long-lasting Energy Release
            </div>
            <div
              className="flex items-center gap-3.5 text-2xl font-bold text-white drop-shadow-md"
              style={{ opacity: interpolate(b2, [0, 1], [0, 1]) }}
            >
              <span className="w-3 h-3 rounded-full bg-[#D9A05B]" />
              Essential Glucose for Brain & Body Fuel
            </div>
            <div
              className="flex items-center gap-3.5 text-2xl font-bold text-white drop-shadow-md"
              style={{ opacity: interpolate(b3, [0, 1], [0, 1]) }}
            >
              <span className="w-3 h-3 rounded-full bg-[#D9A05B]" />
              Balanced Whole-Grain & Fiber Nutrition
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
