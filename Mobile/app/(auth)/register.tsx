import { useTheme } from "@/context/theme/ThemeContext";
import { PresetsColors } from "@/types";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link } from "expo-router";
import React from "react";
import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const width = Dimensions.get("window").width;

export default function RegisterPage() {
  const theme = useTheme();
  const colors = theme?.colors;
  const styles = getStyles(colors);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register Account</Text>
      <View style={styles.inputContainer}>
        <TextInput
          inputMode="text"
          style={styles.input}
          placeholder="Full Name"
        />
        <TextInput
          inputMode="email"
          style={styles.input}
          placeholder="Enter username or email"
        />
        <TextInput
          inputMode="text"
          style={styles.input}
          placeholder="Enter Password"
        />
        <Pressable style={styles.btn}>
          <Text style={styles.btnText}>Create Account</Text>
        </Pressable>
      </View>
      <View style={styles.lineBox}>
        <View style={styles.line}></View>
        <Text>Or</Text>
        <View style={styles.line}></View>
      </View>
      <View style={styles.iconsBox}>
        <Pressable>
          <FontAwesome
            name="google"
            size={38}
            color={colors?.darkText}
            style={{ marginHorizontal: "auto" }}
          />
        </Pressable>
        <Pressable>
          <FontAwesome
            name="apple"
            size={38}
            color={colors?.darkText}
            style={{ marginHorizontal: "auto" }}
          />
        </Pressable>
      </View>
      <Text style={styles.registerText}>
        Do you have an account?{" "}
        <Link
          style={{
            color: colors?.primary,
            fontWeight: 600,
            textDecorationLine: "underline",
          }}
          href="/login"
        >
          Sign in
        </Link>
      </Text>
    </View>
  );
}

const getStyles = (colors: PresetsColors | undefined) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "flex-start",
      alignItems: "center",
      width: width * 0.9,
      paddingTop: 150,
    },
    title: {
      fontFamily: "Nunito",
      fontSize: 30,
      color: colors?.primary,
      fontWeight: 700,
    },
    inputContainer: {
      width: width * 0.9,
      marginTop: 50,
      display: "flex",
      flexDirection: "column",
      gap: 20,
    },
    input: {
      width: "100%",
      height: 80,
      borderWidth: 1,
      borderRadius: 10,
      borderColor: colors?.darkText,
      paddingHorizontal: 20,
      fontSize: 18,
      fontFamily: "Nunito",
      color: colors?.darkText,
    },
    forgotLink: {
      fontSize: 16,
      fontWeight: 600,
      fontFamily: "Nunito",
      color: colors?.darkText,
      textDecorationLine: "underline",
    },
    btn: {
      width: width * 0.5,
      backgroundColor: colors?.primary,
      borderRadius: 50,
      paddingVertical: 20,
      paddingHorizontal: 30,
      marginHorizontal: "auto",
    },
    btnText: {
      fontSize: 16,
      fontWeight: 600,
      fontFamily: "Nunito",
      color: colors?.bodyBackground,
      textAlign: "center",
    },
    lineBox: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginVertical: 20,
      gap: 10,
      width: "100%",
    },
    line: {
      width: "40%",
      height: 2,
      backgroundColor: colors?.darkText,
    },
    iconsBox: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      marginTop: 10,
      gap: 50,
    },

    registerText: {
      marginTop: 40,
      fontSize: 16,
      fontWeight: 600,
      fontFamily: "Nunito",
      color: colors?.darkText,
    },
  });
