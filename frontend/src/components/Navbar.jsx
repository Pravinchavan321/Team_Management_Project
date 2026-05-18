import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Menu } from 'lucide-react';

const Navbar = ({ toggleSidebar }) => {
  const { user } = useAuth();
  return (
    <div className="glass-panel" style={{ padding: '1rem 2rem', margin: '0 0 2rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button className="menu-btn" style={{ background: 'transparent', color: 'white' }} onClick={toggleSidebar}>
          <Menu />
        </button>
        <h3 style={{ margin: 0 }}>Welcome back, {user?.name}</h3>
      </div>
      <div>
        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
          {user?.name?.charAt(0).toUpperCase()}
        </div>
      </div>
      <style>{`
        .menu-btn { display: none; }
        @media (max-width: 768px) { .menu-btn { display: block; } }
      `}</style>
    </div>
  );
};

export default Navbar;
