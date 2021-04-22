import React, { useState, useEffect } from 'react';
import UserList from '../UserList/UserList';
import './partakerView.css'

export default function PartakerView({socket, userName, userList}) {
  const [hasStarted, setHasStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [currentAnswers, setCurrentAnswers] = useState([]);

  useEffect(() => {
    socket.on('quiz started', (status) => {
      setHasStarted(status);
    });

    socket.on('question', (question) => {

    });

    return () => {
      socket.off('quiz started');
      socket.off('question');
    }
  }, []);

  return (
    <div>
      <h1>Logged in as {userName}</h1>
      {!hasStarted ? <h3>Waiting for host to start</h3> :
        <div className="partakerPanels">
          <div className="leftSidebar">
            leftasefioasjeofijasoeifasoef
          </div>
          <div className="theQuiz">
            <div className="quizProgress">1/10</div>
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
