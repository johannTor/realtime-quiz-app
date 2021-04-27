import React, { useState, useEffect } from 'react';
import InputCard from '../InputCard/InputCard';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import './questionInputs.css';

export default function QuestionInputs() {
  // Initial questions state for real use
  // const [questions, setQuestions] = useState([{id: uuidv4(), question: 'Create Question', answers: [{id: 0, answer: '', isCorrect: false}]}]);
  const [questions, setQuestions] = useState([{id: uuidv4(), question: 'What is the capital of France?', answers: [{id: 0, answer: 'Paris', isCorrect: true}, {id: 1, answer: 'Berlin', isCorrect: false}, {id: 2, answer: 'Moscow', isCorrect: false}]},
                                              {id: uuidv4(), question: 'What is the capital of Russia?', answers: [{id: 0, answer: 'New York', isCorrect: false}, {id: 1, answer: 'Moscow', isCorrect: true}, {id: 2, answer: 'Reykjavik', isCorrect: false}]},
                                              {id: uuidv4(), question: 'What is the capital of Spain?', answers: [{id: 0, answer: 'Dallas', isCorrect: false}, {id: 1, answer: 'Carthage', isCorrect: false}, {id: 2, answer: 'Madrid', isCorrect: true}]}]);
                                              // {id: uuidv4(), question: 'What is the capital of Italy?', answers: [{id: 0, answer: 'Rome', isCorrect: true}, {id: 1, answer: 'Kopenhagen', isCorrect: true}, {id: 2, answer: 'Stockholm', isCorrect: false}]},
                                              // {id: uuidv4(), question: 'What is the capital of Russia?', answers: [{id: 0, answer: 'New York', isCorrect: false}, {id: 1, answer: 'Moscow', isCorrect: true}, {id: 2, answer: 'Reykjavik', isCorrect: false}]},
                                              // {id: uuidv4(), question: 'What is the capital of Spain?', answers: [{id: 0, answer: 'Dallas', isCorrect: false}, {id: 1, answer: 'Carthage', isCorrect: false}, {id: 2, answer: 'Madrid', isCorrect: true}]},
                                              // {id: uuidv4(), question: 'What is the capital of Italy?', answers: [{id: 0, answer: 'Rome', isCorrect: true}, {id: 1, answer: 'Kopenhagen', isCorrect: true}, {id: 2, answer: 'Stockholm', isCorrect: false}]}]);
  // const [questionList, setQuestionList] = useState([<InputCard />])
  const [validQuiz, setValidQuiz] = useState(false);

  useEffect(() => {
    const validateQuiz = (questions) => {
      if(questions.find((item) => item.question === '' || questions.find((item) => item.answers.find((answer) => answer.answer === '')))) {
        setValidQuiz(false);
        console.log('Quiz is invalid');
      } else {
        console.log('Quiz is valid');
        setValidQuiz(true);
      }
    };
    validateQuiz(questions);
  }, [questions])

  // Add a question object to the question list that the user can edit
  const addInput = () => {
    // const qList = [...questionList, <InputCard />];
    const qCpy = [...questions];
    const newQ = {id: uuidv4(), question: 'Create Question', answers: [{id: 0, answer: '', isCorrect: false}]};
    qCpy.push(newQ);
    // setQuestionList(qList);
    setQuestions(qCpy);
  };

  // Whenever the creator closes the edit modal, the question list is updated
  const updateQuestion = (newQues, id) => {
    const quesCpy = [...questions];
    const foundIndex = quesCpy.findIndex((item) => item.id === id);
    if(foundIndex !== -1) {
      quesCpy[foundIndex].question = newQues;
      setQuestions(quesCpy);
    }
  };

  // Whenever the creator closes the edit modal, the answers wlil be updated to the correct question
  const updateAnswers = (answers, id) => {
    const quesCpy = [...questions];
    const foundIndex = quesCpy.findIndex((item) => item.id === id);
    if(foundIndex !== -1) {
      quesCpy[foundIndex].answers = answers;
      setQuestions(quesCpy);
    }
  };

  // Check for at least one question with at least one answer
  // const validateQuiz = () => {
  //   if(questions.length >= 1) {
  //     // If we have at least once answer that is correct, we return true
  //     if(questions[0].answers.length >= 1 && questions[0].answers.find((item) => item.isCorrect === true)) {
  //       return true;
  //     }
  //   }
  //    return false;
  // };

  // const listElement = questionList.map((item, index) => <React.Fragment key={index}>{item}</React.Fragment>);

  return (
    <div className="pagePanels">
      <div className="leftSidebar">
        <div className="logo">
          InstaQuiz
        </div>
      </div>
      <div className="creatorContent">
        <div className="questionGreeting">
          <div>Do you want to create a quiz and allow your students/co-workers/friends/family to participate in real time? If so you're in the right place!</div>
          <div>Start by</div>
          <div>Creating your questions</div>
        </div>
        <div className="questionInputs">
          {/* {listElement} */}
          {questions.map((item, index) => <InputCard key={index} questionId={item.id} question={item.question} answers={item.answers} setQuestion={updateQuestion} setAnswers={updateAnswers} />)}
          <div className="addQuestion buttonBorder" onClick={() => addInput()}>
            +
          </div>
        </div>
        <div>
          <h3>{validQuiz ? 'Quiz is lookin good' : 'Be sure to leave no missing fields'}</h3>
        </div>
      </div>
      {/* ToDo: Create a route with either a random parameter or a chosen name for the quiz, connect the user there to socket io */}
      <div className="rightSideBar">
        {/* Check for valid quiz before sending user to quiz page */}
        <Link className="startQuizBtn" to={
          validQuiz ?
        {
          pathname: `/quiz/${uuidv4().replaceAll('-', '')}`,
          state: { quizCreator: true, theQuiz: questions }
        } : '#'}>Create Quiz</Link>
        {/* Nýtt route fyrir room */}
      </div>
    </div>
  )
}
