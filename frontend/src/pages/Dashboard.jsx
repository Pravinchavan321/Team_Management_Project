import React, { useState, useEffect } from 'react';
import { getProjects } from '../services/projectService';
import { getTasks } from '../services/taskService';
import ProjectCard from '../components/ProjectCard';
import TaskCard from '../components/TaskCard';
import Loader from '../components/Loader';
import { FolderKanban, CheckSquare, Clock, CheckCircle } from 'lucide-react';

const StatCard = ({ title, value, icon, color }) => (
  <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
    <div style={{ background: color, padding: '1rem', borderRadius: '1rem', color: 'white' }}>
      {icon}
    </div>
    <div>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.25rem' }}>{title}</p>
      <h3 style={{ fontSize: '1.5rem', margin: 0 }}>{value}</h3>
    </div>
  </div>
);

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projRes, taskRes] = await Promise.all([getProjects(), getTasks()]);
        setProjects(projRes);
        setTasks(taskRes);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <Loader />;

  const todoTasks = tasks.filter(t => t.status === 'Todo');
  const inProgressTasks = tasks.filter(t => t.status === 'In Progress');
  const completedTasks = tasks.filter(t => t.status === 'Completed');

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h2>Dashboard</h2>
      </div>

      <div className="stat-grid">
        <StatCard title="Total Projects" value={projects.length} icon={<FolderKanban size={24} />} color="var(--primary)" />
        <StatCard title="Total Tasks" value={tasks.length} icon={<CheckSquare size={24} />} color="#8B5CF6" />
        <StatCard title="In Progress" value={inProgressTasks.length} icon={<Clock size={24} />} color="var(--warning)" />
        <StatCard title="Completed" value={completedTasks.length} icon={<CheckCircle size={24} />} color="var(--success)" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        <div>
          <div className="page-header" style={{ marginBottom: '1rem' }}>
            <h3>Recent Projects</h3>
          </div>
          {projects.length === 0 ? (
            <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>No projects found.</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {projects.slice(0, 3).map(p => <ProjectCard key={p._id} project={p} />)}
            </div>
          )}
        </div>
        <div>
          <div className="page-header" style={{ marginBottom: '1rem' }}>
            <h3>Recent Tasks</h3>
          </div>
          {tasks.length === 0 ? (
            <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>No tasks found.</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {tasks.slice(0, 3).map(t => <TaskCard key={t._id} task={t} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
