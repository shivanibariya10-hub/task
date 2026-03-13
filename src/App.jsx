import { Routes, Route } from "react-router-dom";

import AppNavbar from "./components/navbar";


import Home from "./pages/home";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import AddTask from "./pages/AddTask";

import PrivateRoute from "./components/PrivateRoute";
import "./styles/home.css"; 

import Contact from "./components/Contact";
import Advertisement from "./components/Advertisement";
 // top me Advertisement.jsx me
import About from "./pages/About";
import Profile from "./components/Profile";

import AdminDashboard from "./pages/admin/AdminDashboard";
import Users from "./pages/admin/Users";
import Tasks from "./pages/admin/Tasks";
import Reports from "./pages/admin/Reports";

function App() {
  return (
    <>
      <AppNavbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
         <Route path="/contact" element={<Contact />} />
         <Route path="/about" element={<About />} />
          <Route path="/auth" element={<Auth />} />  {/* CTA button target */}
         <Route path="/dashboard" element={<Dashboard />} />
         <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/tasks" element={<Tasks />} />
        <Route path="/admin/reports"element={<Reports/>}/>
         <Route path="profile" element={<Profile />} />    
          
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />


        <Route
          path="/add-task"
          element={
            <PrivateRoute>
              <AddTask />
            </PrivateRoute>
          }
        />
      </Routes>

    
    </>
  );
}

export default App;
