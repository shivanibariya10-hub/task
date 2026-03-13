import React, { useState } from "react";
import "./Users.css";

function Users() {

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Shivani Patel",
      email: "shivani@gmail.com",
      role: "Admin",
      status: "Active",
      tasks: 5,
      joined: "2026-02-01"
    },
    {
      id: 2,
      name: "Rahul Sharma",
      email: "rahul@gmail.com",
      role: "User",
      status: "Active",
      tasks: 3,
      joined: "2026-02-05"
    }
  ]);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "User"
  });

  const [notifications, setNotifications] = useState([]);

  // Add User
  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) return;

    const user = {
      id: Date.now(),
      ...newUser,
      status: "Active",
      tasks: 0,
      joined: new Date().toISOString().split("T")[0]
    };

    setUsers([...users, user]);
    setNotifications([...notifications, `New user ${user.name} added`]);
    setNewUser({ name: "", email: "", role: "User" });
  };

  // Delete
  const handleDelete = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  // Toggle Status
  const toggleStatus = (id) => {
    setUsers(users.map(user =>
      user.id === id
        ? { ...user, status: user.status === "Active" ? "Blocked" : "Active" }
        : user
    ));
  };

  // Change Role
  const toggleRole = (id) => {
    setUsers(users.map(user =>
      user.id === id
        ? { ...user, role: user.role === "Admin" ? "User" : "Admin" }
        : user
    ));
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase()) &&
    (roleFilter === "All" || user.role === roleFilter)
  );

  return (
    <div className="users-container">

      <h2>👥 Users Management</h2>

      {/* Summary Cards */}
      <div className="users-cards">
        <div className="card">Total: {users.length}</div>
        <div className="card">Active: {users.filter(u => u.status === "Active").length}</div>
        <div className="card">Blocked: {users.filter(u => u.status === "Blocked").length}</div>
        <div className="card">Admins: {users.filter(u => u.role === "Admin").length}</div>
      </div>

      {/* Add User */}
      <div className="add-user">
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <select
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
        >
          <option>User</option>
          <option>Admin</option>
        </select>
        <button onClick={handleAddUser}>➕ Add User</button>
      </div>

      {/* Search & Filter */}
      <div className="filters">
        <input
          type="text"
          placeholder="🔍 Search User..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select onChange={(e) => setRoleFilter(e.target.value)}>
          <option>All</option>
          <option>User</option>
          <option>Admin</option>
        </select>
      </div>

      {/* Users Table */}
      <table className="users-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Tasks</th>
            <th>Joined</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <span className={`role ${user.role}`}>
                  {user.role}
                </span>
              </td>
              <td>
                <span className={`status ${user.status}`}>
                  {user.status}
                </span>
              </td>
              <td>{user.tasks}</td>
              <td>{user.joined}</td>
              <td>
                <button onClick={() => toggleRole(user.id)}>🔄 Role</button>
                <button onClick={() => toggleStatus(user.id)}>🚫</button>
                <button onClick={() => handleDelete(user.id)}>🗑</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Notifications */}
      <div className="notifications">
        <h3>🔔 Notifications</h3>
        {notifications.length === 0 && <p>No Notifications</p>}
        {notifications.map((note, index) => (
          <p key={index}>{note}</p>
        ))}
      </div>

    </div>
  );
}

export default Users;