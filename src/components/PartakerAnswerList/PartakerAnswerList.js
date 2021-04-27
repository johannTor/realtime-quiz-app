import React from 'react';
import PartakerAnswer from '../PartakerAnswer/PartakerAnswer';

export default function PartakerAnswerList({classes, answers, chosenAnswer, chooseAnswer}) {
  return (
    <>
      {answers.map((item, index) => <React.Fragment key={index}><PartakerAnswer classes={classes} answer={item} chosenAnswer={chosenAnswer} chooseAnswer={chooseAnswer} /></React.Fragment>)}
    </>
  )
}
