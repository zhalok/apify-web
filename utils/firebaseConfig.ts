// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
console.log(process.env.NEXT_PUBLIC_FIREBASE_API);
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API,
  authDomain: "react-firebase-integrati-78983.firebaseapp.com",
  projectId: "react-firebase-integrati-78983",
  storageBucket: "react-firebase-integrati-78983.appspot.com",
  messagingSenderId: "1084044672702",
  appId: "1:1084044672702:web:a9e4421638c42cbebc28ef",
  measurementId: "G-2TL1QHQR8X",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default storage;
