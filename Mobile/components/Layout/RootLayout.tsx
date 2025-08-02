import TabBar from "@/components/Layout/TabBar";
import TopAppBar from "@/components/Layout/TopAppBar";
import Splash from "@/components/Splash";
import { ThemeProvider, useTheme } from "@/context/theme/ThemeContext";
import { store } from "@/store";
import { PresetsColors } from "@/types";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import Constants from "expo-constants";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";

const clerkKey = Constants.expoConfig?.extra?.clerkPublishableKey;

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Nunito: require("@/assets/fonts/Nunito-Regular.ttf"),
    NunitoBold: require("@/assets/fonts/Nunito-Bold.ttf"),
    NunitoBlack: require("@/assets/fonts/Nunito-Black.ttf"),
  });
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const colors = theme?.colors;
  const styles = getStyles(colors);
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (loading && !fontsLoaded) {
    return <Splash />;
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ClerkProvider
        tokenCache={tokenCache}
        publishableKey={clerkKey || "pk_live_Y2xlcmsuYXBwZG9haWJ1Lm15LmlkJA"}
      >
        <Provider store={store}>
          <ThemeProvider>
            <View style={styles.container}>
              <TopAppBar />
              <Slot />
              <TabBar />
            </View>
            <Toast swipeable />
          </ThemeProvider>
        </Provider>
      </ClerkProvider>
    </SafeAreaView>
  );
}

const getStyles = (colors: PresetsColors | undefined) =>
  StyleSheet.create({
    safeAreaView: {
      flex: 1,
    },
    container: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: colors?.bodyBackground,
    },
  });
