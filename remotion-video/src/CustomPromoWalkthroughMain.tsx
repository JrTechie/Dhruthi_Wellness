import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  Audio,
} from "remotion";
import { loadFonts } from "./Typography";

export const CustomPromoWalkthroughMain: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const fonts = loadFonts();

  // Intro Title Banner Spring Animation
  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 90 },
  });
  const titleY = interpolate(titleSpring, [0, 1], [-60, 0]);
  const titleOpacity = interpolate(
    frame,
    [0, 20, 200, 240],
    [0, 1, 1, 0.95],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Exact Stop Keyframes Timeline (60 FPS, Total = 2400 frames / 40 seconds)
  // 1. Founder Image: 0s – 4s (Hold 3-4s)
  // 2. Founder Info below image: 7s – 12s (Hold 5s)
  // 3. Core Philosophy: 15s – 21s (Hold 6s)
  // 4. Nutritional Guide & Services: 24s – 30s (Hold 6s)
  // 5. Client Stories & Reviews: 33s – 40s (Hold 7s -> End)
  const scrollKeyframes = [
    0,    // 0s: Hero / Founder Image
    240,  // 4s: HOLD at Founder Image
    420,  // 7s: Scroll to Founder Info
    720,  // 12s: HOLD at Founder Info below image
    900,  // 15s: Scroll to Core Philosophy
    1260, // 21s: HOLD at Core Philosophy
    1440, // 24s: Scroll to Nutritional Guide
    1800, // 30s: HOLD at Nutritional Guide
    1980, // 33s: Scroll to Client Stories
    2400, // 40s: HOLD at Client Stories & END VIDEO
  ];

  // Scroll offset positions (%) corresponding to exact section targets
  const scrollPositions = [
    0.0,   // Founder Image / Top Hero
    0.0,   // Hold Founder Image
    11.5,  // Founder Info below image (M.Sc. credentials & bio)
    11.5,  // Hold Founder Info
    20.0,  // Core Philosophy (Zero starvation & lifestyle habits)
    20.0,  // Hold Core Philosophy
    32.0,  // Nutritional Guide & Services
    32.0,  // Hold Nutritional Guide
    58.0,  // Client Stories & Reviews
    58.0,  // Hold Client Stories
  ];

  const totalScrollPercentage = interpolate(
    frame,
    scrollKeyframes,
    scrollPositions,
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Progress Bar
  const progressPercent = interpolate(frame, [0, durationInFrames], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="bg-[#FAF6F0] overflow-hidden select-none">
      {/* Background Audio */}
      <Audio src={staticFile("relaxing_sound.mp3")} volume={0.35} />

      {/* 100% Full-Screen Website View */}
      <div className="w-full h-full relative overflow-hidden bg-[#FAF6F0]">
        <div
          style={{
            transform: `translateY(-${totalScrollPercentage}%)`,
            transition: "transform 0.05s ease-out",
          }}
          className="w-full relative"
        >
          <img
            src={staticFile("assets/walkthrough_mobile/mobile_fullpage.jpg")}
            alt="Dhruthi Wellness Fullscreen Mobile Website"
            className="w-full object-cover block"
          />
        </div>

        {/* Video Title Header Overlay */}
        <div
          style={{
            transform: `translateY(${titleY}px)`,
            opacity: titleOpacity,
          }}
          className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-[#3E5245]/95 backdrop-blur-md text-white py-3 px-8 rounded-full shadow-2xl border-2 border-white/20 z-50 text-center whitespace-nowrap"
        >
          <h1
            style={{ fontFamily: fonts.poppins }}
            className="text-xl font-bold tracking-wide uppercase text-white flex items-center gap-3"
          >
            <span>🌿</span>
            <span>Dhruthi Wellness Site Promotional Video</span>
          </h1>
        </div>

        {/* Top Progress Line */}
        <div
          style={{
            width: `${progressPercent}%`,
            height: "5px",
            background: "linear-gradient(to right, #3E5245, #94A89A, #E8B4B8)",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 60,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
