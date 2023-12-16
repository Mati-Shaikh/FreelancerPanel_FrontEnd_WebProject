import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import logo from './Delta.png';

const Navbar = ({ toggleProfilePopup, handleNavLinkClick }) => {
  const handleLinkClick = (component) => {
    handleNavLinkClick(component);
  };

  return (
    <nav>
      <img src={logo} alt="Logo" className="logo" />

      <div className="links">
        <a href="#" onClick={() => handleLinkClick('Notifications')}>
          Notifications
        </a>
        <a href="#" onClick={() => handleLinkClick('NewProposals')}>
          New Proposals
        </a>
        <a href="#" onClick={() => handleLinkClick('History')}>
          History
        </a>
        <a href="#" onClick={() => handleLinkClick('PresentProjects')}>
          Present Projects
        </a>
        <a href="#" onClick={() => handleLinkClick('Reviews')}>
          Reviews
        </a>
      </div>
      <div className="user-icon" onClick={toggleProfilePopup}>
        <FontAwesomeIcon icon={faUser} className="iconProfile" />
      </div>
    </nav>
  );
};

export default Navbar;
