import React from "react";
import { Audio, Img, interpolate, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneAkhilaAvatar } from "./SceneAkhilaAvatar";

export const Day2Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = frame / (11.0 * fps);
  const scale = interpolate(progress, [0, 1], [1.0, 1.05]);

  const bulletPoints = [
    "Age & reproductive health",
    "Ovulation & menstrual health",
    "Nutrition & metabolic health",
    "Lifestyle factors",
    "Both partners’ reproductive health",
  ];

  // Bullet reveal start frames relative to Scene 2 start
  const bulletStartFrames = [20, 70, 120, 170, 220];

  const cardSpring = spring({
    frame: frame - 5,
    fps,
    config: { damping: 14, mass: 0.8 },
  });

  return (
    <div
      style={{
        position: "absolute",
        width: 1080,
        height: 1920,
        backgroundColor: "#08120E",
        color: "#FFFFFF",
        overflow: "hidden",
      }}
    >
      {/* Sound Effects for Each Bullet Point */}
      {bulletStartFrames.map((triggerFrame, idx) => (
        <Sequence key={idx} from={triggerFrame} durationInFrames={45}>
          <Audio src={staticFile("assets/day2_chime.mp3")} volume={0.85} />
        </Sequence>
      ))}

      {/* 1. Full-Screen Clean 9:16 Reproductive Health Background Image */}
      <Img
        src={staticFile("assets/day2_scene2_reproductive.png")}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1080,
          height: 1920,
          objectFit: "cover",
          transform: `scale(${scale})`,
        }}
      />

      {/* 2. Refined Dark Gradient Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1080,
          height: 1920,
          background:
            "linear-gradient(to bottom, rgba(8, 18, 14, 0.65) 0%, rgba(8, 18, 14, 0.25) 40%, rgba(8, 18, 14, 0.35) 60%, rgba(8, 18, 14, 0.82) 100%)",
        }}
      />

      {/* Top Header Badge */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 60,
          display: "flex",
          alignItems: "center",
          gap: 16,
          zIndex: 40,
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(15, 36, 28, 0.88)",
            border: "1.5px solid #C5A059",
            borderRadius: 25,
            padding: "8px 24px",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: "#00FF9D",
            }}
          />
          <span
            style={{
              fontFamily: "Outfit, sans-serif",
              fontWeight: 700,
              fontSize: 20,
              color: "#C5A059",
              letterSpacing: 1.5,
            }}
          >
            SCREEN 02 • KEY FERTILITY FACTORS
          </span>
        </div>
      </div>

      {/* Static Presenter Avatar at Top Right */}
      <SceneAkhilaAvatar />

      {/* Main Content Area */}
      <div
        style={{
          position: "absolute",
          left: 80,
          right: 80,
          top: 480,
          zIndex: 30,
          display: "flex",
          flexDirection: "column",
          gap: 18,
        }}
      >
        {/* Title Header */}
        <div
          style={{
            transform: `translateY(${interpolate(cardSpring, [0, 1], [30, 0])}px)`,
            opacity: cardSpring,
          }}
        >
          <div
            style={{
              fontFamily: "Outfit, sans-serif",
              fontWeight: 800,
              fontSize: 22,
              color: "#C5A059",
              letterSpacing: 2,
              marginBottom: 4,
              textShadow: "0 2px 10px rgba(0,0,0,0.6)",
            }}
          >
            BIOLOGICAL & LIFESTYLE FACTORS
          </div>

          <h2
            style={{
              fontFamily: "Italiana, Georgia, serif",
              fontSize: 64,
              fontWeight: 800,
              lineHeight: 1.1,
              color: "#FFFFFF",
              margin: 0,
              textShadow: "0 6px 25px rgba(0,0,0,0.9), 0 0 20px rgba(197, 160, 89, 0.4)",
            }}
          >
            Key Factors Influencing Conception
          </h2>
        </div>

        {/* 5 Staggered Glassmorphic Bullet Cards */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          {bulletPoints.map((text, index) => {
            const startF = bulletStartFrames[index];
            const bulletSpring = spring({
              frame: frame - startF,
              fps,
              config: { damping: 14, mass: 0.7 },
            });

            const isHighlight = index === 4; // Both partners point

            return (
              <div
                key={index}
                style={{
                  transform: `translateX(${interpolate(bulletSpring, [0, 1], [-40, 0])}px)`,
                  opacity: bulletSpring,
                  backgroundColor: isHighlight
                    ? "rgba(0, 255, 157, 0.20)"
                    : "rgba(15, 36, 28, 0.72)",
                  backdropFilter: "blur(20px) saturate(180%)",
                  WebkitBackdropFilter: "blur(20px) saturate(180%)",
                  border: isHighlight
                    ? "2px solid #00FF9D"
                    : "1.5px solid rgba(197, 160, 89, 0.40)",
                  borderRadius: 20,
                  padding: "16px 24px",
                  display: "flex",
                  alignItems: "center",
                  gap: 18,
                  boxShadow: "0 10px 25px rgba(0,0,0,0.35)",
                }}
              >
                <div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: "50%",
                    backgroundColor: isHighlight ? "#00FF9D" : "#C5A059",
                    color: "#08120E",
                    fontWeight: 900,
                    fontSize: 18,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    boxShadow: "0 0 10px rgba(197,160,89,0.5)",
                  }}
                >
                  ✓
                </div>
                <span
                  style={{
                    fontFamily: "Outfit, sans-serif",
                    fontWeight: isHighlight ? 800 : 700,
                    fontSize: isHighlight ? 28 : 26,
                    color: isHighlight ? "#00FF9D" : "#FFFFFF",
                    lineHeight: 1.25,
                  }}
                >
                  {text}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
