import React from 'react';
import Chat from '../components/Chat';
import { Container, Card } from 'react-bootstrap'
import { login } from '../util/user-input/login';

export const HomePage = (props) => {
  const backgroundImage = {
    backgroundImage: 'url("./images/jazz.jpg")',
    backgroundSize: 'cover',
    height: '100vh',
  };

  const { title, content } = props;

  return (
    <div>
      <Container fluid style={backgroundImage}>
        {}
        
        <button onClick={(e)=>{ login(); }}>Login</button>
        <Chat />
      
        {/* <MainView /> */}
      </Container>
    </div>
  );
};

export default HomePage;