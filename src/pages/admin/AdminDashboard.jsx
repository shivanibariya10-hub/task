import React from "react";  
import "./AdminDashboard.css";

import { Link } from "react-router-dom";
import {
  FaHome,
  FaUsers,
  FaTasks,
  FaChartBar,
  FaUser,
  FaSignOutAlt,
  FaUserAlt,
  FaClipboardList,
  FaClock,
  FaCheckCircle
} from "react-icons/fa";

function AdminDashboard() {
  return (
    <div className="layout">

      {/* Sidebar */}
      <div className="sidebar">
        <div className="profile">
          <img src="https://i.pravatar.cc/100" alt="admin" />
          <h3>Admin</h3>
        </div>

        <ul>
  <li>
    <Link to="/admin">
      <FaHome /> Dashboard
    </Link>
  </li>

  <li>
    <Link to="/admin/users">
      <FaUsers /> Users
    </Link>
  </li>

  <li>
    <Link to="/admin/tasks">
      <FaTasks /> Tasks
    </Link>
  </li>

  <li>
    <Link to="/admin/reports">
      <FaChartBar /> Reports
    </Link>
  </li>

  <li>
    <Link to="/admin/profile">
      <FaUser /> Profile
    </Link>
  </li>

  <li>
    <Link to="/login">
      <FaSignOutAlt /> Logout
    </Link>
  </li>
</ul>
      </div>

      {/* Main Content */}
      <div className="main">

        {/* Topbar */}
        <div className="topbar">
          <h2>Admin Dashboard</h2>
          <div className="right">
            <span>Welcome, Admin</span>
            <button className="logout-btn">Logout</button>
          </div>
        </div>

        {/* CONTENT WRAPPER */}
        <div className="content">

<div className="cards">

  <div className="dashboard-card">
    <div className="card-top blue">
      <div className="icon-circle">👤</div>
      <div className="card-text">
        <p>Total Users</p>
        <h2>10</h2>
      </div>
    </div>
    <div className="card-bottom">Total Users</div>
  </div>

  <div className="dashboard-card">
    <div className="card-top green">
      <div className="icon-circle">📋</div>
      <div className="card-text">
        <p>Total Tasks</p>
        <h2>25</h2>
      </div>
    </div>
    <div className="card-bottom">Total Tasks</div>
  </div>

  <div className="dashboard-card">
    <div className="card-top orange">
      <div className="icon-circle">⏰</div>
      <div className="card-text">
        <p>Pending Tasks</p>
        <h2>5</h2>
      </div>
    </div>
    <div className="card-bottom">Pending Tasks</div>
  </div>

  <div className="dashboard-card">
    <div className="card-top darkgreen">
      <div className="icon-circle">✔</div>
      <div className="card-text">
        <p>Completed Tasks</p>
        <h2>20</h2>
      </div>
    </div>
    <div className="card-bottom">Completed Tasks</div>
  </div>

</div>          
          {/* Recent Tasks */}
          <div className="recent">
            <h3>Recent Tasks</h3>

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
                <tr>
                  <td>Project Report</td>
                  <td>Shivani</td>
                  <td>Feb 20, 2022</td>
                  <td><span className="status pending">Pending</span></td>
                  <td>
                    <button className="edit">Edit</button>
                    <button className="delete">Delete</button>
                  </td>
                </tr>

                <tr>
                  <td>Design UI</td>
                  <td>Rahul</td>
                  <td>Feb 18, 2022</td>
                  <td><span className="status progress">In Progress</span></td>
                  <td>
                    <button className="edit">Edit</button>
                    <button className="delete">Delete</button>
                  </td>
                </tr>

                <tr>
                  <td>Testing Module</td>
                  <td>Amit</td>
                  <td>Feb 15, 2022</td>
                  <td><span className="status complete">Completed</span></td>
                  <td>
                    <button className="edit">Edit</button>
                    <button className="delete">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>

          </div>

        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;
