// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBoKGSNtAGqM-CsojLouutqC_727ExL-W4",
  authDomain: "fir-tutorial-481be.firebaseapp.com",
  projectId: "fir-tutorial-481be",
  storageBucket: "fir-tutorial-481be.appspot.com",
  messagingSenderId: "262250475199",
  appId: "1:262250475199:web:73742602497f90afa0600a",
  measurementId: "G-5BGLGZLJ23",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
