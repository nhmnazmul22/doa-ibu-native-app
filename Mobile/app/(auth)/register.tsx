import { useTheme } from "@/context/theme/ThemeContext";
import api from "@/lib/config/axios";
import { PresetsColors } from "@/types";
import {
  isClerkAPIResponseError,
  useSSO,
  useSession,
  useSignUp,
} from "@clerk/clerk-expo";
import * as AuthSession from "expo-auth-session";
import { Link, router } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

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

export default function RegisterPage() {
  useWarmUpBrowser();
  const theme = useTheme();
  const colors = theme?.colors;
  const styles = getStyles(colors);
  const { isLoaded, signUp, setActive } = useSignUp();
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = useState("");
  const { startSSOFlow } = useSSO();
  const { session } = useSession();

  const redirectUrl = AuthSession.makeRedirectUri({
    scheme: "doaibu",
    path: "sso-callback",
  });
  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return;

    try {
      setLoading(true);
      await signUp.create({
        emailAddress,
        password,
      });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
      Toast.show({
        type: "info",
        text1: "Please, verify your email account",
        position: "bottom",
        visibilityTime: 2000,
      });
    } catch (err) {
      if (isClerkAPIResponseError(err)) {
        const errors = err.errors;
        if (errors[0].code == "session_exists") {
          Toast.show({
            type: "success",
            text1: "Redirecting home....",
            position: "bottom",
            visibilityTime: 2000,
          });
          router.replace("/");
        } else {
          Toast.show({
            type: "error",
            text1: errors[0].message || "Something went wrong",
            position: "bottom",
            visibilityTime: 2000,
          });
        }
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

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      setLoading(true);
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });
      if (signUpAttempt.status === "complete") {
        const userData = {
          fullName: fullName,
          email: emailAddress,
        };
        const res = await api.post("/create-user", userData);

        if (res.status === 201) {
          await setActive({ session: signUpAttempt.createdSessionId });
          Toast.show({
            type: "success",
            text1: "Registration Successful",
            position: "bottom",
            visibilityTime: 2000,
          });
          router.replace("/");
        } else {
          Toast.show({
            type: "error",
            text1: "Registration Failed, Pleaser try again",
            position: "bottom",
            visibilityTime: 2000,
          });
        }
      } else {
        Toast.show({
          type: "error",
          text1: "Verification failed, Please try again",
          position: "bottom",
          visibilityTime: 2000,
        });
      }
    } catch (err: any) {
      if (isClerkAPIResponseError(err)) {
        const errors = err.errors;
        if (errors[0].code == "session_exists") {
          Toast.show({
            type: "success",
            text1: "Redirecting home....",
            position: "bottom",
            visibilityTime: 2000,
          });
          router.replace("/login");
        } else {
          Toast.show({
            type: "error",
            text1: errors[0].message || "Something went wrong",
            position: "bottom",
            visibilityTime: 2000,
          });
        }
      } else {
        Toast.show({
          type: "error",
          text1: err.message || "Something went wrong",
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
      } else {
        router.back();
      }
    } catch (err) {
      if (isClerkAPIResponseError(err)) {
        const errors = err.errors;
        if (errors[0].code == "session_exists") {
          Toast.show({
            type: "success",
            text1: "Redirecting home....",
            position: "bottom",
            visibilityTime: 2000,
          });
          router.replace("/");
        } else {
          Toast.show({
            type: "error",
            text1: errors[0].message || "Something went wrong",
            position: "bottom",
            visibilityTime: 2000,
          });
        }
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

      console.log(createdSessionId);
      if (createdSessionId) {
        await setActive?.({ session: createdSessionId });
      } else {
        router.back();
      }
    } catch (err) {
      if (isClerkAPIResponseError(err)) {
        const errors = err.errors;
        if (errors[0].code == "session_exists") {
          Toast.show({
            type: "success",
            text1: "Redirecting home....",
            position: "bottom",
            visibilityTime: 2000,
          });
          router.replace("/");
        } else {
          Toast.show({
            type: "error",
            text1: errors[0].message || "Something went wrong",
            position: "bottom",
            visibilityTime: 2000,
          });
        }
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

  if (pendingVerification) {
    return (
      <View style={[styles.container, { paddingTop: 200 }]}>
        <Text style={styles.title}>Verify your email</Text>
        <TextInput
          inputMode="text"
          value={code}
          style={[styles.input, { marginVertical: 30 }]}
          placeholder="Enter your verification code"
          onChangeText={(code) => setCode(code)}
          placeholderTextColor="#000000c1"
        />
        <TouchableOpacity style={styles.btn} onPress={onVerifyPress}>
          {loading ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Text style={styles.btnText}>Verify</Text>
          )}
        </TouchableOpacity>
      </View>
    );
  }

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
          value={emailAddress}
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
          onPress={onSignUpPress}
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
        <Pressable onPress={() => handleGoogleSignIn()}>
          <Image source={googleIcon} style={{ width: 45, height: 45 }} />
        </Pressable>
        <Pressable onPress={() => handleFacebookSignIn()}>
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
      fontWeight: "700",
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
      fontWeight: "600",
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
      fontWeight: "600",
      fontFamily: "Nunito",
      color: colors?.darkText,
      textAlign: "center",
    },
  });
