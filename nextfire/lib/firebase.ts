// Import the functions you need from the SDKs you need

import firebase from 'firebase/compat/app';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyDIQwq7vQwUz6J-u-AyzoRHZYt8vR11F1M",

  authDomain: "nextjs-practice-98fcb.firebaseapp.com",

  projectId: "nextjs-practice-98fcb",

  storageBucket: "nextjs-practice-98fcb.appspot.com",

  messagingSenderId: "339893477686",

  appId: "1:339893477686:web:1155a344fc8d03492b5397",

  measurementId: "G-KW9LSZ9Z6N"

};


// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

//const app = initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export const firestore = firebase.firestore();
export const storage = firebase.storage();