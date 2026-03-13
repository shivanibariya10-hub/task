import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

export default function TaskForm({ addTask }) {
  const [taskName, setTaskName] = useState("");
  const [status, setStatus] = useState("Pending");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskName.trim() === "") return;
    addTask({ name: taskName, status });
    setTaskName("");
  };

  return (
    <div className="p-3 mb-3 bg-white rounded shadow-sm" style={{ maxWidth: "400px" }}>
      <h5>Add a New Task</h5>
      <Form onSubmit={handleSubmit}>
        <Form.Control
          type="text"
          placeholder="Task Name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          className="mb-2"
        />
        <Form.Select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="mb-2"
        >
          <option>Pending</option>
          <option>Completed</option>
        </Form.Select>
        <Button type="submit" variant="primary" className="w-100">Add Task</Button>
      </Form>
    </div>
  );
}
