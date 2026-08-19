import React from "react";
import {
  AbsoluteFill,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  Audio,
} from "remotion";
import { loadFonts } from "./Typography";

export const MobileFullScreenWalkthroughMain: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const fonts = loadFonts();

  // Scroll position keyframes (percentage offset from 0% top to 91.5% bottom)
  // Designed with deliberate pauses/holds at key sections to allow audience reading
  // 60 FPS timeline: 3300 total frames = 55 seconds
  const scrollKeyframes = [
    0,    // 0s (frame 0): Top / Hero
    300,  // 5s (frame 300): HOLD at Hero
    600,  // 10s (frame 600): Scroll to About Dt. Akhila
    960,  // 16s (frame 960): HOLD at About Dt. Akhila
    1260, // 21s (frame 1260): Scroll to Clinical Services
    1680, // 28s (frame 1680): HOLD at Clinical Services
    1980, // 33s (frame 1980): Scroll to Reviews & Nutrition Guide
    2400, // 40s (frame 2400): HOLD at Reviews & Nutrition Guide
    2700, // 45s (frame 2700): Scroll to Consultation Booking
    3300, // 55s (frame 3300): HOLD at Booking & Final CTA
  ];

  // Scroll offset positions corresponding to keyframes (%)
  const scrollPositions = [
    0.0,   // Hero top
    0.0,   // Hold Hero
    11.5,  // About section
    11.5,  // Hold About
    29.0,  // Clinical Services
    29.0,  // Hold Services
    58.0,  // Testimonials & Reviews
    58.0,  // Hold Reviews
    91.5,  // Booking & Contact bottom
    91.5,  // Hold Booking bottom
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

  // Top progress bar indicator
  const progressPercent = interpolate(frame, [0, durationInFrames], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="bg-[#FAF6F0] overflow-hidden select-none">
      {/* Background Ambient Audio */}
      <Audio src={staticFile("relaxing_sound.mp3")} volume={0.35} />

      {/* 100% Full-Screen Website View (No phone outline, no status bar, no bezels) */}
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

        {/* Floating Reading Section Toast Badge */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-[#3E5245]/90 backdrop-blur-md text-white px-6 py-2.5 rounded-full shadow-2xl border border-white/20 z-40 flex items-center gap-3 whitespace-nowrap">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span style={{ fontFamily: fonts.inter }} className="text-sm font-bold uppercase tracking-wider">
            Dhruthi Wellness • Official Website Presentation
          </span>
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
            zIndex: 50,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
