// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC-TUuvHgmavEpM3RpM5rl92tBQmqC0YTg",
  authDomain: "chatily-78422.firebaseapp.com",
  projectId: "chatily-78422",
  storageBucket: "chatily-78422.appspot.com",
  messagingSenderId: "149277548421",
  appId: "1:149277548421:web:e01f736f36f0ec6925eeec",
  measurementId: "G-B53ZBTB03C"
};

// Initialize Firebase
let app;

export default function getFirebase() {
  if(typeof window !== 'undefined'){
    if(app) return app
    app = initializeApp(firebaseConfig)
    return app
  }

  return null
}
