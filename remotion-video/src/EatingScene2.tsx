import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BrandHeader } from "./BrandHeader";
import { COLORS_EATING, loadFonts } from "./Typography";

export const EatingScene2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fonts = loadFonts();

  const duration = 9.0 * fps;
  const progress = frame / duration;

  const scale = interpolate(progress, [0, 1], [1.18, 1.0]);
  const panX = interpolate(progress, [0, 1], [30, 0]);
  const panY = interpolate(progress, [0, 1], [-25, 0]);

  const springTitle = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 90 },
  });
  const tTitleY = interpolate(springTitle, [0, 1], [40, 0]);
  const tTitleO = interpolate(springTitle, [0, 1], [0, 1]);

  const springStatement = spring({
    frame: frame - 18,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 90 },
  });
  const tStatementY = interpolate(springStatement, [0, 1], [30, 0]);
  const tStatementO = interpolate(springStatement, [0, 1], [0, 1]);

  const springFact = spring({
    frame: frame - 36,
    fps,
    config: { damping: 12, mass: 0.5, stiffness: 110 },
  });
  const tFactScale = interpolate(springFact, [0, 1], [0.85, 1.0]);
  const tFactO = interpolate(springFact, [0, 1], [0, 1]);

  const springFootnote = spring({
    frame: frame - 54,
    fps,
    config: { damping: 15, mass: 0.6, stiffness: 85 },
  });
  const tFootnoteY = interpolate(springFootnote, [0, 1], [25, 0]);
  const tFootnoteO = interpolate(springFootnote, [0, 1], [0, 1]);

  const brandOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="bg-black overflow-hidden flex flex-col justify-center items-center py-24 px-16">
      {/* Background Image */}
      <Img
        className="absolute inset-0 w-full h-full object-cover object-center"
        style={{
          transform: `scale(${scale}) translate(${panX}px, ${panY}px)`,
        }}
        src={staticFile("assets/eating_scene2_cravings.png")}
      />

      {/* Darkened overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Highlighted Brand Header Badge */}
      <BrandHeader opacity={brandOpacity} />

      {/* Floating Content Layout */}
      <AbsoluteFill className="flex flex-col justify-center items-start px-20 text-left select-none z-10 pt-16">
        
        {/* Title */}
        <div
          style={{
            transform: `translateY(${tTitleY}px)`,
            opacity: tTitleO,
            fontFamily: fonts.cormorant,
          }}
          className="mb-8"
        >
          <h2
            style={{ color: COLORS_EATING.linen }}
            className="text-[100px] font-semibold leading-none tracking-tight"
          >
            Hunger & Dopamine
          </h2>
        </div>

        {/* Description Statement in Glass Badge */}
        <div
          style={{
            transform: `translateY(${tStatementY}px)`,
            opacity: tStatementO,
            fontFamily: fonts.body,
            backgroundColor: "rgba(24, 20, 16, 0.50)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1.5px solid rgba(250, 246, 240, 0.12)"
          }}
          className="p-8 rounded-3xl max-w-[840px] mb-8"
        >
          <p
            style={{ color: COLORS_EATING.linenMuted }}
            className="text-[38px] font-light leading-relaxed"
          >
            When stress or fatigue strikes, dopamine levels drop. Your brain triggers fast-carb cravings to raise mood hormones...
          </p>
        </div>

        {/* Scientific Fact */}
        <div
          style={{
            transform: `scale(${tFactScale})`,
            opacity: tFactO,
            fontFamily: fonts.body,
            backgroundColor: COLORS_EATING.amber,
          }}
          className="rounded-3xl py-5 px-10 mb-8 shadow-lg border border-white/5"
        >
          <p
            style={{ color: COLORS_EATING.linen }}
            className="text-[44px] font-bold tracking-tight leading-none uppercase"
          >
            Leading to rapid blood sugar crashes.
          </p>
        </div>

        {/* Footnote */}
        <div
          style={{
            transform: `translateY(${tFootnoteY}px)`,
            opacity: tFootnoteO,
            fontFamily: fonts.accentHandwritten,
          }}
          className="pl-4"
        >
          <p
            style={{ color: COLORS_EATING.sage }}
            className="text-[60px] tracking-wide"
          >
            It is chemistry, not guilt.
          </p>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
