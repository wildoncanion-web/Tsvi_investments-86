import { initializeApp, getApps } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCI_kui2FsS249TJyfzi-Z10ksRNk8Tj1Q",
  authDomain: "tsvi-investments.firebaseapp.com",
  projectId: "tsvi-investments",
  storageBucket: "tsvi-investments.firebasestorage.app",
  messagingSenderId: "251861957646",
  appId: "1:251861957646:web:251a468323b362d771905f",
}

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

export const auth = getAuth(app)
export const db = getFirestore(app)
export default app
