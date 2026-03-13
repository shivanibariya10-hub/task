import React from "react";
import { FaCheckCircle, FaChartPie, FaTasks } from "react-icons/fa";
import "./home.css";

const FeatureSection = () => {
  return (
    <section className="feature-section">
      <div className="feature-container">
        
        <h2 className="feature-title">
          Powerful Features Designed for Productivity
        </h2>
        <p className="feature-subtitle">
          Manage tasks smarter with real-time tracking and intelligent organization.
        </p>

        <div className="feature-grid">

          {/* Card 1 */}
          <div className="feature-card">
            <div className="icon green">
              <FaTasks />
            </div>
            <h3>Smart Task Management</h3>
            <p>Organize, prioritize, and track tasks effortlessly.</p>
          </div>

          {/* Card 2 */}
          <div className="feature-card">
            <div className="icon blue">
              <FaCheckCircle />
            </div>
            <h3>Real-Time Admin Reports</h3>
            <p>Admins can monitor task updates and performance instantly.</p>
          </div>

          {/* Card 3 */}
          <div className="feature-card">
            <div className="icon purple">
              <FaChartPie />
            </div>
            <h3>Visual Progress Tracking</h3>
            <p>Track completed and pending tasks with visual insights.</p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
