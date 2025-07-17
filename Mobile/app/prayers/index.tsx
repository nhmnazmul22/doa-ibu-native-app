import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";

export default function PrayersPage() {
  return (
    <View style={styles.container}>
      <Text>PrayersPage</Text>
      <Link href="./1" relativeToDirectory>
        Audio 1
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
