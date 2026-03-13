export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="dashboard-title">User Dashboard</h2>

      <div className="user-box">
        <p>Hey, Hexagon</p>
        <small>Let’s crush some tasks!</small>
      </div>

      <div className="productivity">
        <p>Productivity</p>
        <div className="progress">
          <div className="progress-fill"></div>
        </div>
        <span>50%</span>
      </div>

      <ul className="menu">
        <li>Dashboard</li>
        <li className="active">Pending Tasks</li>
        <li>Completed Tasks</li>
      </ul>

      <div className="pro-tip">
        <strong>Pro Tip</strong>
        <p>Use keyboard shortcuts to boost productivity</p>
      </div>
    </div>
  );
}
