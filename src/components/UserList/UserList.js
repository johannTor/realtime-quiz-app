import React, { useEffect, useState } from 'react';
import './userList.css';

export default function UserList({users, answeredUsers, socket}) {
  const [isDefined, setIsDefined] = useState(false);

  // Check if answeredUsers is given, if they are we can check for users who have already answered
  useEffect(() => {
    if(answeredUsers) {
      setIsDefined(true);
    }
  }, [answeredUsers]);

  useEffect(() => {  
  }, [answeredUsers]);

  return (
    <div className="userList">
      <div className="theUsers">
        {users.map((item) => <div key={item.userID} className={(isDefined && answeredUsers.includes(item.userID)) ? 'markedUser' : null}>{item.username}{socket.id === item.userID ? ' (You)' : null}</div>)}
      </div>
      <div className="userCount">{users.length}/20</div>
      <div className="listHeader">Participants</div>
    </div>
  )
}
