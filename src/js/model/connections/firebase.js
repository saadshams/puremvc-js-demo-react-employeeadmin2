import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseApp = initializeApp({
    apiKey: "AIzaSyAqvjvPIWpjxrOxomKSDnBulsoy_tFFCQs",
    authDomain: "employeeadmin-2b235.firebaseapp.com",
    projectId: "employeeadmin-2b235",
    storageBucket: "employeeadmin-2b235.appspot.com",
    messagingSenderId: "535652343544",
    appId: "1:535652343544:web:184ae607850443ede4650d",
    measurementId: "G-HB17RG68V3"
});

export const analytics = getAnalytics(firebaseApp);
export const firestore = getFirestore(firebaseApp);
