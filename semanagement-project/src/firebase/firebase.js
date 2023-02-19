import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBUQfsZOkBhL9IaqU5nPlcIit5UppmYy-U",
  authDomain: "softwareengman.firebaseapp.com",
  projectId: "softwareengman",
  storageBucket: "softwareengman.appspot.com",
  messagingSenderId: "718313182201",
  appId: "1:718313182201:web:4b96dc57d3611c960ea328"
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

module.exports = {
  app,
  db
};