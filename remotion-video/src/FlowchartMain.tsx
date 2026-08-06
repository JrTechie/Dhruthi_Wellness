import React from "react";
import {
  AbsoluteFill,
  Audio,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { FlowchartScene1 } from "./FlowchartScene1";
import { FlowchartScene2 } from "./FlowchartScene2";
import { FlowchartScene3 } from "./FlowchartScene3";
import { FlowchartScene4 } from "./FlowchartScene4";
import { FlowchartScene5 } from "./FlowchartScene5";
import { FlowchartScene6 } from "./FlowchartScene6";
import { EDITORIAL_COLORS } from "./Typography";

export const FlowchartMain: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Smooth Crossfade Opacity Interpolations for 6 Scenes matching 53.33s User Recorded Voiceover
  // Scene 1: 0 - 270 (0 - 9.0s)
  const opacity1 = interpolate(frame, [250, 270], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Scene 2: 255 - 540 (8.5s - 18.0s)
  const opacity2 = interpolate(frame, [250, 270, 520, 540], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Scene 3: 525 - 810 (17.5s - 27.0s)
  const opacity3 = interpolate(frame, [520, 540, 790, 810], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Scene 4: 795 - 1080 (26.5s - 36.0s)
  const opacity4 = interpolate(frame, [790, 810, 1060, 1080], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Scene 5: 1065 - 1350 (35.5s - 45.0s)
  const opacity5 = interpolate(frame, [1060, 1080, 1330, 1350], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Scene 6: 1335 - 1600 (44.5s - 53.33s)
  const opacity6 = interpolate(frame, [1330, 1350], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const progressPercent = interpolate(frame, [0, durationInFrames], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="bg-[#090D16]">
      {/* User's Original Recorded Voiceover Audio (53.33 Seconds) */}
      <Audio src={staticFile("user_voiceover.mp4")} volume={1.0} />

      {/* Soft Background Ambient Lullaby Track */}
      <Audio
        src={staticFile("breastfeeding_ambient_lullaby.wav")}
        volume={0.08}
      />

      {/* Scene 1: Cover Hook & Flowchart Nodes (0s - 9s) */}
      <Sequence from={0} durationInFrames={270}>
        <div style={{ opacity: opacity1, width: "100%", height: "100%" }}>
          <FlowchartScene1 />
        </div>
      </Sequence>

      {/* Scene 2: 2.5-3.5L Target & Fluid Sources (8.5s - 18s) */}
      <Sequence from={255} durationInFrames={285}>
        <div style={{ opacity: opacity2, width: "100%", height: "100%" }}>
          <FlowchartScene2 />
        </div>
      </Sequence>

      {/* Scene 3: Benefits of Hydration (17.5s - 27s) */}
      <Sequence from={525} durationInFrames={285}>
        <div style={{ opacity: opacity3, width: "100%", height: "100%" }}>
          <FlowchartScene3 />
        </div>
      </Sequence>

      {/* Scene 4: Everyday Hydration Habits (26.5s - 36s) */}
      <Sequence from={795} durationInFrames={285}>
        <div style={{ opacity: opacity4, width: "100%", height: "100%" }}>
          <FlowchartScene4 />
        </div>
      </Sequence>

      {/* Scene 5: Signs of Dehydration Warning Grid (35.5s - 45s) */}
      <Sequence from={1065} durationInFrames={285}>
        <div style={{ opacity: opacity5, width: "100%", height: "100%" }}>
          <FlowchartScene5 />
        </div>
      </Sequence>

      {/* Scene 6: Final Screen & Dhruthi Outro (44.5s - 53.33s) */}
      <Sequence from={1335} durationInFrames={265}>
        <div style={{ opacity: opacity6, width: "100%", height: "100%" }}>
          <FlowchartScene6 />
        </div>
      </Sequence>

      {/* Top Editorial Progress Bar */}
      <div
        style={{
          width: `${progressPercent}%`,
          height: "8px",
          background: `linear-gradient(to right, ${EDITORIAL_COLORS.sage}, #4A90E2, ${EDITORIAL_COLORS.softRose}, #D9A05B)`,
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 100,
        }}
      />
    </AbsoluteFill>
  );
};
