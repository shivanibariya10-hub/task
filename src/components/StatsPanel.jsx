export default function StatsPanel() {
  return (
    <div className="stats-panel">
      <h4>Task Statistics</h4>

      <div className="stats-grid">
        <div className="stat-box">2<br /><small>Total Tasks</small></div>
        <div className="stat-box">1<br /><small>Completed</small></div>
        <div className="stat-box">1<br /><small>Pending</small></div>
        <div className="stat-box">50%<br /><small>Completion</small></div>
      </div>

      <div className="task-progress">
        <p>Task Progress</p>
        <div className="progress">
          <div className="progress-fill"></div>
        </div>
      </div>
    </div>
  );
}
