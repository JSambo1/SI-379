import React, { useState } from 'react';

const App = () => {
  const [presentList, setPresentList] = useState([]);
  const [absentList, setAbsentList] = useState([]);
  const [newName, setNewName] = useState('');

  const handleAddName = () => {
    if (newName.trim() !== '') {
      setPresentList([...presentList, newName]);
      setNewName('');
    }
  };

  const handleRemoveName = (name, listType) => {
    if (listType === 'present') {
      const updatedPresentList = presentList.filter(item => item !== name);
      setPresentList(updatedPresentList);
    } else {
      const updatedAbsentList = absentList.filter(item => item !== name);
      setAbsentList(updatedAbsentList);
    }
  };

  const handleMoveToAbsent = (name) => {
    setPresentList(presentList.filter(item => item !== name));
    setAbsentList([...absentList, name]);
  };

  const handleMoveToPresent = (name) => {
    setAbsentList(absentList.filter(item => item !== name));
    setPresentList([...presentList, name]);
  };

  return (
    <div>
      <h2>Attendance App</h2>
      <div>
        <h3>Present</h3>
        <ul>
          {presentList.map((name, index) => (
            <li key={index}>
              {name}
              <button onClick={() => handleRemoveName(name, 'present')}>Remove</button>
              <button onClick={() => handleMoveToAbsent(name)}>Mark Absent</button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Absent</h3>
        <ul>
          {absentList.map((name, index) => (
            <li key={index}>
              {name}
              <button onClick={() => handleRemoveName(name, 'absent')}>Remove</button>
              <button onClick={() => handleMoveToPresent(name)}>Mark Present</button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Enter a new name"
        />
        <button onClick={handleAddName}>Add Name</button>
      </div>
    </div>
  );
};

export default App;