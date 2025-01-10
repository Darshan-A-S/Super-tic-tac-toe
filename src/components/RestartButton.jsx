import { memo } from 'react'

const RestartButton = memo(function RestartButton({ onClick }) {
  return (
    <button className="restart-button" onClick={onClick}>
      Restart Game
    </button>
  )
})