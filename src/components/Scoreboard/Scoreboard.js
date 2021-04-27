import React from 'react';
import './scoreboard.css';

export default function Scoreboard({scores}) {
  console.log('Scores', scores);
  const scoreArray = Object.entries(scores);
  console.log('arr: ', scoreArray);
  // TODO: sort by score
  return (
    // Todo: If array is empty or something, display a temporary loading thing
    <div className="leaderBoard">
      {!scores || scores.length <= 0 ? 'Awaiting scores' : scoreArray.map((item, index) => <div key={index}>{item[0]} - {item[1]}</div>)}     
    </div>
  )
}
