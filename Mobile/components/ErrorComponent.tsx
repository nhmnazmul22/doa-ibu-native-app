import { useTheme } from "@/context/theme/ThemeContext";
import { PresetsColors } from "@/types";
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";

const width = Dimensions.get("window").width;

interface ErrorComponentType {
  errorText: string;
}

export default function ErrorComponents({
  errorText = "Something went wrong!",
}: ErrorComponentType) {
  const theme = useTheme();
  const colors = theme?.colors;
  const styles = getStyles(colors);
  return (
    <View style={styles.loadingContainer}>
      <View style={styles.loadingBox}>
        <Text style={styles.errorText}>{errorText}</Text>
      </View>
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
    loadingBox: {
      backgroundColor: "red",
      paddingHorizontal: 80,
      paddingVertical: 20,
      borderRadius: 10,
      elevation: 3,
    },
    errorText: {
      fontFamily: "Nunito",
      fontSize: 16,
      color: colors?.bodyBackground,
      textAlign: "center",
    },
  });
