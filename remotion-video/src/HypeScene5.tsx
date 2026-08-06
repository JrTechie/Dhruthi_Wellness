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

export const HypeScene5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fonts = loadFonts();

  const pulse = 1 + 0.04 * Math.sin((2 * Math.PI * frame) / 30);
  const ctaSp = spring({ frame: frame - 20, fps });

  return (
    <AbsoluteFill className="bg-[#0B1E17] overflow-hidden select-none flex flex-col justify-between p-8">
      {/* Top Header */}
      <div className="w-full flex items-center justify-between z-30 pb-4 border-b border-[#00FF9D]/30">
        <span className="bg-[#00FF9D] text-[#0B1E17] font-black text-xl px-4 py-1.5 rounded-full uppercase tracking-widest">
          FINAL // REEL SUMMARY
        </span>
        <span style={{ fontFamily: fonts.outfit }} className="text-[#00FF9D] text-2xl font-bold">
          @dhruthi_wellness
        </span>
      </div>

      {/* Center 3D Photo Container */}
      <div className="w-full h-[40%] px-4 my-2 relative">
        <div
          style={{
            borderColor: "#00FF9D",
            boxShadow: "0 0 60px rgba(0, 255, 157, 0.3)",
          }}
          className="w-full h-full rounded-[44px] border-4 overflow-hidden relative"
        >
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url(${staticFile("assets/scene5_weight_loss.png")})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              transform: `scale(${interpolate(frame / (6 * fps), [0, 1], [1.0, 1.1])})`,
            }}
          />
        </div>
      </div>

      {/* Bottom Outro Canvas */}
      <div className="w-full text-center pb-8 pt-2 z-30">
        <HypeText
          text="Stop Guessing. Start Healing."
          delayFrames={10}
          glowColor="#00FF9D"
          fontSize={60}
          fontFamily={fonts.italiana}
          highlightWords={["Start", "Healing."]}
          highlightColor="#00FF9D"
          textColor="#FFFFFF"
        />

        <h1
          style={{ fontFamily: fonts.outfit, color: "#FFD700" }}
          className="text-[64px] font-black uppercase tracking-widest my-3 text-shadow-lg"
        >
          DHRUTHI WELLNESS
        </h1>

        <p style={{ fontFamily: fonts.outfit }} className="text-3xl text-gray-300 font-medium mb-8">
          Evidence-Based Functional Nutrition & Metabolism
        </p>

        {/* Pulsing Neon CTA Ring Button */}
        <div
          style={{
            opacity: interpolate(ctaSp, [0, 1], [0, 1]),
            transform: `scale(${pulse * interpolate(ctaSp, [0, 1], [0.85, 1.0])})`,
            backgroundColor: "#00FF9D",
            boxShadow: "0 0 45px rgba(0, 255, 157, 0.6)",
          }}
          className="w-full py-6 rounded-full flex items-center justify-center space-x-3 cursor-pointer"
        >
          <span
            style={{ fontFamily: fonts.outfit }}
            className="text-[#0B1E17] text-4xl font-black uppercase tracking-widest"
          >
            BOOK METABOLISM ASSESSMENT 🚀
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
