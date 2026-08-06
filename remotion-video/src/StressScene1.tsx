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

export const StressScene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fonts = loadFonts();

  // Duration is 8.0 seconds (240 frames)
  const duration = 8.0 * fps;
  const progress = frame / duration;

  // 1. Ken Burns Effect: Zoom and subtle Pan
  const scale = interpolate(progress, [0, 1], [1.0, 1.15]);
  const panX = interpolate(progress, [0, 1], [0, -30]); // in pixels
  const panY = interpolate(progress, [0, 1], [0, 20]);

  // 2. Spring animations for staggered content entry
  const spring1 = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 90 },
  });
  const t1Y = interpolate(spring1, [0, 1], [60, 0]);
  const t1O = interpolate(spring1, [0, 1], [0, 1]);

  // Question enters at 0.6 seconds (18 frames)
  const spring2 = spring({
    frame: frame - 18,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 90 },
  });
  const t2Y = interpolate(spring2, [0, 1], [50, 0]);
  const t2O = interpolate(spring2, [0, 1], [0, 1]);

  // Context sentence enters at 1.2 seconds (36 frames)
  const spring3 = spring({
    frame: frame - 36,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 90 },
  });
  const t3Y = interpolate(spring3, [0, 1], [40, 0]);
  const t3O = interpolate(spring3, [0, 1], [0, 1]);

  // Brand handle top overlay enters at frame 0 (fade in)
  const brandOpacity = interpolate(frame, [0, 15], [0, 0.65], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="bg-black overflow-hidden flex flex-col justify-between items-center py-24">
      {/* Background Image with Ken Burns */}
      <Img
        className="absolute inset-0 w-full h-full object-cover object-center"
        style={{
          transform: `scale(${scale}) translate(${panX}px, ${panY}px)`,
        }}
        src={staticFile("assets/stress_scene1_overwhelmed.png")}
      />

      {/* Darkened overlay for legibility */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Main Content Containers */}
      <AbsoluteFill className="flex flex-col justify-center items-start px-20 text-left select-none z-10">
        
        {/* Brand Handle */}
        <div
          className="absolute top-20 flex items-center justify-start space-x-3 w-full"
          style={{
            opacity: brandOpacity,
            fontFamily: fonts.body,
          }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-white" />
          <span className="text-white text-2xl tracking-widest font-light">
            @dhruthi_wellness
          </span>
        </div>

        {/* Scene Heading */}
        <div
          style={{
            transform: `translateY(${t1Y}px)`,
            opacity: t1O,
            fontFamily: fonts.cormorant,
          }}
          className="flex flex-col items-start mb-6"
        >
          <h1
            style={{ color: COLORS_STRESS.linen }}
            className="text-[120px] font-semibold leading-none mb-4 tracking-tight"
          >
            Wired...
          </h1>
        </div>

        {/* Question text with Glassmorphic background */}
        <div
          style={{
            transform: `translateY(${t2Y}px)`,
            opacity: t2O,
            fontFamily: fonts.body,
          }}
          className="mb-12"
        >
          <div
            style={{ 
              backgroundColor: "rgba(27, 23, 19, 0.45)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1.5px solid rgba(250, 246, 240, 0.15)"
            }}
            className="px-8 py-4 rounded-3xl shadow-lg"
          >
            <h2
              style={{ color: COLORS_STRESS.terracotta }}
              className="text-[56px] font-bold tracking-tight leading-none"
            >
              but constantly tired?
            </h2>
          </div>
        </div>

        {/* Bottom context sentence */}
        <div
          style={{
            transform: `translateY(${t3Y}px)`,
            opacity: t3O,
            fontFamily: fonts.body,
          }}
          className="max-w-[850px] leading-relaxed"
        >
          <p
            style={{ color: COLORS_STRESS.linenMuted }}
            className="text-[38px] font-light leading-normal"
          >
            Chronic stress does more than just
            <br />
            <span
              style={{
                color: COLORS_STRESS.linen,
                backgroundColor: "rgba(200, 130, 107, 0.25)",
                border: "1px solid rgba(200, 130, 107, 0.4)"
              }}
              className="font-bold px-4 py-1.5 rounded-xl inline-block mt-3"
            >
              exhaust your mind.
            </span>
          </p>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
