import  {initializeApp} from "firebase/app";
// import Firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyC-TUuvHgmavEpM3RpM5rl92tBQmqC0YTg",
  authDomain: "chatily-78422.firebaseapp.com",
  projectId: "chatily-78422",
  storageBucket: "chatily-78422.appspot.com",
  messagingSenderId: "149277548421",
  appId: "1:149277548421:web:e4e26e8d5383b6fa25eeec",
  measurementId: "G-GQ7DP03XM0"
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
