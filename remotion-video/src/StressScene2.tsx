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

export const StressScene2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fonts = loadFonts();

  // Duration is 8.0 seconds (240 frames)
  const duration = 8.0 * fps;
  const progress = frame / duration;

  // 1. Ken Burns Effect: Zoom-out and subtle pan
  const scale = interpolate(progress, [0, 1], [1.18, 1.0]);
  const panX = interpolate(progress, [0, 1], [30, 0]);
  const panY = interpolate(progress, [0, 1], [-25, 0]);

  // 2. Spring animations for content entry
  // Title enters at 0s (frame 0)
  const springTitle = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 90 },
  });
  const tTitleY = interpolate(springTitle, [0, 1], [40, 0]);
  const tTitleO = interpolate(springTitle, [0, 1], [0, 1]);

  // Description enters at 0.6s (18 frames)
  const springStatement = spring({
    frame: frame - 18,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 90 },
  });
  const tStatementY = interpolate(springStatement, [0, 1], [30, 0]);
  const tStatementO = interpolate(springStatement, [0, 1], [0, 1]);

  // Scientific Fact (Rust) enters at 1.2s (36 frames) with a pop scale
  const springFact = spring({
    frame: frame - 36,
    fps,
    config: { damping: 12, mass: 0.5, stiffness: 110 },
  });
  const tFactScale = interpolate(springFact, [0, 1], [0.85, 1.0]);
  const tFactO = interpolate(springFact, [0, 1], [0, 1]);

  // Footnote (Script font) enters at 1.8s (54 frames)
  const springFootnote = spring({
    frame: frame - 54,
    fps,
    config: { damping: 15, mass: 0.6, stiffness: 85 },
  });
  const tFootnoteY = interpolate(springFootnote, [0, 1], [25, 0]);
  const tFootnoteO = interpolate(springFootnote, [0, 1], [0, 1]);

  // Top brand handle opacity (fade in)
  const brandOpacity = interpolate(frame, [0, 15], [0, 0.65], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="bg-black overflow-hidden flex flex-col justify-center items-center py-24 px-16">
      {/* Background Image with Ken Burns */}
      <Img
        className="absolute inset-0 w-full h-full object-cover object-center"
        style={{
          transform: `scale(${scale}) translate(${panX}px, ${panY}px)`,
        }}
        src={staticFile("assets/stress_scene2_anxious.png")}
      />

      {/* Darkened overlay for legibility */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Brand Handle */}
      <div
        className="absolute top-20 flex items-center justify-start space-x-3 w-full z-20 px-4"
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

      {/* Floating Content Layout (No giant card) */}
      <AbsoluteFill className="flex flex-col justify-center items-start px-20 text-left select-none z-10">
        
        {/* Title */}
        <div
          style={{
            transform: `translateY(${tTitleY}px)`,
            opacity: tTitleO,
            fontFamily: fonts.cormorant,
          }}
          className="mb-8"
        >
          <h2
            style={{ color: COLORS_STRESS.linen }}
            className="text-[100px] font-semibold leading-none tracking-tight"
          >
            Stress & Cortisol
          </h2>
        </div>

        {/* Description Statement in a Glass Badge */}
        <div
          style={{
            transform: `translateY(${tStatementY}px)`,
            opacity: tStatementO,
            fontFamily: fonts.body,
            backgroundColor: "rgba(27, 23, 19, 0.45)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1.5px solid rgba(250, 246, 240, 0.12)"
          }}
          className="p-8 rounded-3xl max-w-[840px] mb-8"
        >
          <p
            style={{ color: COLORS_STRESS.linenMuted }}
            className="text-[38px] font-light leading-relaxed"
          >
            Under stress, your body pumps out cortisol. This hormone signals your brain to store energy...
          </p>
        </div>

        {/* Scientific Fact (Solid Terracotta Badge) */}
        <div
          style={{
            transform: `scale(${tFactScale})`,
            opacity: tFactO,
            fontFamily: fonts.body,
            backgroundColor: COLORS_STRESS.terracotta,
          }}
          className="rounded-3xl py-5 px-10 mb-8 shadow-lg border border-white/5"
        >
          <p
            style={{ color: COLORS_STRESS.linen }}
            className="text-[44px] font-bold tracking-tight leading-none uppercase"
          >
            Specifically as deep belly fat.
          </p>
        </div>

        {/* Footnote (Handwritten/Script) */}
        <div
          style={{
            transform: `translateY(${tFootnoteY}px)`,
            opacity: tFootnoteO,
            fontFamily: fonts.accentHandwritten,
          }}
          className="pl-4"
        >
          <p
            style={{ color: COLORS_STRESS.sage }}
            className="text-[60px] tracking-wide"
          >
            It is biology, not willpower.
          </p>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
