import React, { useState, useEffect } from 'react';
import { getTasks, createTask, deleteTask, updateTask } from '../services/taskService';
import { getProjects } from '../services/projectService';
import TaskCard from '../components/TaskCard';
import Loader from '../components/Loader';
import { Plus, Filter } from 'lucide-react';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState('All');
  const [formData, setFormData] = useState({ title: '', description: '', status: 'Todo', priority: 'Medium', project: '' });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [taskData, projData] = await Promise.all([getTasks(), getProjects()]);
      setTasks(taskData);
      setProjects(projData);
      if (projData.length > 0) {
        setFormData(prev => ({ ...prev, project: projData[0]._id }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await createTask(formData);
      setShowModal(false);
      setFormData({ title: '', description: '', status: 'Todo', priority: 'Medium', project: projects.length > 0 ? projects[0]._id : '' });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(id);
        fetchData();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateTask(id, { status: newStatus });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <Loader />;

  const filteredTasks = filter === 'All' ? tasks : tasks.filter(t => t.status === filter);

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h2>Tasks</h2>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <select value={filter} onChange={(e) => setFilter(e.target.value)} style={{ width: 'auto' }}>
            <option value="All">All Status</option>
            <option value="Todo">Todo</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <button className="btn-primary" onClick={() => setShowModal(true)}>
            <Plus size={20} /> New Task
          </button>
        </div>
      </div>

      {tasks.length === 0 ? (
        <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
          <h3>No tasks yet</h3>
          {projects.length === 0 ? (
            <p style={{ marginTop: '0.5rem' }}>You need to create a project first before creating tasks.</p>
          ) : (
            <p style={{ marginTop: '0.5rem' }}>Create your first task to get started.</p>
          )}
        </div>
      ) : (
        <div className="grid-cards">
          {filteredTasks.map(t => (
            <TaskCard key={t._id} task={t} onDelete={() => handleDelete(t._id)} onStatusChange={handleStatusChange} />
          ))}
        </div>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="glass-panel modal-content animate-fade-in">
            <h3 style={{ marginBottom: '1.5rem' }}>Create Task</h3>
            {projects.length === 0 ? (
              <div>
                <p>You need to create a project first.</p>
                <button className="btn-primary" style={{ marginTop: '1rem' }} onClick={() => setShowModal(false)}>Close</button>
              </div>
            ) : (
              <form onSubmit={handleCreate}>
                <div className="form-group">
                  <label>Title</label>
                  <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label>Project</label>
                  <select value={formData.project} onChange={(e) => setFormData({...formData, project: e.target.value})} required>
                    {projects.map(p => <option key={p._id} value={p._id}>{p.title}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}>
                    <option value="Todo">Todo</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Priority</label>
                  <select value={formData.priority} onChange={(e) => setFormData({...formData, priority: e.target.value})}>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                  <button type="button" className="btn-danger" onClick={() => setShowModal(false)} style={{ flex: 1, background: 'transparent', border: '1px solid var(--border)', color: 'white' }}>Cancel</button>
                  <button type="submit" className="btn-primary" style={{ flex: 1, justifyContent: 'center' }}>Create</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;
