import React, { useState, useEffect } from 'react';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';

const NewProposals = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const fetchNewProposals = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/api/Freelancer/getnewProposal', {
          headers: {
            token: token,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProjects(data.projects);
        } else {
          console.error('Failed to fetch new proposals:', response.status);
        }
      } catch (error) {
        console.error('Error during new proposals fetch:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewProposals();
  }, []);

  const handleReject = async (id) => {
    try {
      console.log(id)
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/api/Freelancer/ProjectReject/${id}`, {
        method: 'POST', // Assuming you are using a PUT request for updating the project status
        headers: {
          token: token,
        },
      });
      const data=response.json();
      console.log(data);
      if (response.ok) {
        // Project approved successfully
        alert('Project Rejected successfully');
        
        // Refresh the list of new proposals (you may want to consider updating state)
        // For example, you can make another API call here or modify the state directly
      } else {
        const data = await response.json();
        console.error('Failed to approve project:', data.message);
        alert('Failed to Reject project');
      }
    } catch (error) {
      console.error('Error during project approval:', error);
      alert('Error during project reject');
    }
  };



  const handleApproval = async (id) => {
    try {
      console.log(id)
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/api/Freelancer/ProjectApproved/${id}`, {
        method: 'POST', // Assuming you are using a PUT request for updating the project status
        headers: {
          token: token,
        },
      });
      const data=response.json();
      console.log(data);
      if (response.ok) {
        // Project approved successfully
        alert('Project Approved successfully');
        
        // Refresh the list of new proposals (you may want to consider updating state)
        // For example, you can make another API call here or modify the state directly
      } else {
        const data = await response.json();
        console.error('Failed to approve project:', data.message);
        alert('Failed to approve project');
      }
    } catch (error) {
      console.error('Error during project approval:', error);
      alert('Error during project approval');
    }
  };
  const handleShowModal = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
    setShowModal(false);
  };

  return (
    <div className="notifications-container">
      <div className="heading-container">
        <div className="animated-heading"> <FontAwesomeIcon icon={faFileAlt} /> New Proposals</div>
      </div>

      {loading && <p className="text-muted">Loading new proposals...</p>}

      {!loading && projects.length === 0 && <p className="text-muted">No new proposals available.</p>}

      {!loading && projects.length > 0 && (
        <div className='proposals_container'>
          {projects.map((project) => (
            <div className='cardbody' key={project._id}>
              <Card className="mb-3">
                <Card.Body>
                  <Card.Title className="mt-2 text-white">{project.Title}</Card.Title>
                  <Card.Text className="mt-2 text-white">{project.Description}</Card.Text>
                  <Badge pill variant="info">
                    {project.Status}
                  </Badge>
                  <button className="btn btn-primary detail_button" onClick={()=> handleApproval(project._id)}>Accepted</button>
<button className="btn btn-primary detail_button" onClick={()=> handleReject(project._id)}>Rejected</button>
                  <Button variant="primary" className='detail_button' onClick={() => handleShowModal(project)}>
                    View Details
                  </Button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      )}

      {/* Modal for displaying project details */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: 'white' }}>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ color: 'white' }}>
          {/* Display project details here */}
          {selectedProject && (
            <>
              <p>Title: {selectedProject.Title}</p>
              <p>Description: {selectedProject.Description}</p>
              <p>Status: {selectedProject.Status}</p>
              {/* Add more details as needed */}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default NewProposals;
