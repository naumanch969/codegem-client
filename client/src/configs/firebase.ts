import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { collection, getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyC0E5ZtoBwZGfI071T6G-YQnATHZDhCQH4",
    authDomain: "codeg-16e7a.firebaseapp.com",
    projectId: "codeg-16e7a",
    storageBucket: "codeg-16e7a.appspot.com",
    messagingSenderId: "810268978359",
    appId: "1:810268978359:web:793ec57e24e85b50473132",
    measurementId: "G-DQCZH7HL09"
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app)

export const chatCollection = collection(db, 'chats');