import React, { useState } from 'react';
import './answerItem.css';

export default function AnswerItem({id, currAnswer, currCorrect, num, changeAnswer, changeCorrect}) {
  const [answer, setAnswer] = useState(currAnswer);
  const [isCorrect, setIsCorrect] = useState(currCorrect);

  const updateAnswer = (value) => {
    setAnswer(value);
    changeAnswer(id, value);
  };

  const updateCorrectness = (value) => {
    setIsCorrect(value);
    changeCorrect(id, value);
  }

  return (
    <div className="answerItem">
      <input type="text" value={answer} onChange={(ev) => updateAnswer(ev.target.value)} placeholder={`Answer ${num+1}`} />
      <h4>Correct:</h4>
      <input type="checkbox" checked={isCorrect} onChange={() => updateCorrectness(!isCorrect)}/>
    </div>
  )
}
