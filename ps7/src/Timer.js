import React, { useState, useEffect, useRef } from 'react';
import './style.css';

function Timer({ duration, isRunning, onStart, onReset, onEndWorkSession }) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const intervalRef = useRef();

  useEffect(() => {
    setTimeLeft(duration);
    if (isRunning) {
      startCountdown();
    } else {
      clearInterval(intervalRef.current);
    }
  }, [duration, isRunning]);

  const startCountdown = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setTimeLeft((previousTimeLeft) => {
        if (previousTimeLeft <= 0) {
          clearInterval(intervalRef.current);
          onEndWorkSession(); // Call the onEndWorkSession callback when the timer reaches 0
          return 0;
        } else {
          return previousTimeLeft - 1;
        }
      });
    }, 1000);
  };

  return (
    <div className={`timer ${isRunning ? 'timer-running' : ''}`}>
      {isRunning && (
        <div>
          {`${Math.floor(timeLeft / 60)}:${(timeLeft % 60).toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false,
          })} remaining`}
          <button onClick={onReset}>Reset</button>
        </div>
      )}
    </div>
  );
}

export default Timer;