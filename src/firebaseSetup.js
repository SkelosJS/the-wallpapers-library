import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCgYHNnK3wvAtWbfRv2yjFvnDt4-FmaTzg",
  authDomain: "wallpaperlibrary-72584.firebaseapp.com",
  databaseURL: "https://wallpaperlibrary-72584-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "wallpaperlibrary-72584",
  storageBucket: "wallpaperlibrary-72584.appspot.com",
  messagingSenderId: "572121575993",
  appId: "1:572121575993:web:e79d996cc797771e6c93e8",
  measurementId: "G-7KCY2B1PNZ"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export default db;