import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDMXo8muzCzFc5vnmFVKHHU0HrqpMe1SHY",
    authDomain: "reels-61508.firebaseapp.com",
    projectId: "reels-61508",
    storageBucket: "reels-61508.appspot.com",
    messagingSenderId: "1024782691847",
    appId: "1:1024782691847:web:b38a95cde0897dc9c104a2",
    measurementId: "G-LPSS07KSBF"
  };

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

const firestore = firebase.firestore();

export const database = {
    users: firestore.collection("users"),
    getTimeStamp: firebase.firestore.FieldValue.getTimeStamp
}

export const storage = firebase.storage();