import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCreditCard,faHouse, faUser,faFileAlt, faBell, faCodeBranch, faBusinessTime, faStar } from '@fortawesome/free-solid-svg-icons';
import logo from './Delta.png';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import { faPowerOff, faUserPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const Navbar = ({ handleNavLinkClick, handleModalToggle }) => {
  const navigate = useNavigate();
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({
    FullName: '',
    Email: '',
    // Add more fields as needed
  });

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setFormData({
      FullName: '',
      Email: '',
      // Initialize other fields
    });
  };

  const handleEditProfile = async () => {
    try {
      // Perform API call to update user profile
      const response = await fetch('http://localhost:3000/api/Freelancer/updateFreelancer', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.getItem('token'),
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Your profile has been updated.');
        setShowEditModal(false);
      } else {
        const data = await response.json();
        alert(`Failed to update profile: ${data.message}`);
      }
    } catch (error) {
      console.error('Error during profile update:', error);
      alert('Error during profile update. Please try again later.');
    }
  };

  const handleDeleteAccount = async () => {
    try {
      // Perform API call to delete the user
      const response = await fetch('http://localhost:3000/api/Freelancer/DeleteFreelancer', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.getItem('token'),
        },
      });

      if (response.ok) {
        alert('Your account has been deleted.');
        localStorage.removeItem('token'); // Remove token from localStorage
        navigate('/login'); // Navigate to the login page
      } else {
        const data = await response.json();
        alert(`Failed to delete account: ${data.message}`);
      }
    } catch (error) {
      console.error('Error during account deletion:', error);
      alert('Error during account deletion. Please try again later.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    navigate('/login'); // Navigate to the login page
  };

  // Other functions...

  return (
    <nav>
      <img src={logo} alt="Logo" className="logo" />
      <div className="links">
      <a href="#" onClick={() => handleNavLinkClick('Home')}>
          <FontAwesomeIcon icon={faHouse} className='logos'/> Home
        </a>
        <a href="#" onClick={() => handleNavLinkClick('Notifications')}>
          <FontAwesomeIcon icon={faBell} className='logos'/> Notifications
        </a>
        <a href="#" onClick={() => handleNavLinkClick('NewProposals')}>
        <FontAwesomeIcon icon={faFileAlt} className='logos'/> New Proposals
        </a>
        <a href="#" onClick={() => handleNavLinkClick('History')}>
        <FontAwesomeIcon icon={faCreditCard} className='logos'/> PaymentHistory
        </a>
        <a href="#" onClick={() => handleNavLinkClick('PresentProjects')}>
          <FontAwesomeIcon icon={faBusinessTime} className='logos'/> Present Projects
        </a>
        <a href="#" onClick={() => handleNavLinkClick('Reviews')}>
          <FontAwesomeIcon icon={faStar} className='logos'/> Reviews
        </a>
      </div>

      {/* Using Bootstrap SplitButton */}
      <Dropdown as={ButtonGroup}>
        <Button variant="primary" style={{ backgroundColor: '#3533CD' }}>
          <FontAwesomeIcon icon={faUser} className="iconProfile" />
        </Button>

        <Dropdown.Toggle split variant="primary" id="dropdown-split-basic" />

        <Dropdown.Menu>
          <Dropdown.Item onClick={handleModalToggle}>
            <FontAwesomeIcon icon={faUser} className='logos_1'/> View
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setShowEditModal(true)}>
            <FontAwesomeIcon icon={faUserPen} className='logos_1'/> Edit
          </Dropdown.Item>
          <Dropdown.Item onClick={handleDeleteAccount}>
            <FontAwesomeIcon icon={faTrash} className='logos_1' /> Delete
          </Dropdown.Item>
          <Dropdown.Item onClick={handleLogout}>
            <FontAwesomeIcon icon={faPowerOff} className='logos_1' /> Logout
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      {/* Edit Profile Modal */}
      <Modal show={showEditModal} onHide={handleCloseEditModal} className='update_modal'>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formFullName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your full name"
                value={formData.FullName}
                onChange={(e) => setFormData({ ...formData, FullName: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={formData.Email}
                onChange={(e) => setFormData({ ...formData, Email: e.target.value })}
              />
            </Form.Group>
            {/* Add more form groups for other fields if needed */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditProfile}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </nav>
  );
};

export default Navbar;
