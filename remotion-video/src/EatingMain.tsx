import React from "react";
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { EatingScene1 } from "./EatingScene1";
import { EatingScene2 } from "./EatingScene2";
import { EatingScene3 } from "./EatingScene3";
import { EatingScene4 } from "./EatingScene4";
import { EatingScene5 } from "./EatingScene5";
import { COLORS_EATING } from "./Typography";

export const EatingMain: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Cross-fade opacities for 9s per scene (270 frames each with 30 frame cross-fades)
  const opacity1 = interpolate(frame, [240, 270], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const opacity2 = interpolate(frame, [240, 270, 480, 510], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const opacity3 = interpolate(frame, [480, 510, 720, 750], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const opacity4 = interpolate(frame, [720, 750, 960, 990], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const opacity5 = interpolate(frame, [960, 990], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Video progress indicator
  const progressPercent = interpolate(frame, [0, durationInFrames], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="bg-black">
      {/* Visual Scene Layers (9 seconds / 270 frames per scene) */}
      <Sequence durationInFrames={270}>
        <div style={{ opacity: opacity1, width: "100%", height: "100%" }}>
          <EatingScene1 />
        </div>
      </Sequence>

      <Sequence from={240} durationInFrames={270}>
        <div style={{ opacity: opacity2, width: "100%", height: "100%" }}>
          <EatingScene2 />
        </div>
      </Sequence>

      <Sequence from={480} durationInFrames={270}>
        <div style={{ opacity: opacity3, width: "100%", height: "100%" }}>
          <EatingScene3 />
        </div>
      </Sequence>

      <Sequence from={720} durationInFrames={270}>
        <div style={{ opacity: opacity4, width: "100%", height: "100%" }}>
          <EatingScene4 />
        </div>
      </Sequence>

      <Sequence from={960} durationInFrames={270}>
        <div style={{ opacity: opacity5, width: "100%", height: "100%" }}>
          <EatingScene5 />
        </div>
      </Sequence>

      {/* Progress indicator bar */}
      <div
        style={{
          width: `${progressPercent}%`,
          height: "6px",
          background: `linear-gradient(to right, ${COLORS_EATING.amber}, ${COLORS_EATING.sage})`,
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
