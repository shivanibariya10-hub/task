function RightPanel() {
  return (
    <div className="right-panel">
      <h4>Task Statistics</h4>
      <p>Total: 1</p>
      <p>Completed: 1</p>
      <p>Pending: 0</p>

      <div className="progress">
        <div className="progress-bar"></div>
      </div>

      <h4>Recent Activity</h4>
      <p>Task New – Done</p>
    </div>
  );
}

export default RightPanel;
