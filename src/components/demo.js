// Navbar.js
import {useEffect} from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import logo from './Delta.png';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';

import { faPowerOff,faUserPen,faTrash } from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ handleNavLinkClick,handleModalToggle }) => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogout = () => {
    // Remove the token from local storage
    localStorage.removeItem('token');
    // Navigate to the login page
    //navigate('/login');
  };
  useEffect(() => {
    // Navigate to the login page after the token is removed
    navigate('/login');
  }, [navigate]);
  
  
  return (
    <nav>
      <img src={logo} alt="Logo" className="logo" />

      <div className="links">
        <a href="#" onClick={() => handleNavLinkClick('Notifications')}>
          Notifications
        </a>
        <a href="#" onClick={() => handleNavLinkClick('NewProposals')}>
          New Proposals
        </a>
        <a href="#" onClick={() => handleNavLinkClick('History')}>
          History
        </a>
        <a href="#" onClick={() => handleNavLinkClick('PresentProjects')}>
          Present Projects
        </a>
        <a href="#" onClick={() => handleNavLinkClick('Reviews')}>
          Reviews
        </a>
      </div>

      {/* Using Bootstrap SplitButton */}
      <Dropdown as={ButtonGroup}>
        <Button variant="primary" style={{ backgroundColor: '#3533CD' }}>
          <FontAwesomeIcon icon={faUser} className="iconProfile" />
        </Button>

        <Dropdown.Toggle split variant="primary" id="dropdown-split-basic" />

        <Dropdown.Menu>
          {/* Add your dropdown items here */}
          <Dropdown.Item onClick={handleModalToggle}><FontAwesomeIcon icon={faUser} /> View</Dropdown.Item>
          <Dropdown.Item><FontAwesomeIcon icon={faUserPen} /> Edit</Dropdown.Item>
          <Dropdown.Item><FontAwesomeIcon icon={faTrash} /> Delete</Dropdown.Item>
          <Dropdown.Item onClick={handleLogout}><FontAwesomeIcon icon={faPowerOff} /> Logout</Dropdown.Item>
          {/* Add more items as needed */}
        </Dropdown.Menu>
      </Dropdown>
    </nav>
  );
};

export default Navbar;
