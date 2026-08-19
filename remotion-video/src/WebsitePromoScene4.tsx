import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFonts } from "./Typography";
import { LightRays } from "./LightRays";

export const WebsitePromoScene4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fonts = loadFonts();

  const headerSpring = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 90 },
  });

  const pillars = [
    {
      badge: "NO EXTREMES",
      title: "Zero Starvation",
      desc: "Nourish your body with real foods without cutting out entire food groups.",
      accent: "#E8B4B8",
    },
    {
      badge: "CLINICAL",
      title: "Root-Cause Focused",
      desc: "Address underlying hormonal, gut, and metabolic imbalances at their source.",
      accent: "#94A89A",
    },
    {
      badge: "PRACTICAL",
      title: "Home Food Integration",
      desc: "Enjoy traditional, delicious home-cooked meals tailored to your lifestyle.",
      accent: "#D4A5AB",
    },
    {
      badge: "LASTING",
      title: "Sustainable Habits",
      desc: "Build lifelong nutritional habits that stick long after your program finishes.",
      accent: "#3E5245",
    },
  ];

  return (
    <AbsoluteFill className="bg-[#FAF6F0] overflow-hidden flex flex-col justify-between p-8 select-none relative">
      <LightRays />

      {/* Header */}
      <div
        style={{
          transform: `translateY(${interpolate(headerSpring, [0, 1], [30, 0])}px)`,
          opacity: interpolate(headerSpring, [0, 1], [0, 1]),
        }}
        className="pt-6 text-center z-20"
      >
        <span
          style={{ fontFamily: fonts.inter }}
          className="text-lg font-bold tracking-widest uppercase text-[#E8B4B8] bg-[#E8B4B8]/20 px-4 py-1.5 rounded-full border border-[#E8B4B8]/40 inline-block mb-2 text-[#3A2F2F]"
        >
          Our Core Philosophy
        </span>

        <h2
          style={{ fontFamily: fonts.playfair }}
          className="text-5xl font-bold text-[#2B2B2B]"
        >
          Why Choose Dhruthi Wellness?
        </h2>
      </div>

      {/* Pillars Vertical Stack */}
      <div className="flex-1 flex flex-col justify-center gap-4 my-4 z-20">
        {pillars.map((pillar, index) => {
          const itemSpring = spring({
            frame: frame - (12 + index * 10),
            fps,
            config: { damping: 14, mass: 0.6, stiffness: 90 },
          });

          return (
            <div
              key={pillar.title}
              style={{
                transform: `translateX(${interpolate(itemSpring, [0, 1], [40, 0])}px)`,
                opacity: interpolate(itemSpring, [0, 1], [0, 1]),
                boxShadow: "0 12px 25px rgba(0,0,0,0.03)",
              }}
              className="bg-white/95 backdrop-blur-md p-5 rounded-2xl border-l-8 border-[#3E5245] shadow-sm flex items-center justify-between"
            >
              <div className="flex-1 pr-4">
                <span
                  style={{ fontFamily: fonts.inter, color: pillar.accent }}
                  className="text-xs font-extrabold uppercase tracking-widest mb-1 block"
                >
                  {pillar.badge}
                </span>
                <h3
                  style={{ fontFamily: fonts.poppins }}
                  className="text-2xl font-bold text-[#2B2B2B] mb-1"
                >
                  {pillar.title}
                </h3>
                <p
                  style={{ fontFamily: fonts.inter }}
                  className="text-lg text-[#3A2F2F]/80 leading-tight"
                >
                  {pillar.desc}
                </p>
              </div>

              <div className="w-10 h-10 rounded-full bg-[#94A89A]/15 text-[#3E5245] flex items-center justify-center font-bold text-xl shrink-0">
                ➔
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Quote Banner */}
      <div className="pb-6 text-center z-20">
        <p
          style={{ fontFamily: fonts.caveat }}
          className="text-3xl text-[#3E5245] font-bold bg-white/80 backdrop-blur-md py-3 px-6 rounded-2xl border border-[#94A89A]/30 shadow-sm inline-block"
        >
          "Health is not about restriction — it is about nourishing your potential."
        </p>
      </div>
    </AbsoluteFill>
  );
};
