'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process'); // Import the process module
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require("../config/config.js");
const db = {}; 
let sequelize;

// Check if the config has a use_env_variable property
if (config?.use_env_variable) {
  // If yes, create Sequelize instance using the environment variable
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  // If not, create Sequelize instance using the config options
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Read all files in the current directory and load them as models
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1 // Exclude test files
    );
  })
  .forEach(file => {
    // Import each model file and initialize it with Sequelize instance
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Call the associate function for each model to establish associations
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Assign Sequelize instance and Sequelize module to db object
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Import and initialize the task model with Sequelize instance
db.task = require("./tasks.js")(sequelize, Sequelize);

module.exports = db;
