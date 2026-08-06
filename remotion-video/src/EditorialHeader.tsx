import React from "react";
import { EDITORIAL_COLORS, loadFonts } from "./Typography";

interface EditorialHeaderProps {
  category?: string;
  issueNo?: string;
}

export const EditorialHeader: React.FC<EditorialHeaderProps> = ({
  category = "CLINICAL METABOLISM",
  issueNo = "ISSUE 04",
}) => {
  const fonts = loadFonts();

  return (
    <div className="w-full flex items-center justify-between px-10 py-6 border-b border-black/10 select-none z-30">
      <div className="flex items-center space-x-3">
        <span
          style={{
            fontFamily: fonts.outfit,
            backgroundColor: EDITORIAL_COLORS.emerald,
            color: "#FFFFFF",
          }}
          className="text-xl font-bold tracking-widest px-4 py-1.5 rounded-full uppercase"
        >
          {category}
        </span>
        <span
          style={{ fontFamily: fonts.outfit, color: EDITORIAL_COLORS.emerald }}
          className="text-xl font-semibold tracking-wider"
        >
          {issueNo}
        </span>
      </div>

      <div className="flex items-center space-x-2">
        <div className="w-2.5 h-2.5 rounded-full bg-[#E77F67] animate-pulse" />
        <span
          style={{ fontFamily: fonts.outfit, color: EDITORIAL_COLORS.obsidian }}
          className="text-2xl font-bold tracking-tight"
        >
          @dhruthi_wellness
        </span>
      </div>
    </div>
  );
};
