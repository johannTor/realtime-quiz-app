import React, { useState, useEffect } from 'react';
import UserList from '../UserList/UserList';
import './partakerView.css'

export default function PartakerView({socket, userName, userList}) {
  const [hasStarted, setHasStarted] = useState(false);
  // const [show, setShow] = useState(false);
  const [answerClasses, setAnswerClasses] = useState('quizAnswers answerBorder collapsed');
  const [itemClass, setItemClass] = useState('quizAnswer');
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [currentAnswers, setCurrentAnswers] = useState([]);
  const [questionCount, setQuestionCount] = useState(0);
  const [currentPosition, setCurrentPosition] = useState(1);

  useEffect(() => {
    socket.on('quiz started', (quizObj) => {  // I'm recieving a message property, somehow display a toast that quiz has started?
      console.log('Recieved quiz started');
      setHasStarted(quizObj.status);
      fadeAnswers();
      setCurrentQuestion(quizObj.question.question);
      setCurrentAnswers(quizObj.question.answers);
      setQuestionCount(quizObj.questionCount);
    });

    socket.on('get next question', (qObject) => { // Recieving the next question object
      console.log('Next Question: ', qObject);
      fadeAnswers();
      setCurrentQuestion(qObject.question.question);
      setCurrentAnswers(qObject.question.answers);
      setCurrentPosition(qObject.currentIndex + 1);
    });

    return () => {
      socket.off('quiz started');
      socket.off('get next question');
    }
  }, [socket]);

  useEffect(() => {
    if(hasStarted) {
      setTimeout(() => setAnswerClasses('quizAnswers answerBorder'), 200);
    }
  }, [hasStarted]);

  // Quikly hide and review the answer items
  const fadeAnswers = () => {
    setItemClass('quizAnswer'); // Hiding;
    setTimeout(() => setItemClass('quizAnswer showAnswer'), 300);
  };

  return (
    <>
      {!hasStarted ?
        <div className="partakerPanels">
          <div className="leftSidebar">
            <div className="logo">
              InstaQuiz
            </div>
          </div>
          <div className="theQuiz">
            <h3>Waiting for host to start</h3>
          </div>
          <UserList users={userList}/>
        </div>
        :
        <div className="partakerPanels">
          <div className="leftSidebar">
            <div className="logo">
              InstaQuiz
            </div>
            <div className="quizProgress">{currentPosition}/{questionCount}</div>
          </div>
          <div className="theQuiz">
            <div className="quizQuestion">{currentQuestion}</div>
            <div className={answerClasses}>
              {currentAnswers.map((item) => <div key={item.id} className={itemClass}>{item.answer}</div>)}
            </div>
          </div>
          <UserList users={userList}/>
        </div>
      }
    </>
  )
}
