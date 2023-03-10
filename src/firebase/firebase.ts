// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInAnonymously } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDXZuvPfnxbOepqWIYFaOWkIJEm3_jOO8A",
    authDomain: "combokings-fd623.firebaseapp.com",
    projectId: "combokings-fd623",
    storageBucket: "combokings-fd623.appspot.com",
    messagingSenderId: "673031488392",
    appId: "1:673031488392:web:aeffcb9420326a847df03d",
    measurementId: "G-Y80KL5631L"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);

export const auth = getAuth();
signInAnonymously(auth)
  .then((event) => {
    console.log(event.user.uid);
    // Signed in..
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ...
  });