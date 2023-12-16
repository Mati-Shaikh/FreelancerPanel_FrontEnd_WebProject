import React from 'react';

const ProfilePopup = ({ onClose }) => {
  return (
    <div className="profile-popup">
      <h2>Your Profile Features</h2>
      {/* Add various profile features here */}
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default ProfilePopup;
