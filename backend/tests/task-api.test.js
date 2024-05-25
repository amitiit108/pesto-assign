const request = require("supertest");
const app = require("../server"); 
const db = require("../database/models");
const Task = db.task;

describe("Task API Endpoints", () => {
  beforeAll(async () => {
    // Seed initial data
    await Task.bulkCreate([
      {
        title: "Task 1",
        description: "Description for Task 1",
        status: "To Do",
      },
      {
        title: "Task 2",
        description: "Description for Task 2",
        status: "In Progress",
      },
      {
        title: "Task 3",
        description: "Description for Task 3",
        status: "Done",
      },
    ]);
  });

  afterAll(async () => {
    // Clean up the database after all tests are finished
    await Task.destroy({ where: {}, truncate: true });
  });

  describe("GET /task", () => {
    it("should retrieve all tasks successfully", async () => {
      const response = await request(app).get("/api/task");
      expect(response.status).toBe(200);
      expect(response.body.message).toBe("All Tasks retrieved successfully");
      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });

  describe("GET /task/:status", () => {
    it("should retrieve tasks by status successfully", async () => {
      const response = await request(app).get("/api/task?status=To Do");
      expect(response.status).toBe(200);
      expect(response.body.message).toBe(
        'All Tasks retrieved successfully'
      );
      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });

  describe("POST /task", () => {
    it("should create a new task successfully", async () => {
      const newTaskData = {
        title: "Test Task",
        description: "This is a test task",
        status: "To Do",
      };
      const response = await request(app).post("/api/task").send(newTaskData);
      expect(response.status).toBe(201);
      expect(response.body.message).toBe("Task created successfully");
      expect(response.body.task).toHaveProperty("taskId");
    });

    it("should fail to create a task with invalid data", async () => {
      const invalidTaskData = {
        // Missing title
        description: "This is a test task",
        status: "To Do",
      };
      const response = await request(app).post("/api/task").send(invalidTaskData);
      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Invalid task data");
    });
  });

  describe("DELETE /task/:id", () => {
    it("should delete a task successfully", async () => {
      // Create a task to delete
      const newTask = await Task.create({
        title: "Task to Delete",
        description: "Description",
        status: "To Do",
      });
      const response = await request(app).delete(`/api/task/${newTask.id}`);
      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Task deleted successfully");
    });

    it("should fail to delete a non-existing task", async () => {
      const nonExistingTaskId = 12;
      const response = await request(app).delete(`/api/task/${nonExistingTaskId}`);
      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Task not found");
    });
  });

  describe("PUT /task/:id", () => {
    it("should update a task successfully", async () => {
      // Create a task to update
      const newTask = await Task.create({
        title: "Task to Update",
        description: "Description",
        status: "To Do",
      });
      const updatedTaskData = {
        title: "Updated Task",
        description: "Updated Description",
        status: "In Progress",
      };
      const response = await request(app)
        .put(`/api/task/${newTask.id}`)
        .send(updatedTaskData);
      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Task updated successfully");
    });

    it("should fail to update a non-existing task", async () => {
      const nonExistingTaskId = 12;
      const updatedTaskData = {
        title: "Updated Task",
        description: "Updated Description",
        status: "In Progress",
      };
      const response = await request(app)
        .put(`/api/task/${nonExistingTaskId}`)
        .send(updatedTaskData);
      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Task not found");
    });
  });
});
