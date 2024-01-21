import { useState } from "react";
import GameBoard from "./component/GameBoard.jsx";
import Player from "./component/Player";
import Log from "./component/Log";
import { WINNING_COMBINATIONS } from "./winning-combination";
import GameOver from "./component/GameOver.jsx";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

function deriveActivePlayer(gameTurns){
  let currentPlayer = 'X';
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O'
  }
  return currentPlayer;
}


function App() {
  const [players,setPlayers] = useState({
    X: 'player 1',
    O: 'player 2',
  });

  const [gameTurns, setGameTurns] = useState([])
  const activePlayer = deriveActivePlayer(gameTurns)
  let winner;
  let gameBoard = [...initialGameBoard.map(array=> [...array  ])];

  for (const turn of gameTurns){
     const {square, player} = turn;
     const {row, col} = square;    
     gameBoard [row] [col] =player;    
  }

  for (const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard [combination[0].row] [combination[0].column]
    const secondSquareSymbol = gameBoard [combination[1].row] [combination[1].column]
    const thirdSquareSymbol = gameBoard [combination[2].row] [combination[2].column] 
  
  if(firstSquareSymbol &&
     firstSquareSymbol === secondSquareSymbol && 
     firstSquareSymbol === thirdSquareSymbol){
    winner = players[firstSquareSymbol];
  }
}

const hasDraw = gameTurns.length === 9 && !winner; 

  function handleSelectSquar(rowIndex, colIndex) {
    // setActivePlayer((curActivelayer) =>
    //   curActivelayer === 'X' ? 'O' : 'X')
    setGameTurns((preTurns) => {
      const currentPlayer =deriveActivePlayer(preTurns)
      const updatedTurn = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...preTurns,
      ]
      return updatedTurn;
    });
  }

  function handleRestart(){
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName){
    setPlayers(prevPlayers=>{
      return {
        ...prevPlayers,
        [symbol]: newName
      }
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName="Player 1"
           symbol="X" 
           isActive={activePlayer === 'X'}
           onChangeName={handlePlayerNameChange} />
          <Player initialName="Player 2"
           symbol="O" 
           isActive={activePlayer === 'O'}
           onChangeName={handlePlayerNameChange}
            />
        </ol>

        {(winner || hasDraw) &&
         <GameOver winner={winner} onRestart={handleRestart}/>}
        <GameBoard onSelectSquare={handleSelectSquar} board = {gameBoard  } />
      </div>
      <Log turns={gameBoard}/>
    </main>

  );
}

export default App;
