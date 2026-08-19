import React from "react";
import { Audio, Sequence, staticFile } from "remotion";
import { WhitePreconceptionCover } from "./WhitePreconceptionCover";
import { WhitePreconceptionScene1 } from "./WhitePreconceptionScene1";
import { WhitePreconceptionScene2 } from "./WhitePreconceptionScene2";
import { WhitePreconceptionScene3 } from "./WhitePreconceptionScene3";
import metadata from "../public/assets/white_preconception_metadata.json";

export const WhitePreconceptionSeriesMain: React.FC = () => {
  const line1Info = metadata.lines["1"];
  const line2Info = metadata.lines["2"];
  const line3Info = metadata.lines["3"];

  return (
    <div
      style={{
        position: "relative",
        width: 1080,
        height: 1920,
        backgroundColor: "#FAF9F5",
        overflow: "hidden",
      }}
    >
      {/* 1. Cover / Thumbnail (Frames 0 to 90) */}
      <Sequence from={0} durationInFrames={line1Info.start_frame}>
        <WhitePreconceptionCover />
      </Sequence>

      {/* 2. Scene 1 (Line 1: Frames 90 to 455) */}
      <Sequence from={line1Info.start_frame} durationInFrames={line1Info.frames + line1Info.pause_frames}>
        <Audio src={staticFile("assets/white_preconception_line_1.mp3")} volume={1.0} />
        <WhitePreconceptionScene1 />
      </Sequence>

      {/* 3. Scene 2 (Line 2: Frames 455 to 893) */}
      <Sequence from={line2Info.start_frame} durationInFrames={line2Info.frames + line2Info.pause_frames}>
        <Audio src={staticFile("assets/white_preconception_line_2.mp3")} volume={1.0} />
        <WhitePreconceptionScene2 />
      </Sequence>

      {/* 4. Scene 3 & Outro (Line 3: Frames 893 to 1277) */}
      <Sequence from={line3Info.start_frame} durationInFrames={line3Info.frames + metadata.outro_frames}>
        <Audio src={staticFile("assets/white_preconception_line_3.mp3")} volume={1.0} />
        <WhitePreconceptionScene3 />
      </Sequence>
    </div>
  );
};
