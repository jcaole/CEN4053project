
import { db, auth } from '../../firebase/firebase';
import { collection, addDoc, onSnapshot, getDocs, query, where, orderBy, limit } from 'firebase/firestore';

/**
 * Sends a new message to the database, adds current user and timestamp to message
 * @param {string} room - the id of the room to add the message to
 * @param {Message} message - the message content
 */
const SendMessage = async (room, message) => {

  if (!room || !message) {
    console.log('Missing Room Or Message');
    return null;
  }

  if (auth.currentUser) {
    message.user = auth.currentUser.uid;
    message.timestamp = Date.now();
    const messageRef = await addDoc(collection(db, room), message);
    return messageRef.id;
  } else {
    console.log('Not Logged In');
    return null;
  }
};

const Load_Messages = async (room, timeMinutes, maxCount) => {
  let q;
  if (timeMinutes !== -1) {
    q = query(collection(db, room), where("timestamp", ">=", Date.now()-(timeMinutes * 60000)), orderBy("timestamp", "desc"), limit(maxCount));
  } else {
    q = query(collection(db, room), orderBy("timestamp", "desc"), limit(maxCount));
  }
  const messages = await getDocs(q)
  .catch((error)=>{
    console.log(`Error Loading Messages: ${error}`);
    return [];
  });
  const ret = [];
  messages.forEach((message)=>{
    ret.push({id: message.id, data: message.data()});
  });
  return ret;
};

/**
 * Subscribes a listener to new messages in a given room
 * @param {string} room - id of room to listen to
 * @param {MessageListener} listener - listener method
 */
const Subscribe_NewMessage = (room, listener) => {
  const roomRef = collection(db, room);
  const time = Date.now();
  onSnapshot(roomRef, (snapshot)=>{
    snapshot.docChanges().forEach(change => {
      if (change.type === 'added') {
        if (change.doc.data().timestamp > time) {
          listener({id: change.doc.id, data: change.doc.data()});
        }
      }
    });
  });
};

/**
 * Removes a message listener from a room
 * @param {string} room - id of room to remove listener from
 * @param {MessageListener} listener - listener to remove
 */
const UnSubscribe_Message = (room, listener) => {
  const roomRef = db.collection(room);
  roomRef.removeEventListener(listener);
};


export {
  Load_Messages,
  SendMessage,
  Subscribe_NewMessage,
  UnSubscribe_Message,
};
