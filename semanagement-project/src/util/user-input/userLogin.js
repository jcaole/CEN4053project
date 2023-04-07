import { db } from "../../firebase/firebase";

import { signInWithPopup, signOut } from "firebase/auth";
import { setDoc, doc, getDoc} from "firebase/firestore";
import { auth, provider } from "../../firebase/firebase";

const userLogin = () => {
  if (auth.currentUser) {
    return auth.currentUser.user.displayName;
  }

  return signInWithPopup(auth, provider)
    .then((user) => {
      const u = user.user;
      const usersRef = doc(db, 'users', u.uid);
      setDoc(usersRef, {
        uid: u.uid,
        name: u.displayName,
        email: u.email,
        photoURL: u.photoURL,
      });
      return u.displayName;
    })
    .catch((error) => {
      console.log(`Login Error: ${error}`);
      return null;
    });
};

const userLogout = () => {
  signOut(auth)
    .then(() => {
      console.log("User signed out successfully");
    })
    .catch((error) => {
      console.log(`Sign-out error: ${error}`);
    });
};

const getCurrentUserName = () => {
  const currentUser = auth.currentUser;
  if (!currentUser) {
    return null;
  }


  const usersRef = doc(db, "users", currentUser.uid);
  return getDoc(usersRef)
    .then((doc) => {
      if (doc.exists()) {
        return doc.data().name;
      } else {
        return "User document does not exist";
      }
    })
    .catch((error) => {
      console.log(`Error getting user document: ${error}`);
      return "Error getting user name";
    });
};


export { userLogin, userLogout, getCurrentUserName };
