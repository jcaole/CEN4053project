import React from 'react';
import Chat from '../components/Chat';
import MainView from '../components/home/MainView';

import { login } from '../util/users/login';

export const HomePage = () => {

  
  
  return (
    <div>
      <Chat />
      <button onClick={(e)=>{ login(); }}>Login</button>
      <MainView />
    </div>
    );
};
export default HomePage;