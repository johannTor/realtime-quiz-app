import React, { useEffect } from 'react';
import './userList.css';

export default function UserList({users}) {
  useEffect(() => {
    
  }, [users]);
  return (
    <div className="userList">
      <div className="theUsers">
        {users.map((item) => <div key={item.userID}>{item.username}</div>)}
      </div>
      <div className="userCount">{users.length}/20</div>
      <div className="listHeader">Participants</div>
    </div>
  )
}
