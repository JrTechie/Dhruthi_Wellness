import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  Img,
} from "remotion";
import { CameraTransition } from "./CameraTransition";
import { loadFonts } from "./Typography";

export const MetabolismScene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fonts = loadFonts();

  // Glass card entrance spring
  const cardSpring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 90 },
  });
  const cardY = interpolate(cardSpring, [0, 1], [60, 0]);
  const cardOpacity = interpolate(cardSpring, [0, 1], [0, 1]);

  // Brand handle top overlay
  const brandOpacity = interpolate(frame, [0, 15], [0, 0.85], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="bg-[#FAF8F5] overflow-hidden select-none">
      <CameraTransition type="zoomIn" durationInFrames={165}>
        {/* Background Image */}
        <Img
          src={staticFile("assets/metabolism_scene1_scale.png")}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      </CameraTransition>

      {/* Top Brand Tag Pill */}
      <div
        className="absolute top-20 left-0 right-0 flex items-center justify-center z-30"
        style={{ opacity: brandOpacity }}
      >
        <div
          style={{
            fontFamily: fonts.outfit,
            backgroundColor: "rgba(250, 248, 245, 0.30)", // 30% transparency
            borderColor: "rgba(45, 79, 62, 0.20)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            boxShadow: "0 8px 32px rgba(28, 40, 38, 0.05)",
          }}
          className="flex items-center space-x-3 px-6 py-2 rounded-full border shadow-lg"
        >
          <div className="w-2 h-2 rounded-full bg-[#C0502E]" />
          <span className="text-[#1C2826] text-[18px] tracking-widest font-black uppercase">
            Dhruthi Wellness
          </span>
          <div className="w-2 h-2 rounded-full bg-[#C0502E]" />
        </div>
      </div>

      {/* Main Glassmorphic Container (30% opacity frosted glass) */}
      <AbsoluteFill className="flex flex-col justify-center items-center px-12 z-20">
        <div
          style={{
            transform: `translateY(${cardY}px)`,
            opacity: cardOpacity,
            backgroundColor: "rgba(250, 248, 245, 0.30)", // Exactly 30% transparency
            borderColor: "rgba(45, 79, 62, 0.20)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            boxShadow: "0 20px 40px rgba(28, 40, 38, 0.08)",
          }}
          className="w-full max-w-[920px] rounded-[36px] border p-12 flex flex-col items-center text-center"
        >
          {/* Vol Badge */}
          <div className="mb-6 bg-white/40 px-5 py-1.5 rounded-full border border-[#1C2826]/10">
            <span
              style={{
                fontFamily: fonts.outfit,
                color: "#2D4F3E",
              }}
              className="text-[20px] font-extrabold tracking-wider uppercase"
            >
              Metabolic Truth • Vol 01
            </span>
          </div>

          {/* Question / Hook Title */}
          <div className="mb-6">
            <h1
              style={{
                fontFamily: fonts.outfit,
                color: "#1C2826",
              }}
              className="text-[58px] leading-tight font-extrabold tracking-tight mb-4"
            >
              Still blaming your <span style={{ color: "#C0502E" }}>metabolism?</span>
            </h1>
          </div>

          {/* Divider Line */}
          <div
            className="w-48 h-[4px] rounded-full mb-6"
            style={{ backgroundColor: "#2D4F3E" }}
          />

          {/* Subtitle */}
          <p
            style={{
              fontFamily: fonts.body,
              color: "#4A5D54",
            }}
            className="text-[34px] leading-normal font-bold max-w-[800px]"
          >
            The truth may surprise you...
          </p>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
