import React from "react";
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { PASTEL_COLORS } from "./Typography";
import { WeightLossReelScene1 } from "./WeightLossReelScene1";
import { WeightLossReelScene2 } from "./WeightLossReelScene2";
import { WeightLossReelScene3 } from "./WeightLossReelScene3";
import { WeightLossReelScene4 } from "./WeightLossReelScene4";
import { WeightLossReelScene5 } from "./WeightLossReelScene5";

export const WeightLossMain: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // 1. Cross-fade transition opacity calculations
  // Scene 1: 0 to 180 frames (0s - 6s)
  const opacity1 = interpolate(frame, [150, 180], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Scene 2: 150 to 330 frames (5s - 11s)
  const opacity2 = interpolate(frame, [150, 180, 300, 330], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Scene 3: 300 to 510 frames (10s - 17s)
  const opacity3 = interpolate(frame, [300, 330, 480, 510], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Scene 4: 480 to 690 frames (16s - 23s)
  const opacity4 = interpolate(frame, [480, 510, 660, 690], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Scene 5: 660 to 840 frames (22s - 28s)
  const opacity5 = interpolate(frame, [660, 690], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 2. Video Progress bar (0% to 100%)
  const progressPercent = interpolate(frame, [0, durationInFrames], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="bg-black">
      {/* Visual Scene Sequences */}
      <Sequence from={0} durationInFrames={180}>
        <div style={{ opacity: opacity1, width: "100%", height: "100%" }}>
          <WeightLossReelScene1 />
        </div>
      </Sequence>

      <Sequence from={150} durationInFrames={180}>
        <div style={{ opacity: opacity2, width: "100%", height: "100%" }}>
          <WeightLossReelScene2 />
        </div>
      </Sequence>

      <Sequence from={300} durationInFrames={210}>
        <div style={{ opacity: opacity3, width: "100%", height: "100%" }}>
          <WeightLossReelScene3 />
        </div>
      </Sequence>

      <Sequence from={480} durationInFrames={210}>
        <div style={{ opacity: opacity4, width: "100%", height: "100%" }}>
          <WeightLossReelScene4 />
        </div>
      </Sequence>

      <Sequence from={660} durationInFrames={180}>
        <div style={{ opacity: opacity5, width: "100%", height: "100%" }}>
          <WeightLossReelScene5 />
        </div>
      </Sequence>

      {/* Top Apple-Style Progress Bar */}
      <div
        style={{
          width: `${progressPercent}%`,
          height: "6px",
          background: `linear-gradient(to right, ${PASTEL_COLORS.sageGreen}, ${PASTEL_COLORS.lightOrange})`,
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 60,
          borderRadius: "0 4px 4px 0",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.4)",
        }}
      />
    </AbsoluteFill>
  );
};
