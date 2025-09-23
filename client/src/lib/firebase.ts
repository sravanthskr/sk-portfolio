import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Check if Firebase API key is available (only secret key needed)
const hasFirebaseConfig = !!(import.meta.env.VITE_FIREBASE_API_KEY);

// Firebase configuration - hardcoded values with API key from environment
const firebaseConfig = hasFirebaseConfig ? {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "sravanth-kumar.firebaseapp.com",
  projectId: "sravanth-kumar",
  storageBucket: "sravanth-kumar.firebasestorage.app",
  messagingSenderId: "805020928461",
  appId: "1:805020928461:web:3198917d7924e963569c84",
  measurementId: "G-56WXLQLRQN",
} : null;

// Initialize Firebase only if config is available
const app = hasFirebaseConfig ? initializeApp(firebaseConfig!) : null;

// Initialize Firebase services (with null checks)
export const auth = app ? getAuth(app) : null;
export const db = app ? getFirestore(app) : null;
export const analytics = app && typeof window !== "undefined" ? getAnalytics(app) : null;

export default app;