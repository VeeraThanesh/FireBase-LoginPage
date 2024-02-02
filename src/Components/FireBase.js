// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAgXoWRl84rqrth5Wiv8mlbhJFL4f5w5ko",
  authDomain: "tnbp-8570c.firebaseapp.com",
  projectId: "tnbp-8570c",
  storageBucket: "tnbp-8570c.appspot.com",
  messagingSenderId: "481699988528",
  appId: "1:481699988528:web:49783a92f8323d2fa699f5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;

export const auth = getAuth();
