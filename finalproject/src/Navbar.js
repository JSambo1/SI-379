import React from 'react';

const Navbar = ({ onReset }) => {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container">
        <span className="navbar-brand mb-0 h1">Minesweeper</span>
        <button className="btn btn-danger" onClick={onReset}>Reset</button>
      </div>
    </nav>
  );
};

export default Navbar;