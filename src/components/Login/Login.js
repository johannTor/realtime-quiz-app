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
      <h1>Choose a username:</h1>
      <div className="loginContainer">
        <form className="loginForm" onSubmit={(ev) => handleLogin(ev)}>
          <input type="text" onChange={(ev) => setUserName(ev.target.value)} placeholder="Username"/>
          <button type="submit">Login</button>
        </form>
      </div>
      {success && <Redirect to={{pathname: `/quiz/${roomName}`, state: { userName }}} />}
    </div>
  )
}
