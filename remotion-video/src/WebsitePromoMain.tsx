import React from "react";
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { WebsitePromoScene1 } from "./WebsitePromoScene1";
import { WebsitePromoScene2 } from "./WebsitePromoScene2";
import { WebsitePromoScene3 } from "./WebsitePromoScene3";
import { WebsitePromoScene4 } from "./WebsitePromoScene4";
import { WebsitePromoScene5 } from "./WebsitePromoScene5";

export const WebsitePromoMain: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Opacity transitions between scenes
  const opacity1 = interpolate(frame, [180, 210], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const opacity2 = interpolate(frame, [180, 210, 390, 420], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const opacity3 = interpolate(frame, [390, 420, 600, 630], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const opacity4 = interpolate(frame, [600, 630, 810, 840], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const opacity5 = interpolate(frame, [810, 840], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Top Progress Bar
  const progressPercent = interpolate(frame, [0, durationInFrames], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="bg-[#FAF6F0]">
      {/* Scene 1: Hero & Brand */}
      <Sequence from={0} durationInFrames={210}>
        <div style={{ opacity: opacity1, width: "100%", height: "100%" }}>
          <WebsitePromoScene1 />
        </div>
      </Sequence>

      {/* Scene 2: Programs */}
      <Sequence from={180} durationInFrames={240}>
        <div style={{ opacity: opacity2, width: "100%", height: "100%" }}>
          <WebsitePromoScene2 />
        </div>
      </Sequence>

      {/* Scene 3: Experience & Features */}
      <Sequence from={390} durationInFrames={240}>
        <div style={{ opacity: opacity3, width: "100%", height: "100%" }}>
          <WebsitePromoScene3 />
        </div>
      </Sequence>

      {/* Scene 4: Core Philosophy */}
      <Sequence from={600} durationInFrames={240}>
        <div style={{ opacity: opacity4, width: "100%", height: "100%" }}>
          <WebsitePromoScene4 />
        </div>
      </Sequence>

      {/* Scene 5: Call to Action */}
      <Sequence from={810} durationInFrames={240}>
        <div style={{ opacity: opacity5, width: "100%", height: "100%" }}>
          <WebsitePromoScene5 />
        </div>
      </Sequence>

      {/* Brand Progress Bar */}
      <div
        style={{
          width: `${progressPercent}%`,
          height: "8px",
          background: "linear-gradient(to right, #3E5245, #94A89A, #E8B4B8)",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 60,
        }}
      />
    </AbsoluteFill>
  );
};
