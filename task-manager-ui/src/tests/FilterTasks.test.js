import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import FilterTasks from '../components/FilterTasks';

// Define sample statuses for testing
const statuses = ['todo', 'inprogress', 'done'];

// Mock the onSelectStatus function
const mockOnSelectStatus = jest.fn();

test('renders filter dropdown with options', () => {
  render(
    <FilterTasks statuses={statuses} onSelectStatus={mockOnSelectStatus} />
  );

  // Ensure the select element is rendered
  const selectElement = screen.getByRole('combobox');
  expect(selectElement).toBeInTheDocument();

  // Ensure default "All" option is present
  expect(screen.getByText('All')).toBeInTheDocument();

  // Ensure each status option is rendered
  statuses.forEach(status => {
    expect(screen.getByText(status)).toBeInTheDocument();
  });
});

test('calls onSelectStatus function when option is selected', () => {
  render(
    <FilterTasks statuses={statuses} onSelectStatus={mockOnSelectStatus} />
  );

  // Simulate selecting an option from the dropdown
  fireEvent.change(screen.getByRole('combobox'), { target: { value: 'inprogress' } });

  // Ensure the onSelectStatus function is called with the correct value
  expect(mockOnSelectStatus).toHaveBeenCalledWith('inprogress');
});
