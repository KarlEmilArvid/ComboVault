// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth, signInAnonymously } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {

}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

export const auth = getAuth()
signInAnonymously(auth)
    .then((event) => {
        console.log(event.user.uid)
        // Signed in..
    })
    .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        // ...
    })