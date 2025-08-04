import { useTheme } from "@/context/theme/ThemeContext";
import { PresetsColors } from "@/types";
import { Link } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

const logo = require("@/assets/images/doaibu-splase-transparent.png");
const width = Dimensions.get("window").width;

export default function LoginSignupPage() {
  const theme = useTheme();
  const colors = theme?.colors;
  const styles = getStyles(colors);

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.title}>listen Doa Ibu</Text>
      <Text style={styles.des}>
        Doa, pesan cinta, dan suara dari orang-orang yang paling menyayangi kita
        — khususnya Ibu.
      </Text>
      <View style={styles.btnBox}>
        <Pressable style={styles.registerBtn}>
          <Link
            href="/register"
            style={{ ...styles.btnText, color: colors?.bodyBackground }}
          >
            Register
          </Link>
        </Pressable>
        <Pressable style={styles.loginBtn}>
          <Link href="/login" style={styles.btnText}>
            Login
          </Link>
        </Pressable>
      </View>
    </View>
  );
}

const getStyles = (colors: PresetsColors | undefined) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      width: width * 0.9,
    },
    logo: {
      width: 300,
      height: 300,
    },
    title: {
      fontSize: 24,
      fontWeight: "700",
      fontFamily: "Nunito",
      color: colors?.darkText,
    },
    des: {
      fontSize: 16,
      fontWeight: "500",
      fontFamily: "Nunito",
      color: colors?.darkText,
      textAlign: "center",
    },
    btnBox: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: 20,
      marginTop: 30,
    },
    registerBtn: {
      paddingHorizontal: 40,
      paddingVertical: 20,
      backgroundColor: colors?.primary,
      borderRadius: 50,
    },
    loginBtn: {
      paddingHorizontal: 40,
      paddingVertical: 20,
    },
    btnText: {
      fontSize: 16,
      fontWeight: "700",
      fontFamily: "Nunito",
      color: colors?.darkText,
      textAlign: "center",
    },
  });
