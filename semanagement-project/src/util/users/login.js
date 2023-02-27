import { signInWithPopup } from "firebase/auth";
import { db, auth, provider } from "../../firebase/firebase";

const login = ()=>{
    signInWithPopup(auth, provider)
      .then(({ user }) => {
        localStorage.setItem("user", JSON.stringify(user));
      })
      .catch((error)=>{
        console.log(`Login Error: ${error}`);
      });
};


export {
  login,
}