import React, { useState, useEffect } from 'react';
import UserList from '../UserList/UserList';
import Scoreboard from '../Scoreboard/Scoreboard';
import QuizSummary from '../QuizSummary/QuizSummary';
import './creatorView.css';

export default function CreatorView({theQuiz, userList, socket, room}) {
  const [quizStarted, setQuizStarted] = useState(false);
  const [itemClass, setItemClass] = useState('quizAnswer');
  const [show, setShow] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [usersWhoHaveAnswered, setUsersWhoHaveAnswered] = useState([]);
  const [scores, setScores] = useState({});
  const [isFinalQuestion, setIsFinalQuestion] = useState(false);
  const [finalAnswer, setFinalAnswer] = useState(false);
  const [showScores, setShowScores] = useState(false);
  const url = window.location.href;

  useEffect(() => {
    if(!quizStarted) {
      console.log('initializing scores');
      const newScores = {};
      for(let i = 0; i < userList.length; i++) {
        newScores[userList[i].username] = 0;
      }
      setScores(newScores);
    }
    // console.log('Scores now: ', newScores);
  }, [userList, quizStarted]);

  useEffect(() => {
    socket.on('mark answered', (userObj) => {
      const { userId } = userObj;
      if(!usersWhoHaveAnswered.includes(userId)) {
        setUsersWhoHaveAnswered([...usersWhoHaveAnswered, userId]);
      }
    });

    // Everytime we go to the next question we recieve the answers from all users and log the score
    socket.on('log answer', (answerObj) => {
      // console.log('recieved log: ', answerObj);
      const {userId, chosenAnswer, status} = answerObj;
      const foundUser = userList.find((user) => user.userID === userId);
      if(chosenAnswer.isCorrect) {
        const cpy = {...scores};
        cpy[foundUser.username] += 1;
        setScores(cpy);
      }
      // If status is false, the last answers are being logged
      if(!status) {
        setFinalAnswer(true);
      }
    });

    return () => {
      socket.off('mark answered');
      socket.off('log answer');
    };
  }, [socket, usersWhoHaveAnswered, userList, scores]);

  useEffect(() => {
    if(quizStarted) {
      setTimeout(() => setShow(true), 200);
    }
  }, [quizStarted]);

  // useEffect(() => {
  //   console.log('Usas: ', usersWhoHaveAnswered);
  // }, [usersWhoHaveAnswered]);

  useEffect(() => {
    // Check to see if we're on the last question
    if(currentQuestion === theQuiz.length-1) {
      setIsFinalQuestion(true);
    }
  }, [currentQuestion, theQuiz.length]);

  useEffect(() => {
    // console.log('Scores now: ', scores);
  }, [scores])

  // Start quiz for everyone
  const startQuiz = () => {
    setQuizStarted(true);
    fadeAnswers();
    const startObj = {msg: 'Quiz has started', status: true, room, question: theQuiz[currentQuestion], questionCount: theQuiz.length};
    socket.emit('start quiz', startObj);
  }
  
  // Send the next question to the users
  const nextQuestion = () => {
    // Check if we still have at least one question left
    if(currentQuestion < theQuiz.length -1) {
      fadeAnswers();
      const oldQuestion = currentQuestion;
      setCurrentQuestion(oldQuestion+1);
      const questionObj = {msg: 'Next question', status: true, room, question: theQuiz[oldQuestion+1], currentIndex: oldQuestion+1};
      socket.emit('next question', questionObj);
      setUsersWhoHaveAnswered([]);
    } else {  // We are on the last question
      const questionObj = {status: false, room};
      socket.emit('next question', questionObj); // Sending the next question event with status false, indicating the quiz has ended
    }
  };

  // Same function as in partakerView.js, reuse?
  const fadeAnswers = () => {
    setItemClass('quizAnswer'); // Hiding;
    setTimeout(() => setItemClass('quizAnswer showAnswer'), 300);
  };

  // Send score results to all clients
  const handleScoreboard = () => {
    socket.emit('show scores', {scores, theQuiz, room});
    setShowScores(true);
  };
  
  // Give the remove the collapsed class once quiz should be shown
  const answerClasses = show ? 'quizAnswers answerBorder' : 'quizAnswers answerBorder collapsed';
  return (
    <div className="pagePanels">
      {finalAnswer ? 
        <>
          <div className="leftSidebar">
            <div className="logo">
              InstaQuiz
            </div>
          </div>
          <div className="theQuiz">
            {showScores ? 
              <>
                <Scoreboard scores={scores} />
                <QuizSummary quiz={theQuiz} />
              </>
            : <button onClick={() => handleScoreboard()}>Show Results</button>}
            
          </div>
        </>
      : quizStarted ? 
      <>
        <div className="leftSidebar">
          <div className="logo">
            InstaQuiz
          </div>
          <div className="quizProgress">{currentQuestion+1}/{theQuiz.length}</div>
        </div>
        <div className="theQuiz">
          <div className="quizQuestion">{theQuiz[currentQuestion].question}</div>
          <div className={answerClasses}>
            {theQuiz[currentQuestion].answers.map((item) => <div key={item.id} className={itemClass}>{item.answer}</div>)}
          </div>
          <button className="quizButton" onClick={() => nextQuestion()}>{isFinalQuestion ? 'Finish' : 'Next Question'}</button>
        </div>
      </>
      :
      <>
        <div className="leftSidebar">
          <div className="logo">
            InstaQuiz
          </div>
          <div className="adminTitle">Share this link with anyone you want to invite</div>
          <div className="adminUrl">{url}</div>
        </div>
        <div className="theQuiz">
          <h3>When everyone has connected</h3>
          <button onClick={() => startQuiz()}>Start Quiz</button>
        </div>
      </> }
      <UserList users={userList} answeredUsers={usersWhoHaveAnswered} socket={socket}/>
    </div>
  )
}
