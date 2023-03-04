import React, { useEffect } from 'react';

import { Load_Messages, SendMessage, Subscribe_NewMessage } from '../util/messages/messaging';
import { makeRoom } from '../util/rooms/chat_rooms';

export default function Chat() {

  const [chat, setChat] = React.useState(null);
  const [messages, setMessages] = React.useState([]);
  const [roomId, setRoomId] = React.useState([]);

  const loadRoomMessages = (roomID) => {
    Load_Messages(roomID, -1, 20)
    .then((data)=>{
      setMessages(data);
      Subscribe_NewMessage(roomID, (message)=>{
        setMessages(prev => [message, ...prev]);
      });
    });
  }

  useEffect(()=>{
    loadRoomMessages('default');
  }, []);

  return (
      <>
        <ul>
          {messages.map((item, index, array) => (
            <li key={array[array.length-1-index].id}>{array[array.length-1-index].data.content}</li>
          ))}
        </ul>
        <input type="text" onChange={(e)=>{ e.preventDefault(); setChat(e.target.value)}} />
        <button onClick={(e)=>{ e.preventDefault(); SendMessage(roomId, { content: chat, type: 'string'}); }}>Send Message</button>
        <input type="text" onChange={(e)=>{ e.preventDefault(); setRoomId(e.target.value)}} />
        <button onClick={(e)=>{ e.preventDefault(); makeRoom(roomId); loadRoomMessages(roomId)}}>Change Room</button>
      </>
  );
}