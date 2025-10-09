import { getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBN7qtJZQJCRGJLAooj_8TbxmFchNp-JZw",
  authDomain: "cha-casa-nova-678f6.firebaseapp.com",
  projectId: "cha-casa-nova-678f6",
  storageBucket: "cha-casa-nova-678f6.firebasestorage.app",
  messagingSenderId: "595325942667",
  appId: "1:595325942667:web:850b1c87e02296c7d98d8e",
};

const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

export { db };
