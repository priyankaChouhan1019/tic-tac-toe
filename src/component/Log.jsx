import React from 'react'

function Log(turns) {
    {console.log("turn",turns)}
  return (
    <ol id='log'>
        {Array.isArray(turns) && turns.map((turn) => (
        <li key={`${turn.square.row}${turn.square.col}`}> 
        {turn.player} selected {turn.square.row}, {turn.square.col}</li>))}

    </ol>
  );
}

export default Log

