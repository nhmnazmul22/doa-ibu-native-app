import { useTheme } from "@/context/theme/ThemeContext";
import { PresetsColors } from "@/types";
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

export default function ForgotPassword() {
  const theme = useTheme();
  const colors = theme?.colors;
  const styles = getStyles(colors);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <View style={styles.inputContainer}>
        <TextInput
          inputMode="text"
          style={styles.input}
          placeholder="Enter Previous Password"
        />
        <TextInput
          inputMode="text"
          style={styles.input}
          placeholder="Enter New Password"
        />
        <Pressable style={styles.btn}>
          <Text style={styles.btnText}>Forgot Password</Text>
        </Pressable>
      </View>
      <Text style={styles.registerText}>
        Not a member ?{" "}
        <Link
          style={{
            color: colors?.primary,
            fontWeight: 600,
            textDecorationLine: "underline",
          }}
          href="/register"
        >
          Register now
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
    registerText: {
      marginTop: 40,
      fontSize: 16,
      fontWeight: 600,
      fontFamily: "Nunito",
      color: colors?.darkText,
    },
  });
