import React, { useState } from "react";
import "./Profile.css";

function Profile() {
  const [activeTab, setActiveTab] = useState("profile");
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const [profile, setProfile] = useState({
    name: "Shivani Patel",
    email: "shivani@gmail.com",
    phone: "9876543210",
    bio: "Admin of Task Manager App",
    image: "https://i.pravatar.cc/150?img=47",
  });

  const [security, setSecurity] = useState({
    twoFactor: false,
    loginAlerts: true,
  });

  const activities = [
    "Logged in from Chrome",
    "Updated Profile",
    "Changed Password",
    "Added New Task",
  ];

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSecurityChange = (e) => {
    setSecurity({ ...security, [e.target.name]: e.target.checked });
  };

  const handleImageUpload = (e) => {
    const file = URL.createObjectURL(e.target.files[0]);
    setProfile({ ...profile, image: file });
  };

  return (
    <div className="profile-wrapper">

      <div className="profile-sidebar">
        <button onClick={() => setActiveTab("profile")}>Profile</button>
        <button onClick={() => setActiveTab("account")}>Account Settings</button>
        <button onClick={() => setActiveTab("security")}>Security</button>
        <button onClick={() => setActiveTab("activity")}>Activity</button>
      </div>

      <div className="profile-content">

        {/* PROFILE TAB */}
        {activeTab === "profile" && (
          <div className="card">
            <h2>Profile</h2>

            <div className="profile-header">
              <img src={profile.image} alt="Profile" />
              <input type="file" onChange={handleImageUpload} />
            </div>

            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              placeholder="Full Name"
            />

            <input
              type="email"
              value={profile.email}
              disabled
            />

            <input
              type="text"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              placeholder="Phone"
            />

            <textarea
              name="bio"
              value={profile.bio}
              onChange={handleChange}
              placeholder="Bio"
            />

            <button className="primary-btn">Save Changes</button>
          </div>
        )}

        {/* ACCOUNT SETTINGS TAB */}
        {activeTab === "account" && (
          <div className="card">
            <h2>Account Settings</h2>

            <div className="setting-row">
              <span>Email Notifications</span>
              <input type="checkbox" defaultChecked />
            </div>

            <div className="setting-row">
              <span>Dark Mode</span>
              <input type="checkbox" />
            </div>

            <button
              className="danger-btn"
              onClick={() => setShowPasswordModal(true)}
            >
              Change Password
            </button>
          </div>
        )}

        {/* SECURITY TAB */}
        {activeTab === "security" && (
          <div className="card">
            <h2>Security Settings</h2>

            <div className="setting-row">
              <span>Enable Two Factor Authentication</span>
              <input
                type="checkbox"
                name="twoFactor"
                checked={security.twoFactor}
                onChange={handleSecurityChange}
              />
            </div>

            <div className="setting-row">
              <span>Login Alerts</span>
              <input
                type="checkbox"
                name="loginAlerts"
                checked={security.loginAlerts}
                onChange={handleSecurityChange}
              />
            </div>
          </div>
        )}

        {/* ACTIVITY TAB */}
        {activeTab === "activity" && (
          <div className="card">
            <h2>Activity Timeline</h2>

            <ul className="timeline">
              {activities.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* CHANGE PASSWORD MODAL */}
      {showPasswordModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Change Password</h3>

            <input type="password" placeholder="Current Password" />
            <input type="password" placeholder="New Password" />
            <input type="password" placeholder="Confirm Password" />

            <div className="modal-buttons">
              <button
                className="primary-btn"
                onClick={() => setShowPasswordModal(false)}
              >
                Update
              </button>
              <button
                className="danger-btn"
                onClick={() => setShowPasswordModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;