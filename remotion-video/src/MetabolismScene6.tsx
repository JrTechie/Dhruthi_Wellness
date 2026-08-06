import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  Img,
} from "remotion";
import { CameraTransition } from "./CameraTransition";
import { loadFonts } from "./Typography";

export const MetabolismScene6: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fonts = loadFonts();

  // Glass card entrance
  const cardSpring = spring({
    frame: frame - 5,
    fps,
    config: { damping: 15, mass: 0.6, stiffness: 90 },
  });
  const cardY = interpolate(cardSpring, [0, 1], [60, 0]);
  const cardOpacity = interpolate(cardSpring, [0, 1], [0, 1]);

  // Transition to CTA at frame 55
  const showCTA = frame >= 55;
  const ctaSpring = spring({
    frame: frame - 55,
    fps,
    config: { damping: 12, mass: 0.5, stiffness: 100 },
  });
  const ctaScale = interpolate(ctaSpring, [0, 1], [0.85, 1]);
  const ctaOpacity = interpolate(ctaSpring, [0, 1], [0, 1]);

  return (
    <AbsoluteFill className="bg-[#FAF8F5] overflow-hidden select-none">
      <CameraTransition type="zoomIn" durationInFrames={105}>
        {/* Background Image */}
        <Img
          src={staticFile("assets/metabolism_scene6_happy.png")}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      </CameraTransition>

      <AbsoluteFill className="flex flex-col justify-center items-center px-12 z-20">
        {/* Outro / CTA Card (30% transparent) */}
        <div
          style={{
            transform: `translateY(${cardY}px)`,
            opacity: cardOpacity,
            backgroundColor: "rgba(250, 248, 245, 0.30)", // Exactly 30% transparency
            borderColor: "rgba(45, 79, 62, 0.20)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            boxShadow: "0 20px 50px rgba(28, 40, 38, 0.08)",
          }}
          className="w-full max-w-[850px] rounded-[36px] border-2 p-10 flex flex-col items-center text-center"
        >
          {!showCTA ? (
            /* Outro Text Phase (0-55 frames) */
            <div className="flex flex-col items-center">
              <h1
                style={{
                  fontFamily: fonts.italiana,
                  color: "#1C2826",
                }}
                className="text-[48px] font-bold leading-tight tracking-tight mb-2"
              >
                Healthy Habits Build
              </h1>
              <h1
                style={{
                  fontFamily: fonts.italiana,
                  color: "#2D4F3E",
                }}
                className="text-[52px] font-extrabold leading-tight tracking-tight"
              >
                A Healthier Metabolism.
              </h1>
            </div>
          ) : (
            /* CTA Phase (55-105 frames) */
            <div
              style={{
                transform: `scale(${ctaScale})`,
                opacity: ctaOpacity,
              }}
              className="flex flex-col items-center w-full"
            >
              <h2
                style={{
                  fontFamily: fonts.outfit,
                  color: "#C0502E",
                }}
                className="text-[42px] font-black tracking-wide uppercase mb-2"
              >
                Follow Dhruthi Wellness
              </h2>

              <div className="flex items-center space-x-2 mb-8">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2D4F3E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                </svg>
                <p
                  style={{
                    fontFamily: fonts.body,
                    color: "#4A5D54",
                  }}
                  className="text-[24px] font-bold"
                >
                  for evidence-based nutrition tips
                </p>
              </div>

              {/* Outstanding solid button for visual CTA weight */}
              <div
                style={{
                  backgroundColor: "#2D4F3E",
                  color: "#FAF8F5",
                }}
                className="flex items-center space-x-3 px-8 py-4 rounded-full font-bold text-[22px] shadow-lg uppercase tracking-wider border border-[#FAF8F5]/10 cursor-pointer"
              >
                <span>Book An Assessment</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FAF8F5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </div>
            </div>
          )}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
