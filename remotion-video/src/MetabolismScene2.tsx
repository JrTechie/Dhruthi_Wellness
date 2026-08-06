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

export const MetabolismScene2: React.FC = () => {
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

  // Sequenced entrance springs for the list items
  const item1Spring = spring({ frame: frame - 20, fps, config: { damping: 12, stiffness: 100 } });
  const item2Spring = spring({ frame: frame - 30, fps, config: { damping: 12, stiffness: 100 } });
  const item3Spring = spring({ frame: frame - 40, fps, config: { damping: 12, stiffness: 100 } });
  const item4Spring = spring({ frame: frame - 50, fps, config: { damping: 12, stiffness: 100 } });

  const getStyle = (sp: number) => {
    const scale = interpolate(sp, [0, 1], [0.85, 1]);
    const opacity = interpolate(sp, [0, 1], [0, 1]);
    return { transform: `scale(${scale})`, opacity };
  };

  return (
    <AbsoluteFill className="bg-[#FAF8F5] overflow-hidden select-none">
      <CameraTransition type="zoomOut" durationInFrames={180}>
        {/* Background Image */}
        <Img
          src={staticFile("assets/metabolism_scene2_energy.png")}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      </CameraTransition>

      <AbsoluteFill className="flex flex-col justify-center items-center px-12 z-20">
        {/* Main Content Area */}
        <div
          style={{
            transform: `translateY(${cardY}px)`,
            opacity: cardOpacity,
          }}
          className="w-full max-w-[920px] flex flex-col items-center"
        >
          {/* Header Card (30% transparent) */}
          <div
            style={{
              backgroundColor: "rgba(250, 248, 245, 0.30)", // Exactly 30% transparency
              borderColor: "rgba(45, 79, 62, 0.20)",
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
              boxShadow: "0 10px 30px rgba(28, 40, 38, 0.05)",
            }}
            className="w-full rounded-[24px] border p-6 flex flex-col items-center text-center mb-6"
          >
            <h2
              style={{
                fontFamily: fonts.outfit,
                color: "#C0502E",
              }}
              className="text-[40px] font-extrabold tracking-wide uppercase mb-2"
            >
              What is metabolism?
            </h2>
            <p
              style={{
                fontFamily: fonts.body,
                color: "#1C2826",
              }}
              className="text-[28px] font-bold"
            >
              It's how your body converts food into energy.
            </p>
          </div>

          {/* Grid of Functions (Each card is 30% transparent) */}
          <div className="grid grid-cols-2 gap-6 w-full">
            <div
              style={{
                ...getStyle(item1Spring),
                backgroundColor: "rgba(250, 248, 245, 0.30)", // Exactly 30% transparency
                borderColor: "rgba(45, 79, 62, 0.20)",
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)",
                boxShadow: "0 10px 30px rgba(28, 40, 38, 0.05)",
              }}
              className="flex items-center space-x-4 p-5 rounded-2xl border"
            >
              <div className="bg-white/40 p-2.5 rounded-full flex items-center justify-center border border-white/40">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#C0502E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span style={{ fontFamily: fonts.outfit }} className="text-[#1C2826] text-[24px] font-extrabold">
                  Heartbeat
                </span>
                <span style={{ fontFamily: fonts.body }} className="text-[#4A5D54] text-[18px] font-bold">
                  Pumping oxygen
                </span>
              </div>
            </div>

            <div
              style={{
                ...getStyle(item2Spring),
                backgroundColor: "rgba(250, 248, 245, 0.30)", // Exactly 30% transparency
                borderColor: "rgba(45, 79, 62, 0.20)",
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)",
                boxShadow: "0 10px 30px rgba(28, 40, 38, 0.05)",
              }}
              className="flex items-center space-x-4 p-5 rounded-2xl border"
            >
              <div className="bg-white/40 p-2.5 rounded-full flex items-center justify-center border border-white/40">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#2D4F3E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 8h16a2 2 0 1 0-2-2" />
                  <path d="M6 12h16a2 2 0 1 1-2 2" />
                  <path d="M3 16h10a2 2 0 1 0-2-2" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span style={{ fontFamily: fonts.outfit }} className="text-[#1C2826] text-[24px] font-extrabold">
                  Breathing
                </span>
                <span style={{ fontFamily: fonts.body }} className="text-[#4A5D54] text-[18px] font-bold">
                  Diaphragm power
                </span>
              </div>
            </div>

            <div
              style={{
                ...getStyle(item3Spring),
                backgroundColor: "rgba(250, 248, 245, 0.30)", // Exactly 30% transparency
                borderColor: "rgba(45, 79, 62, 0.20)",
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)",
                boxShadow: "0 10px 30px rgba(28, 40, 38, 0.05)",
              }}
              className="flex items-center space-x-4 p-5 rounded-2xl border"
            >
              <div className="bg-white/40 p-2.5 rounded-full flex items-center justify-center border border-white/40">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#2D4F3E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1 0-4.12 2.5 2.5 0 0 1 0-4.88 2.5 2.5 0 0 1 0-4.12A2.5 2.5 0 0 1 9.5 2Z" />
                  <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 0-4.12 2.5 2.5 0 0 0 0-4.88 2.5 2.5 0 0 0 0-4.12A2.5 2.5 0 0 0 14.5 2Z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span style={{ fontFamily: fonts.outfit }} className="text-[#1C2826] text-[24px] font-extrabold">
                  Brain
                </span>
                <span style={{ fontFamily: fonts.body }} className="text-[#4A5D54] text-[18px] font-bold">
                  Thinking & signals
                </span>
              </div>
            </div>

            <div
              style={{
                ...getStyle(item4Spring),
                backgroundColor: "rgba(250, 248, 245, 0.30)", // Exactly 30% transparency
                borderColor: "rgba(45, 79, 62, 0.20)",
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)",
                boxShadow: "0 10px 30px rgba(28, 40, 38, 0.05)",
              }}
              className="flex items-center space-x-4 p-5 rounded-2xl border"
            >
              <div className="bg-white/40 p-2.5 rounded-full flex items-center justify-center border border-white/40">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#C0502E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m18 8-4-4-4 4" />
                  <path d="M14 4v12a4 4 0 0 1-4 4H4" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span style={{ fontFamily: fonts.outfit }} className="text-[#1C2826] text-[24px] font-extrabold">
                  Movement
                </span>
                <span style={{ fontFamily: fonts.body }} className="text-[#4A5D54] text-[18px] font-bold">
                  Walking & posture
                </span>
              </div>
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
