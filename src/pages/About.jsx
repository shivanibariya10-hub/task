import { useEffect } from "react";
import "../styles/about.css";

import { useNavigate } from "react-router-dom"; // 
const About = () => {
  
    const teamMembers = [
  { img: "/images/team1.jpg", name: "Alice Johnson", role: "Project Manager" },
  { img: "/images/team2.jpg", name: "Bob Smith", role: "Developer" },
  { img: "/images/team3.jpg", name: "Clara Lee", role: "UI/UX Designer" },
  { img: "/images/team4.jpg", name: "David Kim", role: "QA Engineer" },
];

  
const navigate = useNavigate(); // ✅ hook

  useEffect(() => {
    const sections = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.2 }
    );

    sections.forEach(section => observer.observe(section));
  }, []);

  return (
    <div className="about">

      {/* HERO SECTION (no reveal) */}
      <section className="about-hero">
        <h1>About TaskFlow</h1>
        <p>
          A modern task management application built to help users
          stay focused, organized, and productive.
        </p>
      </section>


        {/* 🔥 IMAGE + CONTENT SECTION (Hero ke niche) */}
      <section className="about-intro reveal">
        <div className="about-intro-left">
          <h2>About Task Manager App</h2>
          <p>
            TaskFlow is a professional task management system inspired
            by tools like Jira. It allows users to create, track,
            update, and manage tasks efficiently in a secure environment.
          </p>

          <p>
            The application focuses on simplicity, performance,
            and real-time task tracking to boost productivity
            for individuals and teams.
          </p>
        </div>

        <div className="about-intro-right">
          <img src="/images/about1.jpg" alt="team work" />
          <img src="/images/about2.jpg" alt="task planning" />
          <img src="/images/about3.jpg" alt="dashboard view" />
          <img src="/images/about4.jpg" alt="collaboration" />
        </div>
      </section>
  {/* NEW SECTION: PROJECT VISION */}
      <section className="about-vision reveal">
        <div className="vision-left">
          <img src="/images/task-vison.jpg" alt="Project Vision" />
        </div>
        <div className="vision-right">
          <h2>Project Vision</h2>
          <p>
            Our vision is to provide a secure, user-friendly, and 
            highly productive task management platform for individuals
            and teams. TaskFlow is designed to improve efficiency,
            streamline workflow, and simplify task tracking.
          </p>

          <div className="vision-points">
            <div className="point-card">
              <h4>🔐 Secure Authentication</h4>
              <p>Users can safely log in and manage their tasks.</p>
            </div>
            <div className="point-card">
              <h4>📝 Task Management</h4>
              <p>Create, update, and delete tasks effortlessly.</p>
            </div>
            <div className="point-card">
              <h4>⚡ Productivity Focus</h4>
              <p>Designed to help users stay organized every day.</p>
            </div>
          </div>
        </div>
      </section>

      {/* VALUE SECTION */}
      <section className="about-values reveal">
        <div className="value-card">User-Centric Design</div>
        <div className="value-card">Secure Authentication</div>
        <div className="value-card">High Performance</div>
        <div className="value-card">Scalable Architecture</div>
      </section>

{/* Team / Offices Section (Under Vision) */}
      <section className="team-section">
        <h2>Meet Our Team</h2>
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div className="team-card" key={index}>
              <img src={member.img} alt={member.name} />
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="about-philosophy reveal">
        <h2>Our Philosophy</h2>
        <p>
          TaskFlow focuses on clarity and simplicity.
          We design productivity tools that feel effortless,
          not overwhelming.
        </p>
      </section>

      {/* TECH STACK */}
      <section className="about-tech reveal">
        <h2>Technology Stack</h2>
        <div className="tech-tags">
          <span>React</span>
          <span>Vite</span>
          <span>Modern CSS</span>
          <span>Secure Auth</span>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta reveal">
         <button onClick={() => navigate("/auth")} className="cta-btn">
         Create Account
        </button>
        
      </section>

    </div>
  );
};

export default About;
