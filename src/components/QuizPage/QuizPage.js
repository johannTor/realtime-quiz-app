import React, { useState, useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { io } from 'socket.io-client';
import CreatorView from '../CreatorView/CreatorView';
import PartakerView from '../PartakerView/PartakerView';

// Somehow call this URL with the quizId as parameter so that a room can be created on the server
const URL = 'http://localhost:3200';
let socket;

// Reorganize the login chec, I'm checking first if location.state is undefined, if it isnt im checking if it contains correct properties
// Remake the flow of login...
export default function QuizPage({location}) {
  // const [isCreator, setIsCreator] = useState(location.state === undefined ? false : (location.state.quizCreator) ? true : false);
  const isCreator = location.state === undefined ? false : (location.state.quizCreator) ? true : false;
  // const [quiz, setQuiz] = useState(location.state === undefined ? [] : (location.state.theQuiz) ? location.state.theQuiz : []);
  const quiz = location.state === undefined ? [] : (location.state.theQuiz) ? location.state.theQuiz : [];
  const [userList, setUserList] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);
  const { quizId } = useParams();
  // console.log('Quiz: ',  quiz);
  // console.log('IsCreator: ', isCreator);
  // console.log('isLoggedIn: ', isLoggedIn);
  // console.log('userName: ', userName);

  useEffect(() => {
    socket = io(URL, { autoConnect: false, extraHeaders: {"roomid": quizId}}); // Automatic connection off, call socket.connect() later
    if(isCreator) {
      setIsLoggedIn(true);
      setUserName('creator');
      socket.auth = { userName: 'creator' };
      socket.connect();
    } else {  // Try to login a regular user using state values sent by login
      if(location.state !== undefined && location.state.userName) {
        setIsLoggedIn(true);
        setUserName(location.state.userName);
        socket.auth = { userName: location.state.userName};
        socket.connect();
      }
    }
    socket.on('connect_error', (err) => {
      if(err.message === 'invalid username') {
        setIsLoggedIn(false);
        console.log('error: already exists', err);
      }
    });
    // Allow states to be set before render checks are made
    setLoading(false);
    // Clean up listeners when app is dismounted?
    return () => {
      socket.off('connect_error');
    }
  }, [isCreator, location.state, quizId]);

  useEffect(() => {
    if(socket) {
      // Recieve all users that have already connected
      socket.on('users', (users) => {
        console.log('Incoming users: ', users);
        setUserList(users);
      });

      // Recieve a newly connected user
      socket.on('user connected', (user) => {
        console.log('User connected: ', user);
        setUserList([...userList, user]);
      });

      socket.on('user disconnected', (id) => {
        console.log('User disconnected id: ', id);
        const usersCpy = [...userList];
        const foundUser = usersCpy.findIndex((item) => item.userID === id);
        if(foundUser !== -1) {
          console.log(usersCpy[foundUser].username + ' has disconnected'); // Maybe send this msg from server?
          usersCpy.splice(foundUser, 1);
          setUserList(usersCpy);
        }
      });
    }
    console.log('UserList now: ', userList);
    return () => {
      if(socket) {
        socket.off('users');
        socket.off('user connected');
        socket.off('user disconnected');
      }
    }
  }, [userList]);

  // Creator will have unique methods in order to control the quiz flow?
  // const startQuiz = () => {
  //   if(isCreator) {
  //     socket.emit('start quiz', {quiz});
  //   }
  // };

  return (
    <div className="app">
      {loading ? <h3>Loading</h3> :
      // If user is creator of a quiz show the creator page, if he is logged in but not a creator show the partaker page, otherwise redirect to login screen
      isCreator ? <CreatorView theQuiz={quiz} userList={userList} socket={socket} room={quizId} /> : ((isLoggedIn && !isCreator) ? <PartakerView socket={socket} userName={userName} userList={userList} room={quizId} /> : <Redirect to={{pathname: '/login', state: {room: quizId}}} />) }
    </div>
  )
}