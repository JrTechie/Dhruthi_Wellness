import React from "react";
import { COLORS_PCOS, loadFonts } from "./Typography";

export const PCOSBrandHeader: React.FC<{ opacity?: number }> = ({ opacity = 1.0 }) => {
  const fonts = loadFonts();
  return (
    <div
      className="absolute top-16 left-20 z-30 flex items-center space-x-4 px-6 py-3 rounded-full shadow-2xl"
      style={{
        opacity,
        backgroundColor: "rgba(21, 16, 18, 0.80)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: `2px solid ${COLORS_PCOS.orchid}`,
        boxShadow: "0 8px 32px rgba(255, 20, 147, 0.40)",
      }}
    >
      <div
        className="w-4 h-4 rounded-full"
        style={{
          backgroundColor: COLORS_PCOS.orchid,
          boxShadow: "0 0 14px #FF1493",
        }}
      />
      <span
        style={{
          fontFamily: fonts.body,
          color: COLORS_PCOS.linen,
        }}
        className="text-3xl font-extrabold tracking-wider uppercase"
      >
        @DhruthiWellness
      </span>
    </div>
  );
};
