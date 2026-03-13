// src/components/TaskTable.jsx
import React from "react";
import "./TaskTable.css";

export default function TaskTable({ tasks, onEdit, onDelete, onStatusChange }) {
  const statuses = ["Pending", "InProgress", "Completed"];

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Task</th>
            <th>Assigned To</th>
            <th>Deadline</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.name}</td>
              <td>{task.user}</td>
              <td>{task.deadline}</td>
              <td>
                <select
                  className={`status ${task.status.toLowerCase()}`}
                  value={task.status}
                  onChange={(e) => onStatusChange(task, e.target.value)}
                >
                  {statuses.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </td>
              <td>
                <button className="edit-btn" onClick={() => onEdit(task)}>Edit</button>
                <button className="delete-btn" onClick={() => onDelete(task)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}