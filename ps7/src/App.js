// App.js
import React from 'react';
import './App.css';
import TaskList from './TaskList.js';
import Timer from './Timer.js';
import './style.css';

function App() {
  // Define startTimer function
  function startTimer(duration) {
    // Implement timer logic here
  }

  return (
    <div>
      <h1 className="center">What's on Tap Today?</h1>
      <TaskList startTimer={startTimer} /> {/* Pass startTimer to TaskList component */}
      <Timer /> {/* Render Timer component */}
    </div>
  );
}

export default App;