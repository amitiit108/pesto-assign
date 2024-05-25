// Import dotenv to load environment variables
// import dotenv from "dotenv";
// dotenv.config();

// Read the base URL from the environment variable
const BASE_URL = process.env.REACT_APP_BASE_URL;
/**
 * Fetches all tasks from the backend server
 * @returns {Promise<Array>} A promise that resolves to an array of tasks
 * @throws {Error} If the request fails
 */
export const fetchTasks = async () => {
  const response = await fetch(BASE_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }
  const data = await response.json();
  return data.data;
};

/**
 * Creates a new task on the backend server
 * @param {Object} newTask The new task to be created
 * @returns {Promise<Object>} A promise that resolves to the created task
 */
export const createTask = async (newTask) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTask),
  });
  const data = await response.json();
  return data;
};

/**
 * Updates an existing task on the backend server
 * @param {Object} updatedTask The updated task object
 * @returns {Promise<boolean>} A promise that resolves to a boolean indicating whether the update was successful
 */
export const updateTask = async (updatedTask) => {
  const response = await fetch(`${BASE_URL}/${updatedTask.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedTask),
  });
  return response.ok;
};

/**
 * Deletes a task from the backend server
 * @param {string} taskId The ID of the task to be deleted
 * @returns {Promise<boolean>} A promise that resolves to a boolean indicating whether the deletion was successful
 */
export const deleteTask = async (taskId) => {
  const response = await fetch(`${BASE_URL}/${taskId}`, {
    method: "DELETE",
  });
  return response.ok;
};
