import React, { useState, useEffect } from 'react';
import UserList from '../UserList/UserList';
import PartakerAnswerList from '../PartakerAnswerList/PartakerAnswerList';
import Scoreboard from '../Scoreboard/Scoreboard';
import QuizSummary from '../QuizSummary/QuizSummary';
import './partakerView.css'

export default function PartakerView({socket, userName, userList, room}) {
  const [hasStarted, setHasStarted] = useState(false);
  // const [show, setShow] = useState(false);
  const [answerClasses, setAnswerClasses] = useState('quizAnswers answerBorder collapsed');
  const [itemClass, setItemClass] = useState('quizAnswer');
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [currentAnswers, setCurrentAnswers] = useState([]);
  const [chosenAnswer, setChosenAnswer] = useState(undefined);
  const [questionCount, setQuestionCount] = useState(0);
  const [currentPosition, setCurrentPosition] = useState(1);
  const [isFinished, setIsFinished] = useState(false);
  const [scores, setScores] = useState({});
  const [quiz, setQuiz] = useState([]);
  // console.log('ParSoc: ', socket);

  useEffect(() => {
    // Host has started the quiz
    socket.on('quiz started', (quizObj) => {  // I'm recieving a message property, somehow display a toast that quiz has started?
      // console.log('Recieved quiz started');
      setHasStarted(quizObj.status);
      fadeAnswers();
      setCurrentQuestion(quizObj.question);
      setCurrentAnswers(quizObj.question.answers);
      setQuestionCount(quizObj.questionCount);
    });

    // Recieving new question from the host
    socket.on('get next question', (qObject) => { // Recieving the next question object
      // Check if the chosen answer is correct, if it is increment user's score serverside
      const processChosenAnswer = (status) => {
        socket.emit('process answer', {userId: socket.id, room, question: currentQuestion, chosenAnswer: !chosenAnswer ? {answer: 'bla', isCorrect: false} : chosenAnswer, status});
      };

      // If the recieved status is true, quiz is still going on
      if(qObject.status) {
        // console.log('continuing');
        processChosenAnswer(true); // Process the chosen answer for scoreboard history
        fadeAnswers();
        setCurrentQuestion(qObject.question);
        setCurrentAnswers(qObject.question.answers);
        setCurrentPosition(qObject.currentIndex + 1);
        setChosenAnswer(undefined);
      } else {
        // console.log('finishing');
        processChosenAnswer(false);
        setIsFinished(true);
      }
    });

    // Recieving quiz scores from host once all answers have been recieved
    socket.on('get scores', (scoreObj) => {
      // console.log('Recieved scores ', scoreObj);
      setIsFinished(true);
      setScores(scoreObj.scores);
      setQuiz(scoreObj.theQuiz);
    });

    return () => {
      socket.off('quiz started');
      socket.off('get next question');
      socket.off('get scores');
    }
  }, [socket, chosenAnswer, currentQuestion, room]);

  useEffect(() => {
    if(hasStarted) {
      setTimeout(() => setAnswerClasses('quizAnswers answerBorder'), 200);
    }
  }, [hasStarted]);

  // Every time currentAnswer changes
  // useEffect(() => {
  //   // Create a new answer list from currentAnswers with PartakerAnswer components
  //   if(currentAnswers.length > 0) {
  //     const newList = currentAnswers.map((item) => <PartakerAnswer classes={itemClass} answer={item} />);
  //     setAnswerList(newList);
  //   }
  // }, [currentAnswers, itemClass]);

  // Quikly hide and review the answer items
  const fadeAnswers = () => {
    setItemClass('quizAnswer'); // Hiding;
    setTimeout(() => setItemClass('quizAnswer showAnswer'), 300);
  };

  const updateAnswer = (answer) => {
    // console.log('Answer: ', currentAnswers[id]);
    setChosenAnswer(answer);
    socket.emit('user answered', {userId: socket.id, room});
  };

  return (
    <>
      {isFinished ? 
      <div className="pagePanels">
        <div className="leftSidebar">
          <div className="logo">
            InstaQuiz
          </div>
        </div>
        <div className="theQuiz">
          <Scoreboard scores={scores} />
          <QuizSummary quiz={quiz} />
        </div>
        <div className="userList">
        </div>
      </div>
      : !hasStarted ?
        <div className="pagePanels">
          <div className="leftSidebar">
            <div className="logo">
              InstaQuiz
            </div>
          </div>
          <div className="theQuiz">
            <h3>Waiting for host to start</h3>
          </div>
          <UserList users={userList} answeredUsers={undefined} socket={socket}/>
        </div>
        :
        <div className="pagePanels">
          <div className="leftSidebar">
            <div className="logo">
              InstaQuiz
            </div>
            <div className="quizProgress">{currentPosition}/{questionCount}</div>
          </div>
          <div className="theQuiz">
            <div className="quizQuestion">{currentQuestion.question}</div>
            <div className={answerClasses}>
              {/* {currentAnswers.map((item) => <div key={item.id} className={itemClass}>{item.answer}</div>)} */}
              {/* {answerList.map((item, index) => <React.Fragment key={index}>{item}</React.Fragment>)} */}
              {/* ToDo: Create answer list parent component that keeps track of chosenAnswer state */}
              <PartakerAnswerList classes={itemClass} answers={currentAnswers} chosenAnswer={chosenAnswer} chooseAnswer={updateAnswer} />
            </div>
          </div>
          <UserList users={userList} answeredUsers={undefined} socket={socket}/>
        </div>
      }
    </>
  )
}
