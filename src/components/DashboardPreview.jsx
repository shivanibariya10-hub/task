import React from "react";
import "./DashboardPreview.css";
import dashboardImg from "../assets/images/dashboard-preview.jpg";



// Yaha tum apna dashboard screenshot ya UI image rakhna

const DashboardPreview = () => {
  return (
    <section className="dashboard-preview">
      <div className="dashboard-container">

        <div className="dashboard-text">
          <h2>Smart Dashboard for Better Productivity</h2>
          <p>
            Monitor tasks, track progress, and manage your workflow efficiently
            with our powerful and user-friendly dashboard.
          </p>

          <ul>
            <li>✔ Real-time task updates</li>
            <li>✔ Visual progress overview</li>
            <li>✔ Admin & User insights</li>
          </ul>

          <button className="preview-btn">Explore Dashboard</button>
        </div>

        <div className="dashboard-image">
          <img src={dashboardImg} alt="Dashboard Preview" />
        </div>

      </div>
    </section>
  );
};

export default DashboardPreview;
