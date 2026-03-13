import React, { useState } from "react";
import "./AddTask.css";

export default function AddTask() {
  const [tasks, setTasks] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Medium",
    status: "Pending",
    dueDate: "",
    assignTo: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddTask = () => {
    if (formData.title.trim() === "") {
      alert("Task title is required");
      return;
    }

    setTasks([...tasks, { id: Date.now(), ...formData }]);

    setFormData({
      title: "",
      description: "",
      priority: "Medium",
      status: "Pending",
      dueDate: "",
      assignTo: "",
    });
  };

  return (
    <div className="addtask-container">
      {/* FORM */}
      <div className="task-card">
        <h2>Create New Task</h2>

        <input
          type="text"
          name="title"
          placeholder="Task Title"
          value={formData.title}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Task Description"
          value={formData.description}
          onChange={handleChange}
        />

        <select name="priority" value={formData.priority} onChange={handleChange}>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <select name="status" value={formData.status} onChange={handleChange}>
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>

        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
        />

        <input
          type="text"
          name="assignTo"
          placeholder="Assign To (Employee Name)"
          value={formData.assignTo}
          onChange={handleChange}
        />

        <button onClick={handleAddTask}>Create Task</button>
      </div>

      {/* TASK LIST */}
      <div className="task-list">
        <h3>Created Tasks</h3>

        {tasks.length === 0 ? (
          <p className="empty">No tasks created yet</p>
        ) : (
          tasks.map((task) => (
            <div className="task-item" key={task.id}>
              <h4>{task.title}</h4>
              <p>{task.description}</p>
              <span>Priority: {task.priority}</span>
              <span>Status: {task.status}</span>
              <span>Due: {task.dueDate || "N/A"}</span>
              <span>Assigned: {task.assignTo}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
} 
