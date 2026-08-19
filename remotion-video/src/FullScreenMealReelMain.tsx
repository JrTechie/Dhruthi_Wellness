import React from "react";
import { Sequence } from "remotion";
import { MealPlateCover } from "./MealPlateCover";
import { MealHeroV2 } from "./components/MealHeroV2";
import { FoodHeroScene } from "./components/FoodHeroScene";
import { WorkingLifeScene } from "./components/WorkingLifeScene";
import { MealShowcaseV2 } from "./components/MealShowcaseV2";
import { BrandOutroV2 } from "./components/BrandOutroV2";

/**
 * FullScreenMealReelMain:
 * Full-screen 9:16 Instagram Reel for Dhruthi Wellness.
 * Zero background music / audio as specified in Master Prompt.
 * Starts with dedicated Cover Photo (0s - 3s) before the video sequence unfolds.
 */
export const FullScreenMealReelMain: React.FC = () => {
  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: "#0B132B", position: "relative" }}>
      {/* 0.0s – 3.0s: STANDALONE COVER PHOTO CARD (Full-Bleed Hero Food + Title + Doctor Badge) */}
      <Sequence from={0} durationInFrames={90}>
        <MealPlateCover />
      </Sequence>

      {/* 3.0s – 6.0s: MEAL HERO REVEAL & MORNING START (Pull-Out Motion) */}
      <Sequence from={90} durationInFrames={90}>
        <MealHeroV2 />
      </Sequence>

      {/* 6.0s – 9.0s: FOOD HERO BREAKFAST (Vertical Pan Motion & Keywords) */}
      <Sequence from={180} durationInFrames={90}>
        <FoodHeroScene />
      </Sequence>

      {/* 9.0s – 12.5s: WORKING PROFESSIONAL LIFESTYLE (Horizontal Pan Motion) */}
      <Sequence from={270} durationInFrames={105}>
        <WorkingLifeScene />
      </Sequence>

      {/* 12.5s – 16.5s: WORKING LUNCH & EVENING SNACK (Diagonal Motion & Match Cut) */}
      <Sequence from={375} durationInFrames={120}>
        <MealShowcaseV2 />
      </Sequence>

      {/* 16.5s – 22.5s: FINAL HERO OUTRO & BRAND LOCKUP */}
      <Sequence from={495} durationInFrames={180}>
        <BrandOutroV2 />
      </Sequence>
    </div>
  );
};
