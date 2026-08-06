import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { HypeText } from "./HypeText";
import { loadFonts } from "./Typography";

export const HypeScene4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fonts = loadFonts();

  const m1Sp = spring({ frame: frame - 10, fps });
  const m2Sp = spring({ frame: frame - 25, fps });
  const m3Sp = spring({ frame: frame - 40, fps });

  return (
    <AbsoluteFill className="bg-[#94C973] overflow-hidden select-none flex flex-col justify-between p-8">
      {/* Header */}
      <div className="w-full flex items-center justify-between z-30 pb-4 border-b-2 border-white/30">
        <span className="bg-[#101413] text-white font-black text-xl px-4 py-1.5 rounded-full uppercase tracking-widest">
          04 // THE METABOLIC MATRIX
        </span>
        <span style={{ fontFamily: fonts.outfit }} className="text-[#101413] text-2xl font-black">
          @dhruthi_wellness
        </span>
      </div>

      {/* Title */}
      <div className="w-full text-center py-2 z-20">
        <h1
          style={{ fontFamily: fonts.italiana, color: "#101413" }}
          className="text-[76px] font-light leading-none"
        >
          Fix The Biological Foundation
        </h1>
      </div>

      {/* Diagonal Matrix Cards */}
      <div className="w-full my-auto space-y-4 z-20">
        {/* Step 1 */}
        <div
          style={{
            opacity: interpolate(m1Sp, [0, 1], [0, 1]),
            transform: `translateX(${interpolate(m1Sp, [0, 1], [-80, 0])}px) rotate(-1.5deg)`,
          }}
          className="bg-white p-6 rounded-[32px] border-4 border-[#101413] shadow-2xl flex items-center space-x-6"
        >
          <span className="bg-[#101413] text-[#94C973] font-black text-4xl p-4 rounded-2xl">
            ⚡ 01
          </span>
          <div>
            <h3 style={{ fontFamily: fonts.outfit }} className="text-3xl font-extrabold text-[#101413]">
              Biomarker & Gut Panel
            </h3>
            <p style={{ fontFamily: fonts.outfit }} className="text-2xl text-gray-700 font-medium">
              Uncover root-cause metabolic blockers.
            </p>
          </div>
        </div>

        {/* Step 2 */}
        <div
          style={{
            opacity: interpolate(m2Sp, [0, 1], [0, 1]),
            transform: `translateX(${interpolate(m2Sp, [0, 1], [80, 0])}px) rotate(1.5deg)`,
          }}
          className="bg-[#101413] text-white p-6 rounded-[32px] border-4 border-white shadow-2xl flex items-center space-x-6"
        >
          <span className="bg-[#94C973] text-[#101413] font-black text-4xl p-4 rounded-2xl">
            ⚡ 02
          </span>
          <div>
            <h3 style={{ fontFamily: fonts.outfit }} className="text-3xl font-extrabold text-[#94C973]">
              Circadian Rhythm Sync
            </h3>
            <p style={{ fontFamily: fonts.outfit }} className="text-2xl text-gray-200 font-medium">
              Restore deep sleep cycles & balance cortisol curve.
            </p>
          </div>
        </div>

        {/* Step 3 */}
        <div
          style={{
            opacity: interpolate(m3Sp, [0, 1], [0, 1]),
            transform: `translateX(${interpolate(m3Sp, [0, 1], [-80, 0])}px) rotate(-1.5deg)`,
          }}
          className="bg-white p-6 rounded-[32px] border-4 border-[#101413] shadow-2xl flex items-center space-x-6"
        >
          <span className="bg-[#101413] text-[#94C973] font-black text-4xl p-4 rounded-2xl">
            ⚡ 03
          </span>
          <div>
            <h3 style={{ fontFamily: fonts.outfit }} className="text-3xl font-extrabold text-[#101413]">
              Precision Metabolic Fuel
            </h3>
            <p style={{ fontFamily: fonts.outfit }} className="text-2xl text-gray-700 font-medium">
              Targeted nutrient ratios tailored to your body.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Kinetic Text */}
      <div className="w-full text-center pb-6 z-20">
        <HypeText
          text="Nourish Your Body. Reset Your Rhythm."
          delayFrames={40}
          glowColor="#FFFFFF"
          fontSize={40}
          fontFamily={fonts.outfit}
          highlightWords={["Nourish", "Reset"]}
          highlightColor="#101413"
          textColor="#FFFFFF"
        />
      </div>
    </AbsoluteFill>
  );
};
