import { useTheme } from "@/context/theme/ThemeContext";
import { PresetsColors } from "@/types";
import { Link, router } from "expo-router";
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
import { isClerkAPIResponseError, useSignIn, useSSO } from "@clerk/clerk-expo";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";

const googleIcon = require("@/assets/images/google-icon.png");
const facebookIcon = require("@/assets/images/facebook-icon.png");
const width = Dimensions.get("window").width;

export const useWarmUpBrowser = () => {
  useEffect(() => {
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

// Handle any pending authentication sessions
WebBrowser.maybeCompleteAuthSession();

export default function LoginPage() {
  useWarmUpBrowser();
  const theme = useTheme();
  const colors = theme?.colors;
  const styles = getStyles(colors);
  const { signIn, setActive, isLoaded } = useSignIn();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const { startSSOFlow } = useSSO();

  const redirectUrl = AuthSession.makeRedirectUri({
    scheme: "doaibu", // from your app.json
  });

  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    if (!isLoaded) return;
    try {
      setLoading(true);
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        Toast.show({
          type: "success",
          text1: "Login successful",
          position: "bottom",
          visibilityTime: 2000,
        });
        router.replace("/");
      } else {
        Toast.show({
          type: "error",
          text1: "Login failed, try again",
          position: "bottom",
          visibilityTime: 2000,
        });
      }
    } catch (err) {
      if (isClerkAPIResponseError(err)) {
        const errors = err.errors;
        Toast.show({
          type: "error",
          text1: errors[0].message || "Something went wrong",
          position: "bottom",
          visibilityTime: 2000,
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Something went wrong",
          position: "bottom",
          visibilityTime: 2000,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { setActive, createdSessionId } = await startSSOFlow({
        strategy: "oauth_google",
        redirectUrl,
      });

      if (createdSessionId) {
        await setActive?.({ session: createdSessionId });
        router.replace("/loading");
      }
    } catch (err) {
      if (isClerkAPIResponseError(err)) {
        const errors = err.errors;
        Toast.show({
          type: "error",
          text1: errors[0].message || "Something went wrong",
          position: "bottom",
          visibilityTime: 2000,
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Something went wrong",
          position: "bottom",
          visibilityTime: 2000,
        });
      }
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      const { setActive, createdSessionId } = await startSSOFlow({
        strategy: "oauth_facebook",
        redirectUrl,
      });

      if (createdSessionId) {
        await setActive?.({ session: createdSessionId });
        router.replace("/loading");
      }
    } catch (err) {
      if (isClerkAPIResponseError(err)) {
        const errors = err.errors;
        Toast.show({
          type: "error",
          text1: errors[0].message || "Something went wrong",
          position: "bottom",
          visibilityTime: 2000,
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Something went wrong",
          position: "bottom",
          visibilityTime: 2000,
        });
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign in</Text>
      <View style={styles.inputContainer}>
        <TextInput
          inputMode="email"
          style={styles.input}
          placeholder="Enter email"
          value={emailAddress}
          onChangeText={(text) => setEmailAddress(text)}
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
        <Pressable style={styles.btn} onPress={onSignInPress}>
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
          <Pressable onPress={() => handleGoogleSignIn()}>
            <Image
              source={googleIcon}
              style={{ width: 45, height: 45, objectFit: "contain" }}
            />
          </Pressable>
          <Pressable onPress={() => handleFacebookSignIn()}>
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
