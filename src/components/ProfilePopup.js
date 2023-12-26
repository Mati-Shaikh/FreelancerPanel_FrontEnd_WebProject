import React, { useEffect, useState } from 'react';
import AddProjectModal from './SampleProject';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBill, faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

const FreelancerProfile = () => {
  const [profileData, setProfileData] = useState({
    FullName: '',
    Email: '',
    Specialities: [],
    Samples: []
  });
  const [showModal, setShowModal] = useState(false);
  const [showDropup, setShowDropup] = useState(false);
  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/Freelancer/getProfile', {
        headers: {
          token: token
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setProfileData(data);
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  const handleAddProject = async (project) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/Freelancer/addSampleProject', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: token
        },
        body: JSON.stringify({ sampleProject: project })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      alert('Project has been added');
      fetchProfileData(); // Refetch the profile data to update the component
    } catch (error) {
      console.error('Error adding project:', error);
      alert('Project has not been added due to some reason');
    }
  };
  const toggleDropup = () => {
    console.log("Toggle dropup called"); // Debugging line
    setShowDropup(!showDropup);
  };

  return (
    <div className="container profile-container my-5">
      {/* Profile Info */}
      <div className="card mb-4 text-white text-center" style={{ borderColor: 'white' }}>
        <div className="card-body">
          <div className="heading-container">
            <div className="animated-heading">{profileData.FullName}</div>
          </div>
          <p className="card-text"><strong>Email:</strong> {profileData.Email}</p>
          <p className="card-text">
            <strong>Specialities:</strong>
            {profileData.Specialities.map((speciality, index) => (
              <span key={index} className="badge badge-secondary" style={{ marginLeft: '10px' }}>{speciality}</span>
            ))}
          </p>
        </div>
      </div>

      {/* Sample Projects */}
      <div>
        <div className="heading-container">
          <div className="animated-heading">Sample Projects</div>
        </div>
        {profileData.Samples.map((sample) => (
          <div key={sample._id} className="card my-3 text-white " style={{ borderColor: 'white' }}>
            <div className="card-body text-center">
              <h5 className="card-title">{sample.Title}</h5>
              <FontAwesomeIcon icon={faTrash} style={{
                position: 'absolute',
                top: 20,
                right: 20,
                backgroundColor: "transparent",
                color: "white",
                cursor: "pointer"
              }} onClick={{}}/>
              <FontAwesomeIcon icon={faPenToSquare} style={{
                position: 'absolute',
                top: 60,
                right: 20,
                backgroundColor: "transparent",
                color: "white",
                cursor: "pointer"
              }} onClick={()=>{}} />
              <p className="card-text">{sample.Description}</p>
              <p>Technologies: {sample.Technologies.join(', ')}</p>
              <div className="d-flex flex-wrap">
                {sample.ImageUrl && sample.ImageUrl.map((url, index) => (
                  <img key={index} src={url} className="rounded-circle img-fluid m-2" style={{ width: '100px', height: '100px', backgroundColor: 'white' }} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Adding Project */}
      <AddProjectModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleAddProject}
      />

      {/* Add Project Button */}
      <button
        style={{
          position: 'fixed',
          bottom: '10px',
          right: '10px',
          cursor: 'pointer',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'transparent'
        }}
        className="btn btn-primary"
        onClick={() => setShowModal(true)}
      >
        +
      </button>
      {/* Dropup Button and Menu */}
      <div style={{ position: 'fixed', bottom: '70px', right: '10px' }}>
        <button
          className="btn btn-primary"
          type="button"
          onClick={() => setShowDropup(!showDropup)}
          style={{ borderRadius: '50%', width: '50px', height: '50px', backgroundColor: "transparent" }}
        >
          <FontAwesomeIcon icon={faMoneyBill} />
        </button>
        {showDropup && (
          <div
            className="dropdown-menu show"
            style={{ position: 'absolute', bottom: '50px', right: '0' }}
          >
            <span className="dropdown-item text-center">Account Balance: ${profileData.AccountBalance}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default FreelancerProfile;
