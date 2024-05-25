const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();

// Import the middleware and routes
const db = require("./database/models");
const tasksRoutes = require("./routes/tasks");

// Middleware setup
app.use(express.json());
app.use(cors());

// Database synchronization
db.sequelize.sync()
  .then(() => {
    console.log("Database synced successfully.");
  })
  .catch((err) => {
    console.error("Database synchronization failed:", err.message);
  });

// Register routes
tasksRoutes(app);

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Default route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the application." });
});

// Export the app for testing purposes
module.exports = app;
