'use strict';

/**
 * Define the migration script for creating the "Tasks" table in the database.
 */
module.exports = {
  /**
   * Define the "up" function responsible for creating the "Tasks" table.
   * @param {object} queryInterface - The queryInterface object provided by Sequelize.
   * @param {object} Sequelize - The Sequelize object.
   */
  up: async (queryInterface, Sequelize) => {
    // Create the "Tasks" table with specified columns and configurations
    await queryInterface.createTable('Tasks', {
      // ID column with auto-increment and primary key constraints
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      // Title column of type STRING with allowNull constraint
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      // Description column of type TEXT with allowNull constraint
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      // Status column of type STRING with defaultValue set to 'To Do' and allowNull constraint
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'To Do',
      },
      // createdAt column to track creation timestamps
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      // updatedAt column to track update timestamps
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  /**
   * Define the "down" function responsible for dropping the "Tasks" table.
   * @param {object} queryInterface - The queryInterface object provided by Sequelize.
   * @param {object} Sequelize - The Sequelize object.
   */
  down: async (queryInterface, Sequelize) => {
    // Drop the "Tasks" table if the migration is rolled back
    await queryInterface.dropTable('Tasks');
  },
};
