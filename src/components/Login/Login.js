import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import './login.css';

export default function Login({location}) {
  const [userName, setUserName] = useState('');
  const [success, setSuccess] = useState(false);
  let roomName;
  if(location.state !== undefined) {
    roomName = location.state.room;
  }
  console.log('Roomname: ', roomName);

  const handleLogin = (ev) => {
    ev.preventDefault();
    console.log('Loggin in', userName);
    if(!userName.trim()) {
      console.log('Invalid username');
      return;
    }
    setSuccess(true);
  };

  return (
    <div className="app">
      <div className="partakerPanels">
        <div className="leftSidebar">
          <div className="logo">
            InstaQuiz
          </div>
        </div>
        <div className="loginContainer">
          <div className="loginTitle">Choose a username</div>
          <form className="loginForm" onSubmit={(ev) => handleLogin(ev)}>
            <input type="text" onChange={(ev) => setUserName(ev.target.value)} autoFocus={true} placeholder="Username"/>
            <button type="submit" className="buttonBorder">Login</button>
          </form>
        </div>
        <div className="userList">
        </div>
      </div>
      {success && <Redirect to={{pathname: `/quiz/${roomName}`, state: { userName }}} />}
    </div>
  )
}
