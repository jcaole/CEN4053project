import { db, auth } from '../../firebase/firebase';
import { collection } from 'firebase/firestore';

const makeRoom = (name)=>{
  const roomRef = collection(db, name);
};

export {
  makeRoom
}