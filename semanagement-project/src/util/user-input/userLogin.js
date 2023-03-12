import { db } from "../../firebase/firebase";

import { signInWithPopup, signOut } from "firebase/auth";
import { setDoc, doc, getDoc} from "firebase/firestore";
import { auth, provider } from "../../firebase/firebase";

const userLogin = () => {
  if (auth.currentUser) {
    throw new Error("User is already logged in");
  }

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
    .catch((error) => {
      console.log(`Login Error: ${error}`);
    });
};

const userLogout = () => {
  signOut(auth)
    .then(() => {
      console.log("User signed out successfully");
      window.alert("You have been logged out");
    })
    .catch((error) => {
      console.log(`Sign-out error: ${error}`);
    });
};

const getCurrentUserName = () => {
  const currentUser = auth.currentUser;
  if (!currentUser) {
    return "No user logged in";
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
