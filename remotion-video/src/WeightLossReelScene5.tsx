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

export const WeightLossReelScene5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fonts = loadFonts();

  const cardSpring = spring({
    frame: frame - 6,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 90 },
  });
  const cardY = interpolate(cardSpring, [0, 1], [40, 0]);
  const cardOpacity = interpolate(cardSpring, [0, 1], [0, 1]);

  // Pulsing CTA button scale
  const pulse = 1 + 0.03 * Math.sin((2 * Math.PI * frame) / 45);

  const btnSpring = spring({
    frame: frame - 30,
    fps,
    config: { damping: 12, mass: 0.5, stiffness: 100 },
  });

  return (
    <AbsoluteFill className="bg-black overflow-hidden select-none">
      <CameraTransition type="zoomOut" durationInFrames={180}>
        {/* Background Image: Refreshed Hero Portrait */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url(${staticFile("assets/scene5_weight_loss.png")})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(20,28,25,0.4) 0%, rgba(26,37,33,0.8) 100%)",
          }}
        />
      </CameraTransition>

      <AbsoluteFill className="flex flex-col justify-center items-center px-10 z-20">
        <div
          style={{
            transform: `translateY(${cardY}px)`,
            opacity: cardOpacity,
            backgroundColor: PASTEL_COLORS.glassBg,
            borderColor: PASTEL_COLORS.glassBorder,
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
          }}
          className="w-full max-w-[920px] rounded-[40px] border p-12 flex flex-col items-center text-center shadow-2xl"
        >
          {/* Tagline */}
          <div className="mb-4">
            <KineticText
              text="Stop Guessing. Start Healing."
              delayFrames={10}
              glowColor={PASTEL_COLORS.lightOrangeGlow}
              fontSize={56}
              fontFamily={fonts.italiana}
              highlightWords={["Start", "Healing."]}
              highlightColor={PASTEL_COLORS.lightOrange}
              textColor="#FFFFFF"
            />
          </div>

          <div
            className="w-48 h-[2px] rounded-full my-6"
            style={{ backgroundColor: PASTEL_COLORS.lightOrange }}
          />

          {/* Main Brand Title */}
          <h1
            style={{ fontFamily: fonts.outfit, color: PASTEL_COLORS.pastelPeach }}
            className="text-[64px] font-extrabold tracking-wider uppercase mb-2 drop-shadow-md"
          >
            DHRUTHI WELLNESS
          </h1>

          <p
            style={{ fontFamily: fonts.outfit, color: PASTEL_COLORS.bgWarmBeige }}
            className="text-[34px] font-normal tracking-wide mb-10 opacity-90"
          >
            Evidence-Based Functional Nutrition & Metabolism
          </p>

          {/* Interactive Pulsing Glass CTA Button */}
          <div
            style={{
              opacity: interpolate(btnSpring, [0, 1], [0, 1]),
              transform: `scale(${pulse * interpolate(btnSpring, [0, 1], [0.85, 1.0])})`,
              backgroundColor: PASTEL_COLORS.sageGreen,
              boxShadow: `0 0 35px ${PASTEL_COLORS.sageGreen}80, 0 8px 25px rgba(0,0,0,0.4)`,
            }}
            className="w-full max-w-[720px] py-6 px-8 rounded-full border border-white/30 flex items-center justify-center space-x-4 cursor-pointer mb-8"
          >
            <span
              style={{ fontFamily: fonts.outfit }}
              className="text-white text-[38px] font-bold tracking-wide"
            >
              Book Your Metabolism Assessment
            </span>
          </div>

          {/* Instagram Handle */}
          <div className="flex items-center space-x-3">
            <div className="w-2.5 h-2.5 rounded-full bg-[#E88D67]" />
            <span
              style={{ fontFamily: fonts.handwritten, color: PASTEL_COLORS.pastelPeach }}
              className="text-[44px]"
            >
              Follow @DhruthiWellness
            </span>
            <div className="w-2.5 h-2.5 rounded-full bg-[#E88D67]" />
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
