import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFonts } from "./Typography";
import { LightRays } from "./LightRays";
import { BokehParticles } from "./BokehParticles";

export const ElevatedCoverPromoMain: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fonts = loadFonts();

  // Cover Page Entrance Animations (0s - 4.5s / frames 0 - 270)
  const logoSpring = spring({
    frame,
    fps,
    config: { damping: 12, mass: 0.5, stiffness: 100 },
  });
  const logoScale = interpolate(logoSpring, [0, 1], [0.6, 1]);
  const logoOpacity = interpolate(logoSpring, [0, 1], [0, 1]);

  const titleSpring = spring({
    frame: frame - 15,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 90 },
  });
  const titleY = interpolate(titleSpring, [0, 1], [40, 0]);
  const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);

  const badgesSpring = spring({
    frame: frame - 25,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 90 },
  });
  const badgesY = interpolate(badgesSpring, [0, 1], [30, 0]);
  const badgesOpacity = interpolate(badgesSpring, [0, 1], [0, 1]);

  // Transition from Cover Page to Website Walkthrough at frame 240 (4 seconds)
  const coverOpacity = interpolate(frame, [220, 250], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const websiteOpacity = interpolate(frame, [220, 250], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Website Scroll Keyframes (from frame 240 onwards)
  // Total duration: 1800 frames = 30 seconds @ 60 FPS
  // 1. Founder Image fitted completely: 4s – 9s (frames 240 – 540) -> Hold
  // 2. Founder Achievements below image: 9s – 15s (frames 540 – 900) -> Hold
  // 3. Clinical Services & Core Philosophy: 15s – 22s (frames 900 – 1320) -> Hold
  // 4. Client Stories & Reviews: 22s – 30s (frames 1320 – 1800) -> Hold & END VIDEO
  const websiteFrame = Math.max(0, frame - 240);

  const scrollKeyframes = [
    0,    // 4s (website frame 0): Founder Image fitted completely on screen
    300,  // 9s (website frame 300): HOLD at fitted Founder Image
    420,  // 11s (website frame 420): Scroll down to Founder Achievements
    720,  // 16s (website frame 720): HOLD at Founder Achievements below image
    900,  // 19s (website frame 900): Scroll to Clinical Services
    1260, // 25s (website frame 1260): HOLD at Clinical Services
    1380, // 27s (website frame 1380): Scroll to Client Stories & Reviews
    1560, // 30s (website frame 1560): HOLD at Client Stories & END VIDEO
  ];

  const scrollPositions = [
    0.0,   // Founder Image fitted completely (Hero top area)
    0.0,   // Hold fitted Founder Image
    11.5,  // Founder Achievements (M.Sc. credentials, degrees, experience)
    11.5,  // Hold Founder Achievements
    30.0,  // Clinical Services
    30.0,  // Hold Clinical Services
    58.0,  // Client Stories & Reviews part
    58.0,  // Hold Client Stories & END VIDEO
  ];

  const totalScrollPercentage = interpolate(
    websiteFrame,
    scrollKeyframes,
    scrollPositions,
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return (
    <AbsoluteFill className="bg-[#FAF6F0] overflow-hidden select-none">
      {/* ZERO AUDIO - Completely Silent with No Background Music or Noise */}

      {/* Layer 1: Dedicated Cover Page (Frames 0 - 250) */}
      <div
        style={{ opacity: coverOpacity, zIndex: coverOpacity > 0 ? 30 : 0 }}
        className="absolute inset-0 bg-[#FAF6F0] flex flex-col justify-between p-10 select-none overflow-hidden"
      >
        <LightRays />
        <BokehParticles />

        {/* Top Brand Tag */}
        <div className="pt-6 text-center z-20">
          <span
            style={{ fontFamily: fonts.inter }}
            className="text-lg font-extrabold tracking-widest uppercase text-[#3E5245] bg-white/80 backdrop-blur-md px-6 py-2 rounded-full border border-[#94A89A]/40 shadow-sm"
          >
            OFFICIAL WEBSITE PROMOTIONAL SHOWCASE
          </span>
        </div>

        {/* Center Elevating Hero Branding Card */}
        <div className="flex-1 flex flex-col items-center justify-center text-center z-20 px-4">
          <div
            style={{
              transform: `scale(${logoScale})`,
              opacity: logoOpacity,
              boxShadow: "0 25px 50px rgba(62, 82, 69, 0.25)",
            }}
            className="w-40 h-40 rounded-full bg-white p-2 border-4 border-[#3E5245] mb-8 overflow-hidden flex items-center justify-center"
          >
            <img
              src={staticFile("assets/Logo_D_bright.png")}
              alt="Dhruthi Wellness Logo"
              className="w-full h-full object-cover rounded-full"
            />
          </div>

          <div
            style={{
              transform: `translateY(${titleY}px)`,
              opacity: titleOpacity,
            }}
          >
            <div className="inline-block bg-[#E8B4B8]/40 text-[#3E5245] px-5 py-1.5 rounded-full text-xl font-bold mb-4 tracking-wider border border-[#E8B4B8]">
              NOURISH • BALANCE • THRIVE
            </div>

            <h1
              style={{ fontFamily: fonts.playfair }}
              className="text-5xl font-bold text-[#2B2B2B] leading-tight mb-4"
            >
              Dhruthi Wellness <br />
              <span className="text-[#3E5245] italic">Website Promotional Video</span>
            </h1>

            <p
              style={{ fontFamily: fonts.poppins }}
              className="text-2xl text-[#3A2F2F]/85 font-medium max-w-lg mx-auto mb-6"
            >
              Expert Clinical & Fertility Diet Therapy <br />
              <strong className="text-[#3E5245]">Dt. Akhila Konakalla, M.Sc.</strong>
            </p>
          </div>

          {/* Elevated Credentials Badges */}
          <div
            style={{
              transform: `translateY(${badgesY}px)`,
              opacity: badgesOpacity,
            }}
            className="grid grid-cols-3 gap-4 w-full max-w-lg mt-2"
          >
            <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-[#94A89A]/40 text-center shadow-sm">
              <p style={{ fontFamily: fonts.poppins }} className="text-2xl font-extrabold text-[#3E5245]">
                500+
              </p>
              <p style={{ fontFamily: fonts.inter }} className="text-xs text-[#3A2F2F]/75 font-semibold">
                Clients Guided
              </p>
            </div>

            <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-[#94A89A]/40 text-center shadow-sm">
              <p style={{ fontFamily: fonts.poppins }} className="text-2xl font-extrabold text-[#3E5245]">
                100%
              </p>
              <p style={{ fontFamily: fonts.inter }} className="text-xs text-[#3A2F2F]/75 font-semibold">
                Custom Plans
              </p>
            </div>

            <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-[#94A89A]/40 text-center shadow-sm">
              <p style={{ fontFamily: fonts.poppins }} className="text-2xl font-extrabold text-[#3E5245]">
                95%
              </p>
              <p style={{ fontFamily: fonts.inter }} className="text-xs text-[#3A2F2F]/75 font-semibold">
                Satisfaction Rate
              </p>
            </div>
          </div>
        </div>

        {/* Footer Banner */}
        <div className="pb-6 text-center z-20">
          <p style={{ fontFamily: fonts.inter }} className="text-base font-semibold text-[#3E5245] uppercase tracking-wider">
            🌐 dhruthi-wellness.vercel.app
          </p>
        </div>
      </div>

      {/* Layer 2: 100% Clean Website View (No pill header overlays, no grids, no progress lines) */}
      <div
        style={{ opacity: websiteOpacity, zIndex: websiteOpacity > 0 ? 20 : 0 }}
        className="absolute inset-0 bg-[#FAF6F0] overflow-hidden"
      >
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
      </div>
    </AbsoluteFill>
  );
};
