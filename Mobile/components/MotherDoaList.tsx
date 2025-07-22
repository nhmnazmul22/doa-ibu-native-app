import { useTheme } from "@/context/theme/ThemeContext";
import { Doa, PresetsColors } from "@/types";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import MotherDoa from "./MotherDoa";

interface MotherDoaListProps {
  doas: Doa[];
}

const { width } = Dimensions.get("window");

export default function MotherDoaList({ doas }: MotherDoaListProps) {
  const theme = useTheme();
  const colors = theme?.colors;
  const styles = getStyles(colors);

  return (
    <View style={styles.container}>
      <View style={styles.doaList}>
        {doas.map((doa) => (
          <MotherDoa key={doa._id} doa={doa} />
        ))}
      </View>
    </View>
  );
}

const getStyles = (colors: PresetsColors | undefined) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingBottom: 20,
      width: width * 0.9,
      marginHorizontal: "auto",
    },
    doaList: {
      gap: 5,
    },
  });
