import React, { useState } from 'react';
import InputCard from './InputCard';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';

export default function QuestionInputs() {
  // Initial questions state for real use
  // const [questions, setQuestions] = useState([{id: uuidv4(), question: 'Create Question', answers: [{id: 0, answer: '', isCorrect: false}]}]);
  const [questions, setQuestions] = useState([{id: uuidv4(), question: 'What is the capital of France?', answers: [{id: 0, answer: 'Paris', isCorrect: true}, {id: 1, answer: 'Berlin', isCorrect: false}, {id: 2, answer: 'Moscow', isCorrect: false}]},
                                              {id: uuidv4(), question: 'What is the capital of Russia?', answers: [{id: 0, answer: 'New York', isCorrect: false}, {id: 1, answer: 'Moscow', isCorrect: true}, {id: 2, answer: 'Madrid', isCorrect: false}]}]);
  // const [questionList, setQuestionList] = useState([<InputCard />])

  const addInput = () => {
    // const qList = [...questionList, <InputCard />];
    const qCpy = [...questions];
    const newQ = {id: uuidv4(), question: 'Create Question', answers: [{id: 0, answer: '', isCorrect: false}]};
    qCpy.push(newQ);
    // setQuestionList(qList);
    setQuestions(qCpy);
  };

  const updateQuestion = (newQues, id) => {
    const quesCpy = [...questions];
    const foundIndex = quesCpy.findIndex((item) => item.id === id);
    if(foundIndex !== -1) {
      quesCpy[foundIndex].question = newQues;
      setQuestions(quesCpy);
    }
  };

  const updateAnswers = (answers, id) => {
    const quesCpy = [...questions];
    const foundIndex = quesCpy.findIndex((item) => item.id === id);
    if(foundIndex !== -1) {
      quesCpy[foundIndex].answers = answers;
      setQuestions(quesCpy);
    }
  };

  // const listElement = questionList.map((item, index) => <React.Fragment key={index}>{item}</React.Fragment>);

  return (
    <>
      <div className="questionInputs">
        {/* {listElement} */}
        {questions.map((item, index) => <InputCard key={index} questionId={item.id} question={item.question} answers={item.answers} setQuestion={updateQuestion} setAnswers={updateAnswers} />)}
        <div className="addQuestion" onClick={() => addInput()}>
          +
        </div>
      </div>
      {/* ToDo: Create a route with either a random parameter or a chosen name for the quiz, connect the user there to socket io */}
      <Link className="startQuizBtn" to={{
        pathname: `/quiz/${uuidv4().replaceAll('-', '')}`,
        state: { quizCreator: true, theQuiz: questions }
      }}>Start Quiz</Link>
      {/* Nýtt route fyrir room */}
    </>
  )
}
