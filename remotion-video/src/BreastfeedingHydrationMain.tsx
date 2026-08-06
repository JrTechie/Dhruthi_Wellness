import React from "react";
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BreastfeedingHydrationScene1 } from "./BreastfeedingHydrationScene1";
import { BreastfeedingHydrationScene2 } from "./BreastfeedingHydrationScene2";
import { BreastfeedingHydrationScene3 } from "./BreastfeedingHydrationScene3";
import { BreastfeedingHydrationScene4 } from "./BreastfeedingHydrationScene4";
import { BreastfeedingHydrationScene5 } from "./BreastfeedingHydrationScene5";
import { BreastfeedingHydrationScene6 } from "./BreastfeedingHydrationScene6";
import { EDITORIAL_COLORS } from "./Typography";

export const BreastfeedingHydrationMain: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Smooth Crossfade Opacity Interpolations for 6 Scenes
  const opacity1 = interpolate(frame, [120, 135], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const opacity2 = interpolate(frame, [120, 135, 240, 255], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const opacity3 = interpolate(frame, [240, 255, 390, 405], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const opacity4 = interpolate(frame, [390, 405, 540, 555], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const opacity5 = interpolate(frame, [540, 555, 690, 705], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const opacity6 = interpolate(frame, [690, 705], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const progressPercent = interpolate(frame, [0, durationInFrames], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="bg-[#FAF6F0]">
      {/* Scene 1: Title Hook (0s - 4.5s / frames 0 - 135) */}
      <Sequence from={0} durationInFrames={135}>
        <div style={{ opacity: opacity1, width: "100%", height: "100%" }}>
          <BreastfeedingHydrationScene1 />
        </div>
      </Sequence>

      {/* Scene 2: Water Fact (4.0s - 8.5s / frames 120 - 255) */}
      <Sequence from={120} durationInFrames={135}>
        <div style={{ opacity: opacity2, width: "100%", height: "100%" }}>
          <BreastfeedingHydrationScene2 />
        </div>
      </Sequence>

      {/* Scene 3: Flat-lay Food & Fluid Goal (8.0s - 13.5s / frames 240 - 405) */}
      <Sequence from={240} durationInFrames={165}>
        <div style={{ opacity: opacity3, width: "100%", height: "100%" }}>
          <BreastfeedingHydrationScene3 />
        </div>
      </Sequence>

      {/* Scene 4: Hydration Habits (13.0s - 18.5s / frames 390 - 555) */}
      <Sequence from={390} durationInFrames={165}>
        <div style={{ opacity: opacity4, width: "100%", height: "100%" }}>
          <BreastfeedingHydrationScene4 />
        </div>
      </Sequence>

      {/* Scene 5: Dehydration Warning Signs (18.0s - 23.5s / frames 540 - 705) */}
      <Sequence from={540} durationInFrames={165}>
        <div style={{ opacity: opacity5, width: "100%", height: "100%" }}>
          <BreastfeedingHydrationScene5 />
        </div>
      </Sequence>

      {/* Scene 6: Outro & Branding (23.0s - 30.0s / frames 690 - 900) */}
      <Sequence from={690} durationInFrames={210}>
        <div style={{ opacity: opacity6, width: "100%", height: "100%" }}>
          <BreastfeedingHydrationScene6 />
        </div>
      </Sequence>

      {/* Top Editorial Progress Bar */}
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
