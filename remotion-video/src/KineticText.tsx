import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { PASTEL_COLORS } from "./Typography";

interface KineticTextProps {
  text: string;
  delayFrames?: number;
  glowColor?: string;
  fontSize?: number;
  fontFamily?: string;
  className?: string;
  highlightWords?: string[];
  highlightColor?: string;
  textColor?: string;
}

export const KineticText: React.FC<KineticTextProps> = ({
  text,
  delayFrames = 0,
  glowColor = PASTEL_COLORS.lightOrangeGlow,
  fontSize = 52,
  fontFamily,
  className = "",
  highlightWords = [],
  highlightColor = PASTEL_COLORS.lightOrange,
  textColor = "#FFFFFF",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const words = text.split(" ");

  return (
    <div
      className={`flex flex-wrap justify-center items-center gap-x-3 gap-y-1 ${className}`}
      style={{ fontFamily }}
    >
      {words.map((word, index) => {
        const wordDelay = delayFrames + index * 4;
        const sp = spring({
          frame: frame - wordDelay,
          fps,
          config: { damping: 12, mass: 0.5, stiffness: 100 },
        });

        const opacity = interpolate(sp, [0, 1], [0, 1]);
        const translateY = interpolate(sp, [0, 1], [35, 0]);
        const scale = interpolate(sp, [0, 1], [0.85, 1.0]);

        const cleanWord = word.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
        const isHighlighted = highlightWords.some(
          (hw) => hw.toLowerCase() === cleanWord
        );

        const currentWordColor = isHighlighted ? highlightColor : textColor;
        const shadowGlow = isHighlighted
          ? `0 0 24px ${glowColor}, 0 0 10px ${glowColor}`
          : "0 2px 10px rgba(0, 0, 0, 0.4)";

        return (
          <span
            key={`${word}-${index}`}
            style={{
              opacity,
              transform: `translateY(${translateY}px) scale(${scale})`,
              color: currentWordColor,
              fontSize: `${fontSize}px`,
              textShadow: shadowGlow,
              display: "inline-block",
            }}
            className="font-bold tracking-tight"
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};
