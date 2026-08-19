import React from "react";
import { staticFile } from "remotion";
import { loadFonts } from "./Typography";

interface WalkthroughBrowserFrameProps {
  children: React.ReactNode;
  activeSectionName?: string;
}

export const WalkthroughBrowserFrame: React.FC<WalkthroughBrowserFrameProps> = ({
  children,
  activeSectionName = "Home",
}) => {
  const fonts = loadFonts();

  return (
    <div className="w-full h-full p-8 flex items-center justify-center bg-[#FAF6F0] relative overflow-hidden select-none">
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#94A89A]/20 blur-[100px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#E8B4B8]/25 blur-[100px]" />

      {/* Main Browser Window Mockup Container */}
      <div className="w-full h-full bg-white rounded-2xl shadow-2xl border border-black/10 flex flex-col overflow-hidden relative z-10">
        
        {/* Browser Top Navigation Bar */}
        <div className="h-14 bg-[#F2ECE4] border-b border-black/10 px-6 flex items-center justify-between shrink-0">
          
          {/* Left Window Control Buttons */}
          <div className="flex items-center gap-2.5 w-32">
            <div className="w-3.5 h-3.5 rounded-full bg-[#FF5F56] border border-black/10" />
            <div className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E] border border-black/10" />
            <div className="w-3.5 h-3.5 rounded-full bg-[#27C93F] border border-black/10" />
          </div>

          {/* Center Address & URL Bar */}
          <div className="flex-1 max-w-xl mx-4 bg-white/90 rounded-lg px-4 py-1.5 border border-black/10 flex items-center justify-between shadow-inner">
            <div className="flex items-center gap-2 text-sm text-gray-600 font-medium overflow-hidden">
              <span className="text-emerald-600 text-xs">🔒</span>
              <span style={{ fontFamily: fonts.inter }} className="text-gray-800 font-semibold tracking-tight truncate">
                https://dhruthi-wellness.vercel.app/
              </span>
              {activeSectionName && (
                <span className="text-[#3E5245] bg-[#3E5245]/10 px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider">
                  #{activeSectionName.toLowerCase()}
                </span>
              )}
            </div>
            <span className="text-gray-400 text-xs font-bold">↻</span>
          </div>

          {/* Right Brand Badge */}
          <div className="flex items-center gap-2 justify-end w-40">
            <img
              src={staticFile("assets/Logo_D_bright.png")}
              alt="Favicon"
              className="w-6 h-6 rounded-full object-cover border border-[#3E5245]"
            />
            <span style={{ fontFamily: fonts.poppins }} className="text-xs font-bold text-[#3E5245] uppercase tracking-wider">
              Dhruthi Wellness
            </span>
          </div>

        </div>

        {/* Browser Content Frame */}
        <div className="flex-1 w-full h-full relative overflow-hidden bg-white">
          {children}
        </div>
      </div>
    </div>
  );
};
