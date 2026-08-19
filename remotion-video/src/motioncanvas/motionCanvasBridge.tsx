import React, { useRef, useEffect } from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';

interface MotionCanvasBridgeProps {
  title?: string;
  subtitle?: string;
  accentColor?: string;
  progressOverride?: number;
}

/**
 * MotionCanvasBridge:
 * Renders procedural 2D Motion Canvas graphics synced to Remotion timeline.
 */
export const MotionCanvasBridge: React.FC<MotionCanvasBridgeProps> = ({
  title = "NutriFlow Motion Canvas",
  subtitle = "High-Performance Procedural Vector Animations",
  accentColor = "#10B981",
  progressOverride,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames, width, height } = useVideoConfig();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const progress = progressOverride ?? Math.min(1, Math.max(0, frame / durationInFrames));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear Canvas
    ctx.clearRect(0, 0, width, height);

    // Draw Smooth Modern Background Card
    const cardWidth = width * 0.85;
    const cardHeight = height * 0.75;
    const startX = (width - cardWidth) / 2;
    const startY = (height - cardHeight) / 2;

    ctx.save();
    // Rounded Card Path
    ctx.beginPath();
    ctx.roundRect(startX, startY, cardWidth, cardHeight, 36);
    ctx.fillStyle = '#0F172A';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
    ctx.shadowBlur = 40;
    ctx.fill();

    // Procedural Glowing Gradient Orb
    const orbX = width / 2 + Math.sin(progress * Math.PI * 2) * 120;
    const orbY = startY + 220 + Math.cos(progress * Math.PI * 2) * 40;
    const gradient = ctx.createRadialGradient(orbX, orbY, 10, orbX, orbY, 280);
    gradient.addColorStop(0, accentColor + '66');
    gradient.addColorStop(1, 'transparent');
    ctx.fillStyle = gradient;
    ctx.fillRect(startX, startY, cardWidth, cardHeight);

    // Animated Vector Flow Curve (Motion Canvas vector style)
    ctx.beginPath();
    ctx.lineWidth = 10;
    ctx.strokeStyle = accentColor;
    ctx.lineCap = 'round';

    const p0 = { x: startX + 80, y: startY + 500 };
    const p1 = { x: startX + cardWidth * 0.35, y: startY + 320 };
    const p2 = { x: startX + cardWidth * 0.65, y: startY + 680 };
    const p3 = { x: startX + cardWidth - 80, y: startY + 400 };

    // Sample bezier curve up to progress
    const steps = 100;
    const maxStep = Math.floor(steps * progress);

    for (let i = 0; i <= maxStep; i++) {
      const t = i / steps;
      const cx =
        Math.pow(1 - t, 3) * p0.x +
        3 * Math.pow(1 - t, 2) * t * p1.x +
        3 * (1 - t) * Math.pow(t, 2) * p2.x +
        Math.pow(t, 3) * p3.x;
      const cy =
        Math.pow(1 - t, 3) * p0.y +
        3 * Math.pow(1 - t, 2) * t * p1.y +
        3 * (1 - t) * Math.pow(t, 2) * p2.y +
        Math.pow(t, 3) * p3.y;

      if (i === 0) ctx.moveTo(cx, cy);
      else ctx.lineTo(cx, cy);
    }
    ctx.stroke();

    // Pulse Node Circle
    if (progress > 0) {
      const t = progress;
      const cx =
        Math.pow(1 - t, 3) * p0.x +
        3 * Math.pow(1 - t, 2) * t * p1.x +
        3 * (1 - t) * Math.pow(t, 2) * p2.x +
        Math.pow(t, 3) * p3.x;
      const cy =
        Math.pow(1 - t, 3) * p0.y +
        3 * Math.pow(1 - t, 2) * t * p1.y +
        3 * (1 - t) * Math.pow(t, 2) * p2.y +
        Math.pow(t, 3) * p3.y;

      ctx.beginPath();
      ctx.arc(cx, cy, 22, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.shadowColor = accentColor;
      ctx.shadowBlur = 25;
      ctx.fill();
    }

    ctx.restore();
  }, [frame, width, height, progress, accentColor]);

  return (
    <div className="relative w-full h-full bg-slate-950 flex flex-col items-center justify-center font-sans overflow-hidden">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay Typography */}
      <div className="relative z-10 text-center px-12 mt-[450px]">
        <h1 className="text-5xl font-extrabold text-white tracking-tight drop-shadow-md">
          {title}
        </h1>
        <p className="text-xl text-emerald-400 font-medium mt-4 tracking-wide">
          {subtitle}
        </p>

        {/* Status Badge */}
        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-slate-900/80 border border-emerald-500/40 backdrop-blur-md mt-8">
          <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs uppercase tracking-widest font-semibold text-slate-200">
            Motion Canvas Vector Render • Frame {frame} / {durationInFrames}
          </span>
        </div>
      </div>
    </div>
  );
};
