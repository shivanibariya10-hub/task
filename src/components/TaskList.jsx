import React from "react";
import { Button, Badge } from "react-bootstrap";

export default function TaskList({ tasks, updateStatus, deleteTask }) {
  return (
    <div className="tasks mt-3">
      <h5>Tasks</h5>
      {tasks.map((task, index) => (
        <div key={index} className="d-flex justify-content-between align-items-center p-2 mb-2 bg-white rounded shadow-sm">
          <div>
            <strong>{task.name}</strong>
            <div className="text-muted" style={{ fontSize: "12px" }}>Task description here...</div>
          </div>
          <div className="d-flex gap-2">
            <Badge bg={task.status === "Pending" ? "warning" : "success"}>
              {task.status}
            </Badge>
            <Button variant="success" size="sm" onClick={() => updateStatus(index)}>Complete</Button>
            <Button variant="danger" size="sm" onClick={() => deleteTask(index)}>Delete</Button>
          </div>
        </div>
      ))}
    </div>
  );
}
