import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  interpolate,
  spring,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFonts } from "./Typography";

// Row Data Structure
interface RowData {
  id: number;
  drinkName: string;
  targetName: string;
  color: string;
  glowColor: string;
  startFrame: number;
  // Local asset paths
  drinkImg: string;
  targetImg: string;
}

export const MorningDrinksMain: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fonts = loadFonts();

  const rows: RowData[] = [
    {
      id: 1,
      drinkName: "Coriander Water",
      targetName: "Thyroid & Metabolism",
      color: "#52B788", // Green tea
      glowColor: "rgba(82, 183, 136, 0.45)",
      startFrame: 60, // 2.0s
      drinkImg: staticFile("assets/morning_coriander.png"),
      targetImg: staticFile("assets/morning_target_thyroid_organ.png"),
    },
    {
      id: 2,
      drinkName: "Fenugreek Water",
      targetName: "Hormones & PCOS",
      color: "#FAD02C", // Golden-yellow
      glowColor: "rgba(250, 208, 44, 0.45)",
      startFrame: 155, // 5.1s
      drinkImg: staticFile("assets/morning_fenugreek.png"),
      targetImg: staticFile("assets/morning_target_hormones.png"),
    },
    {
      id: 3,
      drinkName: "Clove Water",
      targetName: "Blood Sugar Control",
      color: "#B57C1E", // Amber brown
      glowColor: "rgba(181, 124, 30, 0.45)",
      startFrame: 250, // 8.3s
      drinkImg: staticFile("assets/morning_clove.png"),
      targetImg: staticFile("assets/morning_target_bloodsugar.png"),
    },
    {
      id: 4,
      drinkName: "Cinnamon Water",
      targetName: "Heart & Blood Pressure",
      color: "#9E2A2B", // Spice red
      glowColor: "rgba(158, 42, 43, 0.45)",
      startFrame: 345, // 11.5s
      drinkImg: staticFile("assets/morning_cinnamon.png"),
      targetImg: staticFile("assets/morning_target_heart.png"),
    },
    {
      id: 5,
      drinkName: "Ajwain Water",
      targetName: "Digestion & Bloating",
      color: "#457B9D", // Light blue-green water
      glowColor: "rgba(69, 123, 157, 0.45)",
      startFrame: 440, // 14.6s
      drinkImg: staticFile("assets/morning_ajwain.png"),
      targetImg: staticFile("assets/morning_target_digestion.png"),
    },
    {
      id: 6,
      drinkName: "Kalonji Water",
      targetName: "Inflammation & Joint Pain",
      color: "#3D348B", // Indigo Kalonji infusion
      glowColor: "rgba(61, 52, 139, 0.45)",
      startFrame: 535, // 17.8s
      drinkImg: staticFile("assets/morning_kalonji.png"),
      targetImg: staticFile("assets/morning_target_joints.png"),
    },
  ];

  // Coordinates
  const xLeft = 240;
  const xRight = 840;
  const rowY = (id: number) => 460 + (id - 1) * 200;

  // Header Animations
  const headerSpring = spring({
    frame,
    fps,
    config: { damping: 15, mass: 0.7, stiffness: 90 },
  });
  const headerY = interpolate(headerSpring, [0, 1], [-100, 0]);
  const headerOpacity = interpolate(headerSpring, [0, 1], [0, 1]);

  // Scene Swipe Transition Timing (frame 660 to 695)
  const transitionStart = 660;
  const transitionEnd = 695;
  const page1Y = interpolate(frame, [transitionStart, transitionEnd], [0, -1920], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const page2Y = interpolate(frame, [transitionStart, transitionEnd], [1920, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Outro page animations (starts right after swipe completes at 695)
  const outroPageFrame = frame - transitionEnd;
  
  const springTitle = spring({
    frame: outroPageFrame,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 90 },
  });
  const outroTitleY = interpolate(springTitle, [0, 1], [40, 0]);
  const outroTitleO = interpolate(springTitle, [0, 1], [0, 1]);

  const springCard = spring({
    frame: outroPageFrame - 15,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 90 },
  });
  const outroCardY = interpolate(springCard, [0, 1], [60, 0]);
  const outroCardO = interpolate(springCard, [0, 1], [0, 1]);

  const springCTA = spring({
    frame: outroPageFrame - 30,
    fps,
    config: { damping: 12, mass: 0.5, stiffness: 100 },
  });
  const outroCtaScale = interpolate(springCTA, [0, 1], [0.8, 1.0]);
  const outroCtaO = interpolate(springCTA, [0, 1], [0, 1]);

  const pulseCTA = frame > transitionEnd + 30 ? 1.0 + 0.02 * Math.sin((frame - (transitionEnd + 30)) / 8) : 1.0;

  return (
    <AbsoluteFill className="bg-[#FAF8F5] overflow-hidden select-none">
      
      {/* -------------------- SOUND EFFECTS LAYERS -------------------- */}
      {/* Water Flow Sounds */}
      {rows.map((row) => (
        <Sequence
          key={`water-audio-${row.id}`}
          from={row.startFrame}
          durationInFrames={40}
        >
          <Audio
            src={staticFile("water_flow.mp3")}
            volume={0.35}
            startFrom={10}
          />
        </Sequence>
      ))}

      {/* Relaxing Tibetan Singing Bowl Sounds */}
      {rows.map((row) => (
        <Sequence
          key={`chime-audio-${row.id}`}
          from={row.startFrame + 25}
          durationInFrames={120}
        >
          <Audio
            src={staticFile("relaxing_sound.mp3")}
            volume={0.55}
          />
        </Sequence>
      ))}

      {/* -------------------- PAGE 1: 6 MORNING DRINKS CONNECTION MAP -------------------- */}
      {frame <= transitionEnd + 10 && (
        <AbsoluteFill 
          style={{ transform: `translateY(${page1Y}px)` }}
          className="flex flex-col justify-between items-center py-20"
        >
          {/* Background Subtle Flowing Waves */}
          <div className="absolute inset-0 opacity-25 pointer-events-none">
            <svg width="1080" height="1920" viewBox="0 0 1080 1920" fill="none">
              <path
                d="M-100 200 C 300 150, 700 350, 1180 250"
                stroke="#52B788"
                strokeWidth="3"
                strokeDasharray="10 15"
              />
              <path
                d="M-100 1600 C 400 1700, 800 1500, 1180 1650"
                stroke="#FF70A6"
                strokeWidth="3"
                strokeDasharray="10 15"
              />
            </svg>
          </div>

          {/* Floating Header */}
          <div
            className="w-full flex flex-col items-center text-center px-12 z-20"
            style={{
              transform: `translateY(${headerY}px)`,
              opacity: headerOpacity,
            }}
          >
            {/* Category Badge */}
            <div
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.75)",
                borderColor: "rgba(98, 126, 112, 0.18)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
              }}
              className="px-6 py-2 rounded-full border mb-5 shadow-sm"
            >
              <span
                style={{
                  fontFamily: fonts.body,
                  color: "#4A6B5D",
                }}
                className="text-[24px] font-bold uppercase tracking-widest"
              >
                Daily Healing Rituals
              </span>
            </div>

            {/* Main Title */}
            <h1
              style={{
                fontFamily: fonts.cormorant,
                color: "#1E2925",
              }}
              className="text-[76px] font-bold leading-tight uppercase tracking-tight mb-3"
            >
              6 Powerful Morning Drinks
            </h1>

            {/* Subtitle */}
            <p
              style={{
                fontFamily: fonts.body,
                color: "#627E70",
              }}
              className="text-[32px] font-medium tracking-wide max-w-[800px] leading-relaxed"
            >
              To Fix Bloating, Inflammation & Weight Gain
            </p>
          </div>

          {/* Connection & VFX Particle Layer (SVG) */}
          <AbsoluteFill className="pointer-events-none z-10">
            <svg width="1080" height="1920" viewBox="0 0 1080 1920" fill="none">
              {rows.map((row) => {
                const y = rowY(row.id);
                const x1 = xLeft + 85;
                const x2 = xRight - 85;
                
                // Smoothed undulating wave offset for natural motion
                const waveOffset = Math.sin(frame / 10 + row.id * 2) * 6;
                const cx = 540;
                const cy = y + 50 + waveOffset;
                
                const pathData = `M ${x1} ${y} Q ${cx} ${cy} ${x2} ${y}`;
                
                const drawSpring = spring({
                  frame: frame - row.startFrame,
                  fps,
                  config: { damping: 16, mass: 0.6, stiffness: 80 },
                });
                const drawProgress = interpolate(drawSpring, [0, 1], [0, 1]);
                
                // Timing variables for splash
                const targetCompleteFrame = row.startFrame + 25;
                const splashAge = frame - targetCompleteFrame;
                const splashActive = splashAge >= 0 && splashAge < 20;

                const t = drawProgress;
                const particleX = (1 - t) * (1 - t) * x1 + 2 * (1 - t) * t * cx + t * t * x2;
                const particleY = (1 - t) * (1 - t) * y + 2 * (1 - t) * t * cy + t * t * y;

                let rowOpacity = 0.15;
                if (frame >= row.startFrame && frame < row.startFrame + 80) {
                  rowOpacity = 1.0;
                } else if (frame >= row.startFrame) {
                  rowOpacity = 0.45;
                }

                return (
                  <g key={row.id} style={{ opacity: rowOpacity, transition: "opacity 0.3s ease" }}>
                    
                    {/* Sleek, glossy translucent fluid column */}
                    <path
                      d={pathData}
                      stroke={row.color}
                      strokeWidth="14"
                      strokeLinecap="round"
                      strokeDasharray="500"
                      strokeDashoffset={500 * (1 - drawProgress)}
                      opacity={0.65}
                    />

                    {/* Crisp white running reflection highlight */}
                    {drawProgress > 0.05 && (
                      <path
                        d={pathData}
                        stroke="#FFFFFF"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeDasharray="40 80"
                        strokeDashoffset={-frame * 5.5}
                        opacity={0.8}
                      />
                    )}

                    {/* Subtle micro-bubbles inside stream */}
                    {drawProgress > 0.05 && (
                      <path
                        d={pathData}
                        stroke="rgba(255, 255, 255, 0.45)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeDasharray="4 20"
                        strokeDashoffset={-frame * 7.5}
                        opacity={0.7}
                      />
                    )}

                    {/* Glossy liquid core traveling particle */}
                    {drawProgress > 0 && drawProgress < 1 && (
                      <g>
                        <circle
                          cx={particleX}
                          cy={particleY}
                          r={11}
                          fill={row.color}
                          opacity={0.85}
                        />
                        <circle
                          cx={particleX - 2}
                          cy={particleY - 2}
                          r={4}
                          fill="#FFFFFF"
                          opacity={0.9}
                        />
                      </g>
                    )}

                    {/* Elegant splash droplets upon target contact */}
                    {splashActive && (
                      <g>
                        {Array.from({ length: 4 }).map((_, idx) => {
                          const angle = -Math.PI / 4 + (idx * Math.PI) / 6;
                          const dist = interpolate(splashAge, [0, 20], [0, 40]);
                          const dropletX = x2 + Math.cos(angle) * dist;
                          const dropletY = y + Math.sin(angle) * dist;
                          const dropletR = interpolate(splashAge, [0, 20], [7, 1]);
                          const dropletO = interpolate(splashAge, [0, 20], [0.85, 0]);

                          return (
                            <circle
                              key={idx}
                              cx={dropletX}
                              cy={dropletY}
                              r={dropletR}
                              fill={row.color}
                              opacity={dropletO}
                            />
                          );
                        })}
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>
          </AbsoluteFill>

          {/* Staggered Circular Nodes (Left & Right Column Elements) */}
          <AbsoluteFill className="z-10 pointer-events-none">
            {rows.map((row) => {
              const y = rowY(row.id);

              const spLeft = spring({
                frame: frame - (row.startFrame - 15),
                fps,
                config: { damping: 12, mass: 0.5, stiffness: 100 },
              });
              const scaleLeft = interpolate(spLeft, [0, 1], [0, 1]);

              const spRight = spring({
                frame: frame - (row.startFrame + 15),
                fps,
                config: { damping: 12, mass: 0.5, stiffness: 100 },
              });
              const scaleRight = interpolate(spRight, [0, 1], [0, 1]);

              const targetCompleteFrame = row.startFrame + 25;
              const rippleAge = frame - targetCompleteFrame;
              const rippleActive = rippleAge >= 0 && rippleAge < 35;
              
              // Animated healing ripple expands larger
              const rippleScale = rippleActive ? interpolate(rippleAge, [0, 35], [1.0, 1.6]) : 1.0;
              const rippleOpacity = rippleActive ? interpolate(rippleAge, [0, 35], [0.9, 0]) : 0;

              let rowOpacity = 0.15;
              if (frame >= row.startFrame && frame < row.startFrame + 80) {
                rowOpacity = 1.0;
              } else if (frame >= row.startFrame) {
                rowOpacity = 0.5;
              }

              return (
                <div key={row.id} style={{ opacity: rowOpacity, transition: "opacity 0.3s ease" }}>
                  
                  {/* Left Drink Circle Node */}
                  <div
                    className="absolute flex flex-col items-center justify-center"
                    style={{
                      left: xLeft - 85,
                      top: y - 85,
                      width: 170,
                      height: 170,
                      transform: `scale(${scaleLeft})`,
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: "#FFFFFF",
                        borderColor: row.color,
                        boxShadow: `0 12px 35px ${row.glowColor}`,
                      }}
                      className="w-[150px] h-[150px] rounded-full border-[3px] overflow-hidden flex items-center justify-center shadow-lg"
                    >
                      <Img src={row.drinkImg} className="w-full h-full object-cover" />
                    </div>

                    <div className="absolute top-[175px] w-[260px] text-center">
                      <span
                        style={{ fontFamily: fonts.body, color: "#1E2925" }}
                        className="text-[25px] font-bold tracking-tight block drop-shadow-sm"
                      >
                        {row.drinkName}
                      </span>
                    </div>
                  </div>

                  {/* Right Target Circle Node */}
                  <div
                    className="absolute flex flex-col items-center justify-center"
                    style={{
                      left: xRight - 85,
                      top: y - 85,
                      width: 170,
                      height: 170,
                      transform: `scale(${scaleRight})`,
                    }}
                  >
                    {/* Concentric healing rings */}
                    {rippleActive && (
                      <div
                        style={{
                          borderColor: row.color,
                          transform: `scale(${rippleScale})`,
                          opacity: rippleOpacity,
                          boxShadow: `0 0 30px ${row.color}`,
                        }}
                        className="absolute w-[150px] h-[150px] rounded-full border-4"
                      />
                    )}
                    {rippleActive && (
                      <div
                        style={{
                          borderColor: "#FFFFFF",
                          transform: `scale(${rippleScale * 0.85})`,
                          opacity: rippleOpacity * 0.7,
                        }}
                        className="absolute w-[150px] h-[150px] rounded-full border-2"
                      />
                    )}

                    <div
                      style={{
                        backgroundColor: "#FFFFFF",
                        borderColor: row.color,
                        boxShadow: `0 12px 35px ${row.glowColor}`,
                      }}
                      className="w-[150px] h-[150px] rounded-full border-[3px] overflow-hidden flex items-center justify-center shadow-lg relative z-10"
                    >
                      <Img src={row.targetImg} className="w-full h-full object-cover" />
                    </div>

                    <div className="absolute top-[175px] w-[260px] text-center">
                      <span
                        style={{ fontFamily: fonts.body, color: row.color }}
                        className="text-[25px] font-extrabold tracking-tight block drop-shadow-sm"
                      >
                        {row.targetName}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </AbsoluteFill>
        </AbsoluteFill>
      )}

      {/* -------------------- PAGE 2: CONTINUATION CALL TO ACTION PAGE -------------------- */}
      {frame >= transitionStart && (
        <AbsoluteFill
          style={{ 
            transform: `translateY(${page2Y}px)`,
            background: "linear-gradient(135deg, #FAF8F5 0%, #EAE5DB 100%)"
          }}
          className="flex flex-col justify-center items-center px-12 py-24 z-30"
        >
          {/* Animated Background decorative glows */}
          <div 
            style={{
              borderColor: "rgba(82, 183, 136, 0.15)",
              borderWidth: "1px",
              boxShadow: "0 0 100px rgba(82, 183, 136, 0.08)",
            }} 
            className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full"
          />
          <div 
            style={{
              borderColor: "rgba(255, 112, 166, 0.15)",
              borderWidth: "1px",
              boxShadow: "0 0 100px rgba(255, 112, 166, 0.08)",
            }} 
            className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full"
          />

          {/* Dhruthi Wellness Badge */}
          <div
            style={{
              transform: `translateY(${outroTitleY}px)`,
              opacity: outroTitleO,
              backgroundColor: "rgba(82, 183, 136, 0.12)",
              borderColor: "rgba(82, 183, 136, 0.25)",
            }}
            className="px-8 py-3 rounded-full border mb-8"
          >
            <span
              style={{
                fontFamily: fonts.body,
                color: "#2C5E43",
              }}
              className="text-[26px] font-extrabold tracking-widest uppercase"
            >
              Dhruthi Wellness Protocol
            </span>
          </div>

          {/* Core Info card */}
          <div
            style={{
              transform: `translateY(${outroCardY}px)`,
              opacity: outroCardO,
              backgroundColor: "rgba(255, 255, 255, 0.85)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              borderColor: "rgba(98, 126, 112, 0.18)",
              boxShadow: "0 25px 60px rgba(74, 107, 93, 0.12)",
            }}
            className="w-full max-w-[840px] rounded-[48px] border p-12 flex flex-col items-center mb-10 text-center"
          >
            <h2
              style={{
                fontFamily: fonts.cormorant,
                color: "#1E2925",
              }}
              className="text-[64px] font-bold leading-tight mb-6"
            >
              Fix the Root Cause,<br />
              <span className="italic font-semibold text-[#52B788]">Not Just the Symptoms.</span>
            </h2>

            <p
              style={{
                fontFamily: fonts.body,
                color: "#4E5C55",
              }}
              className="text-[32px] font-light leading-relaxed mb-8 max-w-[700px]"
            >
              Our functional nutrition approach restores your body's natural metabolic pathways, balancing hormones, blood sugar, and gut health without starvation or extreme stress.
            </p>

            {/* Bullet Points */}
            <div className="w-full max-w-[620px] flex flex-col space-y-4 text-left border-t border-slate-200/50 pt-8">
              <div className="flex items-center space-x-4">
                <div style={{ backgroundColor: "#52B788" }} className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-[18px]">✓</div>
                <span style={{ fontFamily: fonts.body }} className="text-[28px] font-bold text-[#1E2925]">Custom Metabolic Mapping</span>
              </div>
              <div className="flex items-center space-x-4">
                <div style={{ backgroundColor: "#52B788" }} className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-[18px]">✓</div>
                <span style={{ fontFamily: fonts.body }} className="text-[28px] font-bold text-[#1E2925]">Cycle-Aligned Nutrition</span>
              </div>
              <div className="flex items-center space-x-4">
                <div style={{ backgroundColor: "#52B788" }} className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-[18px]">✓</div>
                <span style={{ fontFamily: fonts.body }} className="text-[28px] font-bold text-[#1E2925]">1-on-1 Clinical Guidance</span>
              </div>
            </div>
          </div>

          {/* Interactive Pulsing CTA Button */}
          <div
            style={{
              transform: `scale(${outroCtaScale * pulseCTA})`,
              opacity: outroCtaO,
              backgroundColor: "#2C5E43",
              boxShadow: "0 15px 40px rgba(44, 94, 67, 0.35)",
            }}
            className="px-16 py-6 rounded-full mb-8 cursor-pointer flex items-center justify-center"
          >
            <span
              style={{
                fontFamily: fonts.body,
                color: "#FAF8F5",
              }}
              className="text-[30px] font-extrabold tracking-wider uppercase"
            >
              Book Wellness Assessment
            </span>
          </div>

          {/* Handwritten Handle Footnote */}
          <div
            style={{
              transform: `scale(${outroCtaScale})`,
              opacity: outroCtaO,
            }}
            className="text-center"
          >
            <span
              style={{
                fontFamily: fonts.accentHandwritten,
                color: "#FF70A6",
              }}
              className="text-[54px] block mb-1"
            >
              Follow @DhruthiWellness
            </span>
            <span
              style={{
                fontFamily: fonts.body,
                color: "#627E70",
              }}
              className="text-[24px] tracking-wider uppercase font-bold"
            >
              Evidence-Based Nutrition & Metabolic Health
            </span>
          </div>
        </AbsoluteFill>
      )}

    </AbsoluteFill>
  );
};
