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

export const WeightLossReelScene4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fonts = loadFonts();

  const cardSpring = spring({
    frame: frame - 8,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 90 },
  });
  const cardY = interpolate(cardSpring, [0, 1], [50, 0]);
  const cardOpacity = interpolate(cardSpring, [0, 1], [0, 1]);

  const chk1 = spring({ frame: frame - 15, fps });
  const chk2 = spring({ frame: frame - 30, fps });
  const chk3 = spring({ frame: frame - 45, fps });

  return (
    <AbsoluteFill className="bg-black overflow-hidden select-none">
      <CameraTransition type="whipLeft" durationInFrames={210}>
        {/* Background Image: Smoothie Vitality */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url(${staticFile("assets/scene4_weight_loss.png")})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(20,28,25,0.4) 0%, rgba(26,37,33,0.7) 100%)",
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
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
          }}
          className="w-full max-w-[920px] rounded-[36px] border p-12 flex flex-col items-center text-center shadow-2xl"
        >
          {/* Header Tag */}
          <div className="flex items-center space-x-3 bg-white/10 px-6 py-2.5 rounded-full border border-white/20 mb-6">
            <MedicalBadge type="nutrient" size={28} color={PASTEL_COLORS.lightOrangeGlow} />
            <span
              style={{ fontFamily: fonts.outfit, color: PASTEL_COLORS.pastelPeach }}
              className="text-2xl font-semibold uppercase tracking-wider"
            >
              The Dhruthi Wellness Protocol
            </span>
          </div>

          <h2
            style={{ fontFamily: fonts.italiana, color: "#FFFFFF" }}
            className="text-[76px] leading-tight font-light mb-8"
          >
            How We Reset Your Metabolic Baseline
          </h2>

          {/* Interactive Checklist Cards */}
          <div className="w-full space-y-4 mb-8 text-left">
            {/* Step 1 */}
            <div
              style={{
                opacity: interpolate(chk1, [0, 1], [0, 1]),
                transform: `scale(${interpolate(chk1, [0, 1], [0.92, 1.0])})`,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              }}
              className="p-5 rounded-2xl border border-white/20 flex items-center space-x-5 shadow-lg"
            >
              <div className="bg-[#769370] p-2.5 rounded-xl flex items-center justify-center">
                <MedicalBadge type="check" size={28} color="#FFFFFF" />
              </div>
              <div>
                <h4 style={{ fontFamily: fonts.outfit }} className="text-3xl text-white font-bold">
                  1. Comprehensive Biomarker & Gut Panel
                </h4>
                <p style={{ fontFamily: fonts.outfit }} className="text-2xl text-white/80">
                  Uncover hidden inflammation, thyroid & cortisol blocks.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div
              style={{
                opacity: interpolate(chk2, [0, 1], [0, 1]),
                transform: `scale(${interpolate(chk2, [0, 1], [0.92, 1.0])})`,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              }}
              className="p-5 rounded-2xl border border-white/20 flex items-center space-x-5 shadow-lg"
            >
              <div className="bg-[#769370] p-2.5 rounded-xl flex items-center justify-center">
                <MedicalBadge type="check" size={28} color="#FFFFFF" />
              </div>
              <div>
                <h4 style={{ fontFamily: fonts.outfit }} className="text-3xl text-white font-bold">
                  2. Circadian Rhythm & Stress Optimization
                </h4>
                <p style={{ fontFamily: fonts.outfit }} className="text-2xl text-white/80">
                  Align sleep quality & cortisol balance for fat oxidation.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div
              style={{
                opacity: interpolate(chk3, [0, 1], [0, 1]),
                transform: `scale(${interpolate(chk3, [0, 1], [0.92, 1.0])})`,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              }}
              className="p-5 rounded-2xl border border-white/20 flex items-center space-x-5 shadow-lg"
            >
              <div className="bg-[#769370] p-2.5 rounded-xl flex items-center justify-center">
                <MedicalBadge type="check" size={28} color="#FFFFFF" />
              </div>
              <div>
                <h4 style={{ fontFamily: fonts.outfit }} className="text-3xl text-white font-bold">
                  3. Personalised Metabolic Nutrition
                </h4>
                <p style={{ fontFamily: fonts.outfit }} className="text-2xl text-white/80">
                  Precision nutrient ratios built specifically for your body.
                </p>
              </div>
            </div>
          </div>

          <KineticText
            text="Fix the biological foundation, not just the calories."
            delayFrames={55}
            glowColor={PASTEL_COLORS.lightOrangeGlow}
            fontSize={38}
            fontFamily={fonts.outfit}
            highlightWords={["Fix", "biological", "foundation,"]}
            highlightColor={PASTEL_COLORS.lightOrange}
            textColor="#FFFFFF"
          />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
