import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDCzh_v_-FIkmVT81ReSOfOinvxOwDSEZ4",
  authDomain: "habbit-tracker-51090.firebaseapp.com",
  projectId: "habbit-tracker-51090",
  storageBucket: "habbit-tracker-51090.firebasestorage.app",
  messagingSenderId: "522057833164",
  appId: "1:522057833164:web:75cba7c8f4f15b451e0069"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);