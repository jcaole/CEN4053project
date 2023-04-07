import React, { useEffect } from 'react';
import { Load_Messages, SendMessage, Subscribe_NewMessage, UnSubscribe_Message } from '../util/messages/messaging';
import { makeRoom } from '../util/rooms/chat_rooms';
import { getUserInfo } from '../util/user-input/user'
import { auth } from '../firebase/firebase';

export default function Chat() {

  const [user, setUser] = React.useState(null);
  const [chat, setChat] = React.useState(null);
  const [messages, setMessages] = React.useState([]);
  const [roomId, setRoomId] = React.useState('default');
  const [tempRoomId, setTempRoomId] = React.useState('default');

  let messageListener;


  const loadRoomMessages = (roomID) => {
    UnSubscribe_Message(messageListener);
    setMessages([]);
    Load_Messages(roomID, -1, 20)
      .then((data) => {
        data.forEach((item, index, array) => {
          getUserInfo(item.data.user).then((user) => {
            array[index].username = user.name;
            array[index].photo = user.photoURL;
            if (index === array.length-1) {
              setMessages(data);
            }
          })
          .catch((error)=> {
            console.log(`Error Loading Message User: ${error}`);
          });          
        });
      
        messageListener = Subscribe_NewMessage(roomID, (message) => {
          getUserInfo(message.data.user).then((user) => {
            message.username = user.name;
            message.photo = user.photoURL;
            setMessages(prev => [message, ...prev]);
          });
        });
      });
  }

  useEffect(()=>{
    auth.onAuthStateChanged((user)=>{
      setUser(user);
    })
  }, [user]);

  useEffect(() => {
    loadRoomMessages(roomId);
  }, [roomId]);

  
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "60vh", width: "60vw", textAlign: "left"}}>
      <div style={{ textAlign: "center", margin: "10px" }}>
        <h2><u>Current Room: {roomId}</u></h2>
      </div>
      <div style={{ 
        flex: "1 1 auto", 
        overflowY: "auto", 
        border: "2px solid gray", 
        padding: "15px", 
        maxHeight: "60vh",
        backgroundColor: "rgba(211, 211, 211, 0.8)", // light grey with 80% opacity
      }}>
        <ul>
          {messages.map((item, index, array) => (
            <li style={{"listStyleType": "none"}} key={array[array.length - 1 - index].id}>
              <br/>{array[array.length - 1 - index].username + ':'}<br/>{array[array.length - 1 - index].data.content}
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
              <button onClick={(e) => { e.preventDefault(); makeRoom(tempRoomId); setRoomId(tempRoomId); }}>Change Room</button>
            </div>
           ) : (
            <></>
           )
      }
      
    </div>
  );
}
