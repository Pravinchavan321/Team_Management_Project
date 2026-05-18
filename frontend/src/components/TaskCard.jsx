import React from 'react';
import { Trash2 } from 'lucide-react';

const TaskCard = ({ task, onDelete, onStatusChange }) => {
  const getStatusClass = (status) => {
    switch(status) {
      case 'Todo': return 'badge-todo';
      case 'In Progress': return 'badge-progress';
      case 'Completed': return 'badge-completed';
      default: return 'badge-todo';
    }
  };

  const getPriorityClass = (priority) => {
    switch(priority) {
      case 'Low': return 'badge-low';
      case 'Medium': return 'badge-medium';
      case 'High': return 'badge-high';
      default: return 'badge-medium';
    }
  };

  return (
    <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <h4 style={{ margin: 0, fontSize: '1.1rem' }}>{task.title}</h4>
        {onDelete && (
          <button onClick={onDelete} style={{ background: 'transparent', color: 'var(--text-muted)' }}>
            <Trash2 size={18} className="hover-danger" />
          </button>
        )}
      </div>
      {task.project && (
        <div style={{ fontSize: '0.8rem', color: 'var(--primary)' }}>
          Project: {task.project.title || 'Unknown'}
        </div>
      )}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <span className={`badge ${getStatusClass(task.status)}`}>{task.status}</span>
        <span className={`badge ${getPriorityClass(task.priority)}`}>{task.priority} Priority</span>
      </div>
      
      {onStatusChange && (
        <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border)', display: 'flex', gap: '0.5rem' }}>
          <select 
            value={task.status} 
            onChange={(e) => onStatusChange(task._id, e.target.value)}
            style={{ padding: '0.4rem', fontSize: '0.8rem' }}
          >
            <option value="Todo">Todo</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      )}
      <style>{`.hover-danger:hover { color: var(--danger); }`}</style>
    </div>
  );
};

export default TaskCard;
