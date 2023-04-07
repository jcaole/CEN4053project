import React, { useEffect } from 'react';
import { Load_Messages, SendMessage, Subscribe_NewMessage } from '../util/messages/messaging';
import { makeRoom } from '../util/rooms/chat_rooms';
import { getUserInfo } from '../util/user-input/user'
import { auth } from '../firebase/firebase';

export default function Chat() {

  const [user, setUser] = React.useState(null);
  const [chat, setChat] = React.useState(null);
  const [messages, setMessages] = React.useState([]);
  const [roomId, setRoomId] = React.useState('default');
  const [tempRoomId, setTempRoomId] = React.useState('default');

  const loadRoomMessages = (roomID) => {
    Load_Messages(roomID, -1, 20)
      .then((data) => {
        setMessages(data);
        Subscribe_NewMessage(roomID, (message) => {
          setMessages(prev => [message, ...prev]);
        });
      });
  }

  useEffect(() => {
    auth.onAuthStateChanged((user)=>{
      setUser(user);
    })
    loadRoomMessages(roomId);
  }, [roomId]);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "60vh", width: "60vw", textAlign: "left" }}>
      <div style={{ textAlign: "center", margin: "10px" }}>
        <h2><u>Current Room: {roomId}</u></h2>
      </div>
      <div style={{ 
        flex: "1 1 auto", 
        overflowY: "scroll", 
        border: "2px solid gray", 
        padding: "15px", 
        maxHeight: "60vh",
        backgroundColor: "rgba(211, 211, 211, 0.8)", // light grey with 80% opacity
      }}>
        <ul>
          {messages.map((item, index, array) => (
            <li key={array[array.length - 1 - index].id}>
              <span style={{ fontStyle: 'italic', fontSize: '0.8rem' }}>
                {getUserInfo(array[array.length - 1 - index].data.sender)?.displayName}
              </span>
              {getUserInfo(item)?.displayName} - {' '} {array[array.length - 1 - index].data.content}
              
            </li>
          ))}
        </ul>
      </div>
      {
          user ? (
            <div style={{ display: "flex", padding: "10px" }}>
              <input type="text" onChange={(e) => { e.preventDefault(); setChat(e.target.value) }} />
              <button onClick={(e) => { e.preventDefault(); SendMessage(roomId, { content: chat, type: 'string' }); }}>Send Message</button>
              <input type="text" onChange={(e) => { e.preventDefault(); setTempRoomId(e.target.value) }} />
              <button onClick={(e) => { e.preventDefault(); setRoomId(tempRoomId); makeRoom(roomId); loadRoomMessages(roomId) }}>Change Room</button>
            </div>
           ) : (
            <></>
           )
      }
      
    </div>
  );
}
