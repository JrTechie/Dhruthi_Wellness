import React from "react";

export const GlassCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  variant?: string;
  style?: React.CSSProperties;
}> = ({ children, className = "", style }) => {
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        backgroundColor: "rgba(15, 23, 42, 0.42)", // Elegant semi-transparent frosted glass fill
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        border: "1.5px solid rgba(255, 255, 255, 0.38)", // Bright white frosted border
        borderRadius: "24px",
        boxShadow: "0 12px 35px rgba(0, 0, 0, 0.35), inset 0 1.5px 1.5px rgba(255, 255, 255, 0.35)",
        ...style,
      }}
    >
      <div className="relative z-20 w-full h-full flex flex-col items-center justify-center text-center">{children}</div>
    </div>
  );
};
