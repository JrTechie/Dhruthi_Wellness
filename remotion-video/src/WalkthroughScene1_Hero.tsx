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

export const WalkthroughScene1_Hero: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fonts = loadFonts();

  // Entrance springs
  const bannerSpring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 90 },
  });
  const bannerY = interpolate(bannerSpring, [0, 1], [30, 0]);
  const bannerOpacity = interpolate(bannerSpring, [0, 1], [0, 1]);

  // Subtle slow zoom on website screenshot
  const imageScale = interpolate(frame / (8 * fps), [0, 1], [1.0, 1.05]);

  return (
    <AbsoluteFill className="select-none">
      <WalkthroughBrowserFrame activeSectionName="hero">
        <div className="w-full h-full relative overflow-hidden flex items-center justify-center">
          {/* Website Hero Screenshot */}
          <img
            src={staticFile("assets/walkthrough/hero.png")}
            alt="Hero Section Screenshot"
            style={{ transform: `scale(${imageScale})` }}
            className="w-full h-full object-cover object-top"
          />

          {/* Feature Callout Floating Overlay */}
          <div
            style={{ transform: `translateY(${bannerY}px)`, opacity: bannerOpacity }}
            className="absolute bottom-6 left-8 bg-[#3E5245]/90 backdrop-blur-md text-white p-6 rounded-2xl border border-white/20 shadow-2xl max-w-xl z-20"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span
                style={{ fontFamily: fonts.inter }}
                className="text-xs font-bold uppercase tracking-widest text-emerald-200"
              >
                Website Feature • Hero Section
              </span>
            </div>

            <h2
              style={{ fontFamily: fonts.playfair }}
              className="text-3xl font-bold mb-2 leading-snug"
            >
              Achieve Lasting Health With Dhruthi Wellness
            </h2>

            <p
              style={{ fontFamily: fonts.poppins }}
              className="text-lg text-white/90 leading-relaxed font-light"
            >
              Interactive digital portal offering 1-on-1 consultations, customized meal plans, and continuous metabolic diet support by Dt. Akhila Konakalla, M.Sc.
            </p>
          </div>
        </div>
      </WalkthroughBrowserFrame>
    </AbsoluteFill>
  );
};
