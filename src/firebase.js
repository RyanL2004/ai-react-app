// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDiJWqLzg2LCco2vNG8gK5wxnFJyuLSW2I",
  authDomain: "fir-auth-e15ba.firebaseapp.com",
  projectId: "fir-auth-e15ba",
  storageBucket: "fir-auth-e15ba.appspot.com",
  messagingSenderId: "203052040676",
  appId: "1:203052040676:web:f1d8a0b490edad18de07f1"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app