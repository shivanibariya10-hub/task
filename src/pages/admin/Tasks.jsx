import React, { useState } from "react";
import "./Tasks.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

/* ================= USERS ================= */
const usersList = [
  { id: 1, name: "Alice Johnson" },
  { id: 2, name: "Bob Smith" },
  { id: 3, name: "Charlie Lee" },
];

/* ================= INITIAL TASKS ================= */
const initialTasks = [
  {
    id: 1,
    title: "Design Homepage",
    description: "Create UI/UX design for homepage",
    assignedTo: 1,
    status: "Pending",
    priority: "High",
    dueDate: "2026-03-01",
    comments: [{ user: "Admin", text: "Start ASAP" }],
    activity: ["Task Created"],
  },
  {
    id: 2,
    title: "Backend API",
    description: "Develop REST API for tasks",
    assignedTo: 2,
    status: "In Progress",
    priority: "Medium",
    dueDate: "2026-03-05",
    comments: [],
    activity: ["Task Created"],
  },
];

function Tasks() {
  const [tasks, setTasks] = useState(initialTasks);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [dragTask, setDragTask] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    assignedTo: "",
    status: "Pending",
    priority: "Medium",
    dueDate: "",
    comments: [],
    activity: [],
  });

  /* ================= NOTIFICATIONS ================= */
  const addNotification = (msg) => {
    const note = {
      id: Date.now(),
      message: msg,
      time: new Date().toLocaleString(),
    };
    setNotifications((prev) => [note, ...prev]);
  };

  /* ================= ADD TASK ================= */
  const handleAddTask = () => {
    if (!newTask.title || !newTask.assignedTo)
      return alert("Title & Assigned User required");

    const id = tasks.length ? tasks[tasks.length - 1].id + 1 : 1;

    const task = {
      ...newTask,
      id,
      assignedTo: parseInt(newTask.assignedTo),
      activity: ["Task Created"],
    };

    setTasks([...tasks, task]);
    addNotification(`New Task Added: ${task.title}`);

    setNewTask({
      title: "",
      description: "",
      assignedTo: "",
      status: "Pending",
      priority: "Medium",
      dueDate: "",
      comments: [],
      activity: [],
    });
  };

  /* ================= DELETE ================= */
  const handleDelete = (id) => {
    if (window.confirm("Delete this task?")) {
      const task = tasks.find((t) => t.id === id);
      setTasks(tasks.filter((t) => t.id !== id));
      addNotification(`Task Deleted: ${task.title}`);
    }
  };

  /* ================= EDIT ================= */
  const handleEditTask = (id) => {
    const task = tasks.find((t) => t.id === id);
    const title = prompt("Edit Task Title", task.title);
    if (title) {
      setTasks(
        tasks.map((t) =>
          t.id === id
            ? { ...t, title, activity: [...t.activity, "Title Edited"] }
            : t
        )
      );
      addNotification(`Task Updated: ${title}`);
    }
  };

  /* ================= STATUS CHANGE ================= */
  const handleStatusChange = (id, status) => {
    const task = tasks.find((t) => t.id === id);
    setTasks(
      tasks.map((t) =>
        t.id === id
          ? {
              ...t,
              status,
              activity: [...t.activity, `Status changed to ${status}`],
            }
          : t
      )
    );
    addNotification(`${task.title} marked as ${status}`);
  };

  /* ================= COMMENT ================= */
  const handleAddComment = (id) => {
    const text = prompt("Enter comment");
    if (text) {
      setTasks(
        tasks.map((task) =>
          task.id === id
            ? {
                ...task,
                comments: [...task.comments, { user: "Admin", text }],
                activity: [...task.activity, "Comment Added"],
              }
            : task
        )
      );
      addNotification("New Comment Added");
    }
  };

  /* ================= DRAG DROP ================= */
  const onDragStart = (task) => setDragTask(task);
  const onDrop = (status) => {
    if (dragTask) {
      handleStatusChange(dragTask.id, status);
      setDragTask(null);
    }
  };

  /* ================= FILTER ================= */
  const filteredTasks = tasks.filter((task) => {
    const searchMatch = task.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const statusMatch =
      filterStatus === "All" || task.status === filterStatus;
    return searchMatch && statusMatch;
  });

  /* ================= OVERDUE ================= */
  const isOverdue = (task) => {
    if (!task.dueDate || task.status === "Completed") return false;
    return new Date(task.dueDate) < new Date();
  };

  /* ================= EXPORT CSV ================= */
  const exportCSV = () => {
    const headers = ["ID", "Title", "User", "Status", "Priority", "Due"];
    const rows = tasks.map((t) => [
      t.id,
      t.title,
      usersList.find((u) => u.id === t.assignedTo)?.name,
      t.status,
      t.priority,
      t.dueDate,
    ]);

    let csv =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((e) => e.join(",")).join("\n");

    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csv));
    link.setAttribute("download", "tasks.csv");
    document.body.appendChild(link);
    link.click();
  };

  /* ================= ANALYTICS ================= */
  const analyticsData = [
    { name: "Pending", count: tasks.filter((t) => t.status === "Pending").length },
    { name: "In Progress", count: tasks.filter((t) => t.status === "In Progress").length },
    { name: "Completed", count: tasks.filter((t) => t.status === "Completed").length },
  ];

  return (
    <div className="tasks-container">
      <h2>Admin Task Dashboard</h2>

      {/* Notification */}
      <div className="notification-bell" onClick={() => setShowNotifications(!showNotifications)}>
        🔔 {notifications.length > 0 && <span className="badge">{notifications.length}</span>}
      </div>

      {showNotifications && (
        <div className="notification-panel">
          <h4>Notifications</h4>
          {notifications.map((n) => (
            <div key={n.id} className="notification-item">
              <p>{n.message}</p>
              <small>{n.time}</small>
            </div>
          ))}
        </div>
      )}

      {/* Add Task */}
      <div className="add-task-section">
        <input
          type="text"
          placeholder="Task Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <select
          value={newTask.assignedTo}
          onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
        >
          <option value="">Assign User</option>
          {usersList.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={newTask.dueDate}
          onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
        />
        <button onClick={handleAddTask}>Add</button>
        <button onClick={exportCSV}>Export CSV</button>
      </div>

      {/* Search + Filter */}
      <div className="filter-section">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option>All</option>
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
      </div>

      {/* TOTAL TASK TABLE */}
      <div className="table-section">
        <h3>Total Tasks</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>User</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Due</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task) => (
              <tr key={task.id} className={isOverdue(task) ? "overdue-row" : ""}>
                <td>{task.id}</td>
                <td>{task.title}</td>
                <td>{usersList.find((u) => u.id === task.assignedTo)?.name}</td>
                <td>{task.status}</td>
                <td>{task.priority}</td>
                <td>{task.dueDate}</td>
                <td>
                  <button onClick={() => handleEditTask(task.id)}>Edit</button>
                  <button onClick={() => handleDelete(task.id)}>Delete</button>
                  <select value={task.status} onChange={(e) => handleStatusChange(task.id, e.target.value)}>
                    <option>Pending</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* KANBAN BOARD */}
      <div className="kanban-board">
        {["Pending", "In Progress", "Completed"].map((status) => (
          <div
            key={status}
            className="kanban-column"
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => onDrop(status)}
          >
            <h3>{status}</h3>
            {filteredTasks
              .filter((task) => task.status === status)
              .map((task) => (
                <div
                  key={task.id}
                  className="task-card"
                  draggable
                  onDragStart={() => onDragStart(task)}
                >
                  <h4>{task.title}</h4>
                  <p>{task.description}</p>
                  <p><strong>Priority:</strong> {task.priority}</p>
                  <p><strong>Due:</strong> {task.dueDate}</p>

                  <button onClick={() => handleAddComment(task.id)}>Comment</button>

                  {task.comments.map((c, i) => (
                    <p key={i}><strong>{c.user}:</strong> {c.text}</p>
                  ))}

                  <details>
                    <summary>Activity Log</summary>
                    <ul>
                      {task.activity.map((a, i) => (
                        <li key={i}>{a}</li>
                      ))}
                    </ul>
                  </details>
                </div>
              ))}
          </div>
        ))}
      </div>

      {/* ANALYTICS */}
      <div className="analytics-section">
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={analyticsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#6366f1" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Tasks;