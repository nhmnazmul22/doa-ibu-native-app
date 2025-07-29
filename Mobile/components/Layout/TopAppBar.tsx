import { useTheme } from "@/context/theme/ThemeContext";
import { PresetsColors } from "@/types";
import { FontAwesome } from "@expo/vector-icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Link, router, usePathname } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Toast from "react-native-toast-message";
import { deleteToken } from "@/lib/token";
const { width } = Dimensions.get("window");

export default function TopAppBar() {
  const pathname = usePathname();
  const theme = useTheme();
  const colors = theme?.colors;
  const styles = getStyles(colors);

  const pageTitle = () => {
    let title = "Now Playing";

    if (pathname.includes("/recording")) {
      title = "Now Recording";
    } else if (pathname.includes("/mothers/")) {
      title = "Ibu Profile";
    } else {
      title = title;
    }

    return title;
  };

  if (
    pathname === "/login-signup" ||
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/forgot-password"
  ) {
    return null;
  }

  const handelLogout = () => {
    try {
      deleteToken();
      router.replace("/login");
    } catch (err) {
      console.log(err);
      Toast.show({
        type: "error",
        text1: "Log out filed",
        position: "bottom",
        visibilityTime: 2000,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Link href="/">
        {pathname === "/" ? (
          <Pressable onPress={() => router.push("/subscription")}>
            <MaterialIcons name="subscriptions" size={28} color="black" />
          </Pressable>
        ) : (
          <Pressable onPress={() => router.back()}>
            <MaterialCommunityIcons
              name="arrow-left-thin"
              size={34}
              color="black"
            />
          </Pressable>
        )}
      </Link>
      <Link href="/">
        {pathname.includes("/prayers/") ||
        pathname.includes("/recording") ||
        pathname.includes("/mothers/") ? (
          <Text style={styles.pageTitle}>{pageTitle()}</Text>
        ) : (
          <Image
            style={styles.logo}
            source={require("../../assets/images/logo.png")}
          />
        )}
      </Link>
      <Pressable onPress={handelLogout}>
        <MaterialCommunityIcons name="logout" size={28} color="black" />
      </Pressable>
    </View>
  );
}

const getStyles = (colors: PresetsColors | undefined) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors?.bodyBackground,
      paddingVertical: 30,
      paddingHorizontal: 30,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: width * 1,
      position: "relative",
      zIndex: 5,
    },
    logo: {
      width: 50,
      height: 50,
    },
    pageTitle: {
      fontFamily: "Nunito",
      fontSize: 18,
      fontWeight: 700,
      color: colors?.darkText,
    },
  });
