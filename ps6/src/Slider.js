import React from 'react';

const Slider = ({ color, value, onChange }) => {
  return (
    <div className="slider-container">
      <label htmlFor={color}>{color.toUpperCase()}</label>
      <input 
        type="range" 
        min="0" 
        max="255" 
        value={value} 
        onChange={(e) => onChange(color, parseInt(e.target.value))} 
        id={color} 
      />
      <span>{value}</span>
    </div>
  );
};

export default Slider;