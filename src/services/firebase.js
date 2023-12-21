import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: process.env.firebaseKey,
  authDomain: "gif-app-alphabi.firebaseapp.com",
  projectId: "gif-app-alphabi",
  storageBucket: "gif-app-alphabi.appspot.com",
  messagingSenderId: "25021759414",
  appId: "1:25021759414:web:bf84229daa7472fe424b17"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app)
// console.log(db)
export const auth = getAuth(app)
export {db}