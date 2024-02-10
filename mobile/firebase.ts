// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getDatabase} from "firebase/database";
import {getAnalytics} from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCxnn3QxOiaqWIb3wiBSgC_u0ohjY3XyNM",
  authDomain: "lifelines-13337.firebaseapp.com",
  databaseURL: "https://lifelines-13337-default-rtdb.firebaseio.com",
  projectId: "lifelines-13337",
  storageBucket: "lifelines-13337.appspot.com",
  messagingSenderId: "210320148121",
  appId: "1:210320148121:web:430bebf2951e45c5bc1a08",
  measurementId: "G-KM4GPDHBE3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);