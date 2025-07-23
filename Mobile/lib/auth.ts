import { auth } from "./config/firebaseconfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

// Signup
createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    console.log("User created:", userCredential.user);
  })
  .catch((error) => console.log(error));

// Login
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    console.log("User signed in:", userCredential.user);
  })
  .catch((error) => console.log(error));
