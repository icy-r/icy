// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBbH4jdarVFw9prOq-BI3uuEMTXvhFfs8M",
  authDomain: "portfolio-22923.firebaseapp.com",
  projectId: "portfolio-22923",
  storageBucket: "portfolio-22923.appspot.com",
  messagingSenderId: "916656597884",
  appId: "1:916656597884:web:f1c54f52ff37f0db5252f9",
  measurementId: "G-J898P0W69H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };