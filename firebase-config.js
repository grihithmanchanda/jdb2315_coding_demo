// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCi19gMzVtiJdPrHdoBKUyh3I0X2tTFHlo",
  authDomain: "jdb-2315.firebaseapp.com",
  projectId: "jdb-2315",
  storageBucket: "jdb-2315.appspot.com",
  messagingSenderId: "636234894329",
  appId: "1:636234894329:web:02f63dbe119494506a0b28"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firestoredb = getFirestore(firebaseApp);