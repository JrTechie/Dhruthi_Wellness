import React from "react";
import { staticFile } from "remotion";
import { loadFonts } from "./Typography";

interface MobileBrowserFrameProps {
  children: React.ReactNode;
}

export const MobileBrowserFrame: React.FC<MobileBrowserFrameProps> = ({ children }) => {
  const fonts = loadFonts();

  return (
    <div className="w-full h-full p-10 flex items-center justify-center bg-[#FAF6F0] relative overflow-hidden select-none">
      {/* Subtle Ambient Background Decorative Glows */}
      <div className="absolute top-[-15%] left-[-15%] w-[600px] h-[600px] rounded-full bg-[#94A89A]/20 blur-[120px]" />
      <div className="absolute bottom-[-15%] right-[-15%] w-[600px] h-[600px] rounded-full bg-[#E8B4B8]/25 blur-[120px]" />

      {/* Smartphone Hardware Frame Container */}
      <div
        style={{
          boxShadow: "0 35px 70px -15px rgba(43, 43, 43, 0.35)",
        }}
        className="w-[96%] h-[98%] bg-black rounded-[52px] p-3 border-4 border-slate-800 flex flex-col relative overflow-hidden z-10"
      >
        {/* Inner Phone Screen */}
        <div className="w-full h-full bg-white rounded-[42px] flex flex-col relative overflow-hidden">
          
          {/* Top Mobile Status Bar */}
          <div className="h-11 bg-white/95 backdrop-blur-md px-7 flex items-center justify-between z-30 shrink-0 border-b border-gray-100">
            <span style={{ fontFamily: fonts.inter }} className="text-sm font-bold text-gray-900">
              9:41
            </span>

            {/* Dynamic Island / Notch Mockup */}
            <div className="w-24 h-5 bg-black rounded-full shadow-inner flex items-center justify-end px-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 animate-pulse" />
            </div>

            <div className="flex items-center gap-1.5 text-xs text-gray-900 font-bold">
              <span>📶</span>
              <span>📡</span>
              <span>🔋</span>
            </div>
          </div>

          {/* Mobile Safari/Chrome Navigation URL Bar */}
          <div className="h-12 bg-[#F6F6F6] px-5 flex items-center justify-between z-30 shrink-0 border-b border-gray-200/80">
            <div className="flex-1 bg-white rounded-full py-1.5 px-4 flex items-center justify-between border border-gray-300/60 shadow-inner">
              <div className="flex items-center gap-2 overflow-hidden">
                <span className="text-emerald-600 text-xs">🔒</span>
                <span style={{ fontFamily: fonts.inter }} className="text-xs font-semibold text-gray-800 tracking-tight truncate">
                  dhruthi-wellness.vercel.app
                </span>
              </div>
              <span className="text-gray-400 text-xs font-bold">↻</span>
            </div>
            
            <img
              src={staticFile("assets/Logo_D_bright.png")}
              alt="Logo"
              className="w-7 h-7 rounded-full object-cover ml-3 border border-[#3E5245]"
            />
          </div>

          {/* Website Viewport Area */}
          <div className="flex-1 w-full h-full relative overflow-hidden bg-white">
            {children}
          </div>

          {/* Bottom Mobile Home Bar */}
          <div className="h-6 bg-white flex items-center justify-center shrink-0 z-30">
            <div className="w-36 h-1 bg-gray-300 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
