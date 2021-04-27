import React from 'react';
import './scoreboard.css';

export default function Scoreboard({scores}) {
  console.log('Scores', scores);
  const scoreArray = Object.entries(scores);
  // Sort using a custom comparison function where it's sorted by the user's score (which is in the [1] position)
  scoreArray.sort((a, b) => b[1] - a[1]);
  console.log('arr: ', scoreArray);
  const creatorFiltered = scoreArray.filter((item) => item[0] !== 'creator');
  // TODO: sort by score
  return (
    // Todo: If array is empty or something, display a temporary loading thing
    <div className="leaderBoard">
      <h2>Scores</h2>
      {!creatorFiltered || creatorFiltered.length <= 0 ? 'Awaiting scores' : creatorFiltered.map((item, index) => <div key={index}>{item[0]} - {item[1]}</div>)}     
    </div>
  )
}
