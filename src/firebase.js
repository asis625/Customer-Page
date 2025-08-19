// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Shared Firebase project: Nehu Thrifts and Trends
const firebaseConfig = {
  apiKey: "AIzaSyBDjuDsA1OYHEV6QaFv-f-6NVf3RGno_u8",
  authDomain: "nehu-thrifts-and-trends.firebaseapp.com",
  projectId: "nehu-thrifts-and-trends",
  storageBucket: "nehu-thrifts-and-trends.appspot.com",
  messagingSenderId: "835828658610",
  appId: "1:835828658610:web:82aa910d1368cf1352b4ab"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
