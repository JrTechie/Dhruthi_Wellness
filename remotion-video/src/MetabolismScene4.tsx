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

export const MetabolismScene4: React.FC = () => {
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

  // Sequenced entrance springs for factors
  const f1Spring = spring({ frame: frame - 20, fps, config: { damping: 12, stiffness: 100 } });
  const f2Spring = spring({ frame: frame - 32, fps, config: { damping: 12, stiffness: 100 } });
  const f3Spring = spring({ frame: frame - 44, fps, config: { damping: 12, stiffness: 100 } });
  const f4Spring = spring({ frame: frame - 56, fps, config: { damping: 12, stiffness: 100 } });
  const f5Spring = spring({ frame: frame - 68, fps, config: { damping: 12, stiffness: 100 } });

  const getStyle = (sp: number) => {
    const scale = interpolate(sp, [0, 1], [0.85, 1]);
    const opacity = interpolate(sp, [0, 1], [0, 1]);
    return { transform: `scale(${scale})`, opacity };
  };

  return (
    <AbsoluteFill className="bg-[#FAF8F5] overflow-hidden select-none">
      <CameraTransition type="zoomIn" durationInFrames={210}>
        {/* Background Image */}
        <Img
          src={staticFile("assets/metabolism_scene4_montage.png")}
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
              What really affects metabolism?
            </h2>
          </div>

          {/* Grid of Factors (Each card is 30% transparent) */}
          <div className="grid grid-cols-2 gap-5 w-full">
            <div
              style={{
                ...getStyle(f1Spring),
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
                Muscle mass
              </span>
            </div>

            <div
              style={{
                ...getStyle(f2Spring),
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
                Physical activity
              </span>
            </div>

            <div
              style={{
                ...getStyle(f3Spring),
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
                Sleep cycles
              </span>
            </div>

            <div
              style={{
                ...getStyle(f4Spring),
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
                  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                  <path d="M2 21c0-3 1.85-5.36 5.08-6" />
                </svg>
              </div>
              <span style={{ fontFamily: fonts.body }} className="text-[#1C2826] text-[24px] font-bold">
                Targeted nutrition
              </span>
            </div>

            <div
              style={{
                ...getStyle(f5Spring),
                backgroundColor: "rgba(224, 122, 95, 0.30)", // 30% Orange tinted highlighted card
                borderColor: "rgba(192, 80, 46, 0.35)",
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)",
                boxShadow: "0 10px 30px rgba(28, 40, 38, 0.05)",
              }}
              className="col-span-2 flex items-center justify-center space-x-4 p-4 rounded-2xl border-2 max-w-[500px] mx-auto w-full"
            >
              <div className="bg-white/50 p-2.5 rounded-full flex items-center justify-center border border-[#C0502E]/20">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C0502E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 12h8" />
                </svg>
              </div>
              <span
                style={{ fontFamily: fonts.outfit, color: "#C0502E" }}
                className="text-[26px] font-black tracking-tight uppercase"
              >
                Stress management
              </span>
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
