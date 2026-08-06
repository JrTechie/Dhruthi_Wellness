import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, loadFonts } from "./Typography";

export const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const fonts = loadFonts();

  // Duration is 6.0 seconds (180 frames)
  const duration = 6.0 * fps;
  const progress = frame / duration;

  // 1. Ken Burns Effect: Zoom and subtle Pan
  const scale = interpolate(progress, [0, 1], [1.0, 1.15]);
  const panX = interpolate(progress, [0, 1], [0, -40]); // in pixels
  const panY = interpolate(progress, [0, 1], [0, 30]);

  // 2. Spring animations for content entry
  const spring1 = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 90 },
  });
  const t1Y = interpolate(spring1, [0, 1], [60, 0]);
  const t1O = interpolate(spring1, [0, 1], [0, 1]);
  const dividerW = interpolate(spring1, [0, 1], [0, 240]);

  // Question enters at 0.6 seconds (18 frames)
  const spring2 = spring({
    frame: frame - 18,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 90 },
  });
  const t2Y = interpolate(spring2, [0, 1], [50, 0]);
  const t2O = interpolate(spring2, [0, 1], [0, 1]);

  // Context sentence enters at 1.2 seconds (36 frames)
  const spring3 = spring({
    frame: frame - 36,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 90 },
  });
  const t3Y = interpolate(spring3, [0, 1], [40, 0]);
  const t3O = interpolate(spring3, [0, 1], [0, 1]);

  // Brand handle top overlay enters at frame 0 (fade in)
  const brandOpacity = interpolate(frame, [0, 15], [0, 0.65], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="bg-black overflow-hidden flex flex-col justify-between items-center py-24">
      {/* Background Image with Ken Burns */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          transform: `scale(${scale}) translate(${panX}px, ${panY}px)`,
          backgroundImage: `url(${staticFile("assets/scene1_tired_kitchen.png")})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Darkened overlay for legibility */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Main Content Containers */}
      <AbsoluteFill className="flex flex-col justify-center items-center px-12 text-center select-none z-10">
        
        {/* Brand Handle */}
        <div
          className="absolute top-20 flex items-center justify-center space-x-3 w-full"
          style={{
            opacity: brandOpacity,
            fontFamily: fonts.outfit,
          }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-white" />
          <span className="text-white text-2xl tracking-widest font-light">
            @dhruthi_wellness
          </span>
          <div className="w-1.5 h-1.5 rounded-full bg-white" />
        </div>

        {/* Scene Heading */}
        <div
          style={{
            transform: `translateY(${t1Y}px)`,
            opacity: t1O,
            fontFamily: fonts.italiana,
          }}
          className="flex flex-col items-center"
        >
          <h1
            style={{ color: COLORS.textMain }}
            className="text-[110px] font-light leading-none mb-6"
          >
            Hungry...
          </h1>
          {/* Animated golden divider line */}
          <div
            style={{
              width: `${dividerW}px`,
              backgroundColor: COLORS.textHighlight,
              height: "4px",
            }}
            className="rounded-full mb-10"
          />
        </div>

        {/* Question text */}
        <div
          style={{
            transform: `translateY(${t2Y}px)`,
            opacity: t2O,
            fontFamily: fonts.outfit,
          }}
        >
          <h2
            style={{ color: COLORS.textSub }}
            className="text-[52px] font-bold tracking-tight mb-16 leading-tight"
          >
            or just sleep deprived?
          </h2>
        </div>

        {/* Bottom context sentence */}
        <div
          style={{
            transform: `translateY(${t3Y}px)`,
            opacity: t3O,
            fontFamily: fonts.outfit,
          }}
          className="max-w-[850px] leading-relaxed text-center px-4"
        >
          <p
            style={{ color: COLORS.textMain }}
            className="text-[34px] font-normal leading-normal"
          >
            Late-night snacking is often a cry for rest,
            <br />
            <span style={{ color: COLORS.textHighlight }} className="font-medium">
              not a cry for calories.
            </span>
          </p>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
