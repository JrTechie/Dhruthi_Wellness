import { loadFont as loadCormorant } from "@remotion/google-fonts/CormorantGaramond";
import { loadFont as loadPlayfair } from "@remotion/google-fonts/PlayfairDisplay";
import { loadFont as loadLeagueSpartan } from "@remotion/google-fonts/LeagueSpartan";
import { loadFont as loadPoppins } from "@remotion/google-fonts/Poppins";
import { loadFont as loadDMSans } from "@remotion/google-fonts/DMSans";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { loadFont as loadCaveat } from "@remotion/google-fonts/Caveat";

export const loadFonts = () => {
  const cormorant = loadCormorant("normal", { weights: ["600", "700"] });
  const playfair = loadPlayfair("normal", { weights: ["600", "700"] });
  const leagueSpartan = loadLeagueSpartan("normal", { weights: ["600", "700"] });
  const poppins = loadPoppins("normal", { weights: ["400", "500", "600"] });
  const dmSans = loadDMSans("normal", { weights: ["400", "500", "600"] });
  const inter = loadInter("normal", { weights: ["400", "500", "600"] });
  const caveat = loadCaveat("normal");

  return {
    cormorant: cormorant.fontFamily,
    playfair: playfair.fontFamily,
    leagueSpartan: leagueSpartan.fontFamily,
    poppins: poppins.fontFamily,
    dmSans: dmSans.fontFamily,
    inter: inter.fontFamily,
    body: poppins.fontFamily,
    accentHandwritten: caveat.fontFamily,

    // Backward-compatibility font aliases
    italiana: cormorant.fontFamily,
    outfit: poppins.fontFamily,
    handwritten: caveat.fontFamily,
  };
};

export const EDITORIAL_COLORS = {
  babyPink: "#F7E1DF",
  blush: "#F5E6E8",
  softRose: "#E8B4B8",
  roseGold: "#D4A5AB",
  cream: "#FAF6F0",
  ivory: "#FFFDF9",
  sage: "#94A89A",
  sageDark: "#3E5245",
  charcoalDark: "#2B2B2B",
  espressoDeep: "#3A2F2F",
  glassWhiteBorder: "rgba(255, 255, 255, 0.4)",
  glassBgLight: "rgba(255, 255, 255, 0.25)",
  glassBgDark: "rgba(43, 43, 43, 0.25)",

  // Legacy aliases
  pearlWhite: "#FFFDF9",
  coralLight: "#F7E1DF",
  emeraldLight: "#FAF6F0",
  coral: "#E8B4B8",
  obsidian: "#2B2B2B",
  emerald: "#94A89A",
  mint: "#94A89A",
  goldAccent: "#D4A5AB",
};


export const COLORS = {
  bgLight: "#FAF6F0",
  primary: "#94A89A",
  secondary: "#3E5245",
  textMain: "#2B2B2B",
  textSub: "#3A2F2F",
  textHighlight: "#E8B4B8",
};

export const PASTEL_COLORS = {
  bgWhite: "#FFFDF9",
  bgWarmBeige: "#FAF6F0",
  sageGreen: "#94A89A",
  sageGreenDark: "#3E5245",
  blushPink: "#F5E6E8",
  softRose: "#E8B4B8",
  pastelPeach: "#F7E1DF",
  charcoal: "#2B2B2B",
  glassBorder: "rgba(255, 255, 255, 0.4)",
  glassBg: "rgba(255, 255, 255, 0.25)",

  // Backward-compatibility color aliases
  lightOrange: "#F5E6E8",
  lightOrangeGlow: "#E8B4B8",
};

export const COLORS_STRESS = {
  espresso: "#3A2F2F",
  blushRose: "#E8B4B8",
  linen: "#FAF6F0",
  linenMuted: "#DFDCD6",
  sage: "#94A89A",
  terracotta: "#E8B4B8",
};

export const COLORS_EATING = {
  espresso: "#3A2F2F",
  blushRose: "#E8B4B8",
  sage: "#94A89A",
  linen: "#FAF6F0",
  linenMuted: "#DFDCD6",
  roseGold: "#D4A5AB",
  amber: "#E8B4B8",
  gold: "#D4A5AB",
};

export const COLORS_PCOS = {
  espresso: "#3A2F2F",
  blushRose: "#E8B4B8",
  emerald: "#94A89A",
  linen: "#FAF6F0",
  linenMuted: "#DFDCD6",
  roseGlow: "#F7E1DF",
  orchid: "#E8B4B8",
};

export const COLORS_METABOLISM = {
  charcoal: "#2B2B2B",
  softGreen: "#94A89A",
  blushRose: "#E8B4B8",
  warmOrange: "#E8B4B8",
  beige: "#FAF6F0",
  white: "#FFFDF9",
  subtext: "#DFDCD6",
  glassBg: "rgba(255, 255, 255, 0.25)",
  glassBorder: "rgba(255, 255, 255, 0.4)",
};

export const COLORS_BREASTFEEDING = {
  creamBg: "#FAF6F0",
  creamText: "#FFFDF9",
  sageGreen: "#94A89A",
  sageDark: "#3E5245",
  blushRose: "#E8B4B8",
  roseGold: "#D4A5AB",
  goldGlow: "#D4A5AB",
  terracotta: "#E8B4B8",
  charcoalText: "#2B2B2B",
  espressoText: "#3A2F2F",
  mutedText: "#DFD9CE",
  glassBg: "rgba(255, 255, 255, 0.24)",
  glassBgDark: "rgba(43, 43, 43, 0.28)",
  glassBorder: "rgba(255, 255, 255, 0.4)",
};







