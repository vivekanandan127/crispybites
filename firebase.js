// Import Firebase
import { initializeApp } from
"https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from
"https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";


// Your Firebase config
const firebaseConfig = {

  apiKey: "AIzaSyDpn455LZNgCJT_oLe0042UNLxW-C0yoBY",
  authDomain: "crispybites-8ba87.firebaseapp.com",
  projectId: "crispybites-8ba87",
  storageBucket: "crispybites-8ba87.firebasestorage.app",
  messagingSenderId: "946686679423",
  appId: "1:946686679423:web:e3c2ffeb5bcb5bd516a24a",
  measurementId: "G-RP9CHNF1ZC"

};


// Initialize Firebase
const app =
initializeApp(firebaseConfig);

export const auth =
getAuth(app);

export const provider =
new GoogleAuthProvider();

export {
  signInWithPopup,
  signOut,
  onAuthStateChanged
};