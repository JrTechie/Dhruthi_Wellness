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

export const MetabolismScene5: React.FC = () => {
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

  // Sequenced entrance springs for tips
  const t1Spring = spring({ frame: frame - 20, fps, config: { damping: 12, stiffness: 100 } });
  const t2Spring = spring({ frame: frame - 32, fps, config: { damping: 12, stiffness: 100 } });
  const t3Spring = spring({ frame: frame - 44, fps, config: { damping: 12, stiffness: 100 } });
  const t4Spring = spring({ frame: frame - 56, fps, config: { damping: 12, stiffness: 100 } });
  const t5Spring = spring({ frame: frame - 68, fps, config: { damping: 12, stiffness: 100 } });

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
          src={staticFile("assets/metabolism_scene5_dietitian.png")}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      </CameraTransition>

      <AbsoluteFill className="flex flex-col justify-center items-center px-12 z-20">
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
              className="text-[40px] font-extrabold tracking-wide uppercase"
            >
              Support metabolism naturally
            </h2>
          </div>

          {/* Grid of Tips (Each card is 30% transparent) */}
          <div className="grid grid-cols-2 gap-5 w-full">
            <div
              style={{
                ...getStyle(t1Spring),
                backgroundColor: "rgba(250, 248, 245, 0.30)", // Exactly 30% transparency
                borderColor: "rgba(45, 79, 62, 0.20)",
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)",
                boxShadow: "0 10px 30px rgba(28, 40, 38, 0.05)",
              }}
              className="flex items-center space-x-4 p-4 rounded-2xl border"
            >
              <div className="bg-white/40 p-2.5 rounded-full flex items-center justify-center border border-white/40">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2D4F3E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
                </svg>
              </div>
              <span style={{ fontFamily: fonts.body }} className="text-[#1C2826] text-[24px] font-bold">
                Eat enough protein
              </span>
            </div>

            <div
              style={{
                ...getStyle(t2Spring),
                backgroundColor: "rgba(250, 248, 245, 0.30)", // Exactly 30% transparency
                borderColor: "rgba(45, 79, 62, 0.20)",
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)",
                boxShadow: "0 10px 30px rgba(28, 40, 38, 0.05)",
              }}
              className="flex items-center space-x-4 p-4 rounded-2xl border"
            >
              <div className="bg-white/40 p-2.5 rounded-full flex items-center justify-center border border-white/40">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2D4F3E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m6.5 6.5 11 11M21 21l-3-3M3 3l3 3M18.5 5.5A3.5 3.5 0 1 1 23.5 10.5M5.5 18.5A3.5 3.5 0 1 1 10.5 23.5" />
                </svg>
              </div>
              <span style={{ fontFamily: fonts.body }} className="text-[#1C2826] text-[24px] font-bold">
                Strength training
              </span>
            </div>

            <div
              style={{
                ...getStyle(t3Spring),
                backgroundColor: "rgba(250, 248, 245, 0.30)", // Exactly 30% transparency
                borderColor: "rgba(45, 79, 62, 0.20)",
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)",
                boxShadow: "0 10px 30px rgba(28, 40, 38, 0.05)",
              }}
              className="flex items-center space-x-4 p-4 rounded-2xl border"
            >
              <div className="bg-white/40 p-2.5 rounded-full flex items-center justify-center border border-white/40">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2D4F3E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                </svg>
              </div>
              <span style={{ fontFamily: fonts.body }} className="text-[#1C2826] text-[24px] font-bold">
                Sleep 7–9 hours
              </span>
            </div>

            <div
              style={{
                ...getStyle(t4Spring),
                backgroundColor: "rgba(250, 248, 245, 0.30)", // Exactly 30% transparency
                borderColor: "rgba(45, 79, 62, 0.20)",
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)",
                boxShadow: "0 10px 30px rgba(28, 40, 38, 0.05)",
              }}
              className="flex items-center space-x-4 p-4 rounded-2xl border"
            >
              <div className="bg-white/40 p-2.5 rounded-full flex items-center justify-center border border-white/40">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2D4F3E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                  <path d="M16 3h5v5M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                  <path d="M8 21h-5v-5" />
                </svg>
              </div>
              <span style={{ fontFamily: fonts.body }} className="text-[#1C2826] text-[24px] font-bold">
                Stay active daily
              </span>
            </div>

            <div
              style={{
                ...getStyle(t5Spring),
                backgroundColor: "rgba(142, 167, 136, 0.30)", // 30% Green tinted highlighted card
                borderColor: "rgba(45, 79, 62, 0.35)",
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)",
                boxShadow: "0 10px 30px rgba(28, 40, 38, 0.05)",
              }}
              className="col-span-2 flex items-center justify-center space-x-4 p-4 rounded-2xl border-2 max-w-[500px] mx-auto w-full"
            >
              <div className="bg-white/50 p-2.5 rounded-full flex items-center justify-center border border-[#2D4F3E]/20">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2D4F3E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22a7 7 0 0 0 7-7c0-4.3-7-13-7-13s-7 8.7-7 13a7 7 0 0 0 7 7Z" />
                </svg>
              </div>
              <span
                style={{ fontFamily: fonts.outfit, color: "#2D4F3E" }}
                className="text-[26px] font-black tracking-tight uppercase"
              >
                Stay hydrated
              </span>
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
