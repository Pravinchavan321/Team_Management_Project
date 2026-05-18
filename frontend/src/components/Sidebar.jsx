import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FolderKanban, CheckSquare, LogOut, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ open, toggleSidebar }) => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className={`sidebar ${open ? 'open' : ''}`}>
      <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem', color: 'white' }}>
            TF
          </div>
          <h2 style={{ color: 'white', margin: 0 }}>TeamFlow</h2>
        </div>
        <button className="close-btn" onClick={toggleSidebar} style={{ background: 'none', color: 'white' }}>
          <X size={20} />
        </button>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <NavLink to="/" onClick={toggleSidebar} className={({isActive}) => isActive ? "nav-item active" : "nav-item"} end>
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/projects" onClick={toggleSidebar} className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <FolderKanban size={20} />
          <span>Projects</span>
        </NavLink>
        <NavLink to="/tasks" onClick={toggleSidebar} className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <CheckSquare size={20} />
          <span>Tasks</span>
        </NavLink>
      </div>

      <div style={{ marginTop: 'auto', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
        <div style={{ padding: '0.5rem', marginBottom: '0.5rem', color: 'var(--text-main)', fontSize: '0.9rem' }}>
          Logged in as <br/><strong style={{color: 'var(--primary)'}}>{user?.name}</strong>
        </div>
        <button onClick={handleLogout} className="nav-item" style={{ width: '100%', background: 'transparent', border: 'none', textAlign: 'left' }}>
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
      <style>{`
        .close-btn { display: none; }
        @media (max-width: 768px) { .close-btn { display: block; } }
      `}</style>
    </div>
  );
};

export default Sidebar;
