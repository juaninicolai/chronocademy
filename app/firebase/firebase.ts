import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyC7Bn81gctbcH0-hOiOVPHOndd5XdV-1EM",
    authDomain: "chronocademy.firebaseapp.com",
    projectId: "chronocademy",
    storageBucket: "chronocademy.appspot.com",
    messagingSenderId: "217852649682",
    appId: "1:217852649682:web:5cc7de0dc330861dd24d0b"
};

export const app = initializeApp(firebaseConfig);