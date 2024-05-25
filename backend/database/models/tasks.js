const { DataTypes } = require('sequelize');

// Define the Task model using Sequelize's define method
module.exports = (sequelize) => {
  // Define the Task model with attributes: title, description, and status
  const Task = sequelize.define('Tasks', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Ensure title is unique
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Task; // Return the Task model for use in other parts of the application
};
