import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { CameraTransition } from "./CameraTransition";
import { KineticText } from "./KineticText";
import { MedicalBadge } from "./MedicalBadges";
import { PASTEL_COLORS, loadFonts } from "./Typography";

export const WeightLossReelScene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fonts = loadFonts();

  // Glass card entrance spring
  const cardSpring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 90 },
  });
  const cardY = interpolate(cardSpring, [0, 1], [60, 0]);
  const cardOpacity = interpolate(cardSpring, [0, 1], [0, 1]);

  // Brand handle top overlay
  const brandOpacity = interpolate(frame, [0, 15], [0, 0.75], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="bg-black overflow-hidden select-none">
      <CameraTransition type="zoomIn" durationInFrames={180}>
        {/* Background Image */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url(${staticFile("assets/scene1_weight_loss.png")})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Soft dark vignette gradient for legibility */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at center, rgba(0,0,0,0.3) 0%, rgba(20,28,25,0.7) 100%)",
          }}
        />
      </CameraTransition>

      {/* Top Brand Tag */}
      <div
        className="absolute top-20 left-0 right-0 flex items-center justify-center space-x-3 z-30"
        style={{
          opacity: brandOpacity,
          fontFamily: fonts.outfit,
        }}
      >
        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: PASTEL_COLORS.lightOrange }} />
        <span className="text-white text-2xl tracking-widest font-medium">
          @dhruthi_wellness
        </span>
        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: PASTEL_COLORS.lightOrange }} />
      </div>

      {/* Main Glassmorphic Container & Kinetic Text */}
      <AbsoluteFill className="flex flex-col justify-center items-center px-10 z-20">
        <div
          style={{
            transform: `translateY(${cardY}px)`,
            opacity: cardOpacity,
            backgroundColor: PASTEL_COLORS.glassBg,
            borderColor: PASTEL_COLORS.glassBorder,
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
          }}
          className="w-full max-w-[920px] rounded-[36px] border border-white/30 p-12 flex flex-col items-center text-center shadow-2xl"
        >
          {/* Subtle Circadian Icon */}
          <div className="mb-6 bg-white/10 p-4 rounded-full border border-white/20">
            <MedicalBadge type="pulse" size={54} color={PASTEL_COLORS.lightOrangeGlow} />
          </div>

          {/* Question / Hook Title */}
          <div className="mb-8">
            <h2
              style={{
                fontFamily: fonts.outfit,
                color: PASTEL_COLORS.pastelPeach,
              }}
              className="text-[42px] font-medium tracking-wide uppercase mb-3 opacity-90"
            >
              Eating Clean? Working Out?
            </h2>
            <h1
              style={{
                fontFamily: fonts.italiana,
                color: "#FFFFFF",
              }}
              className="text-[82px] leading-tight font-light drop-shadow-md"
            >
              Scale Still Won't Budge?
            </h1>
          </div>

          {/* Divider Line with Light Peach Accent */}
          <div
            className="w-48 h-[3px] rounded-full mb-8"
            style={{ backgroundColor: PASTEL_COLORS.lightOrange }}
          />

          {/* Main Topic Question with Kinetic Text Glow */}
          <div className="px-4 max-w-[820px]">
            <KineticText
              text="Why Am I Not Losing Weight Even Though I'm Doing Everything Right?"
              delayFrames={25}
              glowColor={PASTEL_COLORS.lightOrangeGlow}
              fontSize={46}
              fontFamily={fonts.outfit}
              highlightWords={["Not", "Weight", "Everything", "Right?"]}
              highlightColor={PASTEL_COLORS.lightOrange}
              textColor="#FFFFFF"
            />
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
