import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export default function LoadingComponents() {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#D26C7A" />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
