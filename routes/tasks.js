// routes/sessions.js

const express = require("express");
const router = express.Router();

module.exports = router;

module.exports = (tasks) => {
  const task = require("../controller/tasksController");

  const router = require("express").Router();

   router.get("/", task.bookTask);

   router.post("/", task.create);

   tasks.use("/api/task", router);
};
