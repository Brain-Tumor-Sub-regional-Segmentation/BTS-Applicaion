import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
 
// Your Firebase configuration
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
firebase.initializeApp(firebaseConfig);
 
const db = firebase.firestore(); // Access Firestore
 
export default db; // Export Firestore instance as default
 