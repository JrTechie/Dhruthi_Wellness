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
import { BalancedPlateScene1 } from "./BalancedPlateScene1";
import { BalancedPlateScene2 } from "./BalancedPlateScene2";
import { BalancedPlateScene3 } from "./BalancedPlateScene3";
import { BalancedPlateScene4 } from "./BalancedPlateScene4";
import { BalancedPlateScene5 } from "./BalancedPlateScene5";
import { BalancedPlateScene6 } from "./BalancedPlateScene6";

export const BalancedPlateMain: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Scene opacities with smooth crossfades (Total 1350 frames / 45s)
  // Scene 1: 0 - 180
  const opacity1 = interpolate(frame, [160, 180], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Scene 2: 180 - 480
  const opacity2 = interpolate(frame, [160, 180, 460, 480], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Scene 3: 480 - 780
  const opacity3 = interpolate(frame, [460, 480, 760, 780], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Scene 4: 780 - 1050
  const opacity4 = interpolate(frame, [760, 780, 1030, 1050], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Scene 5: 1050 - 1200
  const opacity5 = interpolate(frame, [1030, 1050, 1180, 1200], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Scene 6: 1200 - 1350
  const opacity6 = interpolate(frame, [1180, 1200], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Top reel progress bar calculation
  const progressPercent = interpolate(frame, [0, durationInFrames], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="bg-[#121916]">
      {/* Background Soothing Wellness Soundscape Track (Seamless Loop) */}
      <Audio src={staticFile("relaxing_sound.mp3")} volume={0.35} loop />

      {/* Scene 1: Hook (0s - 6s / frames 0 - 180) */}
      <Sequence from={0} durationInFrames={180}>
        <div style={{ opacity: opacity1, width: "100%", height: "100%" }}>
          <BalancedPlateScene1 />
        </div>
      </Sequence>

      {/* Scene 2: 50% Vegetables (6s - 16s / frames 160 - 480) */}
      <Sequence from={160} durationInFrames={320}>
        <div style={{ opacity: opacity2, width: "100%", height: "100%" }}>
          <BalancedPlateScene2 />
        </div>
      </Sequence>

      {/* Scene 3: 25% Protein (16s - 26s / frames 460 - 780) */}
      <Sequence from={460} durationInFrames={320}>
        <div style={{ opacity: opacity3, width: "100%", height: "100%" }}>
          <BalancedPlateScene3 />
        </div>
      </Sequence>

      {/* Scene 4: 25% Carbohydrates (26s - 35s / frames 760 - 1050) */}
      <Sequence from={760} durationInFrames={290}>
        <div style={{ opacity: opacity4, width: "100%", height: "100%" }}>
          <BalancedPlateScene4 />
        </div>
      </Sequence>

      {/* Scene 5: Complete Meal & Sides (35s - 40s / frames 1030 - 1200) */}
      <Sequence from={1030} durationInFrames={170}>
        <div style={{ opacity: opacity5, width: "100%", height: "100%" }}>
          <BalancedPlateScene5 />
        </div>
      </Sequence>

      {/* Scene 6: Outro & Call to Action (40s - 45s / frames 1180 - 1350) */}
      <Sequence from={1180} durationInFrames={170}>
        <div style={{ opacity: opacity6, width: "100%", height: "100%" }}>
          <BalancedPlateScene6 />
        </div>
      </Sequence>

      {/* Top Editorial Progress Bar */}
      <div
        style={{
          width: `${progressPercent}%`,
          height: "8px",
          background: "linear-gradient(to right, #88A08D, #D9A05B)",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 100,
        }}
      />
    </AbsoluteFill>
  );
};
