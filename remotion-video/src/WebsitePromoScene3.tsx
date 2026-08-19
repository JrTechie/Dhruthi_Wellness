import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFonts } from "./Typography";
import { BokehParticles } from "./BokehParticles";

export const WebsitePromoScene3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fonts = loadFonts();

  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 90 },
  });

  const features = [
    {
      icon: "📹",
      title: "1-on-1 Video Consultations",
      desc: "Deep-dive clinical health assessment and root-cause analysis with Dt. Akhila.",
    },
    {
      icon: "🥗",
      title: "Daily Meal & Water Tracking",
      desc: "Stay accountable with regular meal logs, potion guidance, and micro-nutrient feedback.",
    },
    {
      icon: "📊",
      title: "Weekly Progress Audits",
      desc: "Continuous adjustments to prevent weight loss plateaus and ensure steady progress.",
    },
    {
      icon: "💬",
      title: "Direct WhatsApp Support",
      desc: "Continuous direct communication for meal queries, dining out advice & habit building.",
    },
  ];

  return (
    <AbsoluteFill className="bg-[#FAF6F0] overflow-hidden flex flex-col justify-between p-8 select-none relative">
      <BokehParticles />

      {/* Header */}
      <div
        style={{
          transform: `translateY(${interpolate(titleSpring, [0, 1], [30, 0])}px)`,
          opacity: interpolate(titleSpring, [0, 1], [0, 1]),
        }}
        className="pt-6 text-center z-20"
      >
        <span
          style={{ fontFamily: fonts.inter }}
          className="text-lg font-bold tracking-widest uppercase text-[#3E5245] bg-[#3E5245]/10 px-4 py-1.5 rounded-full border border-[#3E5245]/20 inline-block mb-2"
        >
          Seamless Online Care
        </span>

        <h2
          style={{ fontFamily: fonts.playfair }}
          className="text-5xl font-bold text-[#2B2B2B]"
        >
          The Dhruthi Experience
        </h2>
      </div>

      {/* 2x2 Feature Grid */}
      <div className="flex-1 grid grid-cols-2 gap-5 my-4 z-20">
        {features.map((feat, index) => {
          const itemSpring = spring({
            frame: frame - (15 + index * 8),
            fps,
            config: { damping: 14, mass: 0.6, stiffness: 90 },
          });

          return (
            <div
              key={feat.title}
              style={{
                transform: `scale(${interpolate(itemSpring, [0, 1], [0.85, 1])})`,
                opacity: interpolate(itemSpring, [0, 1], [0, 1]),
                boxShadow: "0 15px 30px rgba(0,0,0,0.04)",
              }}
              className="bg-white/90 backdrop-blur-md p-6 rounded-3xl border border-[#94A89A]/30 flex flex-col justify-between"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#94A89A]/20 flex items-center justify-center text-4xl mb-4 border border-[#94A89A]/30">
                {feat.icon}
              </div>

              <div>
                <h3
                  style={{ fontFamily: fonts.poppins }}
                  className="text-2xl font-bold text-[#2B2B2B] mb-2 leading-tight"
                >
                  {feat.title}
                </h3>
                <p
                  style={{ fontFamily: fonts.inter }}
                  className="text-base text-[#3A2F2F]/75 leading-relaxed"
                >
                  {feat.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Interactive Phone / Portal Tag */}
      <div className="pb-6 text-center z-20">
        <div className="bg-[#3E5245] text-white py-3 px-8 rounded-full shadow-lg inline-flex items-center gap-3 text-xl font-medium">
          <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Access Your Personalized Care Anywhere, Anytime</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
