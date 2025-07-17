import TabBar from "@/components/Layout/TabBar";
import TopAppBar from "@/components/Layout/TopAppBar";
import { Slot } from "expo-router";
import { SafeAreaView, StyleSheet } from "react-native";

export default function RootLayout() {
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
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
});
