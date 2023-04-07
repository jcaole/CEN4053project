import { db } from '../../firebase/firebase';
import { doc, collection, onSnapshot, getDocs, setDoc } from 'firebase/firestore';

const makeRoom = async (name) => {
  const roomRef = doc(db, 'rooms', name);
  setDoc(roomRef, {id: name, timestamp: Date.now()}, {merge: true});
};

const getRooms = async () => {
  const snapshot = await getDocs(collection(db, 'rooms'))
  .catch((error) => {
    console.log(`Error Getting Rooms: ${error}`);
    return [];
  });

  const roomNames = [];
  snapshot.docs.forEach((room) => { roomNames.push(room.id)});
  return roomNames;
}

const SubscribeToNewRooms = (listener) => {
  const roomsRef = collection(db, 'rooms');
  const time = Date.now();

  onSnapshot(roomsRef, (snapshot)=>{
    snapshot.docChanges().forEach(change => {
      if (change.type === 'added') {
        if (change.doc.data().timestamp > time) {
          listener(change.doc.data().id);
        }
      }
    });
  });
};

export {
  makeRoom,
  getRooms,
  SubscribeToNewRooms,
}