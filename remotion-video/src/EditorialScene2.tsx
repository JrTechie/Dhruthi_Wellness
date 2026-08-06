import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { EditorialHeader } from "./EditorialHeader";
import { MarkerHighlight } from "./MarkerHighlight";
import { EDITORIAL_COLORS, loadFonts } from "./Typography";

export const EditorialScene2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fonts = loadFonts();

  const leftCardSp = spring({ frame: frame - 8, fps });
  const rightCardSp = spring({ frame: frame - 20, fps });

  return (
    <AbsoluteFill
      style={{ backgroundColor: EDITORIAL_COLORS.cream }}
      className="overflow-hidden flex flex-col justify-between select-none"
    >
      <EditorialHeader category="BIOLOGICAL MECHANISM" issueNo="VOL 02" />

      {/* Main Title Section */}
      <div className="w-full px-10 pt-4 text-center">
        <h1
          style={{ fontFamily: fonts.italiana, color: EDITORIAL_COLORS.obsidian }}
          className="text-[76px] font-light leading-tight mb-2"
        >
          The Calorie Deficit Myth
        </h1>
        <p
          style={{ fontFamily: fonts.outfit, color: EDITORIAL_COLORS.emerald }}
          className="text-[34px] font-semibold uppercase tracking-wider"
        >
          Why Eating Less Doesn't Always Equal Losing Fat
        </p>
      </div>

      {/* Center 60%: Dual Side-by-Side Comparison Grid */}
      <div className="w-full px-8 my-auto grid grid-cols-2 gap-6 items-stretch">
        {/* Left Card: WHAT YOU THINK */}
        <div
          style={{
            opacity: interpolate(leftCardSp, [0, 1], [0, 1]),
            transform: `translateX(${interpolate(leftCardSp, [0, 1], [-40, 0])}px)`,
            borderColor: EDITORIAL_COLORS.coral,
          }}
          className="bg-white p-8 rounded-[36px] border-3 shadow-xl flex flex-col justify-between"
        >
          <div>
            <span
              style={{
                fontFamily: fonts.outfit,
                backgroundColor: EDITORIAL_COLORS.coralLight,
                color: EDITORIAL_COLORS.coral,
              }}
              className="text-xl font-bold uppercase tracking-wider px-4 py-1.5 rounded-full inline-block mb-4"
            >
              What You Think
            </span>
            <h3
              style={{ fontFamily: fonts.outfit, color: EDITORIAL_COLORS.obsidian }}
              className="text-4xl font-extrabold mb-4"
            >
              Simple Caloric Math
            </h3>
            <ul style={{ fontFamily: fonts.outfit }} className="space-y-3 text-2xl text-gray-700 font-medium">
              <li>• Cut calories drastically</li>
              <li>• Double cardio sessions</li>
              <li>• Expect automatic weight loss</li>
            </ul>
          </div>
          <div className="mt-6 p-4 rounded-2xl bg-red-50 text-red-700 text-xl font-bold text-center border border-red-200">
            ❌ Triggers Metabolic Alarm
          </div>
        </div>

        {/* Right Card: WHAT IS HAPPENING */}
        <div
          style={{
            opacity: interpolate(rightCardSp, [0, 1], [0, 1]),
            transform: `translateX(${interpolate(rightCardSp, [0, 1], [40, 0])}px)`,
            borderColor: EDITORIAL_COLORS.emerald,
          }}
          className="bg-white p-8 rounded-[36px] border-3 shadow-xl flex flex-col justify-between"
        >
          <div>
            <span
              style={{
                fontFamily: fonts.outfit,
                backgroundColor: EDITORIAL_COLORS.emeraldLight,
                color: EDITORIAL_COLORS.emerald,
              }}
              className="text-xl font-bold uppercase tracking-wider px-4 py-1.5 rounded-full inline-block mb-4"
            >
              What Is Happening
            </span>
            <h3
              style={{ fontFamily: fonts.outfit, color: EDITORIAL_COLORS.emerald }}
              className="text-4xl font-extrabold mb-4"
            >
              Hormonal Defense
            </h3>
            <ul style={{ fontFamily: fonts.outfit }} className="space-y-3 text-2xl text-gray-700 font-medium">
              <li>• High Cortisol spikes +35%</li>
              <li>• Leptin drops (Extreme hunger)</li>
              <li>• BMR slows down to conserve</li>
            </ul>
          </div>
          <div className="mt-6 p-4 rounded-2xl bg-emerald-50 text-emerald-800 text-xl font-bold text-center border border-emerald-200">
            ✓ Survival Biology Locked
          </div>
        </div>
      </div>

      {/* Bottom Summary Callout */}
      <div className="w-full px-10 pb-14 text-center">
        <p
          style={{ fontFamily: fonts.outfit, color: EDITORIAL_COLORS.obsidian }}
          className="text-[36px] font-bold"
        >
          Your body is <MarkerHighlight color={EDITORIAL_COLORS.coralLight} delayFrames={35}>protecting energy</MarkerHighlight>, not burning it.
        </p>
      </div>
    </AbsoluteFill>
  );
};
