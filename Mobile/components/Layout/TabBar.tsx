import { useTheme } from "@/context/theme/ThemeContext";
import { PresetsColors } from "@/types";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Link, usePathname } from "expo-router";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";

const { width } = Dimensions.get("window");

export default function TabBar() {
  const pathname = usePathname();
  const theme = useTheme();
  const colors = theme?.colors;

  const styles = getStyles(colors);

  if (
    pathname.includes("/prayers/") ||
    pathname === "/recording" ||
    pathname === "/login-signup" ||
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/forgot-password"
  ) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.menuItems}>
        <Link href="/prayers">
          <FontAwesome6
            name="book-bible"
            size={26}
            color={colors?.bodyBackground}
          />
        </Link>
      </View>
      <View style={styles.menuItems}>
        <Link href="/recording">
          <Feather name="mic" size={26} color={colors?.bodyBackground} />
        </Link>
      </View>
      <View style={[styles.menuItems, styles.homeItem]}>
        <Link href="/">
          <Feather name="home" size={26} color={colors?.bodyBackground} />
        </Link>
      </View>
      <View style={styles.menuItems}>
        <Link href="/mothers">
          <FontAwesome5
            name="user-nurse"
            size={26}
            color={colors?.bodyBackground}
          />
        </Link>
      </View>
      <View style={styles.menuItems}>
        <Link href="/settings">
          <Feather name="settings" size={26} color={colors?.bodyBackground} />
        </Link>
      </View>
    </View>
  );
}

const getStyles = (colors: PresetsColors | undefined) =>
  StyleSheet.create({
    container: {
      paddingVertical: 10,
      paddingHorizontal: 30,
      backgroundColor: colors?.primary,
      width: width * 1,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    menuItems: {
      padding: 10,
    },
    homeItem: {
      position: "relative",
      textAlign: "center",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      top: -30,
      backgroundColor: colors?.primary,
      width: 60,
      height: 60,
      shadowColor: colors?.darkText,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 2,
      borderRadius: 50,
    },
  });
