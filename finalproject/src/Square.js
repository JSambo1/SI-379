import React from 'react';

const Square = ({ value, revealed, flagged, onClick, onRightClick }) => {
  return (
    <button
      className={`btn ${revealed ? "btn-secondary" : "btn-outline-secondary"} square ${flagged ? "flagged" : ""}`}
      onClick={onClick}
      onContextMenu={onRightClick}
    >
      {revealed ? (value === 'mine' ? '💣' : value) : null}
    </button>
  );
};

export default Square;