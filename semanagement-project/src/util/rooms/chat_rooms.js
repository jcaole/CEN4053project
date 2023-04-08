import { db } from '../../firebase/firebase';
import { doc, collection, onSnapshot, getDocs, setDoc } from 'firebase/firestore';
import { getDoc } from 'firebase/firestore';

const makeRoom = async (name, userID) => {
  const roomRef = doc(db, 'rooms', name);
  const room = await getDoc(roomRef);
  setDoc(roomRef, {id: name, timestamp: Date.now()}, {merge: true});
  if (room.exists()) {
    //get members list, add new id to room
    const roomData = room.data();
    const members = roomData.user;
    members.push(userID);
    await setDoc(roomRef, { user: members }, { merge: true });
  }
  else {
    setDoc(roomRef, {id: name, user: [userID], timestamp: Date.now()}, {merge: true});
  }
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