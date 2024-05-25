const db = require("../database/models");
const Task = db.task;
const Op = db.Sequelize.Op;

/**
 * Retrieves all tasks from the database.
 * @returns {Promise<Object>} A promise that resolves to an object containing all tasks.
 * @throws {Error} If an error occurs while retrieving tasks.
 */
exports.get = async (req, res) => {
  try {
    const allTasks = await Task.findAll({});

    return res.status(200).json({
      message: "All Tasks retrieved successfully",
      data: allTasks,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Retrieves tasks from the database based on status.
 * @param {Object} req - The request object containing the status query parameter.
 * @param {Object} res - The response object to send the retrieved tasks.
 * @returns {Promise<Object>} A promise that resolves to an object containing tasks with the specified status.
 * @throws {Error} If an error occurs while retrieving tasks.
 */
exports.getByStatus = async (req, res) => {
  try {
    const status = req.query.status; // Get the status query parameter

    // Find tasks that match the specified status
    const filteredTasks = await Task.findAll({
      where: { status: status }
    });

    return res.status(200).json({
      message: `Tasks with status "${status}" retrieved successfully`,
      data: filteredTasks,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Creates a new task in the database.
 * @param {Object} req - The request object containing task data in the request body.
 * @param {Object} res - The response object to send the result of task creation.
 * @returns {Promise<Object>} A promise that resolves to an object indicating the result of task creation.
 * @throws {Error} If an error occurs while creating the task.
 */
exports.create = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    // Server-side validation
    if (!title || !status || !['To Do', 'In Progress', 'Done'].includes(status)) {
      return res.status(400).json({ message: "Invalid task data" });
    }

    const newTask = await Task.create({
      title,
      description: description,
      status: status,
    });

    const response = {
      taskId: newTask?.id,
    };

    return res
      .status(201)
      .json({ message: "Task created successfully", task: response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Deletes a task from the database.
 * @param {Object} req - The request object containing the task ID in the request parameters.
 * @param {Object} res - The response object to send the result of task deletion.
 * @returns {Promise<Object>} A promise that resolves to an object indicating the result of task deletion.
 * @throws {Error} If an error occurs while deleting the task.
 */
exports.delete = async (req, res) => {
  try {
    const taskId = req.params.id;
    const taskToDelete = await Task.findByPk(taskId);

    if (!taskToDelete) {
      return res.status(404).json({ message: "Task not found" });
    }

    await taskToDelete.destroy();

    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Updates a task in the database.
 * @param {Object} req - The request object containing the task ID in the request parameters and updated task data in the request body.
 * @param {Object} res - The response object to send the result of task update.
 * @returns {Promise<Object>} A promise that resolves to an object indicating the result of task update.
 * @throws {Error} If an error occurs while updating the task.
 */
exports.update = async (req, res) => {
  try {
    const taskId = req.params.id;
    const updatedTaskData = req.body;

    // Find the task by ID
    const taskToUpdate = await Task.findByPk(taskId);

    // Check if the task exists
    if (!taskToUpdate) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Update the task with the new data
    await taskToUpdate.update(updatedTaskData);

    return res.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
