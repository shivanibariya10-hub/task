const Security = () => {
  return (
    <div className="profile-card">
      <h3>Security Settings</h3>

      <label>Change Password</label>
      <input type="password" placeholder="New password" />
      <input type="password" placeholder="Confirm password" />

      <button className="save">Update Password</button>
    </div>
  );
};

export default Security;
