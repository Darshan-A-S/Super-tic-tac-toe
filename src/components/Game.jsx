import React from 'react'
import SuperBoard from './SuperBoard'
import { calculateWinner } from '../utils/gameLogic'

function Game({ 
  boards, 
  superBoard, 
  currentBoard, 
  xIsNext, 
  onMove, 
  onRestart 
}) {
  const winner = calculateWinner(superBoard)
  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${xIsNext ? 'X' : 'O'}`

  return (
    <div className="game">
      <div className="game-info">
        <h1>Super Tic-tac-toe</h1>
        <div className="status">{status}</div>
      </div>
      <SuperBoard
        boards={boards}
        superBoard={superBoard}
        currentBoard={currentBoard}
        onMove={onMove}
        currentPlayer={xIsNext ? 'X' : 'O'}
      />
      <div className="game-controls">
        <button className="restart-button" onClick={onRestart}>
          Restart Game
        </button>
        <button className="back-button" onClick={() => window.location.reload()}>
          Back to Menu
        </button>
      </div>
    </div>
  )
}

export default Game