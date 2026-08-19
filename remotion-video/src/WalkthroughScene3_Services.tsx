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

export const WalkthroughScene3_Services: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fonts = loadFonts();

  const cardSpring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 90 },
  });
  const cardY = interpolate(cardSpring, [0, 1], [40, 0]);
  const cardOpacity = interpolate(cardSpring, [0, 1], [0, 1]);

  const imageScroll = interpolate(frame / (8 * fps), [0, 1], [0, -60]);

  return (
    <AbsoluteFill className="select-none">
      <WalkthroughBrowserFrame activeSectionName="services">
        <div className="w-full h-full relative overflow-hidden flex items-center justify-center">
          {/* Website Services Screenshot */}
          <img
            src={staticFile("assets/walkthrough/services.png")}
            alt="Services Section Screenshot"
            style={{ transform: `translateY(${imageScroll}px) scale(1.02)` }}
            className="w-full h-full object-cover object-top"
          />

          {/* Feature Highlight Cards Overlay */}
          <div
            style={{ transform: `translateY(${cardY}px)`, opacity: cardOpacity }}
            className="absolute bottom-8 right-8 bg-white/95 backdrop-blur-md p-6 rounded-2xl border-2 border-[#3E5245] shadow-2xl max-w-lg z-20"
          >
            <span
              style={{ fontFamily: fonts.inter }}
              className="text-xs font-bold uppercase tracking-widest text-[#E8B4B8] bg-[#3E5245] px-3 py-1 rounded-full inline-block mb-3"
            >
              Tailored Programs
            </span>

            <h3
              style={{ fontFamily: fonts.playfair }}
              className="text-3xl font-bold text-[#2B2B2B] mb-3"
            >
              Clinical Diet Protocols
            </h3>

            <div className="grid grid-cols-2 gap-3 mb-2">
              <div className="bg-[#FAF6F0] p-3 rounded-xl border border-[#94A89A]/30">
                <span className="text-lg block mb-1">🌸</span>
                <span style={{ fontFamily: fonts.poppins }} className="text-sm font-bold text-[#2B2B2B] block">PCOD / PCOS Reversal</span>
                <span style={{ fontFamily: fonts.inter }} className="text-xs text-[#3A2F2F]/70">Hormonal & Ovulation Reset</span>
              </div>

              <div className="bg-[#FAF6F0] p-3 rounded-xl border border-[#94A89A]/30">
                <span className="text-lg block mb-1">👶</span>
                <span style={{ fontFamily: fonts.poppins }} className="text-sm font-bold text-[#2B2B2B] block">Fertility Diet Care</span>
                <span style={{ fontFamily: fonts.inter }} className="text-xs text-[#3A2F2F]/70">Preconception Nourishment</span>
              </div>

              <div className="bg-[#FAF6F0] p-3 rounded-xl border border-[#94A89A]/30">
                <span className="text-lg block mb-1">⚖️</span>
                <span style={{ fontFamily: fonts.poppins }} className="text-sm font-bold text-[#2B2B2B] block">Sustainable Weight Loss</span>
                <span style={{ fontFamily: fonts.inter }} className="text-xs text-[#3A2F2F]/70">Zero Starvation Method</span>
              </div>

              <div className="bg-[#FAF6F0] p-3 rounded-xl border border-[#94A89A]/30">
                <span className="text-lg block mb-1">🩸</span>
                <span style={{ fontFamily: fonts.poppins }} className="text-sm font-bold text-[#2B2B2B] block">Diabetes & Thyroid</span>
                <span style={{ fontFamily: fonts.inter }} className="text-xs text-[#3A2F2F]/70">Glycemic Balance</span>
              </div>
            </div>
          </div>
        </div>
      </WalkthroughBrowserFrame>
    </AbsoluteFill>
  );
};
