import { useTheme } from "@/context/theme/ThemeContext";
import { validateEmail, validatePassword } from "@/lib";
import { auth } from "@/lib/config/firebaseconfig";
import { saveToken } from "@/lib/token";
import { AppDispatch, RootState } from "@/store";
import { fetchUser } from "@/store/userSlice";
import { PresetsColors } from "@/types";
import { FontAwesome } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";

const googleIcon = require("@/assets/images/google-icon.png");
const facebookIcon = require("@/assets/images/facebook-icon.png");
const width = Dimensions.get("window").width;

export default function LoginPage() {
  const theme = useTheme();
  const colors = theme?.colors;
  const styles = getStyles(colors);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  const reset = () => {
    setEmail("");
    setPassword("");
  };

  const handleLogin = async () => {
    try {
      setLoading(true);

      if (!email || !password) {
        Toast.show({
          type: "error",
          text1: "Please, fill up all field",
          position: "bottom",
          visibilityTime: 2000,
        });
        return;
      }

      const isEmail = validateEmail(email);
      const isPassword = validatePassword(password);
      if (!isEmail) {
        Toast.show({
          type: "error",
          text1: "Invalid Email address!",
          position: "bottom",
          visibilityTime: 2000,
        });
        return;
      }

      if (!isPassword.success) {
        Toast.show({
          type: "error",
          text1: isPassword.message,
          position: "bottom",
          visibilityTime: 2000,
        });
        return;
      }

      // 🔐 Firebase login directly
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const token = await userCredential.user.getIdToken();

      // Save token and dispatch the user
      if (userCredential.user.email && token) {
        dispatch(fetchUser(userCredential.user.email));
        saveToken(token);
        reset();
        router.replace("/");
      }
    } catch (err: any) {
      console.error("Error", err);
      Toast.show({
        type: "error",
        text1: err.message || "Login failed, try again",
        position: "bottom",
        visibilityTime: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign in</Text>
      <View style={styles.inputContainer}>
        <TextInput
          inputMode="email"
          style={styles.input}
          placeholder="Enter username or email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholderTextColor="#000000c1"
        />
        <TextInput
          inputMode="text"
          style={styles.input}
          placeholder="Enter Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholderTextColor="#000000c1"
        />
        <Pressable style={styles.btn} onPress={handleLogin}>
          {loading && <ActivityIndicator size="small" color="#ffffff" />}
          {!loading && <Text style={styles.btnText}>Sign In</Text>}
        </Pressable>
      </View>
      <View style={styles.lineBox}>
        <View style={styles.line}></View>
        <Text>Or</Text>
        <View style={styles.line}></View>
      </View>
      <View style={styles.iconsBox}>
        <View style={styles.iconsBox}>
          <Pressable onPress={() => router.push("/")}>
            <Image
              source={googleIcon}
              style={{ width: 45, height: 45, objectFit: "contain" }}
            />
          </Pressable>
          <Pressable onPress={() => router.push("/")}>
            <Image
              source={facebookIcon}
              style={{ width: 45, height: 45, objectFit: "contain" }}
            />
          </Pressable>
        </View>
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
      textAlign: "center",
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
      borderColor: "#00000059",
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
      textAlign: "center",
    },
    tabsList: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 20,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 30,
    },
    tabBtnPrimary: {
      backgroundColor: colors?.bodyBackground,
      borderWidth: 1,
      borderColor: colors?.primary,
      paddingHorizontal: 30,
      paddingVertical: 10,
      borderRadius: 10,
    },
    activeBtn: {
      backgroundColor: colors?.primary,
      borderWidth: 0,
    },
    tabBtnText: {
      fontFamily: "Nunito",
      fontSize: 14,
      textAlign: "center",
      color: colors?.darkText,
      fontWeight: "700",
    },
    activeBtnText: {
      color: colors?.bodyBackground,
    },
  });
