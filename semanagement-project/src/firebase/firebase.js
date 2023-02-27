import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBUQfsZOkBhL9IaqU5nPlcIit5UppmYy-U",
  authDomain: "softwareengman.firebaseapp.com",
  projectId: "softwareengman",
  storageBucket: "softwareengman.appspot.com",
  messagingSenderId: "718313182201",
  appId: "1:718313182201:web:4b96dc57d3611c960ea328"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {
  app,
  db,
  auth,
  provider
};