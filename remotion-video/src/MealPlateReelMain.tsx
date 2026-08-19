import React from "react";
import { Audio, Sequence, staticFile } from "remotion";
import { MealPlateScene1 } from "./MealPlateScene1";
import { MealPlateScene2 } from "./MealPlateScene2";
import { MealPlateScene3 } from "./MealPlateScene3";
import { MealPlateScene4 } from "./MealPlateScene4";
import { MealPlateScene5 } from "./MealPlateScene5";

export const MealPlateReelMain: React.FC = () => {
  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: "#050C09", position: "relative" }}>
      {/* Background Soft Lifestyle Music */}
      <Audio
        src={staticFile("piano.mp3")}
        volume={0.7}
      />

      {/* SCENE 1 — HOOK (0s - 3.5s) */}
      <Sequence from={0} durationInFrames={105}>
        <MealPlateScene1 />
      </Sequence>

      {/* SCENE 2 — BREAKFAST (3.5s - 7.5s) */}
      <Sequence from={105} durationInFrames={120}>
        <MealPlateScene2 />
      </Sequence>

      {/* SCENE 3 — MID-MORNING & LUNCH (7.5s - 11.5s) */}
      <Sequence from={225} durationInFrames={120}>
        <MealPlateScene3 />
      </Sequence>

      {/* SCENE 4 — EVENING SNACK & TAILORED NUTRITION (11.5s - 15.5s) */}
      <Sequence from={345} durationInFrames={120}>
        <MealPlateScene4 />
      </Sequence>

      {/* SCENE 5 — FINAL HERO GRID & BRANDING (15.5s - 20s) */}
      <Sequence from={465} durationInFrames={135}>
        <MealPlateScene5 />
      </Sequence>
    </div>
  );
};
