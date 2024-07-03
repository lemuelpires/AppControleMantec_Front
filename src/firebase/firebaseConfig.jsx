import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, sendPasswordResetEmail } from "firebase/auth"; // Importe o sendPasswordResetEmail diretamente
import { getStorage } from "firebase/storage";

// Sua configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCpNc_uu0XUrCRWktMDMboOMgndThw8ygU",
  authDomain: "appcontrolemantec.firebaseapp.com",
  projectId: "appcontrolemantec",
  storageBucket: "appcontrolemantec.appspot.com",
  messagingSenderId: "387603637992",
  appId: "1:387603637992:web:e77bf1ecc3d54d7846cb5d",
  measurementId: "G-RG5PR7LJZ0"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const storage = getStorage(app);

export { app, db, auth, analytics, storage, sendPasswordResetEmail }; // Exporte sendPasswordResetEmail
