import { Dimensions, Image, Pressable, StyleSheet, View } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Link, router, usePathname } from "expo-router";

const { width } = Dimensions.get("window");

export default function TopAppBar() {
  const pathname = usePathname();

  return (
    <View style={styles.container}>
      <Link href="/">
        {pathname === "/" ? (
          <FontAwesome name="search" size={24} />
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
        <Image
          style={styles.logo}
          source={require("../../assets/images/logo.png")}
        />
      </Link>
      <Link href="/">
        <MaterialCommunityIcons name="dots-vertical" size={24} color="black" />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    paddingVertical: 30,
    paddingHorizontal: 30,
    fontFamily: "Nunito",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: width * 1,
  },
  logo: {
    width: 50,
    height: 50,
  },
});
