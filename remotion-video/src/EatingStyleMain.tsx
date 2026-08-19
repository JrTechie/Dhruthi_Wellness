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
import { EatingStyleCover } from "./EatingStyleCover";
import { EatingStyleScene1 } from "./EatingStyleScene1";
import { EatingStyleScene2 } from "./EatingStyleScene2";
import { EatingStyleScene3 } from "./EatingStyleScene3";
import { COLORS_EATING } from "./Typography";
import metadata from "../public/assets/white_preconception_metadata.json";

export const EatingStyleMain: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const line1Info = metadata.lines["1"];
  const line2Info = metadata.lines["2"];
  const line3Info = metadata.lines["3"];

  // Video progress indicator bar
  const progressPercent = interpolate(frame, [0, durationInFrames], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      {/* 1. Cover / Thumbnail (Frames 0 to 90) */}
      <Sequence from={0} durationInFrames={line1Info.start_frame}>
        <EatingStyleCover />
      </Sequence>

      {/* 2. Scene 1 (Line 1: Frames 90 to 455) WITHOUT MUSIC */}
      <Sequence from={line1Info.start_frame} durationInFrames={line1Info.frames + line1Info.pause_frames}>
        <Audio src={staticFile("assets/white_preconception_line_1.mp3")} volume={1.0} />
        <EatingStyleScene1 />
      </Sequence>

      {/* 3. Scene 2 (Line 2: Frames 455 to 893) WITHOUT MUSIC */}
      <Sequence from={line2Info.start_frame} durationInFrames={line2Info.frames + line2Info.pause_frames}>
        <Audio src={staticFile("assets/white_preconception_line_2.mp3")} volume={1.0} />
        <EatingStyleScene2 />
      </Sequence>

      {/* 4. Scene 3 & Outro (Line 3: Frames 893 to 1277) WITHOUT MUSIC */}
      <Sequence from={line3Info.start_frame} durationInFrames={line3Info.frames + metadata.outro_frames}>
        <Audio src={staticFile("assets/white_preconception_line_3.mp3")} volume={1.0} />
        <EatingStyleScene3 />
      </Sequence>

      {/* Top Video Progress Indicator Bar (from eating_remotion style) */}
      <div
        style={{
          width: `${progressPercent}%`,
          height: "6px",
          background: `linear-gradient(to right, ${COLORS_EATING.amber}, ${COLORS_EATING.sage})`,
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 100,
          borderRadius: "0 4px 4px 0",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.4)",
        }}
      />
    </AbsoluteFill>
  );
};
