// App.js

import React, { useEffect, useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import FilterTasks from './components/FilterTasks';
import { fetchTasks, createTask, updateTask, deleteTask } from './services/TaskService';
import './App.css'; // Import CSS file for styling

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filterStatus, setFilterStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const fetchedTasks = await fetchTasks();
      setTasks(fetchedTasks);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch tasks. Please try again later.');
      setLoading(false);
    }
  };

  const handleCreateTask = async (newTask) => {
    try {
      const createdTask = await createTask(newTask);
      setTasks([...tasks, createdTask]);
      await loadTasks();
    } catch (error) {
      setError('Failed to create task. Please try again.');
    }
  };

  const handleUpdateTask = async (updatedTask) => {
    try {
      await updateTask(updatedTask);
      const updatedTasks = tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task));
      setTasks(updatedTasks);
    } catch (error) {
      setError('Failed to update task. Please try again.');
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      const updatedTasks = tasks.filter((task) => task.id !== taskId);
      setTasks(updatedTasks);
    } catch (error) {
      setError('Failed to delete task. Please try again.');
    }
  };

  const filteredTasks = filterStatus ? tasks.filter((task) => task.status === filterStatus) : tasks;
  const uniqueStatuses = [...new Set(tasks.map((task) => task.status))];

  return (
    <div className="app-container">
      <h1 className="app-title">Task Manager</h1>
      <div className="app-content">
        <TaskForm onCreateTask={handleCreateTask} />
        <FilterTasks statuses={uniqueStatuses} onSelectStatus={setFilterStatus} />
        {loading ? (
          <p className="loading-message">Loading tasks...</p>
        ) : tasks.length === 0 ? (
          <p className="empty-message">No tasks available.</p>
        ) : error ? (
          <p className="error-message">Error: {error}</p>
        ) : (
          <TaskList tasks={filteredTasks} onUpdateTask={handleUpdateTask} onDeleteTask={handleDeleteTask} />
        )}
      </div>
    </div>
  );
};

export default App;

