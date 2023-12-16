import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

const App = () => {
  const handleLoginSuccess = () => {
    // Implement your logic for handling login success
    console.log('Login successful! Redirecting to dashboard...');
    // Add your logic to redirect the user or perform other actions
  };

  const handleSignUpSuccess = () => {
    // Implement your logic for handling sign-up success
    console.log('Sign-up successful! Redirecting to login...');
    // You can add logic to redirect the user or perform other actions
  };

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp onSignUpSuccess={handleSignUpSuccess} />} />
        <Route
          path="/login"
          element={<Login onLoginSuccess={handleLoginSuccess} />}
        />
        <Route
          path="/Dashboard"
          element={<Dashboard/>} />
      </Routes>
    </Router>
  );
};

export default App;
