// Shared Firebase setup for the join and admin pages.
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult,
  onAuthStateChanged, signOut,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  getFirestore, doc, getDoc, setDoc, updateDoc, collection, getDocs, query, orderBy, serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const app = initializeApp({
  apiKey: "AIzaSyD5vyzyNw6mduZik7a1M9PTTCA4VXlkB1M",
  authDomain: "batteryshare089-85b85.firebaseapp.com",
  projectId: "batteryshare089-85b85",
  storageBucket: "batteryshare089-85b85.firebasestorage.app",
  messagingSenderId: "390961017900",
  appId: "1:390961017900:web:766737afde6ca1047c0d89",
});

export const auth = getAuth(app);
export const db = getFirestore(app);
export { doc, getDoc, setDoc, updateDoc, collection, getDocs, query, orderBy, serverTimestamp, onAuthStateChanged, signOut };

export async function signIn() {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });
  try {
    return await signInWithPopup(auth, provider);
  } catch (e) {
    // Popups blocked (some in-app browsers): fall back to a full-page redirect.
    if (e && (e.code === "auth/popup-blocked" || e.code === "auth/operation-not-supported-in-this-environment")) {
      return signInWithRedirect(auth, provider);
    }
    throw e;
  }
}

getRedirectResult(auth).catch(() => {});
