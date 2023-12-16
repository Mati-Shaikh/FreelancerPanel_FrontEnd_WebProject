import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from './Delta.png'; // Replace with the actual path to your logo

const SignUp = ({ onSignUpSuccess }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    FullName: '',
    Email: '',
    Password: '',
    Specialities: [], // Ensure Specialities is initialized as an empty array
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    if (e.target.name === 'Specialities') {
      setFormData({ ...formData, Specialities: e.target.value.split(',') });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSignUp = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log('Response:', response);
      const data = await response.json();

      if (response.ok) {
        setErrorMessage(data.message || 'Signup Success');
        onSignUpSuccess();
        navigate('/login'); // Navigate back to the login page after successful signup
      } else {
        console.error('Signup failed:', data.message);
        setErrorMessage(data.message || 'Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      setErrorMessage('Error during signup. Please try again later.');
    }
  };

  return (
    <div className="signup-container">
<h2>Sign Up</h2>
         {/* <img src={logo} alt="Logo" className="logo"/> {/* Include the logo here */}
       

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <Form className='form'>
        <Form.Group  className='label' controlId="formBasicFullName">
          <Form.Label  className='label' >Full Name:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your full name"
            name="FullName"
            value={formData.FullName}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group  className='label' controlId="formBasicEmail">
          <Form.Label  className='label' >Email:</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            name="Email"
            value={formData.Email}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group  className='label' controlId="formBasicPassword">
          <Form.Label  className='label' >Password:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            name="Password"
            value={formData.Password}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group  className='label' controlId="formBasicSpecialities">
          <Form.Label  className='label' >Specialities:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your specialities (comma-separated)"
            name="Specialities"
            value={formData.Specialities.join(',')}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary"  className='button' size="sm" onClick={handleSignUp}>
          Sign Up
        </Button>

        <Link to="/login" className="login-link">
          Already have an account? Log In
        </Link>
      </Form>
    </div>
  );
};

export default SignUp;
