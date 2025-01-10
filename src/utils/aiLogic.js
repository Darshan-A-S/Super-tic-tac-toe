// AI scoring constants
const SCORES = {
  WIN: 100,
  BLOCK_WIN: 50,
  CENTER: 20,
  CORNER: 10,
  DEFAULT: 1
};

// Check if a position is a corner
const isCorner = (index) => [0, 2, 6, 8].includes(index);

// Evaluate board state for the given player
function evaluateBoard(board, player) {
  const opponent = player === 'X' ? 'O' : 'X';
  let score = 0;

  // Check for wins or potential wins
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  for (const line of lines) {
    const [a, b, c] = line;
    const cells = [board[a], board[b], board[c]];
    const playerCount = cells.filter(cell => cell === player).length;
    const emptyCount = cells.filter(cell => cell === null).length;
    const opponentCount = cells.filter(cell => cell === opponent).length;

    // Check for immediate win
    if (playerCount === 2 && emptyCount === 1) {
      score += SCORES.WIN;
    }
    // Check for blocking opponent's win
    if (opponentCount === 2 && emptyCount === 1) {
      score += SCORES.BLOCK_WIN;
    }
  }

  return score;
}

// Get the best move for the AI
export function getBestMove(boards, superBoard, currentBoard, player) {
  let bestScore = -Infinity;
  let bestMove = { boardIndex: 0, squareIndex: 0 };

  // Determine valid boards to play in
  const validBoards = currentBoard === null 
    ? Array(9).fill(0).map((_, i) => i)
    : [currentBoard];

  for (const boardIndex of validBoards) {
    if (superBoard[boardIndex]) continue;

    for (let squareIndex = 0; squareIndex < 9; squareIndex++) {
      if (boards[boardIndex][squareIndex]) continue;

      // Calculate move score
      let score = evaluateBoard(boards[boardIndex], player);

      // Add position-based scores
      if (squareIndex === 4) score += SCORES.CENTER;
      if (isCorner(squareIndex)) score += SCORES.CORNER;

      // Consider global board implications
      const nextBoard = boards.map(board => [...board]);
      nextBoard[boardIndex][squareIndex] = player;
      score += evaluateBoard(superBoard, player) * 2;

      if (score > bestScore) {
        bestScore = score;
        bestMove = { boardIndex, squareIndex };
      }
    }
  }

  return bestMove;
}