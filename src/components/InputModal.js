import React, { useState } from 'react';
import AnswerItem from './AnswerItem';
// import { v4 as uuidv4 } from 'uuid';

// ToDo: Import react modal?
// ToDo: Improve update answers fields?
/* 
So far this is how it works: Each InputCard has an answer array, it gets passed to InputModal where a copy state is created
That copystate is modified each time an answer is edited in the AnswerItem component
Once the Modal is closed the original answer array is updated with new answers from the copy array
*/
// ToDo: Add a new AnswerItem component to the modal when the button is clicked
// Right now each answer has the id of the index of the answer, and im using that id also as an index in changeAnswer/Correct...

export default function InputModal({setOpen, questionId, question, answers, setQuestion, setAnswers}) {
  const [newQuestion, setNewQuestion] = useState(question);
  const [newAnswers, setNewAnswers] = useState(answers);

  const changeQuestion = (value) => {
    setNewQuestion(value);
  };

  const addAnswerItem = () => {
    const ansCpy = [...newAnswers];
    const newAns = {id: (ansCpy[ansCpy.length-1].id) + 1, answer: '', isCorrect: false}; // Answer gets the id of the previous answer +1 (change to uuid soon)
    ansCpy.push(newAns);
    setNewAnswers(ansCpy);
  };

  const closeModal = () => {
    setOpen(false);
    setQuestion(newQuestion, questionId);
    setAnswers(newAnswers, questionId);
  };

  const changeAnswer = (id, value) => {
    const newCpy = [...newAnswers];
    newCpy[id].answer = value;
    setNewAnswers(newCpy);
  };

  const changeCorrect = (id, value) => {
    const newCpy = [...newAnswers];
    newCpy[id].isCorrect = value;
    setNewAnswers(newCpy);
  };
  
  return (
    <div className="modalContainer">
      <div className="inputModal">
        <div className="modalFields">
          <h2>Question:</h2>
          <input type="text" placeholder={question} value={newQuestion !== 'Create Question' ? newQuestion : ''} onChange={(ev) => changeQuestion(ev.target.value)}/>
          <h3>Answers:</h3>
          {/* {answerList} */}
          {newAnswers.map((item, index) => <AnswerItem key={index} id={item.id} currAnswer={item.answer} currCorrect={item.isCorrect} num={index} changeAnswer={changeAnswer} changeCorrect={changeCorrect} />)}
          
          <div className="addAnswer" onClick={() => addAnswerItem()}>
            +
          </div>
        </div>
        <button type="button" onClick={() => closeModal()}>Done</button>
      </div>
    </div>
  )
}
