import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { WalkthroughBrowserFrame } from "./WalkthroughBrowserFrame";
import { loadFonts } from "./Typography";

export const WalkthroughScene2_About: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fonts = loadFonts();

  const cardSpring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 90 },
  });
  const cardX = interpolate(cardSpring, [0, 1], [-40, 0]);
  const cardOpacity = interpolate(cardSpring, [0, 1], [0, 1]);

  const imagePan = interpolate(frame / (8 * fps), [0, 1], [0, -40]);

  return (
    <AbsoluteFill className="select-none">
      <WalkthroughBrowserFrame activeSectionName="about">
        <div className="w-full h-full relative overflow-hidden flex items-center justify-center">
          {/* Website About Screenshot */}
          <img
            src={staticFile("assets/walkthrough/about.png")}
            alt="About Section Screenshot"
            style={{ transform: `translateY(${imagePan}px) scale(1.02)` }}
            className="w-full h-full object-cover object-top"
          />

          {/* Callout Card Overlay */}
          <div
            style={{ transform: `translateX(${cardX}px)`, opacity: cardOpacity }}
            className="absolute top-8 left-8 bg-[#FAF6F0]/95 backdrop-blur-md text-[#2B2B2B] p-6 rounded-2xl border-2 border-[#94A89A] shadow-2xl max-w-lg z-20"
          >
            <span
              style={{ fontFamily: fonts.inter }}
              className="text-xs font-bold uppercase tracking-widest text-[#3E5245] bg-[#3E5245]/15 px-3 py-1 rounded-full inline-block mb-3"
            >
              Expert Leadership
            </span>

            <h3
              style={{ fontFamily: fonts.playfair }}
              className="text-3xl font-bold text-[#2B2B2B] mb-2"
            >
              Dt. Akhila Konakalla, M.Sc.
            </h3>

            <p
              style={{ fontFamily: fonts.poppins }}
              className="text-base text-[#3A2F2F]/85 leading-relaxed mb-4"
            >
              Clinical & Fertility Nutritionist with a master's degree in Food, Nutrition & Dietetics. Specializing in bio-individualized diet therapy without crash restrictions.
            </p>

            <div className="flex items-center gap-3 pt-2 border-t border-[#94A89A]/30">
              <span className="text-2xl">🌱</span>
              <span style={{ fontFamily: fonts.inter }} className="text-sm font-semibold text-[#3E5245]">
                Sustainable Lifestyle & Metabolic Reversals
              </span>
            </div>
          </div>
        </div>
      </WalkthroughBrowserFrame>
    </AbsoluteFill>
  );
};
