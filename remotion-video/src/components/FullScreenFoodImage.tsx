import React from "react";
import { interpolate, staticFile, useCurrentFrame } from "remotion";

export interface FullScreenFoodImageProps {
  src: string;
  focalX?: number; // e.g. 50 (percentage)
  focalY?: number; // e.g. 50 (percentage)
  startScale?: number; // e.g. 1.0
  endScale?: number; // e.g. 1.08
  motionType?: "push-in" | "pull-out" | "pan-up" | "pan-left" | "diagonal";
  durationInFrames?: number;
  alt?: string;
}

export const FullScreenFoodImage: React.FC<FullScreenFoodImageProps> = ({
  src,
  focalX = 50,
  focalY = 50,
  startScale = 1.0,
  endScale = 1.08,
  motionType = "push-in",
  durationInFrames = 90,
  alt = "Nutritious Food",
}) => {
  const frame = useCurrentFrame();

  const progress = interpolate(frame, [0, durationInFrames], [0, 1], {
    extrapolateRight: "clamp",
  });

  const scale = interpolate(progress, [0, 1], [startScale, endScale]);

  let panX = 0;
  let panY = 0;

  if (motionType === "pan-left") {
    panX = interpolate(progress, [0, 1], [15, -15]);
  } else if (motionType === "pan-up") {
    panY = interpolate(progress, [0, 1], [15, -15]);
  } else if (motionType === "diagonal") {
    panX = interpolate(progress, [0, 1], [-12, 12]);
    panY = interpolate(progress, [0, 1], [12, -12]);
  }

  return (
    <div
      style={{
        position: "absolute",
        width: 1080,
        height: 1920,
        backgroundColor: "#000000",
        overflow: "hidden",
      }}
    >
      {/* Edge-to-Edge 100% Full-Screen Food Image (Zero Overlay, Zero Margins) */}
      <img
        src={staticFile(`assets/${src}`)}
        alt={alt}
        style={{
          position: "absolute",
          inset: 0,
          width: 1080,
          height: 1920,
          objectFit: "cover",
          objectPosition: `${focalX}% ${focalY}%`,
          transform: `scale(${scale}) translate(${panX}px, ${panY}px)`,
          transition: "transform 0.1s linear",
        }}
      />
    </div>
  );
};
