import { useTheme } from "@/context/theme/ThemeContext";
import api from "@/lib/config/axios";
import { auth } from "@/lib/config/firebaseconfig";
import { PresetsColors } from "@/types";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, router } from "expo-router";
import { createUserWithEmailAndPassword, deleteUser } from "firebase/auth";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import Checkbox from "expo-checkbox";

const width = Dimensions.get("window").width;

export default function RegisterPage() {
  const theme = useTheme();
  const colors = theme?.colors;
  const styles = getStyles(colors);
  const [loading, setLoading] = useState<boolean>(false);
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [type, setType] = useState<"user" | "mother">("user");

  const reset = () => {
    setFullName("");
    setEmail("");
    setPassword("");
  };

  const handleRegistration = async (e: any) => {
    try {
      setLoading(true);

      const userObj = {
        name: fullName,
        email: email,
        password: password,
      };
      let res = null;

      if (type === "user") {
        res = await api.post("/create-user", userObj);
      } else {
        res = await api.post("/create-mother", userObj);
      }

      if (res.status === 201) {
        const credentials = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        if (credentials.user) {
          reset();
          Toast.show({
            type: "success",
            text1: `Account Registration successful`,
            position: "bottom",
            visibilityTime: 2000,
          });
          router.push("/login");
        } else {
          setLoading(false);
          Toast.show({
            type: "error",
            text1: `Account Registration failed`,
            position: "bottom",
            visibilityTime: 2000,
          });
        }
      }
    } catch (err: any) {
      Toast.show({
        type: "error",
        text1: err.message || `Account Registration failed`,
        position: "bottom",
        visibilityTime: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register User Account</Text>
      <View style={styles.inputContainer}>
        <TextInput
          inputMode="text"
          style={styles.input}
          placeholder="Full Name"
          value={fullName}
          onChangeText={(text) => setFullName(text)}
        />
        <TextInput
          inputMode="email"
          style={styles.input}
          placeholder="Enter email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          inputMode="text"
          style={styles.input}
          placeholder="Enter Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <View style={styles.checkboxContainer}>
          <Text style={styles.checkBoxTitle}>Select account Type:</Text>
          <View style={styles.checkBoxs}>
            <View style={styles.check}>
              <Checkbox
                value={type === "user"}
                onValueChange={(value) => value && setType("user")}
                color={type === "user" ? colors?.primary : undefined}
              />
              <Text style={styles.checkTitle}>User Account</Text>
            </View>
            <View style={styles.check}>
              <Checkbox
                value={type === "mother"}
                onValueChange={(value) => value && setType("mother")}
                color={type === "mother" ? colors?.primary : undefined}
              />
              <Text style={styles.checkTitle}>Mother Account</Text>
            </View>
          </View>
        </View>
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
        <Pressable onPress={() => router.push("/")}>
          <FontAwesome
            name="google"
            size={38}
            color={colors?.darkText}
            style={{ marginHorizontal: "auto" }}
          />
        </Pressable>
        <Pressable onPress={() => router.push("/")}>
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
