import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyCE9g_c73qjv9Vb2B3cKNFGZOIfiryEly8",
  authDomain: "eshop-721dc.firebaseapp.com",
  projectId: "eshop-721dc",
  storageBucket: "eshop-721dc.appspot.com",
  messagingSenderId: "651234733875",
  appId: "1:651234733875:web:d7bd7fc22625582a9c5846"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storange = getStorage(app)
export default app