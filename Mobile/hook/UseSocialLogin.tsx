import * as Google from "expo-auth-session/providers/google";
import { makeRedirectUri } from "expo-auth-session";
import * as Random from "expo-random";
import api from "@/lib/config/axios";
import Toast from "react-native-toast-message";
import { router } from "expo-router";
import React from "react";

// === Android-Only IDs ===
const GOOGLE_ANDROID_CLIENT_ID =
  "71022976123-cj20o2208ik321sh8qcd0vnqepbadh49.apps.googleusercontent.com";
const EXPO_CLIENT_ID =
  "71022976123-kl1r0s53q4rdeegn7ungf2occ93emajg.apps.googleusercontent.com";

// === Hook for Google/Facebook Login ===
export const useSocialLogin = (type: "user" | "mother") => {
  const [googleRequest, googleResponse, promptGoogleLogin] =
    Google.useAuthRequest({
      clientId: EXPO_CLIENT_ID,
      androidClientId: GOOGLE_ANDROID_CLIENT_ID,
      scopes: ["profile", "email"],
      redirectUri: makeRedirectUri({ scheme: "doaibu" }),
    });

  // === Google Response Handler ===
  React.useEffect(() => {
    if (
      googleResponse?.type === "success" &&
      googleResponse.authentication?.accessToken
    ) {
      const token = googleResponse.authentication.accessToken;
      fetch("https://www.googleapis.com/userinfo/v2/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then(async (profile) => {
          await handleSocialAuth(profile.name, profile.email, type, "Google");
        })
        .catch(() => showToast("Google login failed", "error"));
    }
  }, [googleResponse]);

  return {
    promptGoogleLogin,
    googleRequest,
  };
};

// === Email/Password Registration ===
export const handleRegistration = async (
  fullName: string,
  email: string,
  password: string,
  type: "user" | "mother",
  resetCallback: () => void
) => {
  try {
    const userObj = { fullName, email, password };
    const res = await api.post(
      type === "user" ? "/create-user" : "/create-mother",
      userObj
    );
    if (res.status === 201) {
      showToast("Account registration successful", "success");
      resetCallback();
      router.push("/login");
    } else throw new Error("Registration failed");
  } catch (err: any) {
    showToast(err.message || "Account registration failed", "error");
  }
};

// === Shared Handler for Google/Facebook Auth ===
const handleSocialAuth = async (
  fullName: string,
  email: string,
  type: "user" | "mother",
  provider: "Google" | "Facebook"
) => {
  const password = await generateRandomPassword();
  const userObj = { fullName, email, password };
  try {
    const res = await api.post(
      type === "user" ? "/create-user" : "/create-mother",
      userObj
    );
    if (res.status === 201) {
      showToast(`${provider} login successful`, "success");
      router.push("/");
    } else throw new Error(`${provider} login failed`);
  } catch {
    showToast(`${provider} login failed`, "error");
  }
};

// === Generate Random Password ===
const generateRandomPassword = async () => {
  const bytes = await Random.getRandomBytesAsync(16);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
};

// === Show Toast ===
const showToast = (message: string, type: "success" | "error") => {
  Toast.show({
    type,
    text1: message,
    position: "bottom",
    visibilityTime: 2000,
  });
};
