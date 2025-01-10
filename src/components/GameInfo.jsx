import { memo } from 'react'

const GameInfo = memo(function GameInfo({ winner, xIsNext }) {
  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${xIsNext ? 'X' : 'O'}`

  return (
    <div className="game-info">
      <h1>Super Tic-tac-toe</h1>
      <div className="status">{status}</div>
    </div>
  )
})