import api from "@/lib/config/axios";
import { useSession } from "@clerk/clerk-expo";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Toast from "react-native-toast-message";

const width = Dimensions.get("window").width;
export default function Loading() {
  const { session } = useSession();
  const [statusText, setStatusText] = useState<string>("");

  const CreateUserAccount = async () => {
    try {
      setStatusText("Redirecting home.....");
      try {
        const userRes = await api.get(
          `/get-user/${session?.publicUserData.identifier}`
        );
        if (userRes.status === 200) {
          Toast.show({
            type: "success",
            text1: "Sing in successful",
            position: "bottom",
            visibilityTime: 2000,
          });
          router.replace("/");
        }
        return;
      } catch (err) {
        setStatusText("Creating Account.....");
        const userObj = {
          email: session?.publicUserData.identifier,
          fullName: `${session?.publicUserData.firstName} ${session?.publicUserData.lastName}`,
        };

        const res = await api.post("/create-user", userObj);
        if (res.status === 201) {
          setStatusText("Redirecting home.....");
          Toast.show({
            type: "success",
            text1: "Sing in successful",
            position: "bottom",
            visibilityTime: 2000,
          });
          router.replace("/");
        }
      }
    } catch (err: any) {
      console.log(err);
      Toast.show({
        type: "error",
        text1: err.message || "Sign in failed",
        position: "bottom",
        visibilityTime: 2000,
      });
      setStatusText("Redirection Registration page...");
      router.replace("/register");
    }
  };

  useEffect(() => {
    if (session?.publicUserData) {
      CreateUserAccount();
    }
  }, [session]);

  if (!session?.publicUserData) {
    <View style={styles.container}>
      <Text style={styles.statusText}>Loading for sessions...</Text>
    </View>;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.statusText}>{statusText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: width * 0.9,
  },
  statusText: {
    fontSize: 20,
    fontWeight: 600,
    fontFamily: "Nunito",
    color: "#000000",
  },
});
