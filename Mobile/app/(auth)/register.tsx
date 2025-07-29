import { useTheme } from "@/context/theme/ThemeContext";
import { validateEmail, validatePassword } from "@/lib";
import api from "@/lib/config/axios";
import { auth } from "@/lib/config/firebaseconfig";
import { PresetsColors } from "@/types";
import { Link, router } from "expo-router";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";
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
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";

const googleIcon = require("@/assets/images/google-icon.png");
const facebookIcon = require("@/assets/images/facebook-icon.png");
const width = Dimensions.get("window").width;
WebBrowser.maybeCompleteAuthSession();

export default function RegisterPage() {
  const theme = useTheme();
  const colors = theme?.colors;
  const styles = getStyles(colors);
  const [loading, setLoading] = useState<boolean>(false);
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const reset = () => {
    setFullName("");
    setEmail("");
    setPassword("");
  };

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId:
      "71022976123-kl1r0s53q4rdeegn7ungf2occ93emajg.apps.googleusercontent.com",
    androidClientId:
      "71022976123-cj20o2208ik321sh8qcd0vnqepbadh49.apps.googleusercontent.com",
    webClientId:
      "61111890879-8ps0ab0l8goqu0hfk0i230bqivm63q1u.apps.googleusercontent.com",
  });

  const handleRegistration = async (e: any) => {
    let createdUserId = null;
    try {
      setLoading(true);
      if (!fullName || !password || !email) {
        Toast.show({
          type: "error",
          text1: "Please, fill up all field",
          position: "bottom",
          visibilityTime: 2000,
        });
        return;
      }

      // checking validation
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

      const userObj = {
        fullName,
        email,
        password,
      };

      const res = await api.post("/create-user", userObj);

      if (res.status === 201) {
        createdUserId = res.data.data._id;

        const fireBaseRes = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        if (fireBaseRes.user) {
          reset();
          Toast.show({
            type: "success",
            text1: "Account Registration successful",
            position: "bottom",
            visibilityTime: 2000,
          });
          router.push("/login");
          return;
        }
      }
    } catch (err: any) {
      console.error("Registration Error:", err);

      let message = "Account Registration failed";

      if (
        ["auth/email-already-in-use", "auth/invalid-email"].includes(err.code)
      ) {
        message =
          err.code === "auth/email-already-in-use"
            ? "This email is already in use"
            : "Invalid email format";

        if (createdUserId) {
          try {
            await api.delete(`/delete-user/${createdUserId}`);
          } catch (deleteErr) {
            console.error("Failed to delete user from backend:", deleteErr);
          }
        }
      }

      Toast.show({
        type: "error",
        text1: message,
        position: "bottom",
        visibilityTime: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;

      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then((userCredential) => {
          console.log("User signed in:", userCredential.user);
          
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register Account</Text>
      <View style={styles.inputContainer}>
        <TextInput
          inputMode="text"
          style={styles.input}
          placeholder="Full Name"
          value={fullName}
          onChangeText={(text) => setFullName(text)}
          placeholderTextColor="#000000c1"
        />
        <TextInput
          inputMode="email"
          style={styles.input}
          placeholder="Enter email"
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
        <Pressable style={styles.btn} onPress={handleRegistration}>
          {loading && <ActivityIndicator size="small" color="#ffffff" />}
          {!loading && <Text style={styles.btnText}>Create Account</Text>}
        </Pressable>
      </View>
      <View style={styles.lineBox}>
        <View style={styles.line}></View>
        <Text>Or</Text>
        <View style={styles.line}></View>
      </View>
      <View style={styles.iconsBox}>
        <Pressable
          onPress={() => {
            promptAsync();
          }}
        >
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
