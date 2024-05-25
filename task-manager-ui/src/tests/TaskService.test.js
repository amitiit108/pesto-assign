import {
    fetchTasks,
    createTask,
    updateTask,
    deleteTask
  } from '../services/TaskService'; // Assuming these functions are in a file named 'api.js'
  
  // Mock the global fetch function
  global.fetch = jest.fn();
  
  // Mock the environment variable
  process.env.REACT_APP_BASE_URL = 'http://localhost:3001/api/task';
  
  describe('API Utility Functions', () => {
    afterEach(() => {
      // Reset the mock implementation after each test
      jest.resetAllMocks();
    });
  
    test('fetchTasks function', async () => {
      // Mock a successful response
      const tasks = [{ id: 1, title: 'Task 1' }, { id: 2, title: 'Task 2' }];
      fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ data: tasks })
      });
  
      const result = await fetchTasks();
      expect(result).toEqual(tasks);
  
      // Ensure fetch is called with the correct URL
      expect(fetch).toHaveBeenCalledWith('http://localhost:3001/api/task');
    });
  
    test('createTask function', async () => {
      // Mock a successful response
      const newTask = { title: 'New Task' };
      const createdTask = { id: 1, ...newTask };
      fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(createdTask)
      });
  
      const result = await createTask(newTask);
      expect(result).toEqual(createdTask);
  
      // Ensure fetch is called with the correct URL and request body
      expect(fetch).toHaveBeenCalledWith('http://localhost:3001/api/task', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask)
      });
    });
  
    // Similarly, write tests for updateTask and deleteTask functions
  });
  