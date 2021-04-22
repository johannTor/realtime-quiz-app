import React, { useState, useEffect } from 'react';
import UserList from '../UserList/UserList';
import './creatorView.css';

export default function CreatorView({theQuiz, userList, socket, room}) {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const url = window.location.href;

  useEffect(() => {
    
  }, []);

  const startQuiz = () => {
    setQuizStarted(true);
    const startObj = {msg: 'Quiz has started', status: true, room, question: theQuiz[currentQuestion], questionCount: theQuiz.length};
    socket.emit('start quiz', startObj);
  }
  // Len = 2 
  const nextQuestion = () => {
    // Check if we still have at least one question left
    if(currentQuestion < theQuiz.length -1) {
      const oldQuestion = currentQuestion;
      setCurrentQuestion(oldQuestion+1);
      const questionObj = {msg: 'Next question', status: true, room, question: theQuiz[oldQuestion+1], currentIndex: oldQuestion+1};
      socket.emit('next question', questionObj);
    } else {  // We are on the last question
      // ToDo: Finish Quiz Screen/event
      console.log('Final Ques');
    }
  };

  return (
    <div className="creatorContainer">
      <h2 className="adminTitle">Share this link with anyone you want to invite</h2>
      <h3 className="adminUrl">{url}</h3>
      <div className="creatorPanels">
        <div className="leftSidebar">
        </div>
        {quizStarted ? 
        <div className="theQuiz">
          <div className="quizProgress">{currentQuestion+1}/{theQuiz.length}</div>
          <div className="quizQuestion">{theQuiz[currentQuestion].question}</div>
          <div className="quizAnswers">
            {theQuiz[currentQuestion].answers.map((item) => <div key={item.id} className="quizAnswer">{item.answer}</div>)}
          </div>
          <button className="quizButton" onClick={() => nextQuestion()}>Next Question</button>
        </div>
        :
        <div className="theQuiz">
          <h3>When everyone has connected</h3>
          <button onClick={() => startQuiz()}>Start Quiz</button>
        </div>}
        <UserList users={userList}/>
      </div>
    </div>
  )
}
