import { db } from "../../firebase/firebase";

import { signInWithPopup } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, provider } from "../../firebase/firebase";

const userLogin = ()=>{
    signInWithPopup(auth, provider)
      .then((user) => {
        const u = user.user;
        const usersRef = doc(db, 'users', u.uid);
        setDoc(usersRef, {
          uid: u.uid,
          name: u.displayName,
          email: u.email,
          photoURL: u.photoURL,
        });
      })
      .catch((error)=>{
        console.log(`Login Error: ${error}`);
      });
};

export {
  userLogin,
}