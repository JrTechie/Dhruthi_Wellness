import React from "react";
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  Audio,
} from "remotion";
import { WalkthroughScene1_Hero } from "./WalkthroughScene1_Hero";
import { WalkthroughScene2_About } from "./WalkthroughScene2_About";
import { WalkthroughScene3_Services } from "./WalkthroughScene3_Services";
import { WalkthroughScene4_Features } from "./WalkthroughScene4_Features";
import { WalkthroughScene5_BookingCTA } from "./WalkthroughScene5_BookingCTA";

export const WebsiteWalkthroughMain: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Crossfade opacity transitions
  const opacity1 = interpolate(frame, [240, 270], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const opacity2 = interpolate(frame, [240, 270, 480, 510], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const opacity3 = interpolate(frame, [480, 510, 720, 750], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const opacity4 = interpolate(frame, [720, 750, 960, 990], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const opacity5 = interpolate(frame, [960, 990], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Top progress indicator
  const progressPercent = interpolate(frame, [0, durationInFrames], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="bg-[#FAF6F0]">
      {/* Background Ambient Audio */}
      <Audio src={staticFile("relaxing_sound.mp3")} volume={0.35} />

      {/* Scene 1: Hero Section */}
      <Sequence from={0} durationInFrames={270}>
        <div style={{ opacity: opacity1, width: "100%", height: "100%" }}>
          <WalkthroughScene1_Hero />
        </div>
      </Sequence>

      {/* Scene 2: Founder About Section */}
      <Sequence from={240} durationInFrames={270}>
        <div style={{ opacity: opacity2, width: "100%", height: "100%" }}>
          <WalkthroughScene2_About />
        </div>
      </Sequence>

      {/* Scene 3: Clinical Services */}
      <Sequence from={480} durationInFrames={270}>
        <div style={{ opacity: opacity3, width: "100%", height: "100%" }}>
          <WalkthroughScene3_Services />
        </div>
      </Sequence>

      {/* Scene 4: Testimonials & Features */}
      <Sequence from={720} durationInFrames={270}>
        <div style={{ opacity: opacity4, width: "100%", height: "100%" }}>
          <WalkthroughScene4_Features />
        </div>
      </Sequence>

      {/* Scene 5: Booking Modal & Call To Action */}
      <Sequence from={960} durationInFrames={270}>
        <div style={{ opacity: opacity5, width: "100%", height: "100%" }}>
          <WalkthroughScene5_BookingCTA />
        </div>
      </Sequence>

      {/* Top Editorial Progress Bar */}
      <div
        style={{
          width: `${progressPercent}%`,
          height: "6px",
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
