const Settings = () => {
  return (
    <div className="profile-card">
      <h3>App Settings</h3>

      <label>
        <input type="checkbox" /> Enable notifications
      </label>

      <label>
        <input type="checkbox" /> Dark mode
      </label>
    </div>
  );
};

export default Settings;
