import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import History from './components/History';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Notifications from './components/Notifications';
import NewProposals from './components/NewProposals';
import PresentProposals from './components/PresentProject';
import Reviews from './components/Reviews';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
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
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  const handleSignUpSuccess = () => {
    console.log('Sign-up successful!');
  };

  return (
    <Router>
      {isLoggedIn && <Navbar />}
      <Routes>
        <Route path="/signup" element={<SignUp onSignUpSuccess={handleSignUpSuccess} />} />
        <Route path="/" element={!isLoggedIn ? <Login onLoginSuccess={handleLoginSuccess} /> : <Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={isLoggedIn ? <Dashboard onLogout={handleLogout} /> : <Navigate to="/" />} />
        <Route path="/history" element={<History/>}></Route>
        <Route path="/home" element={<Home />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/newproposals" element={<NewProposals />} />
        <Route path="/presentproposals" element={<PresentProposals />} />
        <Route path="/reviews" element={<Reviews />} />
      </Routes>
    </Router>
  );
};

export default App;
