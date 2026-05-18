import React from 'react';
import { Loader2 } from 'lucide-react';

const Loader = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', minHeight: '200px' }}>
      <Loader2 className="animate-spin" size={40} color="var(--primary)" style={{ animation: 'spin 1s linear infinite' }} />
      <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default Loader;
