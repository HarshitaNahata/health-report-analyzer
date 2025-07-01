// App.jsx
import React, { useState } from 'react';
import Login from './views/Login';
import Dashboard from './views/Dashboard';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <div className="App">
      {isAuthenticated ? (
        <Dashboard />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
