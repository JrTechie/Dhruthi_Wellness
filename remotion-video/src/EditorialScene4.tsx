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
import { EDITORIAL_COLORS, loadFonts } from "./Typography";

export const EditorialScene4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fonts = loadFonts();

  const card1Sp = spring({ frame: frame - 10, fps });
  const card2Sp = spring({ frame: frame - 25, fps });
  const card3Sp = spring({ frame: frame - 40, fps });

  return (
    <AbsoluteFill
      style={{ backgroundColor: EDITORIAL_COLORS.cream }}
      className="overflow-hidden flex flex-col justify-between select-none"
    >
      <EditorialHeader category="SOLUTION PROTOCOL" issueNo="VOL 04" />

      {/* Top Title Section */}
      <div className="w-full px-10 pt-4 text-center">
        <h2
          style={{ fontFamily: fonts.outfit, color: EDITORIAL_COLORS.coral }}
          className="text-2xl font-bold uppercase tracking-widest mb-1"
        >
          The Dhruthi Wellness Framework
        </h2>
        <h1
          style={{ fontFamily: fonts.italiana, color: EDITORIAL_COLORS.obsidian }}
          className="text-[72px] font-light leading-tight"
        >
          Fix The Foundation First
        </h1>
      </div>

      {/* Center Cards List */}
      <div className="w-full px-8 my-auto space-y-4">
        {/* Pill Card 1 */}
        <div
          style={{
            opacity: interpolate(card1Sp, [0, 1], [0, 1]),
            transform: `translateX(${interpolate(card1Sp, [0, 1], [-60, 0])}px)`,
          }}
          className="bg-white p-6 rounded-[32px] border-2 border-black/10 shadow-lg flex items-center space-x-6"
        >
          <div
            style={{
              backgroundColor: EDITORIAL_COLORS.emerald,
              color: "#FFFFFF",
              fontFamily: fonts.outfit,
            }}
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl font-extrabold flex-shrink-0"
          >
            01
          </div>
          <div>
            <h3
              style={{ fontFamily: fonts.outfit, color: EDITORIAL_COLORS.obsidian }}
              className="text-3xl font-bold mb-1"
            >
              Full Biomarker & Gut Microbiome Panel
            </h3>
            <p style={{ fontFamily: fonts.outfit, color: "#666" }} className="text-2xl font-medium">
              Identify thyroid slowing, insulin resistance & gut inflammation.
            </p>
          </div>
        </div>

        {/* Pill Card 2 */}
        <div
          style={{
            opacity: interpolate(card2Sp, [0, 1], [0, 1]),
            transform: `translateX(${interpolate(card2Sp, [0, 1], [60, 0])}px)`,
          }}
          className="bg-white p-6 rounded-[32px] border-2 border-black/10 shadow-lg flex items-center space-x-6"
        >
          <div
            style={{
              backgroundColor: EDITORIAL_COLORS.coral,
              color: "#FFFFFF",
              fontFamily: fonts.outfit,
            }}
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl font-extrabold flex-shrink-0"
          >
            02
          </div>
          <div>
            <h3
              style={{ fontFamily: fonts.outfit, color: EDITORIAL_COLORS.obsidian }}
              className="text-3xl font-bold mb-1"
            >
              Circadian Rhythm & Stress Optimization
            </h3>
            <p style={{ fontFamily: fonts.outfit, color: "#666" }} className="text-2xl font-medium">
              Restore deep sleep cycles to drop cortisol & restart fat oxidation.
            </p>
          </div>
        </div>

        {/* Pill Card 3 */}
        <div
          style={{
            opacity: interpolate(card3Sp, [0, 1], [0, 1]),
            transform: `translateX(${interpolate(card3Sp, [0, 1], [-60, 0])}px)`,
          }}
          className="bg-white p-6 rounded-[32px] border-2 border-black/10 shadow-lg flex items-center space-x-6"
        >
          <div
            style={{
              backgroundColor: EDITORIAL_COLORS.emerald,
              color: "#FFFFFF",
              fontFamily: fonts.outfit,
            }}
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl font-extrabold flex-shrink-0"
          >
            03
          </div>
          <div>
            <h3
              style={{ fontFamily: fonts.outfit, color: EDITORIAL_COLORS.obsidian }}
              className="text-3xl font-bold mb-1"
            >
              Precision Metabolic Nutrition Plan
            </h3>
            <p style={{ fontFamily: fonts.outfit, color: "#666" }} className="text-2xl font-medium">
              Tailored micro & macro nutrient ratios. Nourish instead of starve.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Picture Frame */}
      <div className="w-full h-[26%] px-8 pb-10">
        <div
          className="w-full h-full rounded-[32px] border-2 border-black/10 overflow-hidden relative shadow-md"
        >
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url(${staticFile("assets/scene4_weight_loss.png")})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};
