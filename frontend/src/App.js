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



function AppWrapper() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true); 
  };

 
  const NavbarWrapper = ({ children }) => {
    const location = useLocation(); 
    const hideNavbar = location.pathname === '/login' || location.pathname === '/signup';

    return (
      <div className="app-wrapper">
        {/* Render VerticalNavbar only if not on login or signup pages */}
        {!hideNavbar && <VerticalNavbar />}

        {/* Main content area */}
        <div className="app-content">{children}</div>
      </div>
    );
  };

  return (
    <Router>
      <NavbarWrapper>
        <Routes>
          {/* Login route */}
          <Route path="/" element={<Login onLogin={handleLogin} />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />

          {/* Signup route */}
          <Route path="/signup" element={<Signup />} />

          {/* Protected route: EditAnnotation */}
          <Route
            path="/edit-annotation"
            element={
              isAuthenticated ? (
                <EditAnnotation />
              ) : (
                <Navigate to="/login" /> // Redirect to login if not authenticated
              )
            }
          />

          {/* Public routes */}
          <Route path="/main-app" element={<MainApp />} />
          <Route path="/post-login" element={<PostLogin />} /> {/* Page with buttons */}
          <Route path="/brain-research" element={<BrainResearch />} />
          <Route path="/brain-dataset" element={<BrainDataset />} />
        </Routes>
      </NavbarWrapper>
    </Router>
  );
}

export default AppWrapper;
