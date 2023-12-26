import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import History from './components/History';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check for token in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    console.log('Login successful!');
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    console.log('Logout successful!');
    localStorage.removeItem('token'); // Remove token from localStorage
    setIsLoggedIn(false);
  };

  const handleSignUpSuccess = () => {
    console.log('Sign-up successful!');
    // Handle sign-up success logic here
  };

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp onSignUpSuccess={handleSignUpSuccess} />} />
        <Route
          path="/"
          element={!isLoggedIn ? <Login onLoginSuccess={handleLoginSuccess} /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/dashboard"
          element={isLoggedIn ? <Dashboard onLogout={handleLogout} /> : <Navigate to="/" />}
        />
        <Route
          path="/history"
          element={isLoggedIn ? <History /> : <Navigate to="/" />}
        />
        {/* Other routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
