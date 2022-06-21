import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCIMbXIy9Rds3dFh_S-ulMfJbmytiK41bw",
  authDomain: "campus-46dd1.firebaseapp.com",
  projectId: "campus-46dd1",
  storageBucket: "campus-46dd1.appspot.com",
  messagingSenderId: "98729276647",
  appId: "1:98729276647:web:1f58ac27479cbd90329e42",
  measurementId: "G-5LH1W791X9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);