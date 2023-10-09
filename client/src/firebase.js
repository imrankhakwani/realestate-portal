// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

console.log('apiKey', import.meta.env.VITE_FIREBASE_API_KEY)
console.log('DEV_MODE', import.meta.env.DEV)

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "realestate-ed2a3.firebaseapp.com",
  projectId: "realestate-ed2a3",
  storageBucket: "realestate-ed2a3.appspot.com",
  messagingSenderId: "224442069076",
  appId: "1:224442069076:web:60012764dc1237032d3dc1",
  measurementId: "G-GTP21FJRN6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);