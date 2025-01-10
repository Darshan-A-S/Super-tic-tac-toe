import React from 'react'

function GameModeSelection({ onSelectMode }) {
  return (
    <div className="mode-selection">
      <h1>Super Tic-tac-toe</h1>
      <div className="mode-buttons">
        <button 
          className="mode-button"
          onClick={() => onSelectMode('human')}
        >
          Human vs Human
        </button>
        <button 
          className="mode-button"
          onClick={() => onSelectMode('ai')}
        >
          Human vs AI
        </button>
      </div>
    </div>
  )
}

export default GameModeSelection