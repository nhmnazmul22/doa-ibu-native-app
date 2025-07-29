import { initializeApp } from "firebase/app";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import * as firebaseAuth from "firebase/auth";
const reactNativePersistence = (firebaseAuth as any).getReactNativePersistence;

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIpN3ALBGyPveQG9X-3pEMZnu6KH7uNYw",
  authDomain: "doaibu-f93d5.firebaseapp.com",
  projectId: "doaibu-f93d5",
  storageBucket: "doaibu-f93d5.firebasestorage.app",
  messagingSenderId: "61111890879",
  appId: "1:61111890879:web:9b6e16ff781adaa034270a",
  measurementId: "G-NZT5QRJ35Q",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = firebaseAuth.initializeAuth(app, {
  persistence: reactNativePersistence,
});
export { app, auth };
