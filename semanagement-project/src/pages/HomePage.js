import React from 'react';
import Chat from '../components/Chat';
import { Container } from 'react-bootstrap'
import ServerList from '../components/ServerList';
import UserList from '../components/UserList';
import UniversalNavBar from '../components/UniversalNavBar';

export const HomePage = (props) => {
  const backgroundImage = {
    backgroundImage: 'url("./images/jazz.jpg")',
    backgroundSize: 'cover',
    height: '100vh',    
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'row',
      height: '100vh',
      overflow: 'hidden', // Prevent scrolling
    },
    spacer: {
      margin: '0 10px', // Add some space on the left and right
    },
  };

  const [roomId, setRoomId] = React.useState('default');
  const changeRoomID = ( roomID ) => {
    setRoomId(roomID);
  }

  return (
    <div style={{ overflow: 'hidden' }}> {/* Prevent scrolling on the body */}
      <Container fluid style={backgroundImage}>
        <UniversalNavBar/>
        <div style={{ overflow: 'hidden' }}> {/* Prevent scrolling on the container */}
          <div style={styles.container}>
            <ServerList onRoomChange={changeRoomID} />
            <div style={styles.spacer} />
            <Chat roomId={roomId} onRoomChange={changeRoomID} />
            <div style={styles.spacer} />
            <UserList userID={props.userID} />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HomePage;
