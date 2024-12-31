// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // Import Firebase Auth
import { getFirestore } from "firebase/firestore"; // Import Firestore

// Konfigurasi Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAV4OfI6W4uUSF7QgqVvD1KOofWnWHw-ko",
  authDomain: "reha-faa67.firebaseapp.com",
  projectId: "reha-faa67",
  storageBucket: "reha-faa67.firebasestorage.app",
  messagingSenderId: "614935127027",
  appId: "1:614935127027:web:dfae3828d0b44cb4646886",
  measurementId: "G-R6FGMFNLHP"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Inisialisasi Firebase Authentication
const auth = getAuth(app);

// Inisialisasi Firestore
const db = getFirestore(app);

export { auth, db }; // Menyediakan auth dan db untuk digunakan di komponen lain
