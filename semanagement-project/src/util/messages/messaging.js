
import { db, auth } from '../../firebase/firebase';

import { collection, addDoc, setDoc } from 'firebase/firestore';

/**
 * Sends a new message to the database, adds current user and timestamp to message
 * @param {string} room - the id of the room to add the message to
 * @param {Message} message - the message content
 */
const SendMessage = async (room, message) => {
  if (auth.currentUser) {
    message.user = auth.currentUser.uid;
    message.timestamp = Date.now();
    const messageRef = await addDoc(collection(db, room), message);
    return messageRef.id;
  }
};

/**
 * Subscribes a listener to new messages in a given room
 * @param {string} room - id of room to listen to
 * @param {MessageListener} listener - listener method
 */
const Subscribe_NewMessage = (room, listener) => {
  const roomRef = db.collection(room)
                      .orderBy("timestamp");
  roomRef.onSnapshot((snapshot)=>{
    snapshot.docChanges().forEach(change => {
      if (change.type === 'added') {
        listener(change.doc.data());
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
  SendMessage,
  Subscribe_NewMessage,
  UnSubscribe_Message,
};
