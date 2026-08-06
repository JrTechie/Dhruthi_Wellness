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

export const HypeScene2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fonts = loadFonts();

  const c1Sp = spring({ frame: frame - 8, fps, config: { damping: 10, mass: 0.4, stiffness: 100 } });
  const c2Sp = spring({ frame: frame - 22, fps, config: { damping: 10, mass: 0.4, stiffness: 100 } });
  const c3Sp = spring({ frame: frame - 36, fps, config: { damping: 10, mass: 0.4, stiffness: 100 } });

  return (
    <AbsoluteFill className="bg-[#FAF8F5] overflow-hidden select-none flex flex-col justify-between p-8">
      {/* Top Banner Header */}
      <div className="w-full flex items-center justify-between z-30 pb-4 border-b-2 border-[#1B3B2B]/20">
        <span className="bg-[#1B3B2B] text-white font-black text-xl px-4 py-1.5 rounded-full uppercase tracking-widest">
          02 // BIOLOGICAL BLOCKERS
        </span>
        <span style={{ fontFamily: fonts.outfit }} className="text-[#1B3B2B] text-2xl font-bold">
          @dhruthi_wellness
        </span>
      </div>

      {/* Main Title Section */}
      <div className="w-full text-center py-4">
        <h1
          style={{ fontFamily: fonts.italiana, color: "#1B3B2B" }}
          className="text-[78px] font-light leading-none mb-2"
        >
          3 Hidden Metabolic Brakes
        </h1>
        <p style={{ fontFamily: fonts.outfit }} className="text-[34px] font-bold text-[#FF6B4A] uppercase tracking-wider">
          It's Not Lack of Willpower — It's Survival Mode
        </p>
      </div>

      {/* Center Stack of 3 Bouncing Stat Cards */}
      <div className="w-full my-auto space-y-4 px-2">
        {/* Card 1 */}
        <div
          style={{
            opacity: interpolate(c1Sp, [0, 1], [0, 1]),
            transform: `scale(${interpolate(c1Sp, [0, 1], [0.85, 1.0])}) translateY(${interpolate(c1Sp, [0, 1], [40, 0])}px)`,
          }}
          className="bg-white p-6 rounded-[32px] border-3 border-[#FF6B4A] shadow-xl flex items-center justify-between"
        >
          <div className="flex items-center space-x-4">
            <span className="text-5xl">⚠️</span>
            <div>
              <h3 style={{ fontFamily: fonts.outfit }} className="text-3xl font-extrabold text-[#1B3B2B]">
                1. Elevated Cortisol Level
              </h3>
              <p style={{ fontFamily: fonts.outfit }} className="text-2xl text-gray-600 font-medium">
                High stress locks fat storage into high gear.
              </p>
            </div>
          </div>
          <span className="bg-[#FF6B4A] text-white text-3xl font-black px-5 py-2 rounded-2xl shadow-md">
            +35% FAT LOCK
          </span>
        </div>

        {/* Card 2 */}
        <div
          style={{
            opacity: interpolate(c2Sp, [0, 1], [0, 1]),
            transform: `scale(${interpolate(c2Sp, [0, 1], [0.85, 1.0])}) translateY(${interpolate(c2Sp, [0, 1], [40, 0])}px)`,
          }}
          className="bg-white p-6 rounded-[32px] border-3 border-[#1B3B2B] shadow-xl flex items-center justify-between"
        >
          <div className="flex items-center space-x-4">
            <span className="text-5xl">🌙</span>
            <div>
              <h3 style={{ fontFamily: fonts.outfit }} className="text-3xl font-extrabold text-[#1B3B2B]">
                2. Chronic Sleep Debt
              </h3>
              <p style={{ fontFamily: fonts.outfit }} className="text-2xl text-gray-600 font-medium">
                Suppresses Leptin (Fullness hormone) & triggers late snacking.
              </p>
            </div>
          </div>
          <span className="bg-[#1B3B2B] text-white text-3xl font-black px-5 py-2 rounded-2xl shadow-md">
            -50% LEPTIN
          </span>
        </div>

        {/* Card 3 */}
        <div
          style={{
            opacity: interpolate(c3Sp, [0, 1], [0, 1]),
            transform: `scale(${interpolate(c3Sp, [0, 1], [0.85, 1.0])}) translateY(${interpolate(c3Sp, [0, 1], [40, 0])}px)`,
          }}
          className="bg-white p-6 rounded-[32px] border-3 border-[#FF6B4A] shadow-xl flex items-center justify-between"
        >
          <div className="flex items-center space-x-4">
            <span className="text-5xl">🛑</span>
            <div>
              <h3 style={{ fontFamily: fonts.outfit }} className="text-3xl font-extrabold text-[#1B3B2B]">
                3. Thyroid & Metabolic Adaptation
              </h3>
              <p style={{ fontFamily: fonts.outfit }} className="text-2xl text-gray-600 font-medium">
                Body lowers Basal Metabolic Rate to conserve energy.
              </p>
            </div>
          </div>
          <span className="bg-[#FF6B4A] text-white text-3xl font-black px-5 py-2 rounded-2xl shadow-md">
            BMR SLOWED
          </span>
        </div>
      </div>

      {/* Bottom Kinetic Summary */}
      <div className="w-full text-center pb-6">
        <HypeText
          text="Fix Your Internal Biochemistry First"
          delayFrames={45}
          glowColor="#FF6B4A"
          fontSize={42}
          fontFamily={fonts.outfit}
          highlightWords={["Biochemistry", "First"]}
          highlightColor="#FF6B4A"
          textColor="#1B3B2B"
        />
      </div>
    </AbsoluteFill>
  );
};
