import { calculateWinner } from './gameLogic'
import Square from '../components/Square'

export function isBoardPlayable(index, currentBoard, superBoard, boards) {
  if (superBoard[index] || calculateWinner(boards[index])) {
    return false
  }
  return currentBoard === null || currentBoard === index
}

export function createInitialBoards() {
  return Array(9).fill(null).map(() => Array(9).fill(null))
}

export function createInitialSuperBoard() {
  return Array(9).fill(null)
}