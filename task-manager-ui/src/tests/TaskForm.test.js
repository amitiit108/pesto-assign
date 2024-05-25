// TaskForm.test.js
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import TaskForm from '../components/TaskForm';

// Mock onCreateTask function
const mockOnCreateTask = jest.fn();

test('renders task form with input fields and submit button', () => {
  render(<TaskForm onCreateTask={mockOnCreateTask} />);

  // Ensure input fields and submit button are rendered
  expect(screen.getByPlaceholderText('Title')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Description')).toBeInTheDocument();
  expect(screen.getByText('Add Task')).toBeInTheDocument();
});

test('updates state when input fields are changed', () => {
  render(<TaskForm onCreateTask={mockOnCreateTask} />);

  // Simulate typing in the title input field
  fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'Test Task' } });
  expect(screen.getByPlaceholderText('Title')).toHaveValue('Test Task');

  // Simulate typing in the description input field
  fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: 'Test Description' } });
  expect(screen.getByPlaceholderText('Description')).toHaveValue('Test Description');

  // Simulate selecting an option from the status dropdown
  fireEvent.change(screen.getByRole('combobox'), { target: { value: 'In Progress' } });
  expect(screen.getByRole('combobox')).toHaveValue('In Progress');
});

test('calls onCreateTask function with correct task object when form is submitted', () => {
  render(<TaskForm onCreateTask={mockOnCreateTask} />);

  // Fill out the form fields
  fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'Test Task' } });
  fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: 'Test Description' } });
  fireEvent.change(screen.getByRole('combobox'), { target: { value: 'In Progress' } });

  // Submit the form
  fireEvent.click(screen.getByText('Add Task'));

  // Ensure onCreateTask function is called with the correct task object
  expect(mockOnCreateTask).toHaveBeenCalledWith({
    title: 'Test Task',
    description: 'Test Description',
    status: 'In Progress'
  });
});
