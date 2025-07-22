import { useTheme } from "@/context/theme/ThemeContext";
import { PresetsColors } from "@/types";
import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export default function LoadingComponents() {
  const theme = useTheme();
  const colors = theme?.colors;
  const styles = getStyles(colors);
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={colors?.primary} />
    </View>
  );
}

const getStyles = (colors: PresetsColors | undefined) =>
  StyleSheet.create({
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  });
