import React, {  } from 'react'
import Header from './Header';
import QuestionInputs from './QuestionInputs';

export default function CreateQuiz() {
  return (
    <div className="app">
      <Header />
      <div className="creator">
        <p className="frontpageText">Do you want to create a quiz and allow your students/co-workers/friends/family to participate in real time? If so you're in the right place!</p>
        <p className="frontpageText">Start by:</p>
        <h2>Creating your questions:</h2>
        <QuestionInputs />
      </div>
    </div>
  )
}
