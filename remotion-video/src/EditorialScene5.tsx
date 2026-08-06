import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { EditorialHeader } from "./EditorialHeader";
import { MarkerHighlight } from "./MarkerHighlight";
import { EDITORIAL_COLORS, loadFonts } from "./Typography";

export const EditorialScene5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fonts = loadFonts();

  const heroSp = spring({ frame: frame - 5, fps });
  const ctaSp = spring({ frame: frame - 25, fps });

  const pulse = 1 + 0.03 * Math.sin((2 * Math.PI * frame) / 40);

  return (
    <AbsoluteFill
      style={{ backgroundColor: EDITORIAL_COLORS.pearlWhite }}
      className="overflow-hidden flex flex-col justify-between select-none"
    >
      <EditorialHeader category="EVIDENCE-BASED CARE" issueNo="FINAL" />

      {/* Top 48%: Hero Portrait Frame */}
      <div className="w-full flex-1 px-8 pt-2 pb-2">
        <div
          style={{
            transform: `scale(${interpolate(heroSp, [0, 1], [0.9, 1.0])})`,
            borderColor: EDITORIAL_COLORS.emerald,
            boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
          }}
          className="w-full h-full rounded-[44px] border-4 overflow-hidden relative"
        >
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url(${staticFile("assets/scene5_weight_loss.png")})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </div>
      </div>

      {/* Bottom 52%: Editorial Brand Outro Canvas */}
      <div className="w-full px-10 pb-16 pt-4 flex flex-col items-center text-center">
        <h1
          style={{ fontFamily: fonts.italiana, color: EDITORIAL_COLORS.obsidian }}
          className="text-[76px] font-light leading-tight mb-2"
        >
          Stop Guessing. <br />
          <MarkerHighlight color={EDITORIAL_COLORS.coralLight} delayFrames={15}>
            Start Healing.
          </MarkerHighlight>
        </h1>

        <h2
          style={{ fontFamily: fonts.outfit, color: EDITORIAL_COLORS.emerald }}
          className="text-[54px] font-black uppercase tracking-wider mb-2 mt-4"
        >
          DHRUTHI WELLNESS
        </h2>

        <p
          style={{ fontFamily: fonts.outfit, color: "#666" }}
          className="text-[30px] font-medium tracking-wide mb-8"
        >
          Evidence-Based Functional Nutrition & Metabolic Health
        </p>

        {/* Pulsing CTA Button */}
        <div
          style={{
            opacity: interpolate(ctaSp, [0, 1], [0, 1]),
            transform: `scale(${pulse * interpolate(ctaSp, [0, 1], [0.85, 1.0])})`,
            backgroundColor: EDITORIAL_COLORS.emerald,
            boxShadow: "0 10px 30px rgba(45, 79, 62, 0.35)",
          }}
          className="w-full max-w-[760px] py-6 rounded-full border-2 border-white/40 flex items-center justify-center space-x-3 cursor-pointer"
        >
          <span
            style={{ fontFamily: fonts.outfit }}
            className="text-white text-[36px] font-bold uppercase tracking-wider"
          >
            Book Metabolism Assessment
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
