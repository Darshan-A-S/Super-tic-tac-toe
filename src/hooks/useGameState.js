import { useState, useCallback } from 'react'
import { calculateWinner, getNextBoard } from '../utils/gameLogic'

export function useGameState() {
  const [boards, setBoards] = useState(Array(9).fill(null).map(() => Array(9).fill(null)))
  const [superBoard, setSuperBoard] = useState(Array(9).fill(null))
  const [currentBoard, setCurrentBoard] = useState(null)
  const [xIsNext, setXIsNext] = useState(true)
  const [showWinner, setShowWinner] = useState(false)

  const handleMove = useCallback((boardIndex, squareIndex) => {
    if (calculateWinner(superBoard)) return // Prevent moves after game is won

    setBoards(prevBoards => {
      // Create new board state
      const newBoards = [...prevBoards]
      const currentPlayer = xIsNext ? 'X' : 'O'
      
      // Update the specific square
      newBoards[boardIndex] = [...prevBoards[boardIndex]]
      newBoards[boardIndex][squareIndex] = currentPlayer

      // Check if this move won the small board
      const boardWinner = calculateWinner(newBoards[boardIndex])
      if (boardWinner) {
        const newSuperBoard = [...superBoard]
        newSuperBoard[boardIndex] = boardWinner
        setSuperBoard(newSuperBoard)

        // Check if this won the entire game
        const superWinner = calculateWinner(newSuperBoard)
        if (superWinner) {
          setShowWinner(true)
        }
      }

      return newBoards
    })

    // Set the next board and switch players
    setCurrentBoard(getNextBoard(squareIndex, boards))
    setXIsNext(prev => !prev)
  }, [boards, superBoard, xIsNext])

  const handleRestart = useCallback(() => {
    setBoards(Array(9).fill(null).map(() => Array(9).fill(null)))
    setSuperBoard(Array(9).fill(null))
    setCurrentBoard(null)
    setXIsNext(true)
    setShowWinner(false)
  }, [])

  const gameStatus = calculateWinner(superBoard)
    ? `Winner: ${calculateWinner(superBoard)}`
    : `Next player: ${xIsNext ? 'X' : 'O'}`

  return {
    boards,
    superBoard,
    currentBoard,
    xIsNext,
    showWinner,
    gameStatus,
    winner: calculateWinner(superBoard),
    handleMove,
    handleRestart
  }
}