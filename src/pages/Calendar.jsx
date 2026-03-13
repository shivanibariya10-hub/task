import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon,
  Plus,
  Clock,
  AlertCircle
} from "lucide-react";
import "./calendar.css";

const Calendar = ({ projects }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTasks, setSelectedTasks] = useState([]);

  // Constants for calendar
  const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const MONTHS = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  useEffect(() => {
    fetchTasks();
    // Set initial selected tasks for today
    const today = new Date();
    setSelectedTasks(getTasksForDay(today.getDate(), today.getMonth(), today.getFullYear()));
  }, []);

  const handleDayClick = (dateObj) => {
    const { day, month, year } = dateObj;
    const clickedDate = new Date(year, month, day);
    setSelectedDate(clickedDate);
    setSelectedTasks(getTasksForDay(day, month, year));
  };

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/tasks", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks for calendar", error);
    } finally {
      setLoading(false);
    }
  };

  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const days = [];
    
    // Fill previous month trailing days
    const prevMonthDays = daysInMonth(year, month - 1);
    const startDay = firstDayOfMonth(year, month);
    for (let i = startDay - 1; i >= 0; i--) {
      days.push({
        day: prevMonthDays - i,
        month: month - 1,
        year: year,
        isCurrentMonth: false
      });
    }

    // Fill current month days
    const currentMonthDaysCount = daysInMonth(year, month);
    for (let i = 1; i <= currentMonthDaysCount; i++) {
      days.push({
        day: i,
        month: month,
        year: year,
        isCurrentMonth: true
      });
    }

    // Fill next month leading days
    const remainingDays = 42 - days.length; // 6 rows of 7 days
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        day: i,
        month: month + 1,
        year: year,
        isCurrentMonth: false
      });
    }

    return days;
  }, [currentDate]);

  const monthlyStats = useMemo(() => {
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const monthTasks = tasks.filter(task => {
      const d = new Date(task.createdAt);
      return d.getMonth() === month && d.getFullYear() === year;
    });

    return {
      total: monthTasks.length,
      completed: monthTasks.filter(t => t.status === 'completed').length,
      highPriority: monthTasks.filter(t => t.priority === 'high' || t.priority === 'critical').length
    };
  }, [tasks, currentDate]);

  const getTasksForDay = (day, month, year) => {
    return tasks.filter(task => {
      const d = new Date(task.createdAt);
      return d.getDate() === day && d.getMonth() === month && d.getFullYear() === year;
    });
  };

  return (
    <div className="calendar-page">
      <div className="calendar-container">
        {/* Header */}
        <div className="calendar-header">
          <div className="header-left">
            <div className="calendar-title-group">
              <div className="icon-wrapper">
                <CalendarIcon size={24} />
              </div>
              <div>
                <h1>Calendar</h1>
                <p className="subtitle">View and manage your tasks over time</p>
              </div>
            </div>
          </div>
          <div className="header-right">
            <div className="month-nav">
              <button onClick={prevMonth} className="nav-btn">
                <ChevronLeft size={20} />
              </button>
              <h2 className="current-month-label">
                {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              <button onClick={nextMonth} className="nav-btn">
                <ChevronRight size={20} />
              </button>
            </div>
            <button className="today-btn" onClick={() => setCurrentDate(new Date())}>
              Today
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="calendar-card animate-in">
          <div className="calendar-grid-header">
            {DAYS.map(day => (
              <div key={day} className="day-name">{day}</div>
            ))}
          </div>
          <div className="calendar-grid">
            {calendarDays.map((dateObj, idx) => {
              const dayTasks = getTasksForDay(dateObj.day, dateObj.month, dateObj.year);
              const isToday = 
                dateObj.day === new Date().getDate() && 
                dateObj.month === new Date().getMonth() && 
                dateObj.year === new Date().getFullYear();

              return (
                <div 
                  key={idx} 
                  className={`day-cell ${!dateObj.isCurrentMonth ? 'inactive' : ''} ${isToday ? 'today' : ''} ${selectedDate.getDate() === dateObj.day && selectedDate.getMonth() === dateObj.month ? 'selected' : ''}`}
                  onClick={() => handleDayClick(dateObj)}
                >
                  <div className="day-number">{dateObj.day}</div>
                  <div className="day-tasks">
                    {dayTasks.slice(0, 3).map(task => (
                      <div key={task._id} className={`calendar-task-tag priority-${task.priority}`}>
                        <span className="task-dot"></span>
                        <span className="task-name">{task.title}</span>
                      </div>
                    ))}
                    {dayTasks.length > 3 && (
                      <div className="more-tasks">+{dayTasks.length - 3} more</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Section: Details & Legend */}
        <div className="calendar-footer animate-in">
          <div className="day-details-panel">
            <div className="details-header">
              <h3>
                <Clock size={18} />
                Details for {selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </h3>
            </div>
            <div className="details-content">
              {selectedTasks.length > 0 ? (
                <div className="selected-tasks-list">
                  {selectedTasks.map(task => (
                    <div key={task._id} className="selected-task-item">
                      <div className={`priority-indicator ${task.priority}`}></div>
                      <div className="task-info">
                        <h4>{task.title}</h4>
                        <p className="task-desc">{task.description || "No description provided"}</p>
                      </div>
                      <div className={`status-pill ${task.status}`}>{task.status}</div>
                    </div>
                  ))}
                  <button className="add-task-inline">
                    <Plus size={16} /> Add Another Task
                  </button>
                </div>
              ) : (
                <div className="empty-details-compact">
                  <div className="empty-icon-wrapper">
                    <AlertCircle size={32} />
                  </div>
                  <div className="empty-text">
                    <p>No tasks scheduled for this day</p>
                    <button className="add-task-link-small">
                      <Plus size={14} /> Create Task
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="stats-legend-container">
            <div className="monthly-stats-panel">
              <h3>Monthly Overview</h3>
              <div className="mini-stats">
                <div className="mini-stat">
                  <span className="stat-label">Total</span>
                  <span className="stat-value">{monthlyStats.total}</span>
                </div>
                <div className="mini-stat">
                  <span className="stat-label">Done</span>
                  <span className="stat-value">{monthlyStats.completed}</span>
                </div>
                <div className="mini-stat">
                  <span className="stat-label">Urgent</span>
                  <span className="stat-value">{monthlyStats.highPriority}</span>
                </div>
              </div>
            </div>

            <div className="legend-panel">
              <h3>Priority Legend</h3>
              <div className="legend-items">
                <div className="legend-item">
                  <span className="dot critical"></span>
                  <span>Critical</span>
                </div>
                <div className="legend-item">
                  <span className="dot high"></span>
                  <span>High</span>
                </div>
                <div className="legend-item">
                  <span className="dot medium"></span>
                  <span>Medium</span>
                </div>
                <div className="legend-item">
                  <span className="dot low"></span>
                  <span>Low</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
