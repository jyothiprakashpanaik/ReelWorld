import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/firestore";

// const firebaseConfig = {
//     apiKey: "AIzaSyDMXo8muzCzFc5vnmFVKHHU0HrqpMe1SHY",
//     authDomain: "reels-61508.firebaseapp.com",
//     projectId: "reels-61508",
//     storageBucket: "reels-61508.appspot.com",
//     messagingSenderId: "1024782691847",
//     appId: "1:1024782691847:web:b38a95cde0897dc9c104a2",
//     measurementId: "G-LPSS07KSBF"
//   };

const firebaseConfig = {
  apiKey: "AIzaSyCD-eU3nN_D7V8r0Mlljy_nyXUsgl9eJD8",
  authDomain: "reel-world.firebaseapp.com",
  projectId: "reel-world",
  storageBucket: "reel-world.appspot.com",
  messagingSenderId: "589543010802",
  appId: "1:589543010802:web:7cb56a0ea341b7fdfc3b6b",
  measurementId: "G-GV2MSZD65P"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

const firestore = firebase.firestore();

export const database = {
    users: firestore.collection("users"),
    posts: firestore.collection("posts"),
    comments: firestore.collection("comments"),
    getTimeStamp: firebase.firestore.FieldValue.serverTimestamp()
}

export const storage = firebase.storage();