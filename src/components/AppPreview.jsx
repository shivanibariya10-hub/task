import React, { useState } from "react";
import "../styles/home.css";  

export default function AppPreview() {
  const [tab, setTab] = useState("dashboard");

  return (
    <section className="app-preview">
      <h2>App Preview</h2>

      <div className="preview-tabs">
        <button
          className={tab === "dashboard" ? "active" : ""}
          onClick={() => setTab("dashboard")}
        >
          Dashboard
        </button>

        <button
          className={tab === "tasks" ? "active" : ""}
          onClick={() => setTab("tasks")}
        >
          Task List
        </button>

        <button
          className={tab === "add" ? "active" : ""}
          onClick={() => setTab("add")}
        >
          Add Task
        </button>
      </div>

      <div className="preview-screen">
        {tab === "dashboard" && <h3>📊 Dashboard Overview</h3>}
        {tab === "tasks" && <h3>📝 Your Tasks</h3>}
        {tab === "add" && (
          <>
            <h3>➕ Add New Task</h3>
            <input placeholder="Task name..." />
            <br />
            <button>Add</button>
          </>
        )}
      </div>
    </section>
  );
}
