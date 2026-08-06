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

export const HypeScene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fonts = loadFonts();

  // 3D Perspective Card Tilt
  const cardSp = spring({ frame, fps, config: { damping: 12, mass: 0.5, stiffness: 90 } });
  const rotX = interpolate(cardSp, [0, 1], [15, 0]);
  const rotY = interpolate(cardSp, [0, 1], [-12, 0]);
  const cardScale = interpolate(cardSp, [0, 1], [0.8, 1.0]);

  // Pulse ring wave
  const pulse = 1 + 0.04 * Math.sin((2 * Math.PI * frame) / 25);

  return (
    <AbsoluteFill className="bg-[#101413] overflow-hidden select-none flex flex-col justify-between p-8">
      {/* Top Cyber Ticker Header */}
      <div className="w-full flex items-center justify-between z-30 pb-4 border-b border-[#00FF9D]/30">
        <div className="flex items-center space-x-3">
          <span className="bg-[#00FF9D] text-[#101413] font-black text-xl px-4 py-1.5 rounded-md uppercase tracking-widest">
            REEL 01
          </span>
          <span style={{ fontFamily: fonts.outfit }} className="text-[#00FF9D] text-xl font-bold tracking-widest">
            // METABOLIC TRUTH
          </span>
        </div>
        <span style={{ fontFamily: fonts.outfit }} className="text-white text-2xl font-black">
          @dhruthi_wellness
        </span>
      </div>

      {/* Center 3D Tilted Photo Frame with Cyber Brackets */}
      <div className="w-full flex-1 my-4 flex items-center justify-center relative perspective-[1000px]">
        <div
          style={{
            transform: `scale(${cardScale}) rotateX(${rotX}deg) rotateY(${rotY}deg)`,
            boxShadow: `0 0 50px rgba(0, 255, 157, 0.25), 0 20px 40px rgba(0, 0, 0, 0.8)`,
            borderColor: "#00FF9D",
          }}
          className="w-full h-full max-h-[880px] rounded-[36px] border-3 overflow-hidden relative"
        >
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url(${staticFile("assets/scene1_weight_loss.png")})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              transform: `scale(${interpolate(frame / (6 * fps), [0, 1], [1.0, 1.15])})`,
            }}
          />
          {/* Cyber Vignette & Neon Rim */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#101413] via-transparent to-transparent opacity-90" />

          {/* Floating Cyber Badge */}
          <div
            style={{ transform: `scale(${pulse})` }}
            className="absolute top-6 left-6 bg-[#FF5A36] text-white px-5 py-2 rounded-xl text-xl font-black uppercase tracking-widest shadow-lg"
          >
            ⚠️ WEIGHT LOSS PLATEAU DETECTED
          </div>
        </div>
      </div>

      {/* Bottom Kinetic Speed-Ramped Typography */}
      <div className="w-full text-center pb-8 pt-2 z-30">
        <HypeText
          text="Eating Clean? Working Out Daily? Why Is The Scale Scale Frozen?"
          delayFrames={10}
          glowColor="#00FF9D"
          fontSize={48}
          fontFamily={fonts.outfit}
          highlightWords={["Clean?", "Daily?", "Scale", "Frozen?"]}
          highlightColor="#FF5A36"
          textColor="#FFFFFF"
          staggerStep={3}
        />
      </div>
    </AbsoluteFill>
  );
};
