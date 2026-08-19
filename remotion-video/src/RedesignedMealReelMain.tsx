import React from "react";
import { Sequence } from "remotion";
import { CoverScene } from "./components/CoverScene";
import { MealHero } from "./components/MealHero";
import { MealDetail } from "./components/MealDetail";
import { LifestyleMessage } from "./components/LifestyleMessage";
import { MealShowcase } from "./components/MealShowcase";
import { PersonalizedCare } from "./components/PersonalizedCare";
import { BrandOutro } from "./components/BrandOutro";

/**
 * RedesignedMealReelMain:
 * Complete silent, mobile-first Instagram Reel for Dhruthi Wellness.
 * Zero background music / audio as specified in Master Prompt.
 */
export const RedesignedMealReelMain: React.FC = () => {
  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: "#0B132B", position: "relative" }}>
      {/* 0.0s – 2.5s: HOOK / COVER (Sequential Typography Animation) */}
      <Sequence from={0} durationInFrames={75}>
        <CoverScene />
      </Sequence>

      {/* 2.5s – 5.5s: MEAL HERO TRANSITION & MORNING START */}
      <Sequence from={75} durationInFrames={90}>
        <MealHero />
      </Sequence>

      {/* 5.5s – 8.5s: BREAKFAST DETAIL & SUSTAINED ENERGY */}
      <Sequence from={165} durationInFrames={90}>
        <MealDetail />
      </Sequence>

      {/* 8.5s – 12.0s: WORKING PROFESSIONAL LIFESTYLE ANGLE */}
      <Sequence from={255} durationInFrames={105}>
        <LifestyleMessage />
      </Sequence>

      {/* 12.0s – 16.0s: WORKING LUNCH & EVENING SNACK SHOWCASE */}
      <Sequence from={360} durationInFrames={120}>
        <MealShowcase />
      </Sequence>

      {/* 16.0s – 19.0s: PERSONALIZED CARE MESSAGE */}
      <Sequence from={480} durationInFrames={90}>
        <PersonalizedCare />
      </Sequence>

      {/* 19.0s – 22.0s: FINAL BRAND LOCKUP & TAGLINE CTA */}
      <Sequence from={570} durationInFrames={90}>
        <BrandOutro />
      </Sequence>
    </div>
  );
};
