import React from "react";
import "../styles/home.css";  

const HowItWorks = () => {
  return (
    <section className="how-section fade-section">
      <h2>How It Works</h2>

      <div className="how-grid">
        <div className="how-card">
        <span className="step-icon">1</span>
        <button onClick={() => navigate("/register")}></button>
          <h3>Create Account</h3>
          <p>Sign up in seconds and access your personalized task dashboard</p>
        </div>

        <div className="how-card">
        <span className="step-icon">2</span>
          <h3>Add Tasks</h3>
          <p>Create and organize your tasks</p>
        </div>

        <div className="how-card">
           <span className="step-icon">3</span>
          <h3>Track Progress</h3>
          <p>Update status and stay productive</p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
