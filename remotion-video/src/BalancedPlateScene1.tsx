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

export const BalancedPlateScene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fonts = loadFonts();

  const totalFrames = 180; // 6s * 30fps
  const progress = frame / totalFrames;

  // Cinematic slow camera push-in
  const scale = interpolate(progress, [0, 1], [1.0, 1.15]);
  const panY = interpolate(progress, [0, 1], [0, -15]);

  // Spring animation for text 1 (0s to 3.0s / frames 0 to 90)
  const spring1 = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 90 },
  });
  const text1Opacity = interpolate(frame, [0, 20, 75, 90], [0, 1, 1, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });
  const text1Y = interpolate(spring1, [0, 1], [40, 0]);

  // Spring animation for text 2 (3.0s to 6.0s / frames 90 to 180)
  const spring2 = spring({
    frame: frame - 90,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 90 },
  });
  const text2Opacity = interpolate(frame, [90, 110, 165, 180], [0, 1, 1, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });
  const text2Y = interpolate(spring2, [0, 1], [40, 0]);

  // Subtle floating particles motion
  const particleOffset = (frame * 0.5) % 100;

  return (
    <AbsoluteFill className="overflow-hidden bg-[#121916] flex flex-col justify-between items-center">
      {/* Background Image: Empty Plate in Sunlit Kitchen (Vibrant 85% Brightness) */}
      <Img
        className="absolute inset-0 w-full h-full object-cover object-center"
        style={{
          transform: `scale(${scale}) translateY(${panY}px)`,
          filter: "brightness(0.85) contrast(1.03)",
        }}
        src={staticFile("assets/balanced_plate_empty.png")}
      />

      {/* Soft Vignette Overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.45) 100%)",
        }}
      />

      {/* Top Brand Tag */}
      <div className="absolute top-16 z-30 flex items-center gap-3 px-6 py-2.5 rounded-full bg-black/40 backdrop-blur-md border border-white/25 shadow-xl">
        <span className="w-3 h-3 rounded-full bg-[#88A08D] animate-pulse" />
        <span
          style={{ fontFamily: fonts.body }}
          className="text-xl font-bold tracking-widest text-[#E2E8F0] uppercase"
        >
          Dhruthi Wellness • Guide
        </span>
      </div>

      {/* Center Text Container 1: Ultra-Transparent Glass Card (35% Opacity) */}
      <div
        className="absolute inset-0 z-30 flex items-center justify-center p-6 text-center"
        style={{
          opacity: text1Opacity,
          transform: `translateY(${text1Y}px)`,
        }}
      >
        <div className="w-full max-w-md px-8 py-8 rounded-3xl bg-black/35 backdrop-blur-md border border-white/25 shadow-2xl">
          <span
            style={{ fontFamily: fonts.outfit }}
            className="text-4xl font-extrabold text-white leading-tight block mb-3 drop-shadow-lg"
          >
            Still wondering what to eat every day?
          </span>
          <span
            style={{ fontFamily: fonts.body }}
            className="text-2xl font-bold text-[#88A08D] drop-shadow-md"
          >
            Nourish your body with evidence-based nutrition.
          </span>
        </div>
      </div>

      {/* Center Text Container 2: Ultra-Transparent Glass Card (35% Opacity) */}
      <div
        className="absolute inset-0 z-30 flex items-center justify-center p-6 text-center"
        style={{
          opacity: text2Opacity,
          transform: `translateY(${text2Y}px)`,
        }}
      >
        <div className="w-full max-w-md px-8 py-9 rounded-3xl bg-black/35 backdrop-blur-md border border-[#D9A05B]/50 shadow-2xl">
          <span
            style={{ fontFamily: fonts.outfit }}
            className="text-4xl font-extrabold text-white leading-tight block mb-3 drop-shadow-lg"
          >
            Build a Balanced Plate
          </span>
          <span
            style={{ fontFamily: fonts.italiana }}
            className="text-3xl font-bold text-[#D9A05B] drop-shadow-md"
          >
            In Simple Steps ✨
          </span>
        </div>
      </div>

      {/* Animated Light Ray Particles */}
      <div
        className="absolute top-10 right-10 w-48 h-48 rounded-full pointer-events-none blur-3xl opacity-30"
        style={{
          background: "radial-gradient(circle, #D9A05B 0%, transparent 70%)",
          transform: `translateY(${particleOffset}px)`,
        }}
      />
    </AbsoluteFill>
  );
};
