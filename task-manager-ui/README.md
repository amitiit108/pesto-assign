# Frontend Documentation

This README provides an overview of the frontend part of our application.

## Overview

Our frontend is built using React, a popular JavaScript library for building user interfaces. It communicates with the backend server to fetch and manipulate data related to tasks.

## Folder Structure

<!-- frontend/
|   public/
|   |   index.html
|   |   ...
|   src/
|   |   components/
|   |   |   TaskForm.js
|   |   |   TaskList.js
|   |   |   FilterTasks.js
|   |   |   ...
|   |   services/
|   |   |   api.js
|   |   |   ...
|   |   App.js
|   |   index.js
|   |   ...
|   package.json -->





- `public/`: Contains the HTML file that serves as the entry point for the React application.
- `src/`: Contains the source code of the frontend application.
  - `components/`: Contains React components used to build the user interface.
  - `services/`: Contains utility functions and API services for interacting with the backend.

## Features

- **Task Management**: Users can create, read, update, and delete tasks.
- **Task Filtering**: Users can filter tasks based on their status (e.g., "To Do", "In Progress", "Done").
- **Responsive Design**: The application is responsive and can be viewed on different screen sizes.

## Getting Started

To run the frontend locally, follow these steps:

1. Make sure you have Node.js installed on your machine.
2. Navigate to the frontend directory in your terminal.
3. Install dependencies by running `npm install`.
4. Start the development server by running `npm start`.
5. Open your browser and visit `http://localhost:3000` to view the application.

## Checking Features

### Task Management

- Navigate to the homepage.
- Use the form to create a new task.
- Click on the "Edit" button to update an existing task.
- Click on the "Delete" button to delete a task.

### Task Filtering

- Use the dropdown menu in the task list to filter tasks based on status.

### Responsive Design

- Open the application on different devices (e.g., desktop, tablet, mobile) to see how the layout adjusts to different screen sizes.

## Dependencies

The frontend project relies on the following dependencies:

- `react`: JavaScript library for building user interfaces.
- `react-dom`: Provides DOM-specific methods that can be used with React.
- `react-scripts`: Configuration and scripts for running React applications.
- `axios`: Promise-based HTTP client for making requests to the backend API.
