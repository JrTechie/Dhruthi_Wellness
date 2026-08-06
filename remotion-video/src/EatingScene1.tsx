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

export const EatingScene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fonts = loadFonts();

  const duration = 9.0 * fps;
  const progress = frame / duration;

  const scale = interpolate(progress, [0, 1], [1.0, 1.15]);
  const panX = interpolate(progress, [0, 1], [0, -25]);
  const panY = interpolate(progress, [0, 1], [0, 15]);

  const spring1 = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 90 },
  });
  const t1Y = interpolate(spring1, [0, 1], [60, 0]);
  const t1O = interpolate(spring1, [0, 1], [0, 1]);

  const spring2 = spring({
    frame: frame - 18,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 90 },
  });
  const t2Y = interpolate(spring2, [0, 1], [50, 0]);
  const t2O = interpolate(spring2, [0, 1], [0, 1]);

  const spring3 = spring({
    frame: frame - 36,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 90 },
  });
  const t3Y = interpolate(spring3, [0, 1], [40, 0]);
  const t3O = interpolate(spring3, [0, 1], [0, 1]);

  const brandOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="bg-black overflow-hidden flex flex-col justify-between items-center py-24">
      {/* Background Image */}
      <Img
        className="absolute inset-0 w-full h-full object-cover object-center"
        style={{
          transform: `scale(${scale}) translate(${panX}px, ${panY}px)`,
        }}
        src={staticFile("assets/eating_scene1_mindless.png")}
      />

      {/* Darkened overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Highlighted Brand Header Badge */}
      <BrandHeader opacity={brandOpacity} />

      {/* Main Content */}
      <AbsoluteFill className="flex flex-col justify-center items-start px-20 text-left select-none z-10 pt-16">
        
        {/* Scene Heading */}
        <div
          style={{
            transform: `translateY(${t1Y}px)`,
            opacity: t1O,
            fontFamily: fonts.cormorant,
          }}
          className="flex flex-col items-start mb-6"
        >
          <h1
            style={{ color: COLORS_EATING.linen }}
            className="text-[120px] font-semibold leading-none mb-4 tracking-tight"
          >
            Eating...
          </h1>
        </div>

        {/* Question in Glass Badge */}
        <div
          style={{
            transform: `translateY(${t2Y}px)`,
            opacity: t2O,
            fontFamily: fonts.body,
          }}
          className="mb-12"
        >
          <div
            style={{ 
              backgroundColor: "rgba(24, 20, 16, 0.50)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1.5px solid rgba(250, 246, 240, 0.15)"
            }}
            className="px-8 py-4 rounded-3xl shadow-lg"
          >
            <h2
              style={{ color: COLORS_EATING.amber }}
              className="text-[56px] font-bold tracking-tight leading-none"
            >
              or emotionally stressed?
            </h2>
          </div>
        </div>

        {/* Context sentence */}
        <div
          style={{
            transform: `translateY(${t3Y}px)`,
            opacity: t3O,
            fontFamily: fonts.body,
          }}
          className="max-w-[850px] leading-relaxed"
        >
          <p
            style={{ color: COLORS_EATING.linenMuted }}
            className="text-[38px] font-light leading-normal"
          >
            Mindless eating is rarely a lack of self-control.
            <br />
            <span
              style={{
                color: COLORS_EATING.linen,
                backgroundColor: "rgba(217, 107, 67, 0.25)",
                border: "1px solid rgba(217, 107, 67, 0.4)"
              }}
              className="font-bold px-4 py-1.5 rounded-xl inline-block mt-3"
            >
              It is your brain seeking comfort.
            </span>
          </p>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
