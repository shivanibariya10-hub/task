import React, { useState } from "react";
import axios from "axios";
import "./projects.css";

export default function Projects({ projects, setProjects }) {

  const [filter,setFilter] = useState("All");
  const [search,setSearch] = useState("");
  const [showModal,setShowModal] = useState(false);
  const [editIndex,setEditIndex] = useState(null);

  const emptyForm = { name:"", desc:"", members:"", tag:"", status:"Active", date:"" };
  const [form,setForm] = useState(emptyForm);

  // OPEN NEW PROJECT FORM
  function openNewProject(){
    setForm(emptyForm);
    setEditIndex(null);
    setShowModal(true);
  }

  // CREATE OR UPDATE PROJECT
  async function saveProject(){
    if(!form.name){
      alert("Project name required");
      return;
    }
    
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login first");
        return;
      }

      if(editIndex !== null){
        // UPDATE PROJECT
        const projectToEdit = projects[editIndex];
        const res = await axios.put(`http://localhost:5000/api/projects/${projectToEdit._id}`, form, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        const updated=[...projects];
        updated[editIndex]=res.data;
        setProjects(updated);
      } else {
        // CREATE NEW PROJECT
        const res = await axios.post("http://localhost:5000/api/projects", form, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProjects([...projects, res.data]);
      }
      
      setShowModal(false);
      setForm(emptyForm);
      setEditIndex(null);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Something went wrong");
    }
  }

  // DELETE PROJECT
  async function deleteProject(i){
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const projectToDelete = projects[i];
      await axios.delete(`http://localhost:5000/api/projects/${projectToDelete._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const updated=[...projects];
      updated.splice(i,1);
      setProjects(updated);
    } catch (error) {
      console.error(error);
      alert("Failed to delete project");
    }
  }

  // EDIT PROJECT
  function handleEdit(i){
    setForm({...projects[i]});
    setEditIndex(i);
    setShowModal(true);
  }

  // FILTER + SEARCH
  const filtered = projects.filter(p=>{
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter==="All" || p.status===filter;
    return matchSearch && matchFilter;
  });

  return(
    <div className="projects">

      <div className="projects-header">
        <div>
          <h2>Projects</h2>
          <p>Manage and organize your team projects</p>
        </div>

        <button
          type="button"
          className="new-btn"
          onClick={openNewProject}
        >
          + New Project
        </button>
      </div>

      <div className="projects-filter">
        <div className="tabs">
          <button onClick={()=>setFilter("All")}>All Projects</button>
          <button onClick={()=>setFilter("Active")}>Active</button>
          <button onClick={()=>setFilter("Completed")}>Completed</button>
          <button onClick={()=>setFilter("Archived")}>Archived</button>
        </div>

        <input
          placeholder="Search projects..."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
        />
      </div>

      <div className="projects-grid">
        {filtered.map((p,i)=>(
          <div className="project-card" key={i}>
            <div className="card-top">
              <h3>{p.name}</h3>
              <span className={`status ${p.status.toLowerCase()}`}>
                {p.status}
              </span>
            </div>
            <p className="desc">{p.desc}</p>
            <p className="date">📅 Due: {p.date || "Not set"}</p>
            <div className="card-bottom">
              <span>👥 {p.members} members</span>
              <span className="tag">{p.tag}</span>
            </div>
            <div className="actions">
              <button className="edit" onClick={()=>handleEdit(i)}>Edit</button>
              <button className="delete" onClick={()=>deleteProject(i)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="custom-modal">
          <div className="custom-modal-box">
            <h3>{editIndex !== null ? "Edit Project" : "Create New Project"}</h3>

            <input
              placeholder="Project Name"
              value={form.name}
              onChange={(e)=>setForm({...form,name:e.target.value})}
            />

            <textarea
              placeholder="Description"
              value={form.desc}
              onChange={(e)=>setForm({...form,desc:e.target.value})}
            />

            <input
              type="number"
              placeholder="Team Members"
              value={form.members}
              onChange={(e)=>setForm({...form,members:e.target.value})}
            />

            <input
              placeholder="Project Tag"
              value={form.tag}
              onChange={(e)=>setForm({...form,tag:e.target.value})}
            />

            <select
              value={form.status}
              onChange={(e)=>setForm({...form,status:e.target.value})}
            >
              <option>Active</option>
              <option>Completed</option>
              <option>Archived</option>
            </select>

            <input
              type="date"
              value={form.date}
              onChange={(e)=>setForm({...form,date:e.target.value})}
            />

            <div className="custom-modal-actions">
              <button type="button" onClick={()=>setShowModal(false)}>Cancel</button>
              <button type="button" onClick={saveProject}>Save</button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}