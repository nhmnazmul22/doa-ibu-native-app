import { useTheme } from "@/context/theme/ThemeContext";
import { Doa, PresetsColors } from "@/types";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import MotherDoa from "./MotherDoa";
import LoadingComponents from "./LoadingComponents";
import ErrorComponents from "./ErrorComponent";

interface MotherDoaListProps {
  loading?: boolean;
  doas: Doa[];
  error?: string;
}

const { width } = Dimensions.get("window");

export default function MotherDoaList({
  doas,
  loading,
  error,
}: MotherDoaListProps) {
  const theme = useTheme();
  const colors = theme?.colors;
  const styles = getStyles(colors);

  if (loading) {
    return <LoadingComponents />;
  }

  if (!loading && doas.length === 0 && error) {
    return <ErrorComponents errorText={error} />;
  }

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
