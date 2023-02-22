import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc, query, where, orderBy, serverTimestamp } from 'firebase/firestore'
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider } from 'firebase/auth';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyA64nXPXkjHUIDUgICgnmO9BuBT59kHl7E",
  authDomain: "micro-blogger-29cda.firebaseapp.com",
  projectId: "micro-blogger-29cda",
  storageBucket: "micro-blogger-29cda.appspot.com",
  messagingSenderId: "698525231996",
  appId: "1:698525231996:web:d2068b71d4061229f8d2f9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();
export const auth = getAuth();
export const googleProvider = new GoogleAuthProvider();
export const colRef = collection(db, 'serverPosts');
export const colRefQuery = query(colRef, orderBy('date' , 'desc')); 
export const firebaseStorage = getStorage(app);