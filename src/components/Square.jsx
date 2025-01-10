function Square({ value, onClick, disabled }) {
  return (
    <button 
      className={`square ${value || ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      <span className="square-content">{value}</span>
    </button>
  )
}

export default Square