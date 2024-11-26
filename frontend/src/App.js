import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import Login from './Login';
import Signup from './Signup';
import EditAnnotation from './EditAnnotation';
import MainApp from './MainApp';
import PostLogin from './PostLogin';
import BrainResearch from './BrainResearch';
import BrainDataset from './BrainDataset';
import VerticalNavbar from './VerticalNavbar';
import { UserProvider } from './UserContext'; // Import UserProvider

function AppWrapper() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const NavbarWrapper = ({ children }) => {
    const location = useLocation();
    const hideNavbar = location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/';

    return (
      <div className="app-wrapper">
        {!hideNavbar && <VerticalNavbar />}
        <div className="app-content">{children}</div>
      </div>
    );
  };

  return (
    <UserProvider>
      <Router>
        <NavbarWrapper>
          <Routes>
            <Route path="/" element={<Login onLogin={handleLogin} />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/edit-annotation"
              element={isAuthenticated ? <EditAnnotation /> : <Navigate to="/login" />}
            />
            <Route path="/main-app" element={<MainApp />} />
            <Route path="/post-login" element={<PostLogin />} />
            <Route path="/brain-research" element={<BrainResearch />} />
            <Route path="/brain-dataset" element={<BrainDataset />} />
          </Routes>
        </NavbarWrapper>
      </Router>
    </UserProvider>
  );
}

export default AppWrapper;
