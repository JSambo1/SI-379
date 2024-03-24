import React from 'react';
import Slider from './Slider';

const ColorPicker = ({ color, onChange }) => {
  return (
    <div className="color-picker-container">
      <Slider color="red" value={color.red} onChange={onChange} />
      <Slider color="green" value={color.green} onChange={onChange} />
      <Slider color="blue" value={color.blue} onChange={onChange} />
    </div>
  );
};

export default ColorPicker;