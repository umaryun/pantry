// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAVzUJ_4hXYeC1U1UaKgDIwBf1YQt_4JEM",
  authDomain: "pantry-3bb65.firebaseapp.com",
  projectId: "pantry-3bb65",
  storageBucket: "pantry-3bb65.appspot.com",
  messagingSenderId: "252282424676",
  appId: "1:252282424676:web:a0aa8a3ab4ac348693be71",
  measurementId: "G-R7M3L5SJD7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireStore = getFirestore(app)


export {app, fireStore}