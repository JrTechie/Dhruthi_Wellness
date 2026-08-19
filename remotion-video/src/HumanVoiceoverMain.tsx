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
import { AnimatedCoverPage } from "./AnimatedCoverPage";
import { RelevantScene1 } from "./RelevantScene1";
import { RelevantScene2 } from "./RelevantScene2";
import { RelevantScene3 } from "./RelevantScene3";
import { COLORS_EATING } from "./Typography";
import metadata from "../public/assets/human_voiceover_metadata.json";

export const HumanVoiceoverMain: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const coverFrames = metadata.cover_frames; // 90 frames (3s)
  const voiceoverFrames = metadata.voiceover_frames; // 988 frames (32.96s)
  const totalFrames = metadata.total_frames; // 1168 frames (38.96s)

  // Scene timings synchronized with human voiceover
  const scene1Duration = 330; // ~11s
  const scene2Duration = 360; // ~12s
  const scene3Duration = totalFrames - (coverFrames + scene1Duration + scene2Duration); // ~12.96s

  // Video progress indicator bar
  const progressPercent = interpolate(frame, [0, durationInFrames], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      {/* Primary Human Voiceover Track (Audios/8-8-01.mp4) starting at 0:00 */}
      <Sequence from={0} durationInFrames={voiceoverFrames}>
        <Audio src={staticFile("assets/human_voiceover.mp4")} volume={2.5} />
      </Sequence>

      {/* Subtle Slow Background Piano Music (piano.mp3) */}
      <Sequence from={0} durationInFrames={totalFrames}>
        <Audio src={staticFile("piano.mp3")} volume={0.08} loop />
      </Sequence>

      {/* 1. Animated Cover Page (Frames 0 to 90) */}
      <Sequence from={0} durationInFrames={coverFrames}>
        <AnimatedCoverPage />
      </Sequence>

      {/* 2. Scene 1 (Hook & Preconception Principle) */}
      <Sequence from={coverFrames} durationInFrames={scene1Duration}>
        <RelevantScene1 />
      </Sequence>

      {/* 3. Scene 2 (Preconception Health Breakdown) */}
      <Sequence from={coverFrames + scene1Duration} durationInFrames={scene2Duration}>
        <RelevantScene2 />
      </Sequence>

      {/* 4. Scene 3 & Outro (Fertility Journey & CTA) */}
      <Sequence from={coverFrames + scene1Duration + scene2Duration} durationInFrames={scene3Duration}>
        <RelevantScene3 />
      </Sequence>

      {/* Top Video Progress Bar */}
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
