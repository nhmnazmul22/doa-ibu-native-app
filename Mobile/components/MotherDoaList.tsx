import { useTheme } from "@/context/theme/ThemeContext";
import { Doa, PresetsColors } from "@/types";
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import LoadingComponents from "./LoadingComponents";
import MotherDoa from "./MotherDoa";

interface MotherDoaListProps {
  loading?: boolean;
  doas: Doa[];
  error?: string;
}

const { width } = Dimensions.get("window");

export default function MotherDoaList({ doas, loading }: MotherDoaListProps) {
  const theme = useTheme();
  const colors = theme?.colors;
  const styles = getStyles(colors);

  if (loading) {
    return <LoadingComponents />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.doaList}>
        {doas.length > 0 ? (
          doas.map((doa) => <MotherDoa key={doa._id} doa={doa} />)
        ) : (
          <Text
            style={{
              textAlign: "center",
              fontFamily: "Nunito",
              fontSize: 16,
              fontStyle: "italic",
              color: colors?.darkText,
            }}
          >
            No Data Found
          </Text>
        )}
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
