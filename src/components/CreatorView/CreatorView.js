import React, { useState, useEffect } from 'react';
import UserList from '../UserList/UserList';
import './creatorView.css';

export default function CreatorView({theQuiz, userList, socket, room}) {
  const [quizStarted, setQuizStarted] = useState(false);
  const [itemClass, setItemClass] = useState('quizAnswer');
  const [show, setShow] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const url = window.location.href;

  useEffect(() => {
    // setTimeout(() => setHladid(true), 1000);
  }, []);

  useEffect(() => {
    if(quizStarted) {
      setTimeout(() => setShow(true), 200);
    }
  }, [quizStarted]);

  const startQuiz = () => {
    setQuizStarted(true);
    fadeAnswers();
    const startObj = {msg: 'Quiz has started', status: true, room, question: theQuiz[currentQuestion], questionCount: theQuiz.length};
    socket.emit('start quiz', startObj);
  }
  // Len = 2 
  const nextQuestion = () => {
    // Check if we still have at least one question left
    if(currentQuestion < theQuiz.length -1) {
      fadeAnswers();
      const oldQuestion = currentQuestion;
      setCurrentQuestion(oldQuestion+1);
      const questionObj = {msg: 'Next question', status: true, room, question: theQuiz[oldQuestion+1], currentIndex: oldQuestion+1};
      socket.emit('next question', questionObj);
    } else {  // We are on the last question
      // ToDo: Finish Quiz Screen/event
      console.log('Final Ques');
    }
  };

  // Same function as in partakerView.js, reuse?
  const fadeAnswers = () => {
    setItemClass('quizAnswer'); // Hiding;
    setTimeout(() => setItemClass('quizAnswer showAnswer'), 300);
  };
  
  console.log('Loaded: ', show);
  const answerClasses = show ? 'quizAnswers answerBorder' : 'quizAnswers answerBorder collapsed';
  return (
    <div className="creatorPanels">
      {quizStarted ? 
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
          <button className="quizButton" onClick={() => nextQuestion()}>Next Question</button>
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
      <UserList users={userList}/>
    </div>
  )
}
