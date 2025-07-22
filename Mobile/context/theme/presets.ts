// theme/presets.js

import { PresetsColors } from "@/types";

export const ThemePresets: Record<string, PresetsColors> = {
  original: {
    primary: "#D26C7A",
    secondary: "#F8D7DA",
    darkText: "#2E2E2E",
    bodyBackground: "#FFF9F5",
    success: "#A8C3A0",
    warning: "#F4D58D",
  },
  light: {
    primary: "#A87CA0",
    secondary: "#F0E9F9",
    darkText: "#444444",
    bodyBackground: "#FFFFFF",
    success: "#BDE5B8",
    warning: "#FFE799",
  },
  dark: {
    primary: "#C16868",
    secondary: "#3A3A3A",
    darkText: "#FFFFFF",
    bodyBackground: "#1E1E1E",
    success: "#679267",
    warning: "#B29B5B",
  },
};
