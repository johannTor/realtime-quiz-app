import React, { useState } from 'react';
import InputModal from '../InputModal/InputModal';
import './inputCard.css';

// Answer object should have:
/*
  {
    id: num,
    answer: string,
    isCorrect: bool
  }
*/

export default function InputCard({questionId, question, answers, setQuestion, setAnswers}) {
  // const [question, setQuestion] = useState('Write Question');
  // const [theQuestion, setQuestion] = useState(question);
  // const [answers, setAnswers] = useState([{id: 0, answer: 'Paris', isCorrect: false}, {id: 1, answer: 'Berlin', isCorrect: true}]);
  // const [answers, setAnswers] = useState([{id: 0, answer: '', isCorrect: false}]);
  // const [theAnswers, setAnswers] = useState(answers);
  const [openModal, setOpenModal] = useState(false);

  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <>
      <div className="inputCard buttonBorder" onClick={() => toggleModal()}>
        <h3>{question}</h3>
      </div>
      {openModal && <InputModal setOpen={setOpenModal} questionId={questionId} question={question} answers={answers} setQuestion={setQuestion} setAnswers={setAnswers}/>}
    </>
  )
}
