import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Board from './Board';
import anime from 'animejs'; // Import anime.js
import { generateMinefield, countAdjacentMines } from './utils'; // Import utility functions
import './style.css'; // Import custom CSS styles

const Game = () => {
  const rows = 10; // Number of rows in the minefield
  const cols = 10; // Number of columns in the minefield
  const numMines = 10; // Number of mines

  const [minefield, setMinefield] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [explosion, setExplosion] = useState(null); // State to control the explosion animation

  useEffect(() => {
    initializeMinefield();
  }, []); // Run once on component mount

  const initializeMinefield = () => {
    const newMinefield = generateMinefield(rows, cols, numMines);
    setMinefield(newMinefield);
    setGameOver(false);
  };

  const handleReset = () => {
    initializeMinefield();
    setExplosion(null); // Reset explosion animation
  };

  const handleSquareClick = (row, col) => {
    if (gameOver || minefield[row][col].revealed || minefield[row][col].flagged) return;

    const newMinefield = [...minefield];
    if (newMinefield[row][col].value === 'mine') {
      // Set game over
      newMinefield[row][col].revealed = true;
      setMinefield(newMinefield);
      setGameOver(true);
      // Trigger explosion animation
      setExplosion({ row, col });
    } else if (newMinefield[row][col].value === 0) {
      // Reveal all adjacent empty squares
      const visited = Array(rows).fill().map(() => Array(cols).fill(false));
      newMinefield[row][col].revealed = true;
      visited[row][col] = true;
      const updatedMinefield = revealEmptySquares(row, col, visited);
      setMinefield(updatedMinefield);
    } else {
      // Reveal the square
      newMinefield[row][col].revealed = true;
      setMinefield(newMinefield);
    }
  };

  const revealEmptySquares = (row, col, visited) => {
    const newMinefield = [...minefield];
    const queue = [{ row, col }];
    while (queue.length > 0) {
      const { row, col } = queue.shift();
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          const newRow = row + i;
          const newCol = col + j;
          if (
            newRow >= 0 &&
            newRow < rows &&
            newCol >= 0 &&
            newCol < cols &&
            !visited[newRow][newCol] &&
            newMinefield[newRow][newCol].value === 0
          ) {
            newMinefield[newRow][newCol].revealed = true;
            visited[newRow][newCol] = true;
            queue.push({ row: newRow, col: newCol });
          }
        }
      }
    }
    return newMinefield;
  };

  const handleRightClick = (e, row, col) => {
    e.preventDefault(); // Prevent context menu from appearing

    if (gameOver) return;

    const newMinefield = [...minefield];
    newMinefield[row][col].flagged = !newMinefield[row][col].flagged;

    let allMinesFlagged = true;
    newMinefield.forEach(row => {
      row.forEach(square => {
        if (square.value === 'mine' && !square.flagged) {
          allMinesFlagged = false;
        }
      });
    });

    if (allMinesFlagged) {
      setGameOver(true);
    }

    setMinefield(newMinefield);
  };

  const animateExplosion = () => {
    if (!explosion) return;

    const { row, col } = explosion;
    const square = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);

    anime({
      targets: square,
      scale: [1, 2],
      opacity: [1, 0],
      duration: 1000,
      easing: 'easeInOutQuad',
      complete: () => {
        alert('GAME OVER'); // Display "GAME OVER" message
        setExplosion(null); // Reset explosion state after animation
      }
    });
  };

  useEffect(() => {
    animateExplosion();
  }, [explosion]); // Trigger explosion animation when explosion state changes

  return (
    <div className="game">
      <Navbar onReset={handleReset} />
      <h1 className="text-center">Minesweeper</h1>
      <p className="text-center">Use left-click to reveal squares. Right-click or press "F" to place flags.</p>
      <Board
        squares={minefield}
        onClick={handleSquareClick}
        onRightClick={handleRightClick}
      />
      {/* Display game status, reset button, etc. */}
    </div>
  );
};

export default Game;