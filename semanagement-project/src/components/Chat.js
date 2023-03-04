import React, { useEffect } from 'react';

import { Load_Messages, SendMessage, Subscribe_NewMessage } from '../util/messages/messaging'

export default function Chat() {

  const [chat, setChat] = React.useState(null);
  const [messages, setMessages] = React.useState([]);

  useEffect(()=>{
    Load_Messages('testroom', -1, 20)
    .then((data)=>{
      setMessages(data);
      Subscribe_NewMessage('testroom', (message)=>{
        setMessages(prev => [message, ...prev]);
      });
    });
  }, []);

  return (
      <>
        <ul>
          {messages.map((item, index, array) => (
            <li key={array[array.length-1-index].id}>{array[array.length-1-index].data.content}</li>
          ))}
        </ul>
        <input type="text" onChange={(e)=>{ e.preventDefault(); setChat(e.target.value)}} />
        
        <button onClick={(e)=>{ e.preventDefault(); SendMessage('testroom', { content: chat, type: 'string'}); }}>Send Message</button>
      </>
  );
}