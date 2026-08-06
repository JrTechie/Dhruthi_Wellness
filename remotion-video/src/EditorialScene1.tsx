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

export const EditorialScene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fonts = loadFonts();

  // Floating PiP photo spring zoom
  const pipSpring = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 90 },
  });
  const pipScale = interpolate(pipSpring, [0, 1], [0.85, 1.0]);

  // Headline entrance spring
  const textSpring = spring({
    frame: frame - 12,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 90 },
  });
  const textY = interpolate(textSpring, [0, 1], [40, 0]);
  const textOpacity = interpolate(textSpring, [0, 1], [0, 1]);

  return (
    <AbsoluteFill
      style={{ backgroundColor: EDITORIAL_COLORS.pearlWhite }}
      className="overflow-hidden flex flex-col justify-between select-none"
    >
      {/* Top Editorial Ticker Bar */}
      <EditorialHeader category="SPECIAL REPORT" issueNo="VOL 01" />

      {/* Top 55%: Floating Picture-in-Picture Container with Rounded Pill Borders */}
      <div className="w-full flex-1 px-8 pt-4 pb-2 flex items-center justify-center">
        <div
          style={{
            transform: `scale(${pipScale})`,
            borderColor: EDITORIAL_COLORS.emerald,
            boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
          }}
          className="w-full h-full rounded-[44px] border-4 overflow-hidden relative"
        >
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url(${staticFile("assets/scene1_weight_loss.png")})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              transform: `scale(${interpolate(frame / (6 * fps), [0, 1], [1.0, 1.12])})`,
            }}
          />
          {/* Subtle Tag Overlay on Frame */}
          <div className="absolute bottom-6 left-6 bg-black/60 backdrop-blur-md px-5 py-2 rounded-full border border-white/30">
            <span
              style={{ fontFamily: fonts.outfit }}
              className="text-white text-xl font-bold uppercase tracking-widest"
            >
              The Weight Loss Plateau
            </span>
          </div>
        </div>
      </div>

      {/* Bottom 45%: High-Contrast Editorial Canvas */}
      <div className="w-full px-10 pb-16 pt-4 flex flex-col items-center text-center">
        <div style={{ transform: `translateY(${textY}px)`, opacity: textOpacity }}>
          <h2
            style={{ fontFamily: fonts.outfit, color: EDITORIAL_COLORS.coral }}
            className="text-[36px] font-extrabold uppercase tracking-widest mb-2"
          >
            Doing Everything Right?
          </h2>

          <h1
            style={{ fontFamily: fonts.italiana, color: EDITORIAL_COLORS.obsidian }}
            className="text-[80px] leading-tight font-light mb-6"
          >
            Why Is The Scale <br />
            <MarkerHighlight color={EDITORIAL_COLORS.coralLight} delayFrames={20}>
              Still Stuck?
            </MarkerHighlight>
          </h1>

          <p
            style={{ fontFamily: fonts.outfit, color: "#555" }}
            className="text-[34px] font-normal leading-snug max-w-[840px]"
          >
            Late-night cravings and zero weight loss aren't a lack of discipline.
            It's your biological survival mode.
          </p>
        </div>
      </div>
    </AbsoluteFill>
  );
};
