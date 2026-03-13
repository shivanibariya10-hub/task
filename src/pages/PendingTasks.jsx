{/* ---------- PENDING TASKS PAGE ---------- */}
{activeMenu === "pending" && ( <PendingTasks activeMenu={activeMenu} />}
  <div>
    <h2>Pending Tasks</h2>
      
    {/* EMPTY STATE */}
    {tasks.filter(t => t.status === "Pending").length === 0 && (
      <p style={{ color: "#888", marginTop: "10px" }}>
        No pending tasks found.
      </p>
    )}

    {/* PENDING TASK LIST */}
    {tasks
      .filter(task => task.status === "Pending")
      .map(task => (
        <div className="task-item" key={task.id}>
          <div>
            <strong>{task.title}</strong>
            <p className="task-desc">
              This task is currently pending.
            </p>
          </div>

          <div className="task-actions">
            <span className="badge pending">Pending</span>

            <button
              className="btn-complete"
              onClick={() => handleComplete(task.id)}
            >
              ✓ Mark Complete
            </button>

            <button
              className="btn-delete"
              onClick={() => handleDelete(task.id)}
            >
              🗑 Delete
            </button>
          </div>
        </div>
      ))}
  </div>
)}
export default PendingTasks;
