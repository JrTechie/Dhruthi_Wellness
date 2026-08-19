import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFonts } from "./Typography";
import { BotanicalLeaves } from "./BotanicalLeaves";

export const WebsitePromoScene2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fonts = loadFonts();

  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 90 },
  });

  const programs = [
    {
      title: "PCOS / PCOD Reversal",
      desc: "Regulate hormonal spikes, target insulin resistance & restore natural cycles.",
      tag: "Hormonal Balance",
      color: "#94A89A",
      bg: "rgba(148, 168, 154, 0.12)",
      borderColor: "rgba(148, 168, 154, 0.4)",
    },
    {
      title: "Fertility & Preconception",
      desc: "Optimize egg/sperm quality & prep maternal metabolism for healthy pregnancy.",
      tag: "Reproductive Health",
      color: "#E8B4B8",
      bg: "rgba(232, 180, 184, 0.15)",
      borderColor: "rgba(232, 180, 184, 0.5)",
    },
    {
      title: "Sustainable Weight Loss",
      desc: "Lose fat while retaining muscle mass with zero starvation or extreme restrictions.",
      tag: "Metabolic Reset",
      color: "#3E5245",
      bg: "rgba(62, 82, 69, 0.12)",
      borderColor: "rgba(62, 82, 69, 0.4)",
    },
    {
      title: "Diabetes & Thyroid Management",
      desc: "Evidence-based meal timing & low-glycemic nourishment for optimal metabolic control.",
      tag: "Clinical Care",
      color: "#D4A5AB",
      bg: "rgba(212, 165, 171, 0.15)",
      borderColor: "rgba(212, 165, 171, 0.5)",
    },
  ];

  return (
    <AbsoluteFill className="bg-[#FAF6F0] overflow-hidden flex flex-col justify-between p-8 select-none relative">
      <BotanicalLeaves />

      {/* Title Header */}
      <div
        style={{
          transform: `translateY(${interpolate(titleSpring, [0, 1], [30, 0])}px)`,
          opacity: interpolate(titleSpring, [0, 1], [0, 1]),
        }}
        className="pt-6 text-center z-20"
      >
        <span
          style={{ fontFamily: fonts.inter }}
          className="text-lg font-bold tracking-widest uppercase text-[#94A89A] bg-[#94A89A]/15 px-4 py-1.5 rounded-full border border-[#94A89A]/30 inline-block mb-2"
        >
          Tailored Clinical Programs
        </span>

        <h2
          style={{ fontFamily: fonts.playfair }}
          className="text-5xl font-bold text-[#2B2B2B]"
        >
          Specialized Health Solutions
        </h2>
      </div>

      {/* Program Cards Grid */}
      <div className="flex-1 flex flex-col justify-center gap-5 my-4 z-20">
        {programs.map((prog, index) => {
          const cardSpring = spring({
            frame: frame - (15 + index * 10),
            fps,
            config: { damping: 14, mass: 0.6, stiffness: 90 },
          });

          return (
            <div
              key={prog.title}
              style={{
                transform: `translateX(${interpolate(cardSpring, [0, 1], [-50, 0])}px)`,
                opacity: interpolate(cardSpring, [0, 1], [0, 1]),
                backgroundColor: prog.bg,
                borderColor: prog.borderColor,
                boxShadow: "0 10px 25px rgba(0,0,0,0.03)",
              }}
              className="p-5 rounded-2xl border-2 backdrop-blur-md flex items-center justify-between gap-4"
            >
              <div className="flex-1">
                <span
                  style={{ fontFamily: fonts.inter, color: prog.color }}
                  className="text-xs font-bold uppercase tracking-wider mb-1 block"
                >
                  {prog.tag}
                </span>
                <h3
                  style={{ fontFamily: fonts.poppins }}
                  className="text-2xl font-bold text-[#2B2B2B] mb-1"
                >
                  {prog.title}
                </h3>
                <p
                  style={{ fontFamily: fonts.inter }}
                  className="text-lg text-[#3A2F2F]/80 leading-snug"
                >
                  {prog.desc}
                </p>
              </div>

              <div
                style={{ backgroundColor: prog.color }}
                className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-md shrink-0"
              >
                ✓
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Callout */}
      <div className="pb-6 text-center z-20">
        <p
          style={{ fontFamily: fonts.poppins }}
          className="text-xl text-[#3E5245] font-semibold bg-white/80 backdrop-blur-md py-3 px-6 rounded-full border border-[#94A89A]/30 shadow-sm inline-block"
        >
          🌿 Every Plan is 100% Bio-Individualized to Your Body
        </p>
      </div>
    </AbsoluteFill>
  );
};
