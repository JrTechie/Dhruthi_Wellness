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

export const MetabolismScene3: React.FC = () => {
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

  // Bullet entrance springs
  const b1Spring = spring({ frame: frame - 20, fps, config: { damping: 12, stiffness: 110 } });
  const b2Spring = spring({ frame: frame - 32, fps, config: { damping: 12, stiffness: 110 } });
  const b3Spring = spring({ frame: frame - 44, fps, config: { damping: 12, stiffness: 110 } });
  const b4Spring = spring({ frame: frame - 56, fps, config: { damping: 12, stiffness: 110 } });

  const getStyle = (sp: number) => {
    const scale = interpolate(sp, [0, 1], [0.85, 1]);
    const opacity = interpolate(sp, [0, 1], [0, 1]);
    return { transform: `scale(${scale})`, opacity };
  };

  return (
    <AbsoluteFill className="bg-[#FAF8F5] overflow-hidden select-none">
      <CameraTransition type="dollyPan" durationInFrames={210}>
        {/* Background Image */}
        <Img
          src={staticFile("assets/metabolism_scene3_lifestyle.png")}
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
              Your metabolism works...
            </h2>
          </div>

          {/* Grid of Bullets (Each card is 30% transparent) */}
          <div className="grid grid-cols-2 gap-6 w-full">
            <div
              style={{
                ...getStyle(b1Spring),
                backgroundColor: "rgba(250, 248, 245, 0.30)", // Exactly 30% transparency
                borderColor: "rgba(45, 79, 62, 0.20)",
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)",
                boxShadow: "0 10px 30px rgba(28, 40, 38, 0.05)",
              }}
              className="flex items-center space-x-4 p-5 rounded-2xl border"
            >
              <div className="bg-white/40 p-2.5 rounded-full flex items-center justify-center border border-white/40">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2D4F3E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 17h20M6 8v9" />
                </svg>
              </div>
              <span style={{ fontFamily: fonts.body }} className="text-[#1C2826] text-[24px] font-bold">
                While sleeping
              </span>
            </div>

            <div
              style={{
                ...getStyle(b2Spring),
                backgroundColor: "rgba(250, 248, 245, 0.30)", // Exactly 30% transparency
                borderColor: "rgba(45, 79, 62, 0.20)",
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)",
                boxShadow: "0 10px 30px rgba(28, 40, 38, 0.05)",
              }}
              className="flex items-center space-x-4 p-5 rounded-2xl border"
            >
              <div className="bg-white/40 p-2.5 rounded-full flex items-center justify-center border border-white/40">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2D4F3E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="5" r="1" />
                  <path d="m10 10-2 7-3 5M12 9v6l3 4" />
                </svg>
              </div>
              <span style={{ fontFamily: fonts.body }} className="text-[#1C2826] text-[24px] font-bold">
                While walking
              </span>
            </div>

            <div
              style={{
                ...getStyle(b3Spring),
                backgroundColor: "rgba(250, 248, 245, 0.30)", // Exactly 30% transparency
                borderColor: "rgba(45, 79, 62, 0.20)",
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)",
                boxShadow: "0 10px 30px rgba(28, 40, 38, 0.05)",
              }}
              className="flex items-center space-x-4 p-5 rounded-2xl border"
            >
              <div className="bg-white/40 p-2.5 rounded-full flex items-center justify-center border border-white/40">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2D4F3E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
              </div>
              <span style={{ fontFamily: fonts.body }} className="text-[#1C2826] text-[24px] font-bold">
                While thinking
              </span>
            </div>

            <div
              style={{
                ...getStyle(b4Spring),
                backgroundColor: "rgba(142, 167, 136, 0.30)", // 30% Green tinted highlighted card
                borderColor: "rgba(45, 79, 62, 0.35)",
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)",
                boxShadow: "0 10px 30px rgba(28, 40, 38, 0.05)",
              }}
              className="flex items-center space-x-4 p-5 rounded-2xl border-2"
            >
              <div className="bg-white/50 p-2.5 rounded-full flex items-center justify-center border border-[#2D4F3E]/20">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2D4F3E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
              </div>
              <span
                style={{ fontFamily: fonts.outfit, color: "#2D4F3E" }}
                className="text-[26px] font-black tracking-tight"
              >
                Every single second
              </span>
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
