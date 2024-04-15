import React, { useState, useEffect } from 'react';
import Task from './Task.js';
import Timer from './Timer.js';
import completionIcon from './icon.png'; // Import the completion icon
import './style.css';

function TaskList({ startTimer }) {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [taskDescription, setTaskDescription] = useState('');
  const [workDuration, setWorkDuration] = useState(() => {
    const savedWorkDuration = localStorage.getItem('workDuration');
    return savedWorkDuration ? parseInt(savedWorkDuration) : 25;
  });
  const [breakDuration, setBreakDuration] = useState(() => {
    const savedBreakDuration = localStorage.getItem('breakDuration');
    return savedBreakDuration ? parseInt(savedBreakDuration) : 5;
  });
  const [timerData, setTimerData] = useState({
    activeTaskIndex: null,
    activeWorkSession: false,
    timerRunning: false,
  });
  const [completionCounts, setCompletionCounts] = useState(() => {
    const savedCounts = localStorage.getItem('completionCounts');
    return savedCounts ? JSON.parse(savedCounts) : {};
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('workDuration', workDuration);
    localStorage.setItem('breakDuration', breakDuration);
    localStorage.setItem('completionCounts', JSON.stringify(completionCounts));
  }, [tasks, workDuration, breakDuration, completionCounts]);

  const handleAddTask = () => {
    if (taskDescription.trim() !== '') {
      const newTask = taskDescription;
      setTasks([...tasks, newTask]);
      setTaskDescription('');
      setCompletionCounts({ ...completionCounts, [newTask]: 0 });
    }
  };

  const handleRemoveTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    if (index === timerData.activeTaskIndex) {
      setTimerData({ ...timerData, activeTaskIndex: null, timerRunning: false });
    }
  };

  const handleEditTask = (newDescription, index) => {
    const updatedTasks = tasks.map((task, i) => (i === index ? newDescription : task));
    setTasks(updatedTasks);
  };

  const handleStartWork = (index) => {
    setTimerData({ ...timerData, activeTaskIndex: index, activeWorkSession: true, timerRunning: true });
  };

  const handleResetTimer = () => {
    setTimerData({ ...timerData, activeTaskIndex: null, activeWorkSession: false, timerRunning: false });
  };

  const handleEndWorkSession = () => {
    const task = tasks[timerData.activeTaskIndex];
    setCompletionCounts({ ...completionCounts, [task]: completionCounts[task] + 1 });
    startTimer(breakDuration * 60);
    setTimerData({ ...timerData, activeWorkSession: false, timerRunning: true });
  };

  return (
    <div>
      <div className='work-duration'>
        <label htmlFor="workDuration">Work Duration (minutes): </label>
        <input
          type="number"
          id="workDuration"
          value={workDuration}
          onChange={(e) => setWorkDuration(parseInt(e.target.value))}
          min={1}
          step={1}
        />
      </div>
      <div className='break-duration'>
        <label htmlFor="breakDuration">Break Duration (minutes): </label>
        <input
          type="number"
          id="breakDuration"
          value={breakDuration}
          onChange={(e) => setBreakDuration(parseInt(e.target.value))}
          min={1}
          step={1}
        />
      </div>
      <div className='task-description'>
        <input
          type="text"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          placeholder="Enter task description"
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      <div>
        {tasks.map((task, index) => (
          <div key={index}>
            <Task
              task={task}
              onEdit={(newDescription) => handleEditTask(newDescription, index)}
              onDelete={() => handleRemoveTask(index)}
              onStart={() => handleStartWork(index)}
              completedSessions={completionCounts[task] || 0} // Default to 0 if not found
            />
            {timerData.activeTaskIndex === index && (
              <Timer
                duration={timerData.activeWorkSession ? workDuration * 60 : breakDuration * 60}
                isRunning={timerData.timerRunning}
                onStart={() => setTimerData({ ...timerData, timerRunning: true })}
                onReset={handleResetTimer}
                onEndWorkSession={handleEndWorkSession}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskList;