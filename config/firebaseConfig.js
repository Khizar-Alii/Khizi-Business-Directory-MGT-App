// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDYOwZJhKfHGj-CeT1RmBleLoX84Pjo9Z4",
  authDomain: "khizi-business.firebaseapp.com",
  projectId: "khizi-business",
  storageBucket: "khizi-business.appspot.com",
  messagingSenderId: "230526248842",
  appId: "1:230526248842:web:0eb0bd487765095a864a73",
  measurementId: "G-54EJZRDQ53",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);