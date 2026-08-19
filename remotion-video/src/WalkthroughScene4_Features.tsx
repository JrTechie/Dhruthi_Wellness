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

export const WalkthroughScene4_Features: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fonts = loadFonts();

  const cardSpring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 90 },
  });
  const cardX = interpolate(cardSpring, [0, 1], [50, 0]);
  const cardOpacity = interpolate(cardSpring, [0, 1], [0, 1]);

  const imageScroll = interpolate(frame / (8 * fps), [0, 1], [0, -50]);

  return (
    <AbsoluteFill className="select-none">
      <WalkthroughBrowserFrame activeSectionName="testimonials">
        <div className="w-full h-full relative overflow-hidden flex items-center justify-center">
          {/* Website Testimonials / Gallery Screenshot */}
          <img
            src={staticFile("assets/walkthrough/testimonials.png")}
            alt="Testimonials Screenshot"
            style={{ transform: `translateY(${imageScroll}px) scale(1.02)` }}
            className="w-full h-full object-cover object-top"
          />

          {/* Callout Card Overlay */}
          <div
            style={{ transform: `translateX(${cardX}px)`, opacity: cardOpacity }}
            className="absolute top-8 right-8 bg-[#3E5245]/95 backdrop-blur-md text-white p-6 rounded-2xl border border-white/20 shadow-2xl max-w-md z-20"
          >
            <span
              style={{ fontFamily: fonts.inter }}
              className="text-xs font-bold uppercase tracking-widest text-emerald-200 bg-white/10 px-3 py-1 rounded-full inline-block mb-3"
            >
              Verified Client Outcomes
            </span>

            <h3
              style={{ fontFamily: fonts.playfair }}
              className="text-3xl font-bold text-white mb-2"
            >
              Real Transformations
            </h3>

            <p
              style={{ fontFamily: fonts.poppins }}
              className="text-base text-white/90 leading-relaxed mb-4 font-light"
            >
              Hundreds of clients have successfully reversed hormonal symptoms, lost fat sustainably, and rebuilt their relationship with food.
            </p>

            <div className="bg-white/10 p-4 rounded-xl border border-white/20 flex items-center justify-between">
              <div>
                <span className="text-amber-300 text-lg">★★★★★</span>
                <span style={{ fontFamily: fonts.poppins }} className="text-sm font-bold block text-white">95% Client Satisfaction</span>
              </div>
              <span style={{ fontFamily: fonts.inter }} className="text-xs text-emerald-200 font-semibold uppercase">500+ Guided</span>
            </div>
          </div>
        </div>
      </WalkthroughBrowserFrame>
    </AbsoluteFill>
  );
};
