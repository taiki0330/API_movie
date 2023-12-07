import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  
  authDomain: 'my-movie-f3994.firebaseapp.com',
  projectId: 'my-movie-f3994',
  storageBucket: 'my-movie-f3994.appspot.com',
  messagingSenderId: '216027992418',
  appId: '1:216027992418:web:1929de75fe10b5ab089c3b',
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);