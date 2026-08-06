import React, { useMemo } from "react";
import { AbsoluteFill, interpolate, random, useCurrentFrame } from "remotion";

export const BokehParticles: React.FC<{
  count?: number;
  opacity?: number;
}> = ({ count = 25, opacity = 1 }) => {
  const frame = useCurrentFrame();

  const particles = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: random(`x-${i}`) * 100, // percentage
      y: random(`y-${i}`) * 100, // percentage
      size: 4 + random(`size-${i}`) * 24, // px
      speed: 0.2 + random(`speed-${i}`) * 0.6,
      opacity: 0.15 + random(`op-${i}`) * 0.45,
      isBokeh: random(`bokeh-${i}`) > 0.5,
    }));
  }, [count]);

  return (
    <AbsoluteFill className="pointer-events-none z-20 overflow-hidden" style={{ opacity }}>
      {particles.map((p) => {
        // Slow vertical float + sine wave horizontal drift
        const yOffset = (frame * p.speed) % 110;
        const currentY = (p.y - yOffset + 110) % 110;
        const xOffset = Math.sin((frame * p.speed) / 20 + p.id) * 15;
        const currentX = p.x + xOffset;

        // Subtle twinkling opacity pulsation
        const pulse = interpolate(
          Math.sin(frame * 0.05 + p.id * 2),
          [-1, 1],
          [p.opacity * 0.6, p.opacity * 1.2]
        );

        return (
          <div
            key={p.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: `${currentX}%`,
              top: `${currentY}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: p.isBokeh
                ? "rgba(247, 225, 223, 0.45)"
                : "rgba(255, 253, 249, 0.6)",
              boxShadow: p.isBokeh
                ? "0 0 12px rgba(232, 180, 184, 0.5)"
                : "0 0 8px rgba(255, 255, 255, 0.8)",
              filter: p.isBokeh ? "blur(3px)" : "blur(1px)",
              opacity: pulse,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
