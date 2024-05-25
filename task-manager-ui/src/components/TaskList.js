import React, { useState } from 'react';
import './TaskList.css'; // Import CSS file for styling

const TaskList = ({ tasks, onUpdateTask, onDeleteTask }) => {
  // State to manage selected task ID, editable fields, and editing mode
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [editableFields, setEditableFields] = useState({});
  const [editing, setEditing] = useState(false);

  // Function to update a task
  const handleUpdateTask = (task) => {
    onUpdateTask(task);
    setSelectedTaskId(null);
    setEditableFields({}); // Clear editable fields after update
    setEditing(false); // Turn off editing mode
  };

  // Function to delete a task
  const handleDeleteTask = (taskId) => {
    onDeleteTask(taskId);
    setSelectedTaskId(null); // Clear the selected task after deletion
    setEditing(false); // Turn off editing mode
  };

  // Function to select a task for editing
  const handleSelectTask = (taskId) => {
    setSelectedTaskId(taskId); // Set the selected task ID
    setEditing(true); // Turn on editing mode
    setEditableFields({}); // Clear editable fields when selecting a new task
  };

  // Function to handle editing fields
  const handleEditField = (fieldName, value) => {
    setEditableFields({ ...editableFields, [fieldName]: value });
  };

  return (
    <div className="task-list-container">
      <h2 className="task-list-header">Tasks</h2>
      <ul className="task-list">
        {/* Map through tasks to render each task item */}
        {tasks.map((task) => (
          <li key={task.id} className={`task-item ${selectedTaskId === task.id ? 'selected' : ''}`}>
            <div className="task-info">
              {/* Render title, description, and status */}
              <strong className="task-title">{editing && selectedTaskId === task.id ? (
                // Render editable title input field if in editing mode
                <input
                  className="task-title-editable"
                  type="text"
                  value={editableFields.title || task.title}
                  onChange={(e) => handleEditField('title', e.target.value)}
                />
              ) : task.title}</strong>
              <p className="task-description">{editing && selectedTaskId === task.id ? (
                // Render editable description textarea if in editing mode
                <textarea
                  className="task-description-editable"
                  value={editableFields.description || task.description}
                  onChange={(e) => handleEditField('description', e.target.value)}
                />
              ) : task.description}</p>
              <span className={`task-status ${editing && selectedTaskId === task.id ? 'editable' : ''}`}>
                {editing && selectedTaskId === task.id ? (
                  // Render editable status dropdown if in editing mode
                  <select
                    className="task-status-editable"
                    value={editableFields.status || task.status}
                    onChange={(e) => handleEditField('status', e.target.value)}
                  >
                    <option value="todo">Todo</option>
                    <option value="inprogress">In Progress</option>
                    <option value="done">Done</option>
                  </select>
                ) : task.status ? task.status : 'No Status'}
              </span>
            </div>
            <div className="task-actions">
              {/* Show edit button only if not in editing mode */}
              {!editing && (
                <button className="edit-button" onClick={() => handleSelectTask(task.id)}>Edit</button>
              )}
              {/* Show save and delete buttons only if in editing mode */}
              {editing && selectedTaskId === task.id && (
                <>
                  {/* Save button */}
                  <button className="update-button" onClick={() => handleUpdateTask({ ...task, ...editableFields })}>Save</button>
                  {/* Delete button */}
                  <button className="delete-button" onClick={() => handleDeleteTask(task.id)}>Delete</button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
