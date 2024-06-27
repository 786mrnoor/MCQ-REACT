import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";

const firebaseConfig = {
    apiKey: "AIzaSyBeFcJldri5nGRxbF3W3vipPO-DyCghFD0",
    authDomain: "mcq-pwa.firebaseapp.com",
    projectId: "mcq-pwa",
    storageBucket: "mcq-pwa.appspot.com",
    messagingSenderId: "202439248598",
    appId: "1:202439248598:web:7854a6c4b061a5707d5777",
    measurementId: "G-5E6PR08Y3N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;