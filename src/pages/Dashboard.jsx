
import React, { useState, useEffect } from "react";
import "./dashboard.css";
import Projects from "../pages/Projects";
import Calendar from "../pages/Calendar";
import Tasks from "../pages/Tasks";
import axios from "axios";
function Dashboard() {

  const [page, setPage] = useState("dashboard");

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get("http://localhost:5000/api/projects", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setProjects(res.data);
      } catch (error) {
        console.error("Error fetching projects", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="dashboard">

      {/* Sidebar */}
      <div className="sidebar">
        <h2 className="logo">TaskFlow</h2>

        <ul className="menu">
          <li
            className={page === "dashboard" ? "active" : ""}
            onClick={() => setPage("dashboard")}
          >
            🏠 Dashboard
          </li>

          <li
            className={page === "projects" ? "active" : ""}
            onClick={() => setPage("projects")}
          >
            📁 Projects
          </li>

          <li
            className={page === "tasks" ? "active" : ""}
            onClick={() => setPage("tasks")}
          >
            📋 My Tasks
          </li>

          <li
            className={page === "calendar" ? "active" : ""}
            onClick={() => setPage("calendar")}
          >
            📅 Calendar
          </li>

          <li
            className={page === "settings" ? "active" : ""}
            onClick={() => setPage("settings")}
          >
            ⚙ Settings
          </li>
        </ul>

        {/* Sidebar Projects */}
        <div className="project-section">
          <p className="project-title">PROJECTS</p>

          {projects.slice(0, 5).map((p, i) => {
            const colors = ["pink", "orange", "blue", "green", "purple"];
            return (
              <div className="project-item" key={i}>
                <span className={`dot ${colors[i % colors.length]}`}></span>
                {p.name}
              </div>
            );
          })}
        </div>

        {/* User */}
        <div className="user">
          <div className="avatar">V</div>
          <div>
            <p className="name">Vikram Kumar</p>
            <p className="email">member@taskflow.com</p>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="main">

        {page === "dashboard" && (
          <>
            {/* Topbar */}
            <div className="topbar">
              <h2 className="page-title">Dashboard</h2>

              <div className="search-box">
                <input placeholder="Search tasks, projects..." />
                <span className="shortcut">Ctrl+K</span>
              </div>

              <div className="top-icons">
                💻 🔔
                <div className="avatar small">V</div>
              </div>
            </div>

            <h1 className="welcome">Welcome back, {JSON.parse(localStorage.getItem("user") || '{"name":"User"}').name}!</h1>
            <p className="subtitle">
              Here's what's happening with your projects.
            </p>

            {/* Stats */}
            <div className="cards">

              <div className="card blue">
                <p>Total Tasks</p>
                <h2>21</h2>
              </div>

              <div className="card yellow">
                <p>In Progress</p>
                <h2>8</h2>
              </div>

              <div className="card green">
                <p>Completed</p>
                <h2>4</h2>
              </div>

              <div className="card red">
                <p>Overdue</p>
                <h2>3</h2>
              </div>

            </div>

            {/* Content */}
            <div className="content">

              {/* Tasks */}
              <div className="tasks">
                <h3>Recent Tasks</h3>

                <div className="task">
                  <div>
                    <h4>Requirement Analysis</h4>
                    <p>Car Rental System · CAR-001</p>
                  </div>
                  <span className="tag critical">Critical</span>
                </div>

                <div className="task">
                  <div>
                    <h4>User reviews & ratings system</h4>
                    <p>E-Commerce Platform · ECOM-005</p>
                  </div>
                  <span className="tag medium">Medium</span>
                </div>

                <div className="task">
                  <div>
                    <h4>Order tracking page</h4>
                    <p>E-Commerce Platform · ECOM-006</p>
                  </div>
                  <span className="tag medium">Medium</span>
                </div>

              </div>

              {/* Right Panel */}
              <div className="right-panel">

                <div className="projects">
                  <h3>My Projects</h3>

                  {projects.slice(0, 4).map((p, i) => {
                    const colors = ["pink", "orange", "blue", "green", "purple"];
                    return (
                      <div className="project" key={i}>
                        <span className={`dot ${colors[i % colors.length]}`}></span>
                        {p.name}
                        <p>{p.members} members</p>
                      </div>
                    );
                  })}
                </div>

                <div className="due">
                  <h3>Due Today</h3>
                  <p>Payment gateway integration</p>
                </div>

              </div>

            </div>
          </>
        )}

       {page === "projects" && <Projects projects={projects} setProjects={setProjects} />}

        {/* Render the Tasks component */}
        {page === "tasks" && <Tasks projects={projects} />}

        {page === "calendar" && <Calendar projects={projects} />}

        {page === "settings" && (
          <div style={{padding:"40px"}}>
            <h1>Settings Page</h1>
          </div>
        )}

      </div>
    </div>
  );
}

export default Dashboard;
