// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getFirestore } from 'firebase/firestore'
import { getAuth, GoogleAuthProvider, setPersistence, browserLocalPersistence, signInWithRedirect, signOut } from 'firebase/auth'
import { useNavigate } from 'react-router';
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
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)

export const db = getFirestore(app)

const provider = new GoogleAuthProvider()
export const auth = getAuth()

export const signIn = () => {
  const provider = new GoogleAuthProvider()
  setPersistence(auth, browserLocalPersistence)
    .then(() => {
      return signInWithRedirect(auth, provider)
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code
      const errorMessage = error.message
      // The email of the user's account used.
      const email = error.customData.email
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error)
      // ...
    })
}
export const signOutFunction = () => {

  signOut(auth).then(() => {
    console.log(auth.currentUser?.uid, 'has signed out');
  }).catch((error) => {
    console.log(error);
  });
}