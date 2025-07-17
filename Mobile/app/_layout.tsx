import TabBar from "@/components/Layout/TabBar";
import TopAppBar from "@/components/Layout/TopAppBar";
import { Slot, SplashScreen } from "expo-router";
import { SafeAreaView, StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import Splash from "@/components/Splash";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Nunito: require("../assets/fonts/Nunito-Regular.ttf"),
    NunitoBold: require("../assets/fonts/Nunito-Bold.ttf"),
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
    <SafeAreaView style={style.container}>
      <TopAppBar />
      <Slot />
      <TabBar />
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFF9F5",
  },
});
