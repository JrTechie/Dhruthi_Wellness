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

export const WeightLossReelScene2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fonts = loadFonts();

  // Cards entrance animation
  const cardSpring = spring({
    frame: frame - 8,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 90 },
  });
  const cardY = interpolate(cardSpring, [0, 1], [50, 0]);
  const cardOpacity = interpolate(cardSpring, [0, 1], [0, 1]);

  // Bullet items staggered reveals
  const item1Sp = spring({ frame: frame - 20, fps });
  const item2Sp = spring({ frame: frame - 35, fps });
  const item3Sp = spring({ frame: frame - 50, fps });

  return (
    <AbsoluteFill className="bg-black overflow-hidden select-none">
      <CameraTransition type="whipRight" durationInFrames={180}>
        {/* Background Image: Aerial flatlay */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url(${staticFile("assets/scene2_weight_loss.png")})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(15,22,19,0.55) 0%, rgba(26,37,33,0.75) 100%)",
          }}
        />
      </CameraTransition>

      <AbsoluteFill className="flex flex-col justify-center items-center px-10 z-20">
        {/* Apple Frosted Glass Container */}
        <div
          style={{
            transform: `translateY(${cardY}px)`,
            opacity: cardOpacity,
            backgroundColor: PASTEL_COLORS.glassBg,
            borderColor: PASTEL_COLORS.glassBorder,
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
          }}
          className="w-full max-w-[920px] rounded-[36px] border p-12 flex flex-col items-center text-center shadow-2xl"
        >
          {/* Header Badge */}
          <div className="flex items-center space-x-3 bg-white/10 px-6 py-2.5 rounded-full border border-white/20 mb-6">
            <MedicalBadge type="circadian" size={28} color={PASTEL_COLORS.lightOrangeGlow} />
            <span
              style={{ fontFamily: fonts.outfit, color: PASTEL_COLORS.pastelPeach }}
              className="text-2xl font-semibold uppercase tracking-wider"
            >
              The Hidden Biological Friction
            </span>
          </div>

          <h2
            style={{ fontFamily: fonts.italiana, color: "#FFFFFF" }}
            className="text-[72px] leading-tight font-light mb-8"
          >
            3 Invisible Reasons You're Stuck
          </h2>

          {/* List of Hidden Causes */}
          <div className="w-full space-y-4 mb-8 text-left">
            {/* Item 1 */}
            <div
              style={{
                opacity: interpolate(item1Sp, [0, 1], [0, 1]),
                transform: `translateX(${interpolate(item1Sp, [0, 1], [-30, 0])}px)`,
                backgroundColor: "rgba(255, 255, 255, 0.08)",
              }}
              className="p-5 rounded-2xl border border-white/15 flex items-center justify-between"
            >
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 rounded-full bg-[#E88D67]" />
                <span style={{ fontFamily: fonts.outfit }} className="text-3xl text-white font-medium">
                  1. Elevated Cortisol & Stress Resistance
                </span>
              </div>
              <span className="text-2xl font-bold text-[#FFB088] px-3 py-1 bg-white/10 rounded-lg">
                +35% Fat Storage
              </span>
            </div>

            {/* Item 2 */}
            <div
              style={{
                opacity: interpolate(item2Sp, [0, 1], [0, 1]),
                transform: `translateX(${interpolate(item2Sp, [0, 1], [-30, 0])}px)`,
                backgroundColor: "rgba(255, 255, 255, 0.08)",
              }}
              className="p-5 rounded-2xl border border-white/15 flex items-center justify-between"
            >
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 rounded-full bg-[#769370]" />
                <span style={{ fontFamily: fonts.outfit }} className="text-3xl text-white font-medium">
                  2. Sleep Debt & Impaired Leptin Signaling
                </span>
              </div>
              <span className="text-2xl font-bold text-[#9BB098] px-3 py-1 bg-white/10 rounded-lg">
                Spikes Cravings
              </span>
            </div>

            {/* Item 3 */}
            <div
              style={{
                opacity: interpolate(item3Sp, [0, 1], [0, 1]),
                transform: `translateX(${interpolate(item3Sp, [0, 1], [-30, 0])}px)`,
                backgroundColor: "rgba(255, 255, 255, 0.08)",
              }}
              className="p-5 rounded-2xl border border-white/15 flex items-center justify-between"
            >
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 rounded-full bg-[#E88D67]" />
                <span style={{ fontFamily: fonts.outfit }} className="text-3xl text-white font-medium">
                  3. Metabolic Adaptation & Thyroid Shift
                </span>
              </div>
              <span className="text-2xl font-bold text-[#FFB088] px-3 py-1 bg-white/10 rounded-lg">
                Slowed BMR
              </span>
            </div>
          </div>

          {/* Kinetic Statement */}
          <div className="pt-2">
            <KineticText
              text="It's not lack of discipline. It's survival biology."
              delayFrames={60}
              glowColor={PASTEL_COLORS.lightOrangeGlow}
              fontSize={40}
              fontFamily={fonts.outfit}
              highlightWords={["not", "discipline.", "survival", "biology."]}
              highlightColor={PASTEL_COLORS.lightOrange}
              textColor="#FFFFFF"
            />
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
