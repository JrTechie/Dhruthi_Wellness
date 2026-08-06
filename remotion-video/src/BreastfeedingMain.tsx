import React from "react";
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BreastfeedingScene1 } from "./BreastfeedingScene1";
import { BreastfeedingScene2 } from "./BreastfeedingScene2";
import { BreastfeedingScene3 } from "./BreastfeedingScene3";
import { BreastfeedingScene4 } from "./BreastfeedingScene4";
import { BreastfeedingScene5 } from "./BreastfeedingScene5";
import { BreastfeedingScene6 } from "./BreastfeedingScene6";
import { EDITORIAL_COLORS } from "./Typography";

export const BreastfeedingMain: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Smooth Crossfade Opacity Interpolations for 6 Scenes
  // Scene 1: 0 - 135 (0s - 4.5s)
  const opacity1 = interpolate(frame, [120, 135], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Scene 2: 120 - 255 (4.0s - 8.5s)
  const opacity2 = interpolate(frame, [120, 135, 240, 255], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Scene 3: 240 - 405 (8.0s - 13.5s)
  const opacity3 = interpolate(frame, [240, 255, 390, 405], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Scene 4: 390 - 555 (13.0s - 18.5s)
  const opacity4 = interpolate(frame, [390, 405, 540, 555], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Scene 5: 540 - 705 (18.0s - 23.5s)
  const opacity5 = interpolate(frame, [540, 555, 690, 705], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Scene 6: 690 - 900 (23.0s - 30.0s)
  const opacity6 = interpolate(frame, [690, 705], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Top Editorial Progress Bar percentage
  const progressPercent = interpolate(frame, [0, durationInFrames], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="bg-[#FAF6F0]">
      {/* Scene 1: Hook (0s - 4.5s / frames 0 - 135) */}
      <Sequence from={0} durationInFrames={135}>
        <div style={{ opacity: opacity1, width: "100%", height: "100%" }}>
          <BreastfeedingScene1 />
        </div>
      </Sequence>

      {/* Scene 2: Water Pour & Breast Milk Fact (4.0s - 8.5s / frames 120 - 255) */}
      <Sequence from={120} durationInFrames={135}>
        <div style={{ opacity: opacity2, width: "100%", height: "100%" }}>
          <BreastfeedingScene2 />
        </div>
      </Sequence>

      {/* Scene 3: Flat-lay Food Photography & Daily Hydration Goal (8.0s - 13.5s / frames 240 - 405) */}
      <Sequence from={240} durationInFrames={165}>
        <div style={{ opacity: opacity3, width: "100%", height: "100%" }}>
          <BreastfeedingScene3 />
        </div>
      </Sequence>

      {/* Scene 4: Hydration Habits & Finish Breastfeeding (13.0s - 18.5s / frames 390 - 555) */}
      <Sequence from={390} durationInFrames={165}>
        <div style={{ opacity: opacity4, width: "100%", height: "100%" }}>
          <BreastfeedingScene4 />
        </div>
      </Sequence>

      {/* Scene 5: Dehydration Warning Signs (18.0s - 23.5s / frames 540 - 705) */}
      <Sequence from={540} durationInFrames={165}>
        <div style={{ opacity: opacity5, width: "100%", height: "100%" }}>
          <BreastfeedingScene5 />
        </div>
      </Sequence>

      {/* Scene 6: Emotional Outro & Dhruthi Wellness Branding (23.0s - 30.0s / frames 690 - 900) */}
      <Sequence from={690} durationInFrames={210}>
        <div style={{ opacity: opacity6, width: "100%", height: "100%" }}>
          <BreastfeedingScene6 />
        </div>
      </Sequence>

      {/* Top Canva-style Editorial Progress Bar */}
      <div
        style={{
          width: `${progressPercent}%`,
          height: "6px",
          background: `linear-gradient(to right, ${EDITORIAL_COLORS.sage}, ${EDITORIAL_COLORS.softRose}, ${EDITORIAL_COLORS.babyPink})`,
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 100,
        }}
      />
    </AbsoluteFill>
  );
};

