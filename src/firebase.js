import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Se for usar Firestore

const firebaseConfig = {
    apiKey: "AIzaSyDq5_f8UFv1f8SUPZCmySPw7aPyu323h7M",
    authDomain: "atv2-am2.firebaseapp.com",
    projectId: "atv2-am2",
    storageBucket: "atv2-am2.appspot.com",
    messagingSenderId: "258096761966",
    appId: "1:258096761966:web:423e07f592608273746a7f"
  };
  

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);