import { Doa } from "@/types";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import MotherDoa from "./MotherDoa";

const { width } = Dimensions.get("window");

interface MotherDoaListProps {
  doas: Doa[];
}

export default function MotherDoaList({ doas }: MotherDoaListProps) {
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

const styles = StyleSheet.create({
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
