import React, { useEffect, useState } from 'react';
import AddProjectModal from './SampleProject';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMoneyBill } from '@fortawesome/free-solid-svg-icons';

const FreelancerProfile = () => {
  const [profileData, setProfileData] = useState({
    FullName: '',
    Email: '',
    Specialities: [],
    Samples: []
  });
  const [showModal, setShowModal] = useState(false);

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
              <p className="card-text">{sample.Description}</p>
              <p>Technologies: {sample.Technologies.join(', ')}</p>
              <div className="d-flex flex-wrap">
                {sample.ImageUrl && sample.ImageUrl.map((url, index) => (
                  <img key={index} src={url} className="rounded-circle img-fluid m-2" style={{ width: '100px', height: '100px' ,backgroundColor:'grey'}} />
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
          justifyContent: 'center'
        }}
        className="btn btn-primary" 
        onClick={() => setShowModal(true)}
      >
       + 
      </button>
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
          marginBottom:"60px"
        }}
        className="btn btn-primary" 
        onClick={() => setShowModal(true)}
      >
       <FontAwesomeIcon icon={faMoneyBill} style={{backgroundColor:'transparent'}}/>
      </button>
    </div>
  );
};

export default FreelancerProfile;
