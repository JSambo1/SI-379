import React from 'react';
import Square from './Square';

const Board = ({ squares, onClick, onRightClick }) => {
  return (
    <div className="container">
      <div className="row justify-content-center">
        {squares.map((row, rowIndex) => (
          <div key={rowIndex} className="board-row">
            {row.map((square, colIndex) => (
              <Square
                key={colIndex}
                value={square.value}
                revealed={square.revealed}
                flagged={square.flagged}
                onClick={() => onClick(rowIndex, colIndex)}
                onRightClick={(e) => onRightClick(e, rowIndex, colIndex)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;