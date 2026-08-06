import React from "react";
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS_METABOLISM } from "./Typography";
import { MetabolismScene1 } from "./MetabolismScene1";
import { MetabolismScene2 } from "./MetabolismScene2";
import { MetabolismScene3 } from "./MetabolismScene3";
import { MetabolismScene4 } from "./MetabolismScene4";
import { MetabolismScene5 } from "./MetabolismScene5";
import { MetabolismScene6 } from "./MetabolismScene6";

export const MetabolismMain: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // 1. Cross-fade transitions (matching timeline of Python compilation)
  // Scene 1: 0 to 165 frames (0s - 5.5s)
  const opacity1 = interpolate(frame, [135, 165], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Scene 2: 135 to 315 frames (4.5s - 10.5s)
  const opacity2 = interpolate(frame, [135, 165, 285, 315], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Scene 3: 285 to 495 frames (9.5s - 16.5s)
  const opacity3 = interpolate(frame, [285, 315, 465, 495], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Scene 4: 465 to 675 frames (15.5s - 22.5s)
  const opacity4 = interpolate(frame, [465, 495, 645, 675], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Scene 5: 645 to 825 frames (21.5s - 27.5s)
  const opacity5 = interpolate(frame, [645, 675, 795, 825], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Scene 6: 795 to 900 frames (26.5s - 30.0s)
  const opacity6 = interpolate(frame, [795, 825], [0, 1], {
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
      <Sequence durationInFrames={165}>
        <div style={{ opacity: opacity1, width: "100%", height: "100%" }}>
          <MetabolismScene1 />
        </div>
      </Sequence>

      <Sequence from={135} durationInFrames={180}>
        <div style={{ opacity: opacity2, width: "100%", height: "100%" }}>
          <MetabolismScene2 />
        </div>
      </Sequence>

      <Sequence from={285} durationInFrames={210}>
        <div style={{ opacity: opacity3, width: "100%", height: "100%" }}>
          <MetabolismScene3 />
        </div>
      </Sequence>

      <Sequence from={465} durationInFrames={210}>
        <div style={{ opacity: opacity4, width: "100%", height: "100%" }}>
          <MetabolismScene4 />
        </div>
      </Sequence>

      <Sequence from={645} durationInFrames={180}>
        <div style={{ opacity: opacity5, width: "100%", height: "100%" }}>
          <MetabolismScene5 />
        </div>
      </Sequence>

      <Sequence from={795} durationInFrames={105}>
        <div style={{ opacity: opacity6, width: "100%", height: "100%" }}>
          <MetabolismScene6 />
        </div>
      </Sequence>

      {/* Top Apple-Style Progress Bar */}
      <div
        style={{
          width: `${progressPercent}%`,
          height: "6px",
          background: `linear-gradient(to right, ${COLORS_METABOLISM.softGreen}, ${COLORS_METABOLISM.warmOrange})`,
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
