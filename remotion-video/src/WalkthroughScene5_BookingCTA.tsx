import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { WalkthroughBrowserFrame } from "./WalkthroughBrowserFrame";
import { loadFonts } from "./Typography";

export const WalkthroughScene5_BookingCTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fonts = loadFonts();

  const cardSpring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 12, mass: 0.5, stiffness: 100 },
  });
  const cardScale = interpolate(cardSpring, [0, 1], [0.8, 1]);
  const cardOpacity = interpolate(cardSpring, [0, 1], [0, 1]);

  const pulse = interpolate(
    Math.sin((frame / 15) * Math.PI),
    [-1, 1],
    [0.98, 1.03]
  );

  return (
    <AbsoluteFill className="select-none">
      <WalkthroughBrowserFrame activeSectionName="booking">
        <div className="w-full h-full relative overflow-hidden flex items-center justify-center">
          {/* Website Booking Screenshot */}
          <img
            src={staticFile("assets/walkthrough/booking.png")}
            alt="Booking Section Screenshot"
            className="w-full h-full object-cover object-top"
          />

          {/* Semi-transparent Backdrop Blur Overlay */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-10" />

          {/* Central Call to Action Popup Card */}
          <div
            style={{
              transform: `scale(${cardScale * pulse})`,
              opacity: cardOpacity,
              boxShadow: "0 25px 60px rgba(0, 0, 0, 0.4)",
            }}
            className="relative z-20 bg-white/95 backdrop-blur-md p-8 rounded-3xl border-4 border-[#3E5245] max-w-xl text-center"
          >
            <div className="w-20 h-20 rounded-full bg-[#3E5245] text-white flex items-center justify-center text-4xl mx-auto mb-4 border-2 border-white shadow-md">
              📅
            </div>

            <span
              style={{ fontFamily: fonts.inter }}
              className="text-xs font-bold uppercase tracking-widest text-[#3E5245] bg-[#3E5245]/15 px-4 py-1.5 rounded-full inline-block mb-3"
            >
              Easy Digital Booking
            </span>

            <h2
              style={{ fontFamily: fonts.playfair }}
              className="text-4xl font-bold text-[#2B2B2B] mb-3 leading-tight"
            >
              Ready To Transform Your Health?
            </h2>

            <p
              style={{ fontFamily: fonts.poppins }}
              className="text-lg text-[#3A2F2F]/85 leading-relaxed mb-6"
            >
              Book your 1-on-1 video consultation with Dt. Akhila Konakalla today.
            </p>

            <div className="bg-[#3E5245] text-white py-4 px-8 rounded-full text-2xl font-bold uppercase tracking-wide shadow-lg border border-white inline-flex items-center gap-3 cursor-pointer mb-4">
              <span>Book Consultation Now</span>
              <span>➔</span>
            </div>

            <p style={{ fontFamily: fonts.inter }} className="text-sm font-semibold text-[#3E5245]">
              🌐 Visit: dhruthi-wellness.vercel.app
            </p>
          </div>
        </div>
      </WalkthroughBrowserFrame>
    </AbsoluteFill>
  );
};
