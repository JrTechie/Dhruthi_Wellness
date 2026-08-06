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

// Dynamic bouncing arrow component
const BouncingArrowDown: React.FC<{ opacity: number; delay: number; frame: number }> = ({
  opacity,
  delay,
  frame,
}) => {
  const bounce = frame > delay ? 5 * Math.sin((frame - delay) / 6) : 0;
  return (
    <div
      style={{
        opacity,
        transform: `translateY(${bounce}px)`,
        color: COLORS_STRESS.terracotta,
      }}
      className="my-2.5 flex justify-center"
    >
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="12" y1="5" x2="12" y2="19" />
        <polyline points="19 12 12 19 5 12" />
      </svg>
    </div>
  );
};

export const StressScene3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fonts = loadFonts();

  // Duration is 9.0 seconds (270 frames) - extended for longer composition
  const duration = 9.0 * fps;
  const progress = frame / duration;

  // 1. Ken Burns Effect: Zoom and pan
  const scale = interpolate(progress, [0, 1], [1.0, 1.13]);
  const panX = interpolate(progress, [0, 1], [0, -35]);
  const panY = interpolate(progress, [0, 1], [0, 10]);

  // 2. Spring animations for content entry
  // Title enters at 0s
  const springTitle = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 90 },
  });
  const tTitleY = interpolate(springTitle, [0, 1], [30, 0]);
  const tTitleO = interpolate(springTitle, [0, 1], [0, 1]);

  // Step 1 enters at 0.6s (18 frames)
  const springStep1 = spring({
    frame: frame - 18,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 90 },
  });
  const s1Y = interpolate(springStep1, [0, 1], [30, 0]);
  const s1O = interpolate(springStep1, [0, 1], [0, 1]);

  // Arrow 1 enters at 1.1s (33 frames)
  const arrow1Opacity = interpolate(frame, [33, 43], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Step 2 enters at 1.4s (42 frames)
  const springStep2 = spring({
    frame: frame - 42,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 95 },
  });
  const s2Y = interpolate(springStep2, [0, 1], [25, 0]);
  const s2O = interpolate(springStep2, [0, 1], [0, 1]);

  // Arrow 2 enters at 1.9s (57 frames)
  const arrow2Opacity = interpolate(frame, [57, 67], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Step 3 enters at 2.2s (66 frames)
  const springStep3 = spring({
    frame: frame - 66,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 95 },
  });
  const s3Y = interpolate(springStep3, [0, 1], [25, 0]);
  const s3O = interpolate(springStep3, [0, 1], [0, 1]);

  // Summary sentence enters at 2.8s (84 frames)
  const springSummary = spring({
    frame: frame - 84,
    fps,
    config: { damping: 15, mass: 0.7, stiffness: 85 },
  });
  const summaryY = interpolate(springSummary, [0, 1], [20, 0]);
  const summaryO = interpolate(springSummary, [0, 1], [0, 1]);

  // Brand handle opacity
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
        src={staticFile("assets/stress_scene3_cravings.png")}
      />

      {/* Darkened overlay */}
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

      {/* Floating Cascade Layout (No giant card) */}
      <AbsoluteFill className="flex flex-col justify-center items-center px-12 text-center select-none z-10 pt-10">
        
        {/* Title */}
        <div
          style={{
            transform: `translateY(${tTitleY}px)`,
            opacity: tTitleO,
            fontFamily: fonts.cormorant,
          }}
          className="mb-10"
        >
          <h2
            style={{ color: COLORS_STRESS.linen }}
            className="text-[84px] font-semibold leading-none tracking-tight"
          >
            Hormonal Hijack
          </h2>
        </div>

        {/* Step List Container */}
        <div className="w-full flex flex-col items-center mb-6">
          
          {/* Step 1 */}
          <div
            style={{
              transform: `translateY(${s1Y}px)`,
              opacity: s1O,
              fontFamily: fonts.body,
              backgroundColor: "rgba(27, 23, 19, 0.42)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1.5px solid rgba(250, 246, 240, 0.15)"
            }}
            className="flex items-center space-x-6 px-8 py-4 rounded-2xl w-[640px] justify-start shadow-md"
          >
            <div
              style={{ backgroundColor: COLORS_STRESS.terracotta, color: COLORS_STRESS.linen }}
              className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-[28px] shrink-0"
            >
              1
            </div>
            <span style={{ color: COLORS_STRESS.linen }} className="text-[34px] font-bold">
              Chronic Mental Stress
            </span>
          </div>

          {/* Arrow 1 */}
          <BouncingArrowDown opacity={arrow1Opacity} delay={33} frame={frame} />

          {/* Step 2 */}
          <div
            style={{
              transform: `translateY(${s2Y}px)`,
              opacity: s2O,
              fontFamily: fonts.body,
              backgroundColor: "rgba(27, 23, 19, 0.42)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1.5px solid rgba(250, 246, 240, 0.15)"
            }}
            className="flex items-center space-x-6 px-8 py-4 rounded-2xl w-[640px] justify-start shadow-md"
          >
            <div
              style={{ backgroundColor: COLORS_STRESS.sage, color: COLORS_STRESS.espresso }}
              className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-[28px] shrink-0"
            >
              2
            </div>
            <span style={{ color: COLORS_STRESS.linen }} className="text-[34px] font-bold flex items-center">
              Spikes Cortisol Levels
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3.5"
                className="ml-3 inline text-[#C8826B]"
              >
                <line x1="12" y1="19" x2="12" y2="5" />
                <polyline points="5 12 12 5 19 12" />
              </svg>
            </span>
          </div>

          {/* Arrow 2 */}
          <BouncingArrowDown opacity={arrow2Opacity} delay={57} frame={frame} />

          {/* Step 3 */}
          <div
            style={{
              transform: `translateY(${s3Y}px)`,
              opacity: s3O,
              fontFamily: fonts.body,
              backgroundColor: "rgba(27, 23, 19, 0.42)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1.5px solid rgba(250, 246, 240, 0.15)"
            }}
            className="flex items-center space-x-6 px-8 py-4 rounded-2xl w-[640px] justify-start shadow-md"
          >
            <div
              style={{ backgroundColor: COLORS_STRESS.terracotta, color: COLORS_STRESS.linen }}
              className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-[28px] shrink-0"
            >
              3
            </div>
            <span style={{ color: COLORS_STRESS.linenMuted }} className="text-[34px] font-bold">
              Triggers Cravings & Storage
            </span>
          </div>
        </div>

        {/* Summary Statement in a Floating Glass Panel */}
        <div
          style={{
            transform: `translateY(${summaryY}px)`,
            opacity: summaryO,
            fontFamily: fonts.body,
            backgroundColor: "rgba(27, 23, 19, 0.5)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1.5px solid rgba(250, 246, 240, 0.15)"
          }}
          className="rounded-2xl p-6 max-w-[700px] w-full text-center mt-2 shadow-lg"
        >
          <p
            style={{ color: COLORS_STRESS.linen }}
            className="text-[32px] font-normal leading-normal"
          >
            Your body is chemically programmed to crave{" "}
            <span
              style={{ color: COLORS_STRESS.terracotta }}
              className="font-bold underline decoration-2 underline-offset-4"
            >
              sugar, salt, and fats.
            </span>
          </p>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
