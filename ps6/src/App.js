import React, { useState, useEffect } from 'react';
import ColorPicker from './ColorPicker';
import './style.css';

const App = () => {
  const generateRandomColor = () => {
    return {
      red: Math.floor(Math.random() * 256),
      green: Math.floor(Math.random() * 256),
      blue: Math.floor(Math.random() * 256)
    };
  };

  const [targetColor, setTargetColor] = useState(generateRandomColor());
  const [guessColor, setGuessColor] = useState({ red: 0, green: 0, blue: 0 });

  const handleGuess = () => {
    if (
      guessColor.red === targetColor.red &&
      guessColor.green === targetColor.green &&
      guessColor.blue === targetColor.blue
    ) {
      alert('Congratulations! You guessed the color correctly!');
    } else {
      alert('Sorry, your guess is incorrect. Try again!');
    }
    
    // Automatically move to the next game when the alert box is closed
    window.addEventListener('click', nextGameHandler);
  };
  
  const nextGameHandler = () => {
    setTargetColor(generateRandomColor());
    setGuessColor({ red: 0, green: 0, blue: 0 });
    
    // Remove the event listener to avoid multiple event handling
    window.removeEventListener('click', nextGameHandler);
  };

  useEffect(() => {
    setTargetColor(generateRandomColor());
  }, []);

  const checkGuess = () => {
    console.log(guessColor); // Log the guess color
    // Add logic to check if the guess matches the targetColor
  };

  const handleNewGame = () => {
    setTargetColor(generateRandomColor()); // Generate a new random color for the next game
    setGuessColor({ red: 0, green: 0, blue: 0 }); // Reset guess color
  };

  const handleColorChange = (color, value) => {
    setGuessColor({ ...guessColor, [color]: value });
  };

  return (
    <div className="app-container">
      <h1>Color Guesser Game</h1>
      <div className="color-boxes">
        <div className="color-box" style={{ backgroundColor: `rgb(${targetColor.red}, ${targetColor.green}, ${targetColor.blue})` }}></div>
        <div className="color-box" style={{ backgroundColor: `rgb(${guessColor.red}, ${guessColor.green}, ${guessColor.blue})` }}></div>
      </div>
      <ColorPicker color={guessColor} onChange={handleColorChange} />
      <button onClick={handleGuess}>Guess</button>
      <button onClick={handleNewGame}>Next</button>
    </div>
  );
};


export default App;