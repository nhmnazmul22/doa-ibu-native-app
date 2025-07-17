import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function MOtherList() {
  return (
    <View style={styles.container}>
      <Text>MOtherList</Text>
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
