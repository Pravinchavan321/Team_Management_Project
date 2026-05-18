import React from 'react';
import { Trash2 } from 'lucide-react';

const ProjectCard = ({ project, onDelete }) => {
  const getStatusClass = (status) => {
    switch(status) {
      case 'Planning': return 'badge-todo';
      case 'Active': return 'badge-progress';
      case 'Completed': return 'badge-completed';
      default: return 'badge-todo';
    }
  };

  return (
    <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <h4 style={{ margin: 0, fontSize: '1.1rem' }}>{project.title}</h4>
        {onDelete && (
          <button onClick={onDelete} style={{ background: 'transparent', color: 'var(--text-muted)' }}>
            <Trash2 size={18} className="hover-danger" />
          </button>
        )}
      </div>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {project.description}
      </p>
      <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.5rem', borderTop: '1px solid var(--border)' }}>
        <span className={`badge ${getStatusClass(project.status)}`}>{project.status}</span>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          {new Date(project.createdAt).toLocaleDateString()}
        </span>
      </div>
      <style>{`.hover-danger:hover { color: var(--danger); }`}</style>
    </div>
  );
};

export default ProjectCard;
