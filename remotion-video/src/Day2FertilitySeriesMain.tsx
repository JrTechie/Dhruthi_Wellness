import React from "react";
import { AbsoluteFill, Audio, interpolate, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Day2Cover } from "./Day2Cover";
import { Day2Scene1 } from "./Day2Scene1";
import { Day2Scene2 } from "./Day2Scene2";
import { Day2Scene3 } from "./Day2Scene3";
import { Day2Scene4 } from "./Day2Scene4";
import { Day2Scene5 } from "./Day2Scene5";

export const Day2FertilitySeriesMain: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Top Video Progress Bar percentage (0% to 100%)
  const progressPercent = interpolate(frame, [0, durationInFrames], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        position: "relative",
        width: 1080,
        height: 1920,
        backgroundColor: "#08120E",
        overflow: "hidden",
      }}
    >
      {/* 1. Main Voiceover Track (Audios/8-8-02.mp4) */}
      <Sequence from={0} durationInFrames={1280}>
        <Audio src={staticFile("assets/day2_voiceover.mp4")} volume={3.5} />
      </Sequence>

      {/* 2. Soft Background Piano Soundtrack (piano.mp3) */}
      <Sequence from={0} durationInFrames={1280}>
        <Audio src={staticFile("piano.mp3")} volume={0.08} loop />
      </Sequence>

      {/* 3. Cover Card (Frames 0 to 90) */}
      <Sequence from={0} durationInFrames={90}>
        <Day2Cover />
      </Sequence>

      {/* 4. Scene 1 (Frames 90 to 320) */}
      <Sequence from={90} durationInFrames={230}>
        <Day2Scene1 />
      </Sequence>

      {/* 5. Scene 2 (Frames 320 to 650) - Includes 5 Bullet Points & SFX Chimes */}
      <Sequence from={320} durationInFrames={330}>
        <Day2Scene2 />
      </Sequence>

      {/* 6. Scene 3 (Frames 650 to 860) */}
      <Sequence from={650} durationInFrames={210}>
        <Day2Scene3 />
      </Sequence>

      {/* 7. Scene 4 (Frames 860 to 1070) */}
      <Sequence from={860} durationInFrames={210}>
        <Day2Scene4 />
      </Sequence>

      {/* 8. Scene 5 (Frames 1070 to 1280) */}
      <Sequence from={1070} durationInFrames={210}>
        <Day2Scene5 />
      </Sequence>

      {/* Top Video Progress Bar */}
      <div
        style={{
          width: `${progressPercent}%`,
          height: "6px",
          background: "linear-gradient(to right, #C5A059, #00FF9D)",
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
