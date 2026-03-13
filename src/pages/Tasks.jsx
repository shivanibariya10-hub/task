import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { 
  Plus, 
  Search, 
  Filter, 
  Edit2, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  MoreVertical,
  LayoutGrid,
  List as ListIcon,
  ChevronDown
} from "lucide-react";
import "./tasks.css";

const Tasks = ({ projects }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentTask, setCurrentTask] = useState({
    title: "",
    description: "",
    status: "Pending",
    priority: "Medium",
    projectId: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  const token = localStorage.getItem("token");

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tasks", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleOpenModal = (task = null) => {
    if (task) {
      setCurrentTask({
        ...task,
        projectId: task.projectId?._id || task.projectId || ""
      });
      setIsEditing(true);
    } else {
      setCurrentTask({
        title: "",
        description: "",
        status: "Pending",
        priority: "Medium",
        projectId: projects.length > 0 ? projects[0]._id : "",
      });
      setIsEditing(false);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentTask({
      title: "",
      description: "",
      status: "Pending",
      priority: "Medium",
      projectId: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentTask.title) return alert("Title is required");
    
    try {
      if (isEditing) {
        await axios.put(
          `http://localhost:5000/api/tasks/${currentTask._id}`,
          currentTask,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post("http://localhost:5000/api/tasks", currentTask, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      fetchTasks();
      handleCloseModal();
    } catch (error) {
      console.error("Error saving task", error);
      alert("Failed to save task. Is the backend running?");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchTasks();
      } catch (error) {
        console.error("Error deleting task", error);
      }
    }
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "All" || task.status === statusFilter;
      const matchesPriority = priorityFilter === "All" || task.priority === priorityFilter;
      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tasks, searchTerm, statusFilter, priorityFilter]);

  const stats = useMemo(() => {
    return {
      total: tasks.length,
      completed: tasks.filter(t => t.status === "Completed").length,
      pending: tasks.filter(t => t.status === "Pending" || t.status === "In Progress").length,
    };
  }, [tasks]);

  return (
    <div className="tasks-page">
      <div className="tasks-container">
        {/* Header Section */}
        <header className="tasks-header">
          <div className="header-left">
            <h1>My Tasks</h1>
            <p className="subtitle">Manage, track and complete your daily work</p>
          </div>
          <button className="add-task-primary" onClick={() => handleOpenModal()}>
            <Plus size={20} />
            <span>New Task</span>
          </button>
        </header>

        {/* Stats Row */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon blue"><LayoutGrid size={20} /></div>
            <div className="stat-info">
              <span className="stat-label">Total Tasks</span>
              <h3 className="stat-value">{stats.total}</h3>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon yellow"><Clock size={20} /></div>
            <div className="stat-info">
              <span className="stat-label">Pending</span>
              <h3 className="stat-value">{stats.pending}</h3>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon green"><CheckCircle2 size={20} /></div>
            <div className="stat-info">
              <span className="stat-label">Completed</span>
              <h3 className="stat-value">{stats.completed}</h3>
            </div>
          </div>
        </div>

        {/* Filters & Search Row */}
        <div className="filters-bar">
          <div className="search-wrapper">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search by task title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-group">
            <div className="select-wrapper">
              <Filter size={16} className="filter-icon" />
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div className="select-wrapper">
              <AlertCircle size={16} className="filter-icon" />
              <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
                <option value="All">All Priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tasks List/Grid */}
        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Fetching your tasks...</p>
          </div>
        ) : (
          <div className="tasks-grid">
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <div key={task._id} className="task-card">
                  <div className="task-card-top">
                    <span className={`badge-priority ${task.priority.toLowerCase()}`}>
                      {task.priority}
                    </span>
                    <div className="task-card-actions">
                      <button onClick={() => handleOpenModal(task)} aria-label="Edit task">
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => handleDelete(task._id)} aria-label="Delete task">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  
                  <h3 className="task-title">{task.title}</h3>
                  <p className="task-description">{task.description || "No description provided."}</p>
                  
                  <div className="task-card-bottom">
                    <div className="task-project">
                      <LayoutGrid size={14} />
                      <span>{task.projectId?.name || "Personal"}</span>
                    </div>
                    <span className={`badge-status ${task.status.toLowerCase().replace(" ", "-")}`}>
                      {task.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <CheckCircle2 size={48} />
                <h3>No tasks found</h3>
                <p>Try adjusting your search or filters.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modern Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content animate-in">
            <header className="modal-header">
              <h2>{isEditing ? "Update Task" : "Create New Task"}</h2>
              <button onClick={handleCloseModal} className="close-btn">×</button>
            </header>
            
            <form onSubmit={handleSubmit} className="task-form">
              <div className="form-field">
                <label>Task Title</label>
                <input
                  type="text"
                  placeholder="e.g., Design System Update"
                  required
                  value={currentTask.title}
                  onChange={(e) => setCurrentTask({ ...currentTask, title: e.target.value })}
                />
              </div>
              
              <div className="form-field">
                <label>Description (Optional)</label>
                <textarea
                  placeholder="Add some details about this task..."
                  value={currentTask.description}
                  onChange={(e) => setCurrentTask({ ...currentTask, description: e.target.value })}
                />
              </div>
              
              <div className="form-row">
                <div className="form-field">
                  <label>Priority</label>
                  <select
                    value={currentTask.priority}
                    onChange={(e) => setCurrentTask({ ...currentTask, priority: e.target.value })}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>
                <div className="form-field">
                  <label>Status</label>
                  <select
                    value={currentTask.status}
                    onChange={(e) => setCurrentTask({ ...currentTask, status: e.target.value })}
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className="form-field">
                <label>Associated Project</label>
                <select
                  value={currentTask.projectId}
                  onChange={(e) => setCurrentTask({ ...currentTask, projectId: e.target.value })}
                >
                  <option value="">No Project (Personal)</option>
                  {projects.map((p) => (
                    <option key={p._id} value={p._id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={handleCloseModal}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  {isEditing ? "Save Changes" : "Create Task"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;
