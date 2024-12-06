// Import the functions you need
import { initializeApp, getApps } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'; // Correct import
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCAQZiVZ8f_i2RLUrzaEO2ysPQKSegJdgo",
  authDomain: "ai-powered-careerrecomendation.firebaseapp.com",
  projectId: "ai-powered-careerrecomendation",
  storageBucket: "ai-powered-careerrecomendation.appspot.com",
  messagingSenderId: "969769213687",
  appId: "1:969769213687:web:ad0e4c1e4376460c96fdf2",
  measurementId: "G-M4FWMN7DDY",
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]; // Prevent duplicate initialization
const analytics = getAnalytics(app); // Initialize Firebase Analytics
const auth = getAuth(app); // Initialize Firebase Auth
const db = getFirestore(app); // Initialize Firestore

export { app, analytics, auth, db , signInWithEmailAndPassword}; // Export Firebase instances
