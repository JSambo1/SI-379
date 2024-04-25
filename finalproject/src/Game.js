import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Board from './Board';
import anime from 'animejs'; // Import anime.js
import { generateMinefield, countAdjacentMines } from './utils'; // Import utility functions
import './style.css'; // Import custom CSS styles
import explosionSound from './media/audio/explosion.mp3'; // Import explosion sound
import flagSound from './media/audio/flag.mp3'; // Import flag sound

const Game = () => {
  const [difficulty, setDifficulty] = useState('medium');
  const [bombsCounter, setBombsCounter] = useState(0);
  const [flagsCounter, setFlagsCounter] = useState(0);

  const difficulties = {
    easy: {
      rows: 10,
      cols: 10,
      numMines: 10,
    },
    medium: {
      rows: 16,
      cols: 16,
      numMines: 40,
    },
    hard: {
      rows: 16,
      cols: 30,
      numMines: 99,
    },
  };

  const { rows, cols, numMines } = difficulties[difficulty];

  const [minefield, setMinefield] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [explosion, setExplosion] = useState(null); // State to control the explosion animation

  // Audio references
  const explosionAudio = new Audio(explosionSound);
  const flagAudio = new Audio(flagSound);



  useEffect(() => {
    initializeMinefield();
  }, [difficulty]); // Re-initialize minefield when difficulty changes

      
  useEffect(() => {
    setExplosion(null); // Reset explosion when component mounts
  }, []);

  useEffect(() => {
    // Update bombs and flags counters whenever minefield changes
    updateCounters();
  }, [minefield]);


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
      revealAllBombs(newMinefield); // Reveals all bombs
      setMinefield(newMinefield);
      setGameOver(true);
      // Trigger explosion animation and sound
      setExplosion({ row, col });
      explosionAudio.play();
      setTimeout(handleReset, 2000); // Wait 1 second before triggering animation
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
      animateChain(row, col);
    }
  };

  const animateChain = (startRow, startCol) => {
    const queue = [{ row: startRow, col: startCol }];
    const visited = Array(rows).fill().map(() => Array(cols).fill(false));
    visited[startRow][startCol] = true;

    while (queue.length > 0) {
      const { row, col } = queue.shift();
      const square = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
      
      anime({
        targets: square,
        scale: [0, 1],
        opacity: [0, 1],
        duration: 500,
        easing: 'easeInOutQuad',
        delay: anime.stagger(100),
      });
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
    flagAudio.play(); // Play flag sound
  };

  const animateExplosion = () => {
    if (!explosion) return;
    

    const { row, col } = explosion;
    const explosionOverlay = document.querySelector('.explosion-overlay');
    explosionOverlay.style.display = 'inherit';
    console.log(explosionOverlay);
    anime({
      targets: explosionOverlay,
      scale: [1, 2],
      opacity: [0, 1],
      duration: 1000,
      easing: 'easeInOutQuad',
      complete: () => {
        //alert('GAME OVER'); // Display "GAME OVER" message
        setExplosion(null); // Reset explosion state after animation
        anime({
          targets: explosionOverlay,
          scale: [2, 1],
          opacity: [1, 0],
          duration: 1000,
          easing: 'easeInOutQuad',
        });
      }
    });
  };

  useEffect(() => {
    animateExplosion();
  }, [explosion]); // Trigger explosion animation when explosion state changes

  const revealAllBombs = (minefield) => {
    minefield.forEach((row, rowIndex) => {
      row.forEach((square, colIndex) => {
        if (square.value === 'mine') {
          square.revealed = true;
          // Change background color of tile with bomb to red
          const bombTile = document.querySelector(`[data-row="${rowIndex}"][data-col="${colIndex}"]`);
          if (bombTile) {
            bombTile.style.backgroundColor = 'red';
          }
        }
      });
    });
  };

  const updateCounters = () => {
    let bombs = 0;
    let flags = 0;
    minefield.forEach(row => {
      row.forEach(square => {
        if (square.value === 'mine') {
          bombs++;
        }
        if (square.flagged) {
          flags++;
        }
      });
    });
    setBombsCounter(bombs);
    setFlagsCounter(flags);
  };

  return (
    <div className="game">
      <Navbar onReset={handleReset} setDifficulty={setDifficulty} />
      <div className="counters">
        <div>Bombs: {bombsCounter}</div>
        <div>Flags: {flagsCounter}</div>
      </div>
      <h1 className="text-center">Minesweeper</h1>
      <p className="text-center">Use left-click to reveal squares. Right-click or press "F" to place flags.</p>
      <div className="explosion-overlay"></div> {/* Add explosion overlay */}
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