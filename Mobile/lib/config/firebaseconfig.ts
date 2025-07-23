import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

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
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, analytics, auth };
