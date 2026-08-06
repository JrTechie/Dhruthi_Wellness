import React from "react";

interface IconProps {
  className?: string;
  size?: number;
  color?: string;
  strokeWidth?: number;
}

const DEFAULT_COLOR = "#E98A9B"; // Muted Rose Pink from Master Prompt

export const MotherBabyIcon: React.FC<IconProps> = ({ size = 28, color = DEFAULT_COLOR, strokeWidth = 1.75, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
);

export const MilkBottleIcon: React.FC<IconProps> = ({ size = 28, color = DEFAULT_COLOR, strokeWidth = 1.75, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M8 2h8v4H8z" />
    <path d="M6 6h12l1 4v11a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V10l1-4z" />
    <path d="M10 13h4" />
  </svg>
);

export const WaterDropIcon: React.FC<IconProps> = ({ size = 28, color = DEFAULT_COLOR, strokeWidth = 1.75, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
  </svg>
);

export const LightbulbIcon: React.FC<IconProps> = ({ size = 28, color = DEFAULT_COLOR, strokeWidth = 1.75, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1.3.5 2.6 1.5 3.5.8.7 1.3 1.5 1.5 2.5" />
    <path d="M9 18h6" />
    <path d="M10 22h4" />
  </svg>
);

export const TargetIcon: React.FC<IconProps> = ({ size = 28, color = DEFAULT_COLOR, strokeWidth = 1.75, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

export const CoconutIcon: React.FC<IconProps> = ({ size = 28, color = DEFAULT_COLOR, strokeWidth = 1.75, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7a5 5 0 0 1 5 5" />
  </svg>
);

export const ButtermilkIcon: React.FC<IconProps> = ({ size = 28, color = DEFAULT_COLOR, strokeWidth = 1.75, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
    <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z" />
  </svg>
);

export const SoupBowlIcon: React.FC<IconProps> = ({ size = 28, color = DEFAULT_COLOR, strokeWidth = 1.75, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9z" />
    <path d="M7 8V4" />
    <path d="M12 8V3" />
    <path d="M17 8V5" />
  </svg>
);

export const LemonIcon: React.FC<IconProps> = ({ size = 28, color = DEFAULT_COLOR, strokeWidth = 1.75, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <ellipse cx="12" cy="12" rx="9" ry="6" transform="rotate(-45 12 12)" />
  </svg>
);

export const EnergyZapIcon: React.FC<IconProps> = ({ size = 28, color = DEFAULT_COLOR, strokeWidth = 1.75, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

export const SparklesIcon: React.FC<IconProps> = ({ size = 28, color = DEFAULT_COLOR, strokeWidth = 1.75, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
  </svg>
);

export const WaterBottleIcon: React.FC<IconProps> = ({ size = 28, color = DEFAULT_COLOR, strokeWidth = 1.75, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="8" y="2" width="8" height="4" rx="1" />
    <path d="M7 6h10v14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V6z" />
  </svg>
);

export const AlertTriangleIcon: React.FC<IconProps> = ({ size = 28, color = DEFAULT_COLOR, strokeWidth = 1.75, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

export const DropletOffIcon: React.FC<IconProps> = ({ size = 28, color = DEFAULT_COLOR, strokeWidth = 1.75, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    <line x1="2" y1="2" x2="22" y2="22" />
  </svg>
);

export const ActivityIcon: React.FC<IconProps> = ({ size = 28, color = DEFAULT_COLOR, strokeWidth = 1.75, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

export const MoonIcon: React.FC<IconProps> = ({ size = 28, color = DEFAULT_COLOR, strokeWidth = 1.75, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </svg>
);
