import React, { useState, useEffect } from 'react';

const UserProfile = ({ showModal, handleModalToggle }) => {
  const [userProfile, setUserProfile] = useState(null);

  // useEffect(() => {
  //   const getProfile = async () => {
  //     try {
  //       const response = await fetch('http://localhost:3000/api/Freelancer/getProfile');
  //       const data = await response.json();

  //       // Destructure the response data to exclude "Notifications" and "Samples"
  //       const { Notifications, Samples, ...profileWithoutNotificationsAndSamples } = data;

  //       setUserProfile(profileWithoutNotificationsAndSamples);
  //     } catch (error) {
  //       console.error('Error fetching user profile:', error);
  //     }
  //   };

  //   getProfile();
  // }, []);

  return (
    <div>
      {showModal && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">User Profile</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleModalToggle}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {userProfile ? (
                  <div>
                    <p>Full Name: {userProfile.FullName}</p>
                    <p>Email: {userProfile.Email}</p>
                    {/* Add other profile fields here */}
                  </div>
                ) : (
                  <p>Loading...</p>
                )}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleModalToggle}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
