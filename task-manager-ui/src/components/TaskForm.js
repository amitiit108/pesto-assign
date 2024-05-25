import React, { useState } from 'react';
import './TaskForm.css'; // Import CSS file for styling

const TaskForm = ({ onCreateTask }) => {
  // State variables for title, description, and status
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('To Do'); // Set a default value for status

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Call onCreateTask prop with task object
    onCreateTask({ title, description, status });
    // Reset form fields after submission
    setTitle('');
    setDescription('');
    setStatus('To Do'); // Reset status to default after creating the task
  };

  // Render a form with input fields for title, description, and status dropdown
  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
      <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        {/* Dropdown options for task status */}
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>
      {/* Button to submit the form */}
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
