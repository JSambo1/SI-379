import React from 'react';

const Navbar = ({ onReset, setDifficulty }) => {
  const handleDifficultyChange = (difficulty) => {
    setDifficulty(difficulty);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <span className="navbar-brand">Minesweeper</span>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <button className="btn btn-light" onClick={onReset}>Reset</button>
            </li>
          </ul>
          <div className="dropdown">
            <button className="btn btn-light dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Difficulty
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a className="dropdown-item" href="#" onClick={() => handleDifficultyChange('easy')}>Easy</a>
              <a className="dropdown-item" href="#" onClick={() => handleDifficultyChange('medium')}>Medium</a>
              <a className="dropdown-item" href="#" onClick={() => handleDifficultyChange('hard')}>Hard</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;