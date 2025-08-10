import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyAxgS7Gm-nJGvyN3W0ZaawTuDf24kzYLgg",
  authDomain: "wedding-planner-4d630.firebaseapp.com",
  projectId: "wedding-planner-4d630",
  storageBucket: "wedding-planner-4d630.firebasestorage.app",
  messagingSenderId: "966133475057",
  appId: "1:966133475057:web:55e35cdad0b8f0e20ceb50",
  measurementId: "G-HV945FVNCF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);