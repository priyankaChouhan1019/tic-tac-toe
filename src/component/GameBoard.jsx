import React from 'react'
import { useState } from 'react';
//it is just constant allowed us to outsource and store value

function GameBoard({onSelectSquare, board}) {

  return (
        <ol id="game-board">
            {board.map((row, rowIndex)=>(
            <li key={rowIndex}>
                <ol>
                    {row.map((playerSymbol, colIndex)=> (<li key={colIndex}>
                        <button onClick={() => onSelectSquare(rowIndex, colIndex)}
                        disabled={playerSymbol != null}>
                            {playerSymbol}</button>
                    </li>))}
                </ol>
            </li>))}
        </ol>
  )
}

export default GameBoard