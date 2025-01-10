import { memo, useEffect, useState } from 'react'
import Confetti from 'react-confetti'
import { useWindowSize } from '../hooks/useWindowSize'

const WinnerModal = memo(function WinnerModal({ winner, onClose }) {
  const { width, height } = useWindowSize()

  if (!winner) return null

  return (
    <div className="modal-overlay">
      <Confetti
        width={width}
        height={height}
        recycle={false}
        numberOfPieces={500}
      />
      <div className="modal-content">
        <h2>🎉 Congratulations! 🎉</h2>
        <p>Player {winner} wins!</p>
        <button className="close-button" onClick={onClose}>
          Play Again
        </button>
      </div>
    </div>
  )
})

export default WinnerModal