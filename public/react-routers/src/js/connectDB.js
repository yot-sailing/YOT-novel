import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB5MW4fAFU0OlbQnPa95DW1--NLUMVxzjc",
    authDomain: "yot-novel.firebaseapp.com",
    databaseURL: "https://yot-novel.firebaseio.com",
    projectId: "yot-novel",
    storageBucket: "yot-novel.appspot.com",
    messagingSenderId: "562989854712",
    appId: "1:562989854712:web:4882fb990d488e072ef00d",
    measurementId: "G-MQBL44VYED"
};

firebase.initializeApp(firebaseConfig);
export default firebase;
export const db = firebase.firestore();