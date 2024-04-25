import React from 'react';
import './App.css'; // Assuming your main CSS file is named App.css
import Board from './Board';
import Navbar from './Navbar';
import './style.css';
import Game from './Game';



function App() {
  return (
    <div className="App">
      <Game />
    </div>
  );
}

export default App;