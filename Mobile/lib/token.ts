import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export const saveToken = async (token: string) => {
  await AsyncStorage.setItem("authToken", token);
};

export const isTokenExpired = (token: string): boolean => {
  try {
    const decoded: any = jwtDecode(token);
    const now = Date.now() / 1000;
    return decoded.exp < now;
  } catch (e) {
    return true; // invalid token
  }
};

export const decodedToken = (token: string) => {
  try {
    const decoded: any = jwtDecode(token);
    if (decoded) {
      return decoded;
    }
  } catch (err) {
    return null;
  }
};

export const checkTokenValidity = async () => {
  const token = await AsyncStorage.getItem("authToken");
  if (!token || isTokenExpired(token)) {
    await AsyncStorage.removeItem("authToken");
    router.replace("/login-signup");
    return null;
  }

  return token;
};

export const deleteToken = async () => {
  const token = await AsyncStorage.removeItem("authToken");
  console.log(token);
};
