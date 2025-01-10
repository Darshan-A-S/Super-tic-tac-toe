import Square from './Square'

function Board({ board, onClick, isActive, winner }) {
  const renderSquare = (index) => (
    <Square
      key={index}
      value={board[index]}
      onClick={() => onClick(index)}
      disabled={!isActive || winner || board[index]}
    />
  )

  return (
    <div className={`board ${isActive ? 'active' : ''} ${winner ? `winner-${winner}` : ''}`}>
      {winner ? (
        <div className="board-winner">{winner}</div>
      ) : (
        <>
          <div className="board-row">
            {[0, 1, 2].map(i => renderSquare(i))}
          </div>
          <div className="board-row">
            {[3, 4, 5].map(i => renderSquare(i))}
          </div>
          <div className="board-row">
            {[6, 7, 8].map(i => renderSquare(i))}
          </div>
        </>
      )}
    </div>
  )
}

export default Board