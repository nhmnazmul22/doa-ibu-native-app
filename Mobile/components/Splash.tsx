import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function App() {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF9F5",
  },
  text: { color: "white", fontSize: 24 },
});
