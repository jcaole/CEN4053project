// import React, { useState, useEffect } from 'react';
// // import { db } from '../../firebase/firestore';
// import { collection, getDocs } from 'firebase/firestore';

// import { db } from "../../firebase/firebase";




export default function ServerList() {
//   const [rooms, setRooms] = useState([]);

//   useEffect(() => {
//     const fetchRooms = async () => {
//       const roomQuerySnapshot = await getDocs(collection(db, 'rooms'));
//       const roomNames = roomQuerySnapshot.docs.map(doc => doc.data().name);
//       const roomRefs = roomNames.map(name => collection(db, 'rooms', name));
//       const roomData = await Promise.all(roomRefs.map(async (ref) => {
//         const snapshot = await getDocs(ref);
//         return { id: snapshot.id, ...snapshot.data() };
//       }));
//       setRooms(roomData);
//     };
//     fetchRooms();
//   }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "60vh", width: "60vh" }}>
      <h1>Server List</h1>
      <div style={{
        flex: "1 1 auto",
        overflowY: "scroll",
        border: "2px solid gray",
        padding: "15px",
        maxHeight: "60vh",
        backgroundColor: "rgba(211, 211, 211, 0.8)", // light grey with 80% opacity
      }}>
        {/* {rooms.map((room) => (
          <div key={room.id}>{room.name}</div>
        ))} */}
      </div>
    </div>
  );
}
