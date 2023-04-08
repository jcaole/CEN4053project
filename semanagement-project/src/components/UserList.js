import { db } from '../firebase/firebase';
import { doc, collection, onSnapshot, getDocs, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { getUserInfo } from '../util/user-input/user';
import { makeRoom } from '../util/rooms/chat_rooms';

export default function UserList({ userID }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch the list of users and set the state
    async function fetchUsers() {
      const userList = [];
      const usersRef = collection(db, 'users');
      const snapshot = await getDocs(usersRef);
      snapshot.forEach((doc) => {
        if (doc.id !== userID) {
          userList.push({
            id: doc.id,
            name: doc.data().name,
          });
        }
      });
      setUsers(userList);
    }
    fetchUsers();
  }, [userID]);

  const handleCreateRoom = (userID, otherUserID) => {
    const roomName = `${userID}-${otherUserID}`;
    makeRoom(roomName, [userID, otherUserID]);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '60vh', width: '40vh', textAlign: 'left' }}>
      <h2>
        <u>User List</u>
      </h2>
      <div
        style={{
          flex: '1 1 auto',
          overflowY: 'scroll',
          border: '2px solid gray',
          padding: '15px',
          maxHeight: '60vh',
          backgroundColor: 'rgba(211, 211, 211, 0.8)', // light grey with 80% opacity
        }}
      >
        {users &&
          users.map((user) => (
            <div key={user.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <div style={{ flex: '1' }}>{user?.name ?? 'Unknown User'}</div>
            </div>
          ))}
      </div>
    </div>
  );
}
