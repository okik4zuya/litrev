import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
}

// const firebaseConfig = {
//   apiKey: "AIzaSyCKiQIvBd_j1oOaeglK-Y1ESmuMGY2T8Zw",
//   authDomain: "einvit.firebaseapp.com",
//   projectId: "einvit",
//   storageBucket: "einvit.appspot.com",
//   messagingSenderId: "1028296215429",
//   appId: "1:1028296215429:web:c88815c4626e06db2d52ec",
//   measurementId: "G-6XNY57YW0W"

// }


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();