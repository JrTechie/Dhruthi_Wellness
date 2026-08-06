import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface HypeTextProps {
  text: string;
  delayFrames?: number;
  glowColor?: string;
  fontSize?: number;
  fontFamily?: string;
  className?: string;
  highlightWords?: string[];
  highlightColor?: string;
  textColor?: string;
  staggerStep?: number;
}

export const HypeText: React.FC<HypeTextProps> = ({
  text,
  delayFrames = 0,
  glowColor = "#00FF9D",
  fontSize = 54,
  fontFamily,
  className = "",
  highlightWords = [],
  highlightColor = "#FF5A36",
  textColor = "#FFFFFF",
  staggerStep = 3,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const words = text.split(" ");

  return (
    <div
      className={`flex flex-wrap justify-center items-center gap-x-4 gap-y-2 ${className}`}
      style={{ fontFamily }}
    >
      {words.map((word, index) => {
        const wordDelay = delayFrames + index * staggerStep;
        const sp = spring({
          frame: frame - wordDelay,
          fps,
          config: { damping: 10, mass: 0.4, stiffness: 120 },
        });

        const opacity = interpolate(sp, [0, 1], [0, 1]);
        const translateY = interpolate(sp, [0, 1], [40, 0]);
        const scale = interpolate(sp, [0, 0.5, 1], [0.5, 1.3, 1.0]);

        const cleanWord = word.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
        const isHighlighted = highlightWords.some(
          (hw) => hw.toLowerCase() === cleanWord
        );

        const currentWordColor = isHighlighted ? highlightColor : textColor;
        const shadowGlow = isHighlighted
          ? `0 0 30px ${glowColor}, 0 0 12px ${glowColor}`
          : "0 4px 15px rgba(0, 0, 0, 0.5)";

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
            className="font-extrabold tracking-tight uppercase"
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};
