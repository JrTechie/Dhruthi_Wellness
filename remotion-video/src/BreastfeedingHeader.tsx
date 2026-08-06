import React from "react";
import { COLORS_BREASTFEEDING, loadFonts } from "./Typography";

export const BreastfeedingHeader: React.FC<{ opacity?: number }> = ({ opacity = 1.0 }) => {
  const fonts = loadFonts();
  return (
    <div
      className="absolute top-16 left-16 z-40 flex items-center space-x-4 px-6 py-3 rounded-full shadow-2xl"
      style={{
        opacity,
        backgroundColor: "rgba(30, 43, 36, 0.75)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1.5px solid rgba(229, 184, 105, 0.50)",
        boxShadow: "0 8px 32px rgba(229, 184, 105, 0.25)",
      }}
    >
      <div
        className="w-3.5 h-3.5 rounded-full"
        style={{
          backgroundColor: COLORS_BREASTFEEDING.goldGlow,
          boxShadow: "0 0 12px #E5B869",
        }}
      />
      <span
        style={{
          fontFamily: fonts.body,
          color: COLORS_BREASTFEEDING.creamText,
        }}
        className="text-2xl font-bold tracking-wider uppercase"
      >
        DHRUTHI WELLNESS • World Breastfeeding Week
      </span>
    </div>
  );
};
