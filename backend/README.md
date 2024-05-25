# backend setup and how to start
1. configure db in database/config/config.js
2. cd project
3. npm i
4. cd database
5. sequelize db:migrate
6. cd ..
7. npm start

# frontend setup and how to start

1. cd task-magaer
2. npm i
3. npm start

Task manager

The application will allow users to create, update, and delete tasks. Tasks should have a title, description, and a status (e.g., "To Do," "In Progress," "Done"). Users should also be able to view a list of tasks and filter them by status.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:

git clone https://github.com/amitiit108/pesto-assign


2. Install dependencies:

cd your-project
npm install


## Usage

1. Start the server:

npm start


2. Access the API endpoints using tools like curl, Postman, or your web browser.

## API Endpoints

### Retrieve tasks by status

Send a GET request to `/api/task/status` with the `status` query parameter to retrieve tasks with a specific status.

Example:

curl -X GET 'http://localhost:3001/api/task?status=To%20Do'


### Create a new task

Send a POST request to `/api/task` with JSON data containing the task details to create a new task.

Example:


curl -X POST 'http://localhost:3001/api/task' -H 'Content-Type: application/json' -d '{
"title": "New Task",
"description": "Description for the new task",
"status": "To Do"
}'


### Delete a task

Send a DELETE request to `/api/task/:id` with the task ID to delete a task.

Example:


curl -X DELETE 'http://localhost:3001/api/task/task-id'

### Update a task

Send a PUT request to `/api/task/:id` with the task ID and JSON data containing the updated task details to update a task.

Example:

curl -X PUT 'http://localhost:3001/api/task/task-id' -H 'Content-Type: application/json' -d '{
"title": "Updated Task",
"description": "Updated description",
"status": "In Progress"
}'

