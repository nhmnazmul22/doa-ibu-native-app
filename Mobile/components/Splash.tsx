import { useTheme } from "@/context/theme/ThemeContext";
import { PresetsColors } from "@/types";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { Image, StyleSheet, View } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const theme = useTheme();
  const colors = theme?.colors;
  const styles = getStyles(colors);

  useEffect(() => {
    async function prepare() {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      await SplashScreen.hideAsync();
    }

    prepare();
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require("../assets/images/logo.png")} />
    </View>
  );
}

const getStyles = (colors: PresetsColors | undefined) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors?.bodyBackground,
    },
    text: { color: colors?.bodyBackground, fontSize: 24 },
  });
