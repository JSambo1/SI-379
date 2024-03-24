import React, { useState, useEffect } from 'react';
import './style.css';
import ColorPicker from './ColorPicker';

const DimensionGuesser = () => {
  const [targetColor, setTargetColor] = useState({ red: 0, green: 0, blue: 0 });
  const [guessColor, setGuessColor] = useState({ red: 0, green: 0, blue: 0 });

  useEffect(() => {
    generateRandomColor();
  }, []);

  const generateRandomColor = () => {
    const randomColor = {
      red: Math.floor(Math.random() * 256),
      green: Math.floor(Math.random() * 256),
      blue: Math.floor(Math.random() * 256)
    };
    setTargetColor(randomColor);
  };

  const handleGuess = (guess) => {
    if (guess.red === targetColor.red && guess.green === targetColor.green && guess.blue === targetColor.blue) {
      alert('Congratulations! You guessed the color correctly!');
    } else {
      alert('Sorry, your guess is incorrect. Try again!');
    }
  };

  const handleNewColor = () => {
    generateRandomColor();
  };

  return (
    <div className="dimension-guesser-container">
      <div className="color-preview" style={{ backgroundColor: `rgb(${targetColor.red}, ${targetColor.green}, ${targetColor.blue})` }}></div>
      <ColorPicker targetColor={targetColor} onGuess={handleGuess} onNewColor={handleNewColor} />
    </div>
  );
};

export default DimensionGuesser;