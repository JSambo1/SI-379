export function generateMinefield(rows, cols, numMines) {
    const minefield = Array(rows)
      .fill()
      .map(() =>
        Array(cols).fill().map(() => ({ value: 0, revealed: false, flagged: false }))
      );
  
    let minesPlaced = 0;
    while (minesPlaced < numMines) {
      const row = Math.floor(Math.random() * rows);
      const col = Math.floor(Math.random() * cols);
      if (minefield[row][col].value !== 'mine') {
        minefield[row][col].value = 'mine';
        minesPlaced++;
      }
    }
  
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (minefield[row][col].value !== 'mine') {
          const count = countAdjacentMines(row, col, minefield);
          minefield[row][col].value = count;
        }
      }
    }
  
    return minefield;
  }
  
  export function countAdjacentMines(row, col, minefield) {
    const rows = minefield.length;
    const cols = minefield[0].length;
    let count = 0;
  
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        const newRow = row + i;
        const newCol = col + j;
        if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols && minefield[newRow][newCol].value === 'mine') {
          count++;
        }
      }
    }
  
    return count;
  }