import React, { useState, useEffect } from 'react';
import { getProjects, createProject, deleteProject } from '../services/projectService';
import ProjectCard from '../components/ProjectCard';
import Loader from '../components/Loader';
import { Plus } from 'lucide-react';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '', status: 'Planning' });

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await createProject(formData);
      setShowModal(false);
      setFormData({ title: '', description: '', status: 'Planning' });
      fetchProjects();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(id);
        fetchProjects();
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h2>Projects</h2>
        <button className="btn-primary" onClick={() => setShowModal(true)}>
          <Plus size={20} /> New Project
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
          <h3>No projects yet</h3>
          <p style={{ marginTop: '0.5rem' }}>Create your first project to get started.</p>
        </div>
      ) : (
        <div className="grid-cards">
          {projects.map(p => (
            <ProjectCard key={p._id} project={p} onDelete={() => handleDelete(p._id)} />
          ))}
        </div>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="glass-panel modal-content animate-fade-in">
            <h3 style={{ marginBottom: '1.5rem' }}>Create Project</h3>
            <form onSubmit={handleCreate}>
              <div className="form-group">
                <label>Title</label>
                <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} required rows={3}></textarea>
              </div>
              <div className="form-group">
                <label>Status</label>
                <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}>
                  <option value="Planning">Planning</option>
                  <option value="Active">Active</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                <button type="button" className="btn-danger" onClick={() => setShowModal(false)} style={{ flex: 1, background: 'transparent', border: '1px solid var(--border)', color: 'white' }}>Cancel</button>
                <button type="submit" className="btn-primary" style={{ flex: 1, justifyContent: 'center' }}>Create</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
