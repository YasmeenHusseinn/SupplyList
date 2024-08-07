// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJ_TAV3AWnaMEcDtEYA02dYQ4K1VbfVkQ",
  authDomain: "inventorymanagement-621f1.firebaseapp.com",
  projectId: "inventorymanagement-621f1",
  storageBucket: "inventorymanagement-621f1.appspot.com",
  messagingSenderId: "1063607792117",
  appId: "1:1063607792117:web:dff98eb39d0d9f9711b0bc",
  measurementId: "G-3Q0JESBMTR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export {firestore}