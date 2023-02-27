import React from 'react';
import MainView from '../components/home/MainView';
import Footer from '../components/Footer';

import { login } from '../util/users/login';
import { SendMessage } from '../util/messages/messaging'

export const HomePage = () => {

  return (
    <>
    <button onClick={login}>Login</button>
    <button onClick={()=>{ SendMessage('testroom', { content: 'Hello, World!', type: 'string'}); }}>Send Message</button>
    <MainView />
    </>
    );
};
export default HomePage;