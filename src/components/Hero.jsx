import React from "react";
import "./Hero.css";
import { FaSearch, FaCheckCircle } from "react-icons/fa";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-container">

        {/* LEFT SIDE */}
        <div className="hero-left">
          <h1>
            Organize Your Tasks.<br />
            Boost Your Productivity.
          </h1>

          <p>
            Manage your tasks efficiently, track progress, and
            collaborate with your team with ease.
          </p>

          <div className="hero-search">
            <FaSearch />
            <input type="text" placeholder="Search your tasks..." />
          </div>

          <button className="hero-btn">Get Started</button>

          <div className="hero-stats">
            <span>10K+ Users</span>
            <span>50K+ Tasks Completed</span>
          </div>
        </div>

        {/* RIGHT SIDE FLOATING UI */}
        <div className="hero-right">

          {/* Small Progress Card */}
          <div className="mini-card progress-mini">
            <p>Progress</p>
            <strong>3/5</strong>
          </div>

          {/* Task List Card */}
          <div className="task-card">
            <h3>Tasks</h3>
            <ul>
              <li>Design new homepage</li>
              <li>Fix bug in login form</li>
              <li>Update profile page</li>
            </ul>
          </div>

          {/* Completed Card */}
          <div className="mini-card completed-mini">
            <FaCheckCircle className="check-icon" />
            <div>
              <strong>24</strong>
              <p>Completed Tasks</p>
            </div>
          </div>

          {/* Big Circle */}
          <div className="circle-card">
            <div className="circle">
              <span>65%</span>
            </div>
          </div>

          {/* Chart Card */}
          <div className="chart-card">
            <div className="bar"></div>
            <div className="bar small"></div>
            <div className="bar"></div>
            <div className="bar big"></div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Hero;