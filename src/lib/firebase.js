import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyDYuw3QecoPerMy_WbutsFMJvBzP7vhMa4",
    authDomain: "medicart-e3123.firebaseapp.com",
    projectId: "medicart-e3123",
    storageBucket: "medicart-e3123.appspot.com",
    messagingSenderId: "518701859211",
    appId: "1:518701859211:web:e034e8c2e5532a1c6def8e"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const medColRef = collection(db,'medicines');
export const doctor = collection(db,'doctors');
export const auth = getAuth(app);
export default app