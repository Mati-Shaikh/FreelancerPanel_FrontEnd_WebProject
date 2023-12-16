import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import logo from './Delta.png'; // Replace with the actual path to your logo


const Login = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    Email: '',  // Updated from 'username' to 'Email'
    Password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log('Response:', response);
      const data = await response.json();
      console.log(data._id);

      if (response.ok) {
        localStorage.setItem('token', data.token);
        console.log(data.token);
        setErrorMessage(data.message || 'Login Success');
        onLoginSuccess();
      } else {
        console.error('Login failed:', data.message);
        setErrorMessage(data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('Error during login. Please try again later.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
         {/* <img src={logo} alt="Logo" className="logo"/> Include the logo here
       */}

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <Form className='form'>
        <Form.Group className='label' controlId="formBasicEmail">
          <Form.Label className='label' >Email:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your email"
            name="Email"
            value={formData.Email}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className='label' controlId="formBasicPassword">
          <Form.Label className='label'>Password:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            name="Password"
            value={formData.Password}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" className='button' onClick={handleLogin}>
          Login
        </Button>

        <Link to="/signup" className="signup-link">
          Don't have an account? Sign Up
        </Link>

        <br />
      </Form>
    </div>
  );
};

export default Login;
