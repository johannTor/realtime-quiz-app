import React from 'react';
import './quizSummary.css';

export default function QuizSummar({quiz}) {
  console.log('Q: ', quiz);
  return (
    <div className="summaryContainer">
      <h2>Correct answers:</h2>
      {/* Map out each question that was taken in the quiz, along with the correct answer retrieved by using .find method */}
      {!quiz || quiz.length <= 0 ? 'Awaiting answers' : quiz.map((item) => <div key={item.id} className="summaryItem"><div className="summaryQuestion">{item.question}</div><div className="summaryAnswer">{item.answers.find((item) => item.isCorrect === true).answer}</div></div>)}
    </div>
  )
}
