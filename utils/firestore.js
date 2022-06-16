import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBZQiRNuno3942khYJulYOFvqY4-T6GElY",
  authDomain: "test-api-4f3e2.firebaseapp.com",
  databaseURL:
    "https://test-api-4f3e2-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "test-api-4f3e2",
  storageBucket: "test-api-4f3e2.appspot.com",
  messagingSenderId: "552680396056",
  appId: "1:552680396056:web:9185561009e442b720ba6d",
  measurementId: "G-4RXDHKL6TQ",
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
export { db };
