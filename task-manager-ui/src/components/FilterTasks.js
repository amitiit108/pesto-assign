import React from 'react';
import './FilterTasks.css'; // Import CSS file for styling

const FilterTasks = ({ statuses, onSelectStatus }) => {
  // Render a dropdown menu to filter tasks by status
  return (
    <select className="filter-select" onChange={(e) => onSelectStatus(e.target.value)}>
      {/* Default option to show all tasks */}
      <option value="">All</option>
      {/* Map through statuses array to render options for each status */}
      {statuses.map((status) => (
        <option key={status} value={status}>
          {status}
        </option>
      ))}
    </select>
  );
};

export default FilterTasks;
