const express = require("express");
const router = express.Router();

module.exports = (tasks) => {
  const task = require("../controller/tasksController");

  // Create a router instance
  const taskRouter = express.Router();

  // Define routes for different CRUD operations
  taskRouter.put("/:id", task.update);
  taskRouter.delete("/:id", task.delete);
  taskRouter.get("/", task.get);
  taskRouter.get("/status", task.getByStatus); // Change the route path to avoid conflict
  taskRouter.post("/", task.create);

  // Mount the taskRouter under the '/api/task' endpoint
  tasks.use("/api/task", taskRouter);
};
