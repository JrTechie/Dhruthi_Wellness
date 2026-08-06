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
import { RadialGauge } from "./RadialGauge";
import { EDITORIAL_COLORS, loadFonts } from "./Typography";

export const EditorialScene3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fonts = loadFonts();

  const titleSp = spring({ frame: frame - 5, fps });

  return (
    <AbsoluteFill
      style={{ backgroundColor: EDITORIAL_COLORS.pearlWhite }}
      className="overflow-hidden flex flex-col justify-between select-none"
    >
      <EditorialHeader category="CLINICAL DIAGNOSTICS" issueNo="VOL 03" />

      {/* Top Section: Photo Frame */}
      <div className="w-full h-[38%] px-8 pt-2">
        <div
          style={{
            borderColor: EDITORIAL_COLORS.emerald,
            boxShadow: "0 15px 35px rgba(0,0,0,0.1)",
          }}
          className="w-full h-full rounded-[36px] border-4 overflow-hidden relative"
        >
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url(${staticFile("assets/scene3_weight_loss.png")})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              transform: `scale(${interpolate(frame / (7 * fps), [0, 1], [1.0, 1.1])})`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-6">
            <span
              style={{ fontFamily: fonts.outfit }}
              className="text-white text-2xl font-bold uppercase tracking-wider"
            >
              Root-Cause Biomarker Panel
            </span>
          </div>
        </div>
      </div>

      {/* Middle Headline */}
      <div
        style={{
          opacity: interpolate(titleSp, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(titleSp, [0, 1], [25, 0])}px)`,
        }}
        className="w-full px-10 text-center py-2"
      >
        <h2
          style={{ fontFamily: fonts.italiana, color: EDITORIAL_COLORS.obsidian }}
          className="text-[64px] font-light leading-tight"
        >
          Measure The Biological Friction
        </h2>
      </div>

      {/* Bottom 45%: Live Interactive Radial Gauges Grid */}
      <div className="w-full px-8 pb-12 grid grid-cols-3 gap-4">
        <RadialGauge
          value={35}
          label="Cortisol Spike"
          sublabel="Fat Storage Up"
          color={EDITORIAL_COLORS.coral}
          delayFrames={10}
        />
        <RadialGauge
          value={45}
          label="Leptin Drop"
          sublabel="Appetite Surge"
          color={EDITORIAL_COLORS.goldAccent}
          delayFrames={25}
        />
        <RadialGauge
          value={25}
          label="BMR Slowdown"
          sublabel="Energy Preserved"
          color={EDITORIAL_COLORS.mint}
          delayFrames={40}
        />
      </div>
    </AbsoluteFill>
  );
};
