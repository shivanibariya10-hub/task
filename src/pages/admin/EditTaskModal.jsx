// src/components/EditTaskModal.jsx
import React, { useState } from "react";
import "./EditTaskModal.css";

export default function EditTaskModal({ task, onClose, onSave }) {
  const [editedTask, setEditedTask] = useState(task);

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Edit Task</h3>
        <input
          type="text"
          value={editedTask.name}
          onChange={(e) => setEditedTask({ ...editedTask, name: e.target.value })}
          placeholder="Task Name"
        />
        <input
          type="text"
          value={editedTask.user}
          onChange={(e) => setEditedTask({ ...editedTask, user: e.target.value })}
          placeholder="Assigned To"
        />
        <input
          type="date"
          value={editedTask.deadline}
          onChange={(e) => setEditedTask({ ...editedTask, deadline: e.target.value })}
        />
        <select
          value={editedTask.status}
          onChange={(e) => setEditedTask({ ...editedTask, status: e.target.value })}
        >
          <option value="Pending">Pending</option>
          <option value="InProgress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <div className="modal-buttons">
          <button className="save-btn" onClick={() => onSave(editedTask)}>Save</button>
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}