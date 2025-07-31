import { useTheme } from "@/context/theme/ThemeContext";
import { PresetsColors } from "@/types";
import { useSignIn } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

const width = Dimensions.get("window").width;

export default function ForgotPassword() {
  const theme = useTheme();
  const colors = theme?.colors;
  const styles = getStyles(colors);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { isLoaded, signIn, setActive } = useSignIn();

  if (!isLoaded) {
    return null;
  }

  const resetPasswordCode = async () => {
    setLoading(true);
    await signIn
      ?.create({
        strategy: "reset_password_email_code",
        identifier: email,
      })
      .then((_) => {
        setSuccessfulCreation(true);
        Toast.show({
          type: "info",
          text1: "A OTP Code send in you email",
          position: "bottom",
          visibilityTime: 2000,
        });
        setError("");
        setLoading(false);
      })
      .catch((err) => {
        console.error("error", err.errors[0].longMessage);
        Toast.show({
          type: "error",
          text1: err.errors[0].message || "Code send failure",
          position: "bottom",
          visibilityTime: 2000,
        });
        setError(err.errors[0].longMessage);
        setLoading(false);
      });
  };

  const verifyCode = async () => {
    setLoading(true);
    await signIn
      ?.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password,
      })
      .then((result) => {
        if (result.status === "complete") {
          setActive({ session: result.createdSessionId });
          Toast.show({
            type: "success",
            text1: "Passport Reset or Update successful, Login now",
            position: "bottom",
            visibilityTime: 2000,
          });
          setError("");
          setLoading(false);
          router.push("/");
        } else {
          Toast.show({
            type: "error",
            text1: "Passport Reset or Update failure",
            position: "bottom",
            visibilityTime: 2000,
          });
          setLoading(false);
        }
      })
      .catch((err) => {
        Toast.show({
          type: "error",
          text1: err.errors[0].message || "Code verify failure",
          position: "bottom",
          visibilityTime: 2000,
        });
        setError(err.errors[0].longMessage);
        setLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {!successfulCreation ? "Forgot Password" : "Verify OTP Code"}
      </Text>
      {!successfulCreation && (
        <View style={styles.inputContainer}>
          <TextInput
            inputMode="text"
            style={styles.input}
            placeholder="Enter email address"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <Pressable style={styles.btn} onPress={resetPasswordCode}>
            <Text style={styles.btnText}>Send code</Text>
          </Pressable>
        </View>
      )}
      {successfulCreation && (
        <View style={styles.inputContainer}>
          <TextInput
            inputMode="text"
            style={styles.input}
            placeholder="Enter New password"
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <TextInput
            inputMode="text"
            style={styles.input}
            placeholder="Enter OTP Code"
            value={code}
            onChangeText={(text) => setCode(text)}
          />
          <Pressable style={styles.btn} onPress={verifyCode}>
            <Text style={styles.btnText}>Send code</Text>
          </Pressable>
        </View>
      )}
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
      paddingTop: 200,
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
