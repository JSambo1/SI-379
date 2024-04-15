// Task.js
import React, { useState } from 'react';
import './style.css'; // Import the CSS file
import completionIcon from './icon.png'; // Import the completion icon

function Task({ task, onStart, onEdit, onDelete, completedSessions }) {
  const [editedTask, setEditedTask] = useState(task);

  const handleChange = (e) => {
    setEditedTask(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onEdit(editedTask);
    }
  };

  return (
    <div className="task">
      <input type="text" value={editedTask} onChange={handleChange} onKeyPress={handleKeyPress} />
      <button onClick={onStart}>Start</button>
      <button onClick={onDelete}>Delete</button>
      {/* Render completion icons based on the count of completed sessions */}
      {Array.from({ length: completedSessions }).map((_, index) => (
        <img
          key={index}
          src={completionIcon}
          alt="completion icon"
          style={{ width: '40px', height: '40px', marginLeft: '5px' }} // Adjust spacing as needed
        />
      ))}
    </div>
  );
}

export default Task;