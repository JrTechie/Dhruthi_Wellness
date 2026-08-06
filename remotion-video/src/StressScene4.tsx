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

export const StressScene4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fonts = loadFonts();

  // Duration is 9.0 seconds (270 frames) - extended for longer composition
  const duration = 9.0 * fps;
  const progress = frame / duration;

  // 1. Ken Burns Effect: Zoom and pan
  const scale = interpolate(progress, [0, 1], [1.0, 1.16]);
  const panX = interpolate(progress, [0, 1], [0, 35]);
  const panY = interpolate(progress, [0, 1], [0, 30]);

  // 2. Spring animations for content entry
  // Title enters at 0s
  const springTitle = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 90 },
  });
  const tTitleY = interpolate(springTitle, [0, 1], [30, 0]);
  const tTitleO = interpolate(springTitle, [0, 1], [0, 1]);

  // Habit 1 enters at 0.7s (21 frames)
  const springHabit1 = spring({
    frame: frame - 21,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 90 },
  });
  const h1Y = interpolate(springHabit1, [0, 1], [30, 0]);
  const h1O = interpolate(springHabit1, [0, 1], [0, 1]);

  // Habit 2 enters at 1.4s (42 frames)
  const springHabit2 = spring({
    frame: frame - 42,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 90 },
  });
  const h2Y = interpolate(springHabit2, [0, 1], [30, 0]);
  const h2O = interpolate(springHabit2, [0, 1], [0, 1]);

  // Habit 3 enters at 2.1s (63 frames)
  const springHabit3 = spring({
    frame: frame - 63,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 90 },
  });
  const h3Y = interpolate(springHabit3, [0, 1], [30, 0]);
  const h3O = interpolate(springHabit3, [0, 1], [0, 1]);

  // Bottom Tag enters at 2.8s (84 frames)
  const springTag = spring({
    frame: frame - 84,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 95 },
  });
  const tagY = interpolate(springTag, [0, 1], [25, 0]);
  const tagO = interpolate(springTag, [0, 1], [0, 1]);

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
        src={staticFile("assets/stress_scene4_breathing.png")}
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

      {/* Floating Content Layout (No giant card) */}
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
            Break the Cycle
          </h2>
        </div>

        {/* Habit List */}
        <div className="w-full flex flex-col items-center space-y-6 mb-8 max-w-[840px]">
          
          {/* Habit 1 */}
          <div
            style={{
              transform: `translateY(${h1Y}px)`,
              opacity: h1O,
              fontFamily: fonts.body,
              backgroundColor: "rgba(27, 23, 19, 0.45)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1.5px solid rgba(250, 246, 240, 0.12)"
            }}
            className="flex flex-col items-center text-center p-6 rounded-2xl w-full shadow-md"
          >
            <h3 style={{ color: COLORS_STRESS.terracotta }} className="text-[34px] font-bold mb-1">
              1. Calming Deep Breathing
            </h3>
            <p style={{ color: COLORS_STRESS.linen }} className="text-[28px] font-light">
              Activates your vagus nerve to lower cortisol.
            </p>
          </div>

          {/* Habit 2 */}
          <div
            style={{
              transform: `translateY(${h2Y}px)`,
              opacity: h2O,
              fontFamily: fonts.body,
              backgroundColor: "rgba(27, 23, 19, 0.45)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1.5px solid rgba(250, 246, 240, 0.12)"
            }}
            className="flex flex-col items-center text-center p-6 rounded-2xl w-full shadow-md"
          >
            <h3 style={{ color: COLORS_STRESS.terracotta }} className="text-[34px] font-bold mb-1">
              2. Protein-Rich Meals
            </h3>
            <p style={{ color: COLORS_STRESS.linen }} className="text-[28px] font-light">
              Stabilizes blood sugar and hormone swings.
            </p>
          </div>

          {/* Habit 3 */}
          <div
            style={{
              transform: `translateY(${h3Y}px)`,
              opacity: h3O,
              fontFamily: fonts.body,
              backgroundColor: "rgba(27, 23, 19, 0.45)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1.5px solid rgba(250, 246, 240, 0.12)"
            }}
            className="flex flex-col items-center text-center p-6 rounded-2xl w-full shadow-md"
          >
            <h3 style={{ color: COLORS_STRESS.terracotta }} className="text-[34px] font-bold mb-1">
              3. Mindful Movement
            </h3>
            <p style={{ color: COLORS_STRESS.linen }} className="text-[28px] font-light">
              Avoid high-intensity stress on exhausted days.
            </p>
          </div>
        </div>

        {/* Bottom Handwritten Tag Line */}
        <div
          style={{
            transform: `translateY(${tagY}px)`,
            opacity: tagO,
            fontFamily: fonts.accentHandwritten,
          }}
          className="w-full text-center mt-2"
        >
          <p
            style={{ color: COLORS_STRESS.sage }}
            className="text-[64px] tracking-wide"
          >
            Nourish. Breathe. Reset.
          </p>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
