import Board from './Board'
import { calculateWinner } from '../utils/gameLogic'

function SuperBoard({ boards, superBoard, currentBoard, onMove, currentPlayer }) {
  const handleClick = (boardIndex, squareIndex) => {
    if (currentBoard !== null && currentBoard !== boardIndex) {
      return
    }
    onMove(boardIndex, squareIndex)
  }

  const isBoardPlayable = (index) => {
    if (superBoard[index] || calculateWinner(boards[index])) {
      return false
    }
    return currentBoard === null || currentBoard === index
  }

  return (
    <div className="super-board">
      <div className="super-board-row">
        {[0, 1, 2].map(i => (
          <Board
            key={i}
            board={boards[i]}
            onClick={(squareIndex) => handleClick(i, squareIndex)}
            isActive={isBoardPlayable(i)}
            winner={superBoard[i]}
          />
        ))}
      </div>
      <div className="super-board-row">
        {[3, 4, 5].map(i => (
          <Board
            key={i}
            board={boards[i]}
            onClick={(squareIndex) => handleClick(i, squareIndex)}
            isActive={isBoardPlayable(i)}
            winner={superBoard[i]}
          />
        ))}
      </div>
      <div className="super-board-row">
        {[6, 7, 8].map(i => (
          <Board
            key={i}
            board={boards[i]}
            onClick={(squareIndex) => handleClick(i, squareIndex)}
            isActive={isBoardPlayable(i)}
            winner={superBoard[i]}
          />
        ))}
      </div>
    </div>
  )
}

export default SuperBoard