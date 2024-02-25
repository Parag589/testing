import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBv9fZ1gfSz5v5sggpR2NcmCdNEVBBrfDk",
    authDomain: "richpanel-assignment-c7beb.firebaseapp.com",
    projectId: "richpanel-assignment-c7beb",
    storageBucket: "richpanel-assignment-c7beb.appspot.com",
    messagingSenderId: "161028749074",
    appId: "1:161028749074:web:2fb2de0aecb30ac03065cb",
    measurementId: "G-H3BWS6BSH9"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
