import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

interface CameraTransitionProps {
  children: React.ReactNode;
  type?: "zoomIn" | "zoomOut" | "whipRight" | "whipLeft" | "dollyPan";
  durationInFrames: number;
}

export const CameraTransition: React.FC<CameraTransitionProps> = ({
  children,
  type = "zoomIn",
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const progress = frame / durationInFrames;

  let scale = 1;
  let translateX = 0;
  let translateY = 0;
  let filterBlur = "none";
  let opacity = 1;

  if (type === "zoomIn") {
    scale = interpolate(progress, [0, 1], [1.0, 1.18]);
    translateY = interpolate(progress, [0, 1], [0, -25]);
  } else if (type === "zoomOut") {
    scale = interpolate(progress, [0, 1], [1.18, 1.0]);
    translateY = interpolate(progress, [0, 1], [-25, 0]);
  } else if (type === "whipRight") {
    // Whip pan right transition at beginning and end
    const whipIn = interpolate(frame, [0, 10], [-300, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    const whipBlur = interpolate(frame, [0, 8, 12], [8, 3, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    translateX = whipIn;
    filterBlur = whipBlur > 0 ? `blur(${whipBlur}px)` : "none";
    scale = interpolate(progress, [0, 1], [1.0, 1.08]);
  } else if (type === "whipLeft") {
    const whipIn = interpolate(frame, [0, 10], [300, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    const whipBlur = interpolate(frame, [0, 8, 12], [8, 3, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    translateX = whipIn;
    filterBlur = whipBlur > 0 ? `blur(${whipBlur}px)` : "none";
    scale = interpolate(progress, [0, 1], [1.05, 1.15]);
  } else if (type === "dollyPan") {
    scale = interpolate(progress, [0, 1], [1.02, 1.12]);
    translateX = interpolate(progress, [0, 1], [-30, 20]);
    translateY = interpolate(progress, [0, 1], [15, -15]);
  }

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <div
        style={{
          width: "100%",
          height: "100%",
          transform: `scale(${scale}) translate(${translateX}px, ${translateY}px)`,
          filter: filterBlur,
          transition: "transform 0.05s ease-out",
        }}
      >
        {children}
      </div>
    </AbsoluteFill>
  );
};
