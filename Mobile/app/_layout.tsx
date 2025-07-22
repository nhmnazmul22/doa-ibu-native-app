import TabBar from "@/components/Layout/TabBar";
import TopAppBar from "@/components/Layout/TopAppBar";
import Splash from "@/components/Splash";
import { ThemeProvider } from "@/context/theme/ThemeContext";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import Toast from "react-native-toast-message";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Nunito: require("../assets/fonts/Nunito-Regular.ttf"),
    NunitoBold: require("../assets/fonts/Nunito-Bold.ttf"),
    NunitoBlack: require("../assets/fonts/Nunito-Black.ttf"),
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (loading && !fontsLoaded) {
    return <Splash />;
  }

  return (
    <SafeAreaView style={style.safeAreaView}>
      <ThemeProvider>
        <View style={style.container}>
          <TopAppBar />
          <Slot />
          <TabBar />
        </View>
        <Toast />
      </ThemeProvider>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },

  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFF9F5",
  },
});
