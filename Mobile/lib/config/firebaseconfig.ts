import { initializeApp } from "firebase/app";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import * as firebaseAuth from "firebase/auth";
const reactNativePersistence = (firebaseAuth as any).getReactNativePersistence;

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMSaG-7244CzC5i_lprUobHvT1g--95oI",
  authDomain: "doaibu-c3ecb.firebaseapp.com",
  projectId: "doaibu-c3ecb",
  storageBucket: "doaibu-c3ecb.firebasestorage.app",
  messagingSenderId: "32893310341",
  appId: "1:32893310341:web:6c7cc05b37fb80d50360ec",
  measurementId: "G-DQ0QRX1GFW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = firebaseAuth.initializeAuth(app, {
  persistence: reactNativePersistence(ReactNativeAsyncStorage),
});
export { app, auth };
