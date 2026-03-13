import "./Advertisement.css";

function Advertisement() {
  return (
    <section className="app-ad-section">
      <div className="ad-container">

        {/* Brand */}
        <div className="ad-box">
          <h2>Task Manager App</h2>
          <p>
            Smart task management platform with secure user authentication.
            Organize, track and complete tasks faster.
          </p>
        </div>

        {/* Features */}
        <div className="ad-box">
          <h4>Features</h4>
          <ul>
            <li>Create & Manage Tasks</li>
            <li>User Authentication</li>
            <li>Progress Tracking</li>
            <li>Secure Dashboard</li>
          </ul>
        </div>

        {/* Contact */}
        <div className="ad-box">
          <h4>Contact</h4>
          <p>📍 India</p>
          <p>📞 +91 98765 43210</p>
          <p>✉ support@taskflow.com</p>
        </div>

        {/* Subscribe */}
        <div className="ad-box">
          <h4>Stay Updated</h4>
          <p>Get productivity tips & updates</p>
          <div className="subscribe-box">
            <input type="email" placeholder="Enter your email" />
            <button>Subscribe</button>
          </div>
        </div>

      </div>

      <div className="ad-footer">
        © 2026 TaskFlow. All rights reserved.
      </div>
    </section>
  );
}

export default Advertisement;
