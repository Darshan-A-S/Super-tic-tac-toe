import { useState, useEffect } from 'react'
import Game from './components/Game'
import GameModeSelection from './components/GameModeSelection'
import { calculateWinner, getNextBoard } from './utils/gameLogic'
import { getBestMove } from './utils/aiLogic'
import './App.css'

function App() {
  const [gameMode, setGameMode] = useState(null)
  const [boards, setBoards] = useState(Array(9).fill(null).map(() => Array(9).fill(null)))
  const [superBoard, setSuperBoard] = useState(Array(9).fill(null))
  const [currentBoard, setCurrentBoard] = useState(null)
  const [xIsNext, setXIsNext] = useState(true)

  const handleModeSelect = (mode) => {
    setGameMode(mode)
  }

  const handleMove = (boardIndex, squareIndex) => {
    const newBoards = boards.map((board, idx) => 
      idx === boardIndex ? board.map((square, i) => 
        i === squareIndex ? (xIsNext ? 'X' : 'O') : square
      ) : board
    )

    const boardWinner = calculateWinner(newBoards[boardIndex])
    if (boardWinner) {
      const newSuperBoard = [...superBoard]
      newSuperBoard[boardIndex] = boardWinner
      setSuperBoard(newSuperBoard)
    }

    setBoards(newBoards)
    setCurrentBoard(getNextBoard(squareIndex, newBoards))
    setXIsNext(!xIsNext)
  }

  // AI move effect
  useEffect(() => {
    if (gameMode === 'ai' && !xIsNext && !calculateWinner(superBoard)) {
      // Add a small delay to make AI moves feel more natural
      const timeoutId = setTimeout(() => {
        const { boardIndex, squareIndex } = getBestMove(boards, superBoard, currentBoard, 'O')
        handleMove(boardIndex, squareIndex)
      }, 500)

      return () => clearTimeout(timeoutId)
    }
  }, [gameMode, xIsNext, boards, superBoard, currentBoard])

  const handleRestart = () => {
    setBoards(Array(9).fill(null).map(() => Array(9).fill(null)))
    setSuperBoard(Array(9).fill(null))
    setCurrentBoard(null)
    setXIsNext(true)
  }

  if (!gameMode) {
    return <GameModeSelection onSelectMode={handleModeSelect} />
  }

  return (
    <Game
      boards={boards}
      superBoard={superBoard}
      currentBoard={currentBoard}
      xIsNext={xIsNext}
      onMove={handleMove}
      onRestart={handleRestart}
      gameMode={gameMode}
    />
  )
}

export default App