import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  { name: "Jan", TasksCompleted: 30, TasksPending: 15 },
  { name: "Feb", TasksCompleted: 45, TasksPending: 20 },
  { name: "Mar", TasksCompleted: 60, TasksPending: 25 },
  { name: "Apr", TasksCompleted: 50, TasksPending: 10 },
  { name: "May", TasksCompleted: 75, TasksPending: 20 },
  { name: "Jun", TasksCompleted: 90, TasksPending: 15 },
];

const DashboardChart = () => {
  return (
    <div style={{ width: "100%", height: 350, background: "#fff", borderRadius: "12px", padding: "20px", boxShadow: "0 4px 15px rgba(0,0,0,0.1)" }}>
      <h3 style={{ marginBottom: "20px", color: "#333", fontWeight: "600" }}>Monthly Task Overview</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="TasksCompleted" stroke="#4CAF50" strokeWidth={3} activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="TasksPending" stroke="#FF5722" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashboardChart;
