import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

/**
 * @description Gets a users information from the database, returns null if no user with id
 * 
 */
const getUserInfo = async (userID) => {
  const ref = doc(db, 'users', userID);
  const user = await getDoc(ref);

  if (user.exists()) {
    const userData = user.data();
    return { id: userID, ...userData };
  }

  return null;
};


export {
  getUserInfo,
};