// lib/firebase.js

// Import the Firebase functions you need
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database';

// Your Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyAI_ZQplSfr7e__vHlZD1LLFuI-Be_j7Ao",
  authDomain: "unlock-app-49a40.firebaseapp.com",
  databaseURL: "https://unlock-app-49a40-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "unlock-app-49a40",
  storageBucket: "unlock-app-49a40.firebasestorage.app",
  messagingSenderId: "925805495658",
  appId: "1:925805495658:web:99c1b8b8a1c6e4ccd25113"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and export helpers
const db = getDatabase(app);

export { db, ref, set };
