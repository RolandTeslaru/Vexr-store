// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBwZQfzfCB6qVfCeEXBxyYus7mr3N4Cp2E",
  authDomain: "vexr-store.firebaseapp.com",
  projectId: "vexr-store",
  storageBucket: "vexr-store.appspot.com",
  messagingSenderId: "1075481053660",
  appId: "1:1075481053660:web:59f2380369c2c6a21e6719",
  measurementId: "G-QCWMF1BQFF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);