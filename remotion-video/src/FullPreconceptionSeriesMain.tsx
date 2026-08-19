import React from "react";
import { Audio, Sequence, staticFile } from "remotion";
import { FullPreconceptionCover } from "./FullPreconceptionCover";
import { FullPreconceptionScene1 } from "./FullPreconceptionScene1";
import { FullPreconceptionScene2 } from "./FullPreconceptionScene2";
import { FullPreconceptionScene3 } from "./FullPreconceptionScene3";
import { FullPreconceptionScene4 } from "./FullPreconceptionScene4";
import { FullPreconceptionScene5 } from "./FullPreconceptionScene5";
import metadata from "../public/assets/full_preconception_metadata.json";

export const FullPreconceptionSeriesMain: React.FC = () => {
  const line1 = metadata.lines["1"];
  const line2 = metadata.lines["2"];
  const line3 = metadata.lines["3"];
  const line4 = metadata.lines["4"];
  const line5 = metadata.lines["5"];

  return (
    <div
      style={{
        position: "relative",
        width: 1080,
        height: 1920,
        backgroundColor: "#08120E",
        overflow: "hidden",
      }}
    >
      {/* 1. Cover (Frames 0 to 105) */}
      <Sequence from={0} durationInFrames={line1.start_frame}>
        <FullPreconceptionCover />
      </Sequence>

      {/* 2. Scene 1 (Line 1: Frames 105 to 483) */}
      <Sequence from={line1.start_frame} durationInFrames={line1.frames + line1.pause_frames}>
        <Audio src={staticFile("assets/full_preconception_line_1.mp3")} volume={1.0} />
        <FullPreconceptionScene1 />
      </Sequence>

      {/* 3. Scene 2 (Line 2: Frames 483 to 964) */}
      <Sequence from={line2.start_frame} durationInFrames={line2.frames + line2.pause_frames}>
        <Audio src={staticFile("assets/full_preconception_line_2.mp3")} volume={1.0} />
        <FullPreconceptionScene2 />
      </Sequence>

      {/* 4. Scene 3 (Line 3: Frames 964 to 1474) */}
      <Sequence from={line3.start_frame} durationInFrames={line3.frames + line3.pause_frames}>
        <Audio src={staticFile("assets/full_preconception_line_3.mp3")} volume={1.0} />
        <FullPreconceptionScene3 />
      </Sequence>

      {/* 5. Scene 4 (Line 4: Frames 1474 to 1969) */}
      <Sequence from={line4.start_frame} durationInFrames={line4.frames + line4.pause_frames}>
        <Audio src={staticFile("assets/full_preconception_line_4.mp3")} volume={1.0} />
        <FullPreconceptionScene4 />
      </Sequence>

      {/* 6. Scene 5 & Outro (Line 5: Frames 1969 to 2402) */}
      <Sequence from={line5.start_frame} durationInFrames={line5.frames + metadata.outro_frames}>
        <Audio src={staticFile("assets/full_preconception_line_5.mp3")} volume={1.0} />
        <FullPreconceptionScene5 />
      </Sequence>
    </div>
  );
};
