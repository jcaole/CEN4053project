import React, { useEffect } from 'react';
import MainView from '../components/home/MainView';

import { login } from '../util/users/login';
import { Load_Messages, SendMessage, Subscribe_NewMessage } from '../util/messages/messaging'

export const HomePage = () => {

  const [chat, setChat] = React.useState(null);
  const [messages, setMessages] = React.useState([]);

  useEffect(()=>{
    Load_Messages('testroom', 100, 20)
    .then((data)=>{
      setMessages(data);
      Subscribe_NewMessage('testroom', (message)=>{
        setMessages(prev => [message, ...prev]);
      });
    });
  }, []);

  return (
    <div>
    <ul>
        {messages.map((item, index, array) => (
          <li key={array[array.length-1-index].id}>{array[array.length-1-index].data.content}</li>
        ))}
    </ul>
    <input type="text" onChange={(e)=>{ e.preventDefault(); setChat(e.target.value)}} />
    <button onClick={(e)=>{ e.preventDefault(); login(); }}>Login</button>
    <button onClick={(e)=>{ e.preventDefault(); SendMessage('testroom', { content: chat, type: 'string'}); }}>Send Message</button>
    <MainView />
    </div>
    );
};
export default HomePage;