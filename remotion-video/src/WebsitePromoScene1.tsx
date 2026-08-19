import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFonts, EDITORIAL_COLORS } from "./Typography";
import { LightRays } from "./LightRays";
import { BokehParticles } from "./BokehParticles";

export const WebsitePromoScene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fonts = loadFonts();

  // Entrance animations
  const logoSpring = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 90 },
  });
  const logoScale = interpolate(logoSpring, [0, 1], [0.7, 1]);
  const logoOpacity = interpolate(logoSpring, [0, 1], [0, 1]);

  const textSpring = spring({
    frame: frame - 15,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 90 },
  });
  const textY = interpolate(textSpring, [0, 1], [40, 0]);
  const textOpacity = interpolate(textSpring, [0, 1], [0, 1]);

  const imageSpring = spring({
    frame: frame - 25,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 90 },
  });
  const imageScale = interpolate(imageSpring, [0, 1], [0.8, 1]);
  const imageOpacity = interpolate(imageSpring, [0, 1], [0, 1]);

  const badgesSpring = spring({
    frame: frame - 35,
    fps,
    config: { damping: 15, mass: 0.7, stiffness: 80 },
  });
  const badgesY = interpolate(badgesSpring, [0, 1], [30, 0]);
  const badgesOpacity = interpolate(badgesSpring, [0, 1], [0, 1]);

  return (
    <AbsoluteFill className="bg-[#FAF6F0] overflow-hidden flex flex-col justify-between p-8 select-none">
      <LightRays />
      <BokehParticles />

      {/* Top Header & Brand Tag */}
      <div
        style={{ transform: `scale(${logoScale})`, opacity: logoOpacity }}
        className="w-full flex items-center justify-between pt-6 z-20"
      >
        <div className="flex items-center gap-4 bg-white/80 backdrop-blur-md px-6 py-3 rounded-full border border-[#94A89A]/30 shadow-md">
          <img
            src={staticFile("assets/Logo_D_bright.png")}
            alt="Logo"
            className="w-12 h-12 rounded-full object-cover border-2 border-[#3E5245]"
          />
          <span
            style={{ fontFamily: fonts.poppins }}
            className="text-2xl font-extrabold text-[#3E5245] tracking-tight"
          >
            DHRUTHI WELLNESS
          </span>
        </div>

        <div className="bg-[#3E5245] text-white px-5 py-2 rounded-full shadow">
          <span
            style={{ fontFamily: fonts.inter }}
            className="text-sm font-semibold tracking-wider uppercase"
          >
            Clinical & Fertility Nutrition
          </span>
        </div>
      </div>

      {/* Center Image & Title */}
      <div className="flex-1 flex flex-col items-center justify-center my-4 z-20">
        <div
          style={{
            transform: `scale(${imageScale})`,
            opacity: imageOpacity,
            boxShadow: "0 25px 50px -12px rgba(62, 82, 69, 0.25)",
          }}
          className="relative w-72 h-72 rounded-full border-4 border-[#94A89A] p-2 bg-white/60 mb-6 overflow-hidden flex items-center justify-center"
        >
          <img
            src={staticFile("assets/dt_akhila.png")}
            alt="Dt. Akhila Konakalla"
            className="w-full h-full object-cover rounded-full"
          />
        </div>

        <div
          style={{ transform: `translateY(${textY}px)`, opacity: textOpacity }}
          className="text-center px-4"
        >
          <div className="inline-block bg-[#E8B4B8]/40 text-[#3E5245] px-4 py-1.5 rounded-full text-lg font-semibold mb-3 tracking-wide border border-[#E8B4B8]">
            NOURISH • BALANCE • THRIVE
          </div>

          <h1
            style={{ fontFamily: fonts.playfair }}
            className="text-5xl font-bold text-[#2B2B2B] leading-tight mb-3"
          >
            Achieve Lasting Wellness <br />
            <span className="text-[#3E5245] italic">Without Starvation</span>
          </h1>

          <p
            style={{ fontFamily: fonts.poppins }}
            className="text-2xl text-[#3A2F2F]/80 max-w-xl font-normal"
          >
            Customized Metabolic & Clinical Diet Therapy by <br />
            <strong className="text-[#3E5245] font-semibold">Dt. Akhila Konakalla, M.Sc.</strong>
          </p>
        </div>
      </div>

      {/* Bottom Key Metrics Badges */}
      <div
        style={{ transform: `translateY(${badgesY}px)`, opacity: badgesOpacity }}
        className="w-full grid grid-cols-3 gap-4 pb-6 z-20"
      >
        <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-[#94A89A]/30 text-center shadow-sm">
          <p
            style={{ fontFamily: fonts.poppins }}
            className="text-3xl font-extrabold text-[#3E5245]"
          >
            500+
          </p>
          <p style={{ fontFamily: fonts.inter }} className="text-sm text-[#3A2F2F]/70 font-medium">
            Clients Guided
          </p>
        </div>

        <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-[#94A89A]/30 text-center shadow-sm">
          <p
            style={{ fontFamily: fonts.poppins }}
            className="text-3xl font-extrabold text-[#3E5245]"
          >
            100%
          </p>
          <p style={{ fontFamily: fonts.inter }} className="text-sm text-[#3A2F2F]/70 font-medium">
            Custom Plans
          </p>
        </div>

        <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-[#94A89A]/30 text-center shadow-sm">
          <p
            style={{ fontFamily: fonts.poppins }}
            className="text-3xl font-extrabold text-[#3E5245]"
          >
            95%
          </p>
          <p style={{ fontFamily: fonts.inter }} className="text-sm text-[#3A2F2F]/70 font-medium">
            Satisfaction Rate
          </p>
        </div>
      </div>
    </AbsoluteFill>
  );
};
