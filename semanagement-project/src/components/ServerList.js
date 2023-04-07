import React, { useState, useEffect } from 'react';
import { SubscribeToNewRooms, getRooms } from "../util/rooms/chat_rooms";




export default function ServerList() {
  const [rooms, setRooms] = useState([]);

  const fetchRooms = async () => {
    getRooms()
    .then((rooms) => {
      setRooms(rooms);
      SubscribeToNewRooms((roomName) => {
        setRooms(prev => [roomName, ...prev]);
      });
    });
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "60vh", width: "40vh", textAlign: "left" }}>
      <h2><u>Room List</u></h2>
      <div style={{
        flex: "1 1 auto",
        overflowY: "scroll",
        border: "2px solid gray",
        padding: "15px",
        maxHeight: "60vh",
        backgroundColor: "rgba(211, 211, 211, 0.8)", // light grey with 80% opacity
      }}>
        {
        rooms.map((room) => (
          <div key={room}>{room}</div>
        ))
        }
      </div>
    </div>
  );
}
