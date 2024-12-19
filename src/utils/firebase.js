// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDE7EEj7FqHCR62nBaK98BhMPAjH80N3P0",
  authDomain: "alter-office-assessment-92def.firebaseapp.com",
  projectId: "alter-office-assessment-92def",
  storageBucket: "alter-office-assessment-92def.firebasestorage.app",
  messagingSenderId: "1036430974123",
  appId: "1:1036430974123:web:fa821ccad50eb93efe6bee",
  measurementId: "G-K673FD7C8H",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);

export { addDoc, collection };
