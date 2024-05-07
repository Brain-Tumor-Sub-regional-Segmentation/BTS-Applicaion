// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCc-0KsE6NKWfJH45zURCZ0fK5SobmU7OU",
    authDomain: "bts-the-project.firebaseapp.com",
    projectId: "bts-the-project",
    storageBucket: "bts-the-project.appspot.com",
    messagingSenderId: "695224845677",
    appId: "1:695224845677:web:67f6f265e1b9f0c49bc664",
    measurementId: "G-1HPQZW3YYT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
// Initialize Firebase Firestore and get a reference to the service
export const database = getFirestore(app);

export default app;