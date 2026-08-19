import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { loadFonts } from "./Typography";

export const AnimatedCoverPage: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fonts = loadFonts();

  const bgOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const brandOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  // Entrance Springs
  const titleSpring = spring({ frame: frame - 10, fps, config: { damping: 14, mass: 0.6 } });
  const flowerSpring = spring({ frame: frame - 25, fps, config: { damping: 12, mass: 0.5 } });
  const subSpring = spring({ frame: frame - 35, fps, config: { damping: 14, mass: 0.6 } });
  const photoSpring = spring({ frame: frame - 15, fps, config: { damping: 14, mass: 0.7 } });
  const footerSpring = spring({ frame: frame - 50, fps, config: { damping: 14, mass: 0.6 } });

  const pillars = [
    { label: "NUTRITION", icon: "🥗", delay: 45 },
    { label: "NUTRIENT NEEDS", icon: "🧪", delay: 55 },
    { label: "REPRODUCTIVE HEALTH", icon: "🌸", delay: 65 },
    { label: "LIFESTYLE FACTORS", icon: "🌿", delay: 75 },
  ];

  return (
    <div
      style={{
        position: "absolute",
        width: 1080,
        height: 1920,
        backgroundColor: "#FAF9F5",
        color: "#0F241C",
        opacity: bgOpacity,
        overflow: "hidden",
      }}
    >
      {/* 1. Full-Resolution 1080x1920 Background Studio Photography */}
      <Img
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1080,
          height: 1920,
          objectFit: "cover",
          transform: `scale(${interpolate(frame, [0, 90], [1.0, 1.05])})`,
        }}
        src={staticFile("assets/nutritional_conceive_cover.png")}
      />

      {/* Soft Gradient Overlay for Premium Readability */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1080,
          height: 1920,
          background: "linear-gradient(135deg, rgba(250,249,245,0.92) 0%, rgba(250,249,245,0.78) 50%, rgba(250,249,245,0.45) 100%)",
        }}
      />

      {/* Dhruthi Wellness Brand Header at Top */}
      <div
        style={{
          position: "absolute",
          top: 70,
          left: 70,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          opacity: brandOpacity,
          zIndex: 10,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 6,
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              backgroundColor: "rgba(197, 160, 89, 0.15)",
              border: "1.5px solid #C5A059",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#C5A059",
              fontWeight: 800,
              fontSize: 20,
            }}
          >
            D
          </div>
          <span
            style={{
              fontFamily: fonts.cormorant,
              fontWeight: 700,
              fontSize: 32,
              color: "#0F241C",
              letterSpacing: 2,
            }}
          >
            DHRUTHI WELLNESS
          </span>
        </div>
        <div
          style={{
            width: 140,
            height: 2,
            backgroundColor: "#C5A059",
            marginLeft: 48,
          }}
        />
      </div>

      {/* Main Animated Title Content on Left */}
      <div
        style={{
          position: "absolute",
          left: 70,
          top: 340,
          width: 530,
          zIndex: 10,
        }}
      >
        <div
          style={{
            transform: `translateY(${interpolate(titleSpring, [0, 1], [50, 0])}px)`,
            opacity: titleSpring,
          }}
        >
          <h1
            style={{
              fontFamily: fonts.cormorant,
              fontSize: 76,
              fontWeight: 700,
              lineHeight: 1.05,
              color: "#0F241C",
              margin: 0,
            }}
          >
            ARE YOU
            <br />
            <span style={{ color: "#C5A059", fontWeight: 800 }}>PLANNING</span>
            <br />
            TO CONCEIVE?
          </h1>
        </div>

        {/* Animated Blossom Icon 🌸 */}
        <div
          style={{
            marginTop: 16,
            transform: `scale(${interpolate(flowerSpring, [0, 1], [0, 1])})`,
            opacity: flowerSpring,
            fontSize: 44,
          }}
        >
          🌸
        </div>

        {/* Animated Subtitle (Beige Glassmorphism Card) */}
        <div
          style={{
            marginTop: 28,
            transform: `translateY(${interpolate(subSpring, [0, 1], [30, 0])}px)`,
            opacity: subSpring,
            backgroundColor: "rgba(250, 249, 245, 0.65)", // increased opacity for clearer text background
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            borderLeft: "5px solid #C5A059",
            borderTop: "1.5px solid rgba(255, 255, 255, 0.6)",
            borderBottom: "1.5px solid rgba(255, 255, 255, 0.3)",
            borderRight: "1.5px solid rgba(255, 255, 255, 0.3)",
            borderRadius: "0 20px 20px 0",
            padding: "26px 36px",
            boxShadow: "0 10px 35px rgba(0,0,0,0.08)",
          }}
        >
          <p
            style={{
              fontFamily: fonts.body,
              fontSize: 38,
              fontWeight: 800,
              lineHeight: 1.4,
              color: "#0F241C",
              margin: 0,
            }}
          >
            What you should know before you start trying.
          </p>
        </div>

        {/* Animated Clinical Pillars Grid (Warm Glassmorphism Cards) */}
        <div
          style={{
            marginTop: 44,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 22,
            width: 530,
          }}
        >
          {pillars.map((item, idx) => {
            const pSpring = spring({
              frame: frame - item.delay,
              fps,
              config: { damping: 14, mass: 0.6 },
            });

            return (
              <div
                key={idx}
                style={{
                  transform: `scale(${interpolate(pSpring, [0, 1], [0.85, 1])})`,
                  opacity: pSpring,
                  backgroundColor: "rgba(255, 255, 255, 0.6)",
                  backdropFilter: "blur(20px) saturate(180%)",
                  WebkitBackdropFilter: "blur(20px) saturate(180%)",
                  border: "1.5px solid rgba(197, 160, 89, 0.45)",
                  borderRadius: 18,
                  padding: "20px 28px",
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  boxShadow: "0 8px 24px rgba(15,36,28,0.05)",
                }}
              >
                <div style={{ fontSize: 28 }}>{item.icon}</div>
                <div
                  style={{
                    fontFamily: fonts.body,
                    fontWeight: 800,
                    fontSize: 22,
                    color: "#0F241C",
                    letterSpacing: 0.5,
                  }}
                >
                  {item.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>


      {/* Full Portrait Dt. Akhila Photo on Right Side */}
      <div
        style={{
          position: "absolute",
          right: 40,
          top: 330,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          transform: `translateX(${interpolate(photoSpring, [0, 1], [60, 0])}px)`,
          opacity: photoSpring,
          zIndex: 10,
        }}
      >
        {/* Avatar Circle */}
        <div
          style={{
            width: 440,
            height: 440,
            borderRadius: "50%",
            overflow: "hidden",
            border: "4px solid #C5A059",
            boxShadow: "0 20px 50px rgba(15,36,28,0.25), 0 0 25px rgba(197, 160, 89, 0.3)",
            backgroundColor: "#FAF9F5",
          }}
        >
          <Img
            src={staticFile("assets/akhila_cover_avatar.png")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>

        {/* Big & Bright Verified Name Badge BELOW the Avatar */}
        <div
          style={{
            marginTop: 18,
            backgroundColor: "#FFFFFF",
            border: "2.5px solid #C5A059",
            borderRadius: 24,
            padding: "12px 28px",
            display: "flex",
            alignItems: "center",
            gap: 12,
            boxShadow: "0 12px 35px rgba(0,0,0,0.4), 0 0 20px rgba(197,160,89,0.3)",
            textAlign: "left",
            whiteSpace: "nowrap",
          }}
        >
          <div
            style={{
              width: 26,
              height: 26,
              borderRadius: "50%",
              backgroundColor: "#C5A059",
              color: "#FFFFFF",
              fontSize: 15,
              fontWeight: 900,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 8px rgba(197, 160, 89, 0.5)",
            }}
          >
            ✓
          </div>
          <div>
            <div
              style={{
                fontFamily: fonts.body,
                fontWeight: 900,
                fontSize: 22,
                color: "#0F241C",
                lineHeight: 1.2,
                letterSpacing: 0.3,
              }}
            >
              Dt. Akhila Konakalla
            </div>
            <div
              style={{
                fontFamily: fonts.body,
                fontWeight: 800,
                fontSize: 15,
                color: "#B8860B",
                lineHeight: 1.2,
                letterSpacing: 0.2,
              }}
            >
              M.Sc. Clinical Nutritionist
            </div>
          </div>
        </div>
      </div>

      {/* Animated Series Banner at Bottom (Glassmorphism Dark) */}
      <div
        style={{
          position: "absolute",
          bottom: 70,
          left: 70,
          right: 70,
          transform: `translateY(${interpolate(footerSpring, [0, 1], [40, 0])}px)`,
          opacity: footerSpring,
          backgroundColor: "rgba(15, 36, 28, 0.75)",
          backdropFilter: "blur(24px) saturate(140%)",
          WebkitBackdropFilter: "blur(24px) saturate(140%)",
          border: "1.5px solid rgba(197, 160, 89, 0.45)",
          borderRadius: 24,
          padding: "20px 32px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 15px 35px rgba(15,36,28,0.15)",
          zIndex: 10,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: fonts.body,
              fontWeight: 800,
              fontSize: 16,
              color: "#C5A059",
              letterSpacing: 2,
              marginBottom: 4,
            }}
          >
            FROM PRECONCEPTION TO CONCEPTION
          </div>
          <div
            style={{
              fontFamily: fonts.cormorant,
              fontWeight: 700,
              fontSize: 28,
              color: "#FFFFFF",
            }}
          >
            Evidence-Based Fertility Nutrition Series
          </div>
        </div>
        <div
          style={{
            backgroundColor: "#C5A059",
            color: "#0F241C",
            borderRadius: 20,
            padding: "10px 24px",
            fontFamily: fonts.body,
            fontWeight: 800,
            fontSize: 16,
          }}
        >
          DAY 01
        </div>
      </div>
    </div>
  );
};
