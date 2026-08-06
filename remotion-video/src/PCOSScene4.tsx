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
import { PCOSBrandHeader } from "./PCOSBrandHeader";
import { COLORS_PCOS, loadFonts } from "./Typography";

export const PCOSScene4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fonts = loadFonts();

  const duration = 12.0 * fps; // 12 seconds
  const progress = frame / duration;

  const scale = interpolate(progress, [0, 1], [1.0, 1.16]);
  const panX = interpolate(progress, [0, 1], [0, 35]);
  const panY = interpolate(progress, [0, 1], [0, 30]);

  const springTitle = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 90 },
  });
  const tTitleY = interpolate(springTitle, [0, 1], [30, 0]);
  const tTitleO = interpolate(springTitle, [0, 1], [0, 1]);

  const springHabit1 = spring({
    frame: frame - 21,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 90 },
  });
  const h1Y = interpolate(springHabit1, [0, 1], [30, 0]);
  const h1O = interpolate(springHabit1, [0, 1], [0, 1]);

  const springHabit2 = spring({
    frame: frame - 42,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 90 },
  });
  const h2Y = interpolate(springHabit2, [0, 1], [30, 0]);
  const h2O = interpolate(springHabit2, [0, 1], [0, 1]);

  const springHabit3 = spring({
    frame: frame - 63,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 90 },
  });
  const h3Y = interpolate(springHabit3, [0, 1], [30, 0]);
  const h3O = interpolate(springHabit3, [0, 1], [0, 1]);

  const springTag = spring({
    frame: frame - 84,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 95 },
  });
  const tagY = interpolate(springTag, [0, 1], [25, 0]);
  const tagO = interpolate(springTag, [0, 1], [0, 1]);

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
        src={staticFile("assets/pcos_scene4_yoga.png")}
      />

      {/* Darkened overlay */}
      <div className="absolute inset-0 bg-black/75" />

      {/* Highlighted Brand Header Badge */}
      <PCOSBrandHeader opacity={brandOpacity} />

      {/* Floating Content Layout */}
      <AbsoluteFill className="flex flex-col justify-center items-center px-12 text-center select-none z-10 pt-16">
        
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
            style={{ color: COLORS_PCOS.linen }}
            className="text-[84px] font-semibold leading-none tracking-tight"
          >
            Reset Your Rhythms
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
              backgroundColor: "rgba(21, 16, 18, 0.50)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1.5px solid rgba(250, 246, 240, 0.12)"
            }}
            className="flex flex-col items-center text-center p-6 rounded-2xl w-full shadow-md"
          >
            <h3 style={{ color: COLORS_PCOS.orchid }} className="text-[34px] font-bold mb-1">
              1. Low-Insulin Meal Anchors
            </h3>
            <p style={{ color: COLORS_PCOS.linen }} className="text-[28px] font-light">
              Pair complex carbs with healthy fats & proteins to flatten insulin curves.
            </p>
          </div>

          {/* Habit 2 */}
          <div
            style={{
              transform: `translateY(${h2Y}px)`,
              opacity: h2O,
              fontFamily: fonts.body,
              backgroundColor: "rgba(21, 16, 18, 0.50)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1.5px solid rgba(250, 246, 240, 0.12)"
            }}
            className="flex flex-col items-center text-center p-6 rounded-2xl w-full shadow-md"
          >
            <h3 style={{ color: COLORS_PCOS.orchid }} className="text-[34px] font-bold mb-1">
              2. Circadian Sleep Synchronization
            </h3>
            <p style={{ color: COLORS_PCOS.linen }} className="text-[28px] font-light">
              Restore deep sleep phases to naturally reduce evening cortisol levels.
            </p>
          </div>

          {/* Habit 3 */}
          <div
            style={{
              transform: `translateY(${h3Y}px)`,
              opacity: h3O,
              fontFamily: fonts.body,
              backgroundColor: "rgba(21, 16, 18, 0.50)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1.5px solid rgba(250, 246, 240, 0.12)"
            }}
            className="flex flex-col items-center text-center p-6 rounded-2xl w-full shadow-md"
          >
            <h3 style={{ color: COLORS_PCOS.orchid }} className="text-[34px] font-bold mb-1">
              3. Cycle-Aligned Movement
            </h3>
            <p style={{ color: COLORS_PCOS.linen }} className="text-[28px] font-light">
              Low-intensity strength & yoga over extreme cardio to protect thyroid.
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
            style={{ color: COLORS_PCOS.emerald }}
            className="text-[64px] tracking-wide"
          >
            Nourish. Restore. Sync.
          </p>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
