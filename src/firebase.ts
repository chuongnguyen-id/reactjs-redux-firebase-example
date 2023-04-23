import firebase from "firebase/compat/app";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDMoJUtv7qe1q6SIQMiz8F9kBajneWLhlE",
  authDomain: "bai1-efc49.firebaseapp.com",
  projectId: "bai1-efc49",
  storageBucket: "bai1-efc49.appspot.com",
  messagingSenderId: "784237886926",
  appId: "1:784237886926:web:40a6e1fe17f4426bb1ff9f",
  measurementId: "G-Y9EPYVX4CK",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
