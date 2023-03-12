import React from 'react';
import Chat from '../components/Chat';
import MainView from '../components/home/MainView';
import {Container} from 'react-bootstrap'

import { login } from '../util/users/login';

export const HomePage = () => {
  const backgroundImage = {
    backgroundImage: 'url("./images/jazz.jpg")',
    backgroundSize: 'cover',
    height: '100vh',
  };
  return (
    <div>
      <Container fluid style={backgroundImage}>
        {}
        <Chat />
        <button onClick={(e)=>{ login(); }}>Login</button>
        <MainView />
      </Container>
      
    </div>
  );
};

export default HomePage;