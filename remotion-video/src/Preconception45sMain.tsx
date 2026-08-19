import React from "react";
import { Audio, Sequence, staticFile } from "remotion";
import { Preconception45sCover } from "./Preconception45sCover";
import { Preconception45sScene1 } from "./Preconception45sScene1";
import { Preconception45sScene2 } from "./Preconception45sScene2";
import { Preconception45sScene3 } from "./Preconception45sScene3";
import { Preconception45sScene4 } from "./Preconception45sScene4";
import metadata from "../public/assets/preconception_45s_metadata.json";

export const Preconception45sMain: React.FC = () => {
  const line1 = metadata.lines["1"];
  const line2 = metadata.lines["2"];
  const line3 = metadata.lines["3"];
  const line4 = metadata.lines["4"];

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
      {/* 1. Cover Thumbnail (Frames 0 to 75) */}
      <Sequence from={0} durationInFrames={line1.start_frame}>
        <Preconception45sCover />
      </Sequence>

      {/* 2. Scene 1 (Line 1: Frames 75 to 406) */}
      <Sequence from={line1.start_frame} durationInFrames={line1.frames + line1.pause_frames}>
        <Audio src={staticFile("assets/preconception_45s_line_1.mp3")} volume={1.0} />
        <Preconception45sScene1 />
      </Sequence>

      {/* 3. Scene 2 (Line 2: Frames 406 to 772) */}
      <Sequence from={line2.start_frame} durationInFrames={line2.frames + line2.pause_frames}>
        <Audio src={staticFile("assets/preconception_45s_line_2.mp3")} volume={1.0} />
        <Preconception45sScene2 />
      </Sequence>

      {/* 4. Scene 3 (Line 3: Frames 772 to 1171) */}
      <Sequence from={line3.start_frame} durationInFrames={line3.frames + line3.pause_frames}>
        <Audio src={staticFile("assets/preconception_45s_line_3.mp3")} volume={1.0} />
        <Preconception45sScene3 />
      </Sequence>

      {/* 5. Scene 4 & Outro (Line 4: Frames 1171 to 1492) */}
      <Sequence from={line4.start_frame} durationInFrames={line4.frames + metadata.outro_frames}>
        <Audio src={staticFile("assets/preconception_45s_line_4.mp3")} volume={1.0} />
        <Preconception45sScene4 />
      </Sequence>
    </div>
  );
};
