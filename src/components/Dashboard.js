import React, { useState } from 'react';
import Navbar from './Navbar';
import ProfilePopup from './ProfilePopup';
import Notifications from './Notifications'; // Import the component for Notifications
import NewProposals from './NewProposals'; // Import the component for New Proposals
import History from './History'; // Import the component for History
import PresentProjects from './PresentProject'; // Import the component for Present Projects
import Reviews from './Reviews'; // Import the component for Reviews
import Home from './Home'; // Import the component for Reviews
import Profile from './ProfilePopup';
const Dashboard = () => {
  const [activeComponent, setActiveComponent] = useState('Dashboard');
  const [isProfilePopupOpen, setProfilePopupOpen] = useState(false);

  const toggleProfilePopup = () => {
    setProfilePopupOpen(!isProfilePopupOpen);
  };

  const handleNavLinkClick = (component) => {
    setActiveComponent(component);
  };

  return (
    <div>
      <Navbar
        toggleProfilePopup={toggleProfilePopup}
        handleNavLinkClick={handleNavLinkClick}
      />
      {activeComponent === 'Home' && <Home />}
      {activeComponent === 'Notifications' && <Notifications />}
      {activeComponent === 'NewProposals' && <NewProposals />}
      {activeComponent === 'History' && <History />}
      {activeComponent === 'PresentProjects' && <PresentProjects />}
      {activeComponent === 'Reviews' && <Reviews />}
      {activeComponent === 'Dashboard' && <Profile/>}
      {isProfilePopupOpen && <ProfilePopup onClose={toggleProfilePopup} />}


    
    </div>
  );
};

export default Dashboard;
