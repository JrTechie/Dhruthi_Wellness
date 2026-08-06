import React from "react";
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS_PCOS } from "./Typography";
import { PCOSScene1 } from "./PCOSScene1";
import { PCOSScene2 } from "./PCOSScene2";
import { PCOSScene3 } from "./PCOSScene3";
import { PCOSScene4 } from "./PCOSScene4";
import { PCOSScene5 } from "./PCOSScene5";

export const PCOSMain: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // 1. Cross-fade transition opacity calculations
  // Scene 1: 0 to 270 frames (0s - 9s)
  const opacity1 = interpolate(frame, [240, 270], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Scene 2: 240 to 510 frames (8s - 17s)
  const opacity2 = interpolate(frame, [240, 270, 480, 510], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Scene 3: 480 to 750 frames (16s - 25s)
  const opacity3 = interpolate(frame, [480, 510, 720, 750], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  // Scene 4: 720 to 1080 frames (24s - 36s)
  const opacity4 = interpolate(frame, [720, 750, 1050, 1080], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Scene 5: 1050 to 1320 frames (35s - 44s)
  const opacity5 = interpolate(frame, [1050, 1080], [0, 1], {
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
      <Sequence from={0} durationInFrames={270}>
        <div style={{ opacity: opacity1, width: "100%", height: "100%" }}>
          <PCOSScene1 />
        </div>
      </Sequence>

      <Sequence from={240} durationInFrames={270}>
        <div style={{ opacity: opacity2, width: "100%", height: "100%" }}>
          <PCOSScene2 />
        </div>
      </Sequence>

      <Sequence from={480} durationInFrames={270}>
        <div style={{ opacity: opacity3, width: "100%", height: "100%" }}>
          <PCOSScene3 />
        </div>
      </Sequence>

      <Sequence from={720} durationInFrames={360}>
        <div style={{ opacity: opacity4, width: "100%", height: "100%" }}>
          <PCOSScene4 />
        </div>
      </Sequence>

      <Sequence from={1050} durationInFrames={270}>
        <div style={{ opacity: opacity5, width: "100%", height: "100%" }}>
          <PCOSScene5 />
        </div>
      </Sequence>

      {/* Progress Bar (Orchid Pink to Emerald Green) */}
      <div
        style={{
          width: `${progressPercent}%`,
          height: "6px",
          background: `linear-gradient(to right, ${COLORS_PCOS.orchid}, ${COLORS_PCOS.emerald})`,
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
