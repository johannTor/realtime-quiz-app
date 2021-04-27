import React from 'react';
import './partakerAnswer.css';

export default function PartakerAnswer({classes, answer, chosenAnswer, chooseAnswer}) {
  let newClasses = classes;
  if(chosenAnswer && chosenAnswer.id === answer.id) {
    newClasses += ' selectedAnswer';
  }

  return (
    <div className={newClasses} onClick={() => chooseAnswer(answer)}>
      {answer.answer}
    </div>
  )
}
