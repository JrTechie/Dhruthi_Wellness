import React from "react";
import {
  AbsoluteFill,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  Audio,
} from "remotion";
import { MobileBrowserFrame } from "./MobileBrowserFrame";
import { loadFonts } from "./Typography";

export const MobileContinuousWalkthroughMain: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const fonts = loadFonts();

  // Smooth, continuous top-to-bottom scroll offset calculation
  // Total website height ratio relative to viewport height
  // The screenshot is ~12.2 MB ultra high resolution mobile fullpage
  const totalScrollPercentage = interpolate(
    frame,
    [0, durationInFrames],
    [0, 91.5], // Scrolls smoothly from top (0%) to bottom (91.5%)
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
    <AbsoluteFill className="bg-[#FAF6F0] select-none">
      {/* Background Ambient Audio */}
      <Audio src={staticFile("relaxing_sound.mp3")} volume={0.35} />

      <MobileBrowserFrame>
        <div className="w-full h-full relative overflow-hidden bg-[#FAF6F0]">
          {/* Continuous Full-Page Mobile Website Image */}
          <div
            style={{
              transform: `translateY(-${totalScrollPercentage}%)`,
              transition: "transform 0.05s linear",
            }}
            className="w-full relative"
          >
            <img
              src={staticFile("assets/walkthrough_mobile/mobile_fullpage.jpg")}
              alt="Dhruthi Wellness Mobile Website"
              className="w-full object-cover block"
            />
          </div>

          {/* Sleek Floating Bottom Status Indicator (No grids or slides) */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-[#3E5245]/90 backdrop-blur-md text-white px-5 py-2 rounded-full shadow-lg border border-white/20 z-40 flex items-center gap-2.5 whitespace-nowrap">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span style={{ fontFamily: fonts.inter }} className="text-xs font-bold uppercase tracking-wider">
              Dhruthi Wellness • Mobile Website Presentation
            </span>
          </div>

          {/* Subtle Top Editorial Progress Line */}
          <div
            style={{
              width: `${progressPercent}%`,
              height: "4px",
              background: "linear-gradient(to right, #3E5245, #94A89A, #E8B4B8)",
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 50,
            }}
          />
        </div>
      </MobileBrowserFrame>
    </AbsoluteFill>
  );
};
