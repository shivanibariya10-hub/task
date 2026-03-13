import React from "react";
import {
  PieChart, Pie, Cell, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  ResponsiveContainer, LineChart, Line
} from "recharts";
import { FaTasks, FaCheckCircle, FaClock, FaUsers } from "react-icons/fa";
import "./Reports.css";

const Reports = () => {

  // Dummy Data (Later you can connect with real data)
  const taskStatusData = [
    { name: "Completed", value: 68 },
    { name: "Pending", value: 25 },
    { name: "In Progress", value: 7 },
  ];

  const monthlyData = [
    { month: "Jan", tasks: 40 },
    { month: "Feb", tasks: 30 },
    { month: "Mar", tasks: 50 },
    { month: "Apr", tasks: 70 },
    { month: "May", tasks: 90 },
    { month: "Jun", tasks: 75 },
    { month: "Jul", tasks: 60 },
    { month: "Aug", tasks: 95 },
    { month: "Sep", tasks: 110 },
    { month: "Oct", tasks: 85 },
    { month: "Nov", tasks: 70 },
    { month: "Dec", tasks: 100 },
  ];

  const userPerformance = [
    { month: "Jan", John: 30, Emily: 40, Sarah: 35 },
    { month: "Feb", John: 50, Emily: 35, Sarah: 60 },
    { month: "Mar", John: 40, Emily: 60, Sarah: 50 },
    { month: "Apr", John: 70, Emily: 45, Sarah: 80 },
  ];

  const COLORS = ["#22c55e", "#f97316", "#3b82f6"];

  return (
    <div className="reports-container">

      <h2 className="page-title">Reports & Analytics</h2>

      {/* Summary Cards */}
      <div className="cards">
        <div className="card blue">
          <FaTasks className="icon" />
          <div>
            <p>Total Tasks</p>
            <h3>1,250</h3>
          </div>
        </div>

        <div className="card green">
          <FaCheckCircle className="icon" />
          <div>
            <p>Completed</p>
            <h3>850</h3>
          </div>
        </div>

        <div className="card orange">
          <FaClock className="icon" />
          <div>
            <p>Pending</p>
            <h3>320</h3>
          </div>
        </div>

        <div className="card purple">
          <FaUsers className="icon" />
          <div>
            <p>Active Users</p>
            <h3>42</h3>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts">

        {/* Pie Chart */}
        <div className="chart-box">
          <h4>Task Status Overview</h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={taskStatusData}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {taskStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="chart-box">
          <h4>Tasks Created Per Month</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="tasks" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* Line Chart */}
      <div className="chart-box full">
        <h4>User Performance</h4>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={userPerformance}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="John" stroke="#3b82f6" />
            <Line type="monotone" dataKey="Emily" stroke="#a855f7" />
            <Line type="monotone" dataKey="Sarah" stroke="#22c55e" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Table */}
      <div className="table-box">
        <h4>Task Report</h4>
        <table>
          <thead>
            <tr>
              <th>Task Name</th>
              <th>Assigned To</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Created Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Design Homepage</td>
              <td>John</td>
              <td className="completed">Completed</td>
              <td>High</td>
              <td>01/05/2024</td>
            </tr>
            <tr>
              <td>Fix Bug</td>
              <td>Emily</td>
              <td className="pending">Pending</td>
              <td>Medium</td>
              <td>05/08/2024</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Reports;