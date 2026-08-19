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
import { BokehParticles } from "./BokehParticles";
import { LightRays } from "./LightRays";

export const WebsitePromoScene5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fonts = loadFonts();

  const logoSpring = spring({
    frame,
    fps,
    config: { damping: 12, mass: 0.5, stiffness: 100 },
  });

  const textSpring = spring({
    frame: frame - 12,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 90 },
  });

  const btnSpring = spring({
    frame: frame - 25,
    fps,
    config: { damping: 12, mass: 0.5, stiffness: 110 },
  });

  const pulse = interpolate(
    Math.sin((frame / 15) * Math.PI),
    [-1, 1],
    [0.98, 1.04]
  );

  return (
    <AbsoluteFill className="bg-[#FAF6F0] overflow-hidden flex flex-col items-center justify-between p-10 select-none relative">
      <LightRays />
      <BokehParticles />

      {/* Top Tag */}
      <div className="pt-8 z-20">
        <span
          style={{ fontFamily: fonts.inter }}
          className="text-lg font-extrabold tracking-widest uppercase text-[#3E5245] bg-white/80 backdrop-blur-md px-6 py-2 rounded-full border border-[#94A89A]/40 shadow-sm"
        >
          START YOUR WELLNESS JOURNEY TODAY
        </span>
      </div>

      {/* Main Hero Card */}
      <div className="flex-1 flex flex-col items-center justify-center text-center z-20 px-4">
        {/* Logo */}
        <div
          style={{
            transform: `scale(${interpolate(logoSpring, [0, 1], [0.6, 1])})`,
            opacity: interpolate(logoSpring, [0, 1], [0, 1]),
            boxShadow: "0 20px 40px rgba(62, 82, 69, 0.2)",
          }}
          className="w-36 h-36 rounded-full bg-white p-2 border-4 border-[#94A89A] mb-8 overflow-hidden flex items-center justify-center"
        >
          <img
            src={staticFile("assets/Logo_D_bright.png")}
            alt="Dhruthi Wellness"
            className="w-full h-full object-cover rounded-full"
          />
        </div>

        {/* Title */}
        <div
          style={{
            transform: `translateY(${interpolate(textSpring, [0, 1], [30, 0])}px)`,
            opacity: interpolate(textSpring, [0, 1], [0, 1]),
          }}
        >
          <h2
            style={{ fontFamily: fonts.playfair }}
            className="text-6xl font-bold text-[#2B2B2B] leading-tight mb-4"
          >
            Take The First Step To <br />
            <span className="text-[#3E5245] italic">Sustainable Health</span>
          </h2>

          <p
            style={{ fontFamily: fonts.poppins }}
            className="text-2xl text-[#3A2F2F]/80 mb-8 max-w-lg mx-auto"
          >
            Get your customized clinical nutrition plan and 1-on-1 expert guidance today.
          </p>
        </div>

        {/* Animated CTA Button */}
        <div
          style={{
            transform: `scale(${interpolate(btnSpring, [0, 1], [0.7, 1]) * pulse})`,
            opacity: interpolate(btnSpring, [0, 1], [0, 1]),
            boxShadow: "0 20px 40px rgba(62, 82, 69, 0.3)",
          }}
          className="bg-[#3E5245] text-white px-10 py-5 rounded-full text-3xl font-extrabold tracking-wide uppercase cursor-pointer border-2 border-white flex items-center gap-4 mb-8"
        >
          <span>📅 Book Consultation</span>
          <span>➔</span>
        </div>

        {/* Website URL Box */}
        <div className="bg-white/90 backdrop-blur-md px-8 py-4 rounded-2xl border-2 border-[#94A89A] shadow-md inline-block">
          <p style={{ fontFamily: fonts.inter }} className="text-sm uppercase text-[#94A89A] font-bold tracking-widest mb-1">
            Official Website
          </p>
          <p
            style={{ fontFamily: fonts.poppins }}
            className="text-3xl font-extrabold text-[#3E5245] tracking-tight"
          >
            dhruthi-wellness.vercel.app
          </p>
        </div>
      </div>

      {/* Footer Credentials */}
      <div className="pb-8 text-center z-20">
        <p
          style={{ fontFamily: fonts.poppins }}
          className="text-xl font-semibold text-[#3A2F2F]/80"
        >
          Dt. Akhila Konakalla, M.Sc. Food & Nutrition
        </p>
      </div>
    </AbsoluteFill>
  );
};
