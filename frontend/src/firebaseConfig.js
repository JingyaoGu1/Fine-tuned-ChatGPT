// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBDPdkvtPJoGOx12DuCSC39oYmNlSUHUD4",
    authDomain: "fine-tune-gpt.firebaseapp.com",
    projectId: "fine-tune-gpt",
    storageBucket: "fine-tune-gpt.appspot.com",
    messagingSenderId: "418743343235",
    appId: "1:418743343235:web:d27997e8bd983244c223b6",
    measurementId: "G-8CLW410E1G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
