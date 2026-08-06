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

export const HypeScene3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fonts = loadFonts();

  const p1Sp = spring({ frame: frame - 5, fps });
  const p2Sp = spring({ frame: frame - 20, fps });

  return (
    <AbsoluteFill className="bg-[#152220] overflow-hidden select-none flex flex-col justify-between p-8">
      {/* Top Header Ticker */}
      <div className="w-full flex items-center justify-between z-30 pb-4 border-b border-[#00E5FF]/40">
        <span className="bg-[#00E5FF] text-[#152220] font-black text-xl px-4 py-1.5 rounded-full uppercase tracking-widest">
          03 // ROOT-CAUSE DIAGNOSTICS
        </span>
        <span style={{ fontFamily: fonts.outfit }} className="text-white text-2xl font-bold">
          @dhruthi_wellness
        </span>
      </div>

      {/* Main Headline */}
      <div className="w-full text-center py-2 z-20">
        <h1
          style={{ fontFamily: fonts.italiana, color: "#FFFFFF" }}
          className="text-[74px] font-light leading-none"
        >
          Measure The Biological Friction
        </h1>
      </div>

      {/* 3-Panel Dynamic Video Wall Grid */}
      <div className="w-full flex-1 my-2 grid grid-cols-12 gap-4 items-stretch z-20">
        {/* Panel 1: Top Main Dietitian Photo (8 cols) */}
        <div
          style={{
            opacity: interpolate(p1Sp, [0, 1], [0, 1]),
            transform: `scale(${interpolate(p1Sp, [0, 1], [0.9, 1.0])})`,
            borderColor: "#00E5FF",
            boxShadow: "0 0 35px rgba(0, 229, 255, 0.25)",
          }}
          className="col-span-12 h-[340px] rounded-[36px] border-3 overflow-hidden relative"
        >
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url(${staticFile("assets/scene3_weight_loss.png")})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              transform: `scale(${interpolate(frame / (7 * fps), [0, 1], [1.0, 1.1])})`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#152220] via-transparent to-transparent opacity-80" />
          <div className="absolute bottom-4 left-6 bg-black/60 px-4 py-1.5 rounded-full border border-white/20">
            <span style={{ fontFamily: fonts.outfit }} className="text-[#00E5FF] text-xl font-bold uppercase tracking-wider">
              Clinical Assessment
            </span>
          </div>
        </div>

        {/* Panel 2: Stats Box Left (6 cols) */}
        <div
          style={{
            opacity: interpolate(p2Sp, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(p2Sp, [0, 1], [30, 0])}px)`,
          }}
          className="col-span-6 bg-white/10 backdrop-blur-xl p-6 rounded-[32px] border border-white/20 flex flex-col justify-between"
        >
          <span className="text-xl text-[#00E5FF] font-bold uppercase">Biomarker Panel</span>
          <h3 style={{ fontFamily: fonts.outfit }} className="text-4xl text-white font-extrabold my-2">
            Insulin & Thyroid
          </h3>
          <p style={{ fontFamily: fonts.outfit }} className="text-xl text-gray-300">
            Uncovers hidden sluggish metabolism.
          </p>
        </div>

        {/* Panel 3: Stats Box Right (6 cols) */}
        <div
          style={{
            opacity: interpolate(p2Sp, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(p2Sp, [0, 1], [30, 0])}px)`,
          }}
          className="col-span-6 bg-white/10 backdrop-blur-xl p-6 rounded-[32px] border border-white/20 flex flex-col justify-between"
        >
          <span className="text-xl text-[#FF5A36] font-bold uppercase">Gut Microbiome</span>
          <h3 style={{ fontFamily: fonts.outfit }} className="text-4xl text-white font-extrabold my-2">
            Systemic Inflammation
          </h3>
          <p style={{ fontFamily: fonts.outfit }} className="text-xl text-gray-300">
            Blocks nutrient absorption & fat burning.
          </p>
        </div>
      </div>

      {/* Bottom Electric Kinetic Text */}
      <div className="w-full text-center pb-6 z-20">
        <HypeText
          text="Stop Guessing. Measure Your Internal Engine."
          delayFrames={30}
          glowColor="#00E5FF"
          fontSize={42}
          fontFamily={fonts.outfit}
          highlightWords={["Measure", "Internal", "Engine."]}
          highlightColor="#00E5FF"
          textColor="#FFFFFF"
        />
      </div>
    </AbsoluteFill>
  );
};
