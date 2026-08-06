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

export const WeightLossReelScene3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fonts = loadFonts();

  const cardSpring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 90 },
  });
  const cardY = interpolate(cardSpring, [0, 1], [50, 0]);
  const cardOpacity = interpolate(cardSpring, [0, 1], [0, 1]);

  return (
    <AbsoluteFill className="bg-black overflow-hidden select-none">
      <CameraTransition type="dollyPan" durationInFrames={210}>
        {/* Background Image: Dietitian Consultation */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url(${staticFile("assets/scene3_weight_loss.png")})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(20,28,25,0.45) 0%, rgba(26,37,33,0.75) 100%)",
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
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
          }}
          className="w-full max-w-[920px] rounded-[36px] border p-12 flex flex-col items-center text-center shadow-2xl"
        >
          {/* Medical Icon Badge */}
          <div className="flex items-center space-x-3 bg-white/10 px-6 py-2.5 rounded-full border border-white/20 mb-6">
            <MedicalBadge type="gauge" size={28} color={PASTEL_COLORS.lightOrangeGlow} />
            <span
              style={{ fontFamily: fonts.outfit, color: PASTEL_COLORS.pastelPeach }}
              className="text-2xl font-semibold uppercase tracking-wider"
            >
              Root-Cause Clinical Solution
            </span>
          </div>

          <h2
            style={{ fontFamily: fonts.italiana, color: "#FFFFFF" }}
            className="text-[76px] leading-tight font-light mb-6"
          >
            Calorie Deficits Fail When Hormones Are In Survival Mode
          </h2>

          <div
            className="w-40 h-[3px] rounded-full mb-8"
            style={{ backgroundColor: PASTEL_COLORS.sageGreen }}
          />

          <p
            style={{ fontFamily: fonts.outfit, color: PASTEL_COLORS.bgWarmBeige }}
            className="text-[36px] font-normal leading-relaxed mb-8 max-w-[800px]"
          >
            To unlock sustainable fat loss, you must measure & optimize your internal metabolic biochemistry.
          </p>

          {/* Kinetic Glowing Text */}
          <div className="pt-2">
            <KineticText
              text="Root-Cause Diagnostics > Random Calorie Cutting"
              delayFrames={30}
              glowColor={PASTEL_COLORS.lightOrangeGlow}
              fontSize={42}
              fontFamily={fonts.outfit}
              highlightWords={["Root-Cause", "Diagnostics", ">"]}
              highlightColor={PASTEL_COLORS.lightOrange}
              textColor="#FFFFFF"
            />
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
