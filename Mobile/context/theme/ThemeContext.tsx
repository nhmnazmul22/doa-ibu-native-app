import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { ThemePresets } from "./presets";

type ThemeContextType = {
  colors: (typeof ThemePresets)["original"];
  applyPreset: (presetName: string) => void;
  currentTheme: string;
};
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_KEY = "original";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [colors, setColors] = useState(ThemePresets.original);
  const [currentTheme, setCurrentTheme] = useState("original");

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_KEY);
        if (savedTheme && ThemePresets[savedTheme]) {
          setColors(ThemePresets[savedTheme]);
          setCurrentTheme(savedTheme);
        }
      } catch (err) {
        console.error("Failed to load theme", err);
      }
    };
    loadTheme();
  }, []);

  const applyPreset = async (presetName: string) => {
    if (ThemePresets[presetName]) {
      setColors(ThemePresets[presetName]);
      setCurrentTheme(presetName);
      await AsyncStorage.setItem(THEME_KEY, presetName);
    }
  };

  return (
    <ThemeContext.Provider value={{ colors, applyPreset, currentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    Toast.show({
      type: "info",
      text1: `useTheme must be used within ThemeProvider`,
      position: "top",
      visibilityTime: 2000,
    });
    return;
  }
  return context;
};
