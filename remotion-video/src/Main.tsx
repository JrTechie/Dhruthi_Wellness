import React from "react";
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { EditorialScene1 } from "./EditorialScene1";
import { EditorialScene2 } from "./EditorialScene2";
import { EditorialScene3 } from "./EditorialScene3";
import { EditorialScene4 } from "./EditorialScene4";
import { EditorialScene5 } from "./EditorialScene5";

export const Main: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const opacity1 = interpolate(frame, [150, 180], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const opacity2 = interpolate(frame, [150, 180, 300, 330], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const opacity3 = interpolate(frame, [300, 330, 480, 510], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const opacity4 = interpolate(frame, [480, 510, 660, 690], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const opacity5 = interpolate(frame, [660, 690], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const progressPercent = interpolate(frame, [0, durationInFrames], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="bg-[#FAF6F0]">
      <Sequence from={0} durationInFrames={180}>
        <div style={{ opacity: opacity1, width: "100%", height: "100%" }}>
          <EditorialScene1 />
        </div>
      </Sequence>

      <Sequence from={150} durationInFrames={180}>
        <div style={{ opacity: opacity2, width: "100%", height: "100%" }}>
          <EditorialScene2 />
        </div>
      </Sequence>

      <Sequence from={300} durationInFrames={210}>
        <div style={{ opacity: opacity3, width: "100%", height: "100%" }}>
          <EditorialScene3 />
        </div>
      </Sequence>

      <Sequence from={480} durationInFrames={210}>
        <div style={{ opacity: opacity4, width: "100%", height: "100%" }}>
          <EditorialScene4 />
        </div>
      </Sequence>

      <Sequence from={660} durationInFrames={180}>
        <div style={{ opacity: opacity5, width: "100%", height: "100%" }}>
          <EditorialScene5 />
        </div>
      </Sequence>

      {/* Top Editorial Progress Bar */}
      <div
        style={{
          width: `${progressPercent}%`,
          height: "8px",
          background: "linear-gradient(to right, #2D4F3E, #E77F67)",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 60,
        }}
      />
    </AbsoluteFill>
  );
};
