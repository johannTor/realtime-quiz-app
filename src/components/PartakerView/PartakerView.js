import React, { useState, useEffect } from 'react';
import UserList from '../UserList/UserList';
import './partakerView.css'

export default function PartakerView({socket, userName, userList}) {
  const [hasStarted, setHasStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [currentAnswers, setCurrentAnswers] = useState([]);
  const [questionCount, setQuestionCount] = useState(0);
  const [currentPosition, setCurrentPosition] = useState(1)

  useEffect(() => {
    socket.on('quiz started', (quizObj) => {  // I'm recieving a message, somehow display a toast that quiz has started?
      console.log('Recieved quiz started');
      setHasStarted(quizObj.status);
      setCurrentQuestion(quizObj.question.question);
      setCurrentAnswers(quizObj.question.answers);
      setQuestionCount(quizObj.questionCount);
    });

    socket.on('get next question', (qObject) => { // Recieving the next question object
      console.log('Next Question: ', qObject);
      setCurrentQuestion(qObject.question.question);
      setCurrentAnswers(qObject.question.answers);
      setCurrentPosition(qObject.currentIndex + 1);
    });

    return () => {
      socket.off('quiz started');
      socket.off('get next question');
    }
  }, [socket]);

  return (
    <div>
      <h1>Logged in as {userName}</h1>
      {!hasStarted ?
        <div className="partakerPanels">
          <div className="leftSidebar"></div>
          <div className="theQuiz">
            <h3>Waiting for host to start</h3>
          </div>
          <UserList users={userList}/>
        </div>
        :
        <div className="partakerPanels">
          <div className="leftSidebar">
          </div>
          <div className="theQuiz">
            <div className="quizProgress">{currentPosition}/{questionCount}</div>
            <div className="quizQuestion">{currentQuestion}</div>
            <div className="quizAnswers">
              {currentAnswers.map((item) => <div key={item.id} className="quizAnswer">{item.answer}</div>)}
            </div>
          </div>
          <UserList users={userList}/>
        </div>
      }
    </div>
  )
}
