import { useTheme } from "@/context/theme/ThemeContext";
import { validateEmail, validatePassword } from "@/lib";
import api from "@/lib/config/axios";
import { auth } from "@/lib/config/firebaseconfig";
import { PresetsColors } from "@/types";
import { Link, router } from "expo-router";
import {
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import * as Facebook from "expo-auth-session/providers/facebook";

WebBrowser.maybeCompleteAuthSession();

const googleIcon = require("@/assets/images/google-icon.png");
const facebookIcon = require("@/assets/images/facebook-icon.png");
const width = Dimensions.get("window").width;

export default function RegisterPage() {
  const theme = useTheme();
  const colors = theme?.colors;
  const styles = getStyles(colors);
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const reset = () => {
    setFullName("");
    setEmail("");
    setPassword("");
  };

  // ✅ Set redirect URI for production
  const redirectUri = "https://auth.expo.dev/@nhmnazmul22/doa-ibu";

  const [googleRequest, googleResponse, googlePromptAsync] =
    Google.useAuthRequest({
      clientId:
        "71022976123-kl1r0s53q4rdeegn7ungf2occ93emajg.apps.googleusercontent.com",
      androidClientId:
        "71022976123-cj20o2208ik321sh8qcd0vnqepbadh49.apps.googleusercontent.com",
      webClientId:
        "61111890879-8ps0ab0l8goqu0hfk0i230bqivm63q1u.apps.googleusercontent.com",
      redirectUri,
    });

  const [fbRequest, fbResponse, fbPromptAsync] = Facebook.useAuthRequest({
    clientId: "720709907612444",
    redirectUri,
  });

  const handleRegistration = async () => {
    let createdUserId = null;

    try {
      setLoading(true);
      if (!fullName || !password || !email) {
        Toast.show({
          type: "error",
          text1: "Please, fill up all fields",
          position: "bottom",
        });
        return;
      }

      const isEmail = validateEmail(email);
      const isPassword = validatePassword(password);

      if (!isEmail) {
        Toast.show({
          type: "error",
          text1: "Invalid email address!",
          position: "bottom",
        });
        return;
      }

      if (!isPassword.success) {
        Toast.show({
          type: "error",
          text1: isPassword.message,
          position: "bottom",
        });
        return;
      }

      const res = await api.post("/create-user", { fullName, email, password });

      if (res.status === 201) {
        createdUserId = res.data.data._id;

        const firebaseRes = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        if (firebaseRes.user) {
          reset();
          Toast.show({
            type: "success",
            text1: "Account registration successful",
            position: "bottom",
          });
          router.push("/login");
          return;
        }
      }
    } catch (err: any) {
      let message = "Account registration failed";

      if (
        ["auth/email-already-in-use", "auth/invalid-email"].includes(err.code)
      ) {
        message =
          err.code === "auth/email-already-in-use"
            ? "This email is already in use"
            : "Invalid email format";
      } else if (err?.message) {
        message = err.message;
      }

      if (createdUserId) {
        try {
          await api.delete(`/delete-user/${createdUserId}`);
        } catch (deleteErr) {
          console.error("Failed to delete user from backend:", deleteErr);
        }
      }

      Toast.show({
        type: "error",
        text1: message,
        position: "bottom",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (googleResponse?.type === "success") {
      const { id_token } = googleResponse.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then((userCredential) => {
          console.log("✅ Google login success:", userCredential.user);
          router.replace("/");
        })
        .catch((error) => {
          console.error("❌ Google sign-in error:", error);
        });
    }
  }, [googleResponse]);

  useEffect(() => {
    if (
      fbResponse?.type === "success" &&
      fbResponse.authentication?.accessToken
    ) {
      const credential = FacebookAuthProvider.credential(
        fbResponse.authentication.accessToken
      );
      signInWithCredential(auth, credential)
        .then((userCredential) => {
          console.log("✅ Facebook login success:", userCredential.user);
          router.replace("/");
        })
        .catch((error) => {
          console.error("❌ Facebook sign-in error:", error);
        });
    }
  }, [fbResponse]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register Account</Text>
      <View style={styles.inputContainer}>
        <TextInput
          inputMode="text"
          style={styles.input}
          placeholder="Full Name"
          value={fullName}
          onChangeText={setFullName}
          placeholderTextColor="#000000c1"
        />
        <TextInput
          inputMode="email"
          style={styles.input}
          placeholder="Enter Email"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#000000c1"
        />
        <TextInput
          inputMode="text"
          secureTextEntry
          style={styles.input}
          placeholder="Enter Password"
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#000000c1"
        />
        <Pressable
          style={styles.btn}
          onPress={handleRegistration}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Text style={styles.btnText}>Create Account</Text>
          )}
        </Pressable>
      </View>

      <View style={styles.lineBox}>
        <View style={styles.line}></View>
        <Text>Or</Text>
        <View style={styles.line}></View>
      </View>

      <View style={styles.iconsBox}>
        <Pressable
          disabled={!googleRequest}
          onPress={() => googlePromptAsync()}
        >
          <Image source={googleIcon} style={{ width: 45, height: 45 }} />
        </Pressable>
        <Pressable disabled={!fbRequest} onPress={() => fbPromptAsync()}>
          <Image source={facebookIcon} style={{ width: 45, height: 45 }} />
        </Pressable>
      </View>

      <Text style={styles.registerText}>
        Do you have an account?{" "}
        <Link
          style={{
            color: colors?.primary,
            fontWeight: "600",
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
      paddingTop: 100,
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
      marginTop: 20,
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
    checkboxContainer: {
      marginTop: 10,
    },
    checkBoxTitle: {
      fontSize: 16,
      fontWeight: 700,
      marginBottom: 10,
      fontFamily: "Nunito",
      color: colors?.darkText,
    },
    checkBoxs: {
      flexDirection: "row",
      gap: 10,
    },
    check: {
      flexDirection: "row",
      gap: 10,
    },
    checkTitle: {
      fontFamily: "Nunito",
      color: colors?.darkText,
      fontSize: 14,
    },
  });
