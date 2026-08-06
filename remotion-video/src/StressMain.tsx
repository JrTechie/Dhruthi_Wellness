import React from "react";
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { StressScene1 } from "./StressScene1";
import { StressScene2 } from "./StressScene2";
import { StressScene3 } from "./StressScene3";
import { StressScene4 } from "./StressScene4";
import { StressScene5 } from "./StressScene5";
import { COLORS_STRESS } from "./Typography";

export const StressMain: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // 1. Cross-fade opacity calculations (1 second/30 frames transitions)
  // Scene 1 fades out at 7s (210-240 frames)
  const opacity1 = interpolate(frame, [210, 240], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Scene 2 fades in at 7s (210-240 frames), fades out at 14s (420-450 frames)
  const opacity2 = interpolate(frame, [210, 240, 420, 450], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Scene 3 fades in at 14s (420-450 frames), fades out at 21s (630-660 frames)
  const opacity3 = interpolate(frame, [420, 450, 630, 660], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Scene 4 fades in at 21s (630-660 frames), fades out at 28s (840-870 frames)
  const opacity4 = interpolate(frame, [630, 660, 840, 870], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Scene 5 fades in at 28s (840-870 frames)
  const opacity5 = interpolate(frame, [840, 870], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 2. Video Progress bar width (0% to 100%)
  const progressPercent = interpolate(frame, [0, durationInFrames], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="bg-black">
      {/* ── VISUAL SCENE LAYERS ── */}
      {/* Scene 1 (0s to 8s) */}
      <Sequence durationInFrames={240}>
        <div style={{ opacity: opacity1, width: "100%", height: "100%" }}>
          <StressScene1 />
        </div>
      </Sequence>

      {/* Scene 2 (7s to 15s) */}
      <Sequence from={210} durationInFrames={240}>
        <div style={{ opacity: opacity2, width: "100%", height: "100%" }}>
          <StressScene2 />
        </div>
      </Sequence>

      {/* Scene 3 (14s to 22s) */}
      <Sequence from={420} durationInFrames={240}>
        <div style={{ opacity: opacity3, width: "100%", height: "100%" }}>
          <StressScene3 />
        </div>
      </Sequence>

      {/* Scene 4 (21s to 29s) */}
      <Sequence from={630} durationInFrames={240}>
        <div style={{ opacity: opacity4, width: "100%", height: "100%" }}>
          <StressScene4 />
        </div>
      </Sequence>

      {/* Scene 5 (28s to 35s) */}
      <Sequence from={840} durationInFrames={210}>
        <div style={{ opacity: opacity5, width: "100%", height: "100%" }}>
          <StressScene5 />
        </div>
      </Sequence>

      {/* ── PROGRESS INDICATOR BAR ── */}
      <div
        style={{
          width: `${progressPercent}%`,
          height: "6px",
          background: `linear-gradient(to right, ${COLORS_STRESS.terracotta}, ${COLORS_STRESS.sage})`,
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 50,
          borderRadius: "0 4px 4px 0",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
        }}
      />
    </AbsoluteFill>
  );
};
