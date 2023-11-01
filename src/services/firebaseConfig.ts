import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCWH-S8OS50U0Pl1Uov7nR-sRMd6cXfDH0",
  authDomain: "chat-hub-fab33.firebaseapp.com",
  projectId: "chat-hub-fab33",
  storageBucket: "chat-hub-fab33.appspot.com",
  messagingSenderId: "441958618023",
  appId: "1:441958618023:web:2d374a761205755cf51c82",
  measurementId: "G-FR43RTN17T"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
