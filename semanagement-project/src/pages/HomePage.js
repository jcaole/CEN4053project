import React from 'react';
import Chat from '../components/Chat';
import { Container } from 'react-bootstrap'
// import { userLogin } from '../util/user-input/userLogin';
import ServerList from '../components/ServerList';
// import UserList from '../components/UserList';
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
    },
  };

  // const { title, content } = props;

  return (
    <div>
      <Container fluid style={backgroundImage}>
        <UniversalNavBar/>
        <div style={styles.container}>
          <ServerList />
          <Chat />
          {/* <UserList/> */}
        </div>
      </Container>
    </div>
  );
};

export default HomePage;
