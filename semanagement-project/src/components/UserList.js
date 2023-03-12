import React, { useEffect } from 'react';
import { getUserInfo } from '../util/user-input/user'


export default function UserList() {
    //   const [roomId, setRoomId] = React.useState([]);

    return (
        <div style={{ display: "flex", flexDirection: "column", height: "60vh", width: "60vh" }}>
            <div style={{
                flex: "1 1 auto",
                overflowY: "scroll",
                border: "2px solid gray",
                padding: "15px",
                maxHeight: "60vh",
                backgroundColor: "rgba(211, 211, 211, 0.8)", // light grey with 80% opacity
            }}>

            </div>
        </div>
    );
}