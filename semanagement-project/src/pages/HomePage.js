import React from 'react';
import Chat from '../components/Chat';
import MainView from '../components/home/MainView';
import { Login } from '../components/Login';

export const HomePage = () => {
  
  return (
    <div>
      <Chat />
      <MainView />
      <Login />
    </div>
    );
};
export default HomePage;