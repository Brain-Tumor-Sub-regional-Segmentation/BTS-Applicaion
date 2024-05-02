// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC14MevJ4qLFaaDe_ycUVtyZ0zW8o4bYQI",
    authDomain: "bts-datastore.firebaseapp.com",
    projectId: "bts-datastore",
    storageBucket: "bts-datastore.appspot.com",
    messagingSenderId: "983908658848",
    appId: "1:983908658848:web:c98636407ffe23acc223c5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;