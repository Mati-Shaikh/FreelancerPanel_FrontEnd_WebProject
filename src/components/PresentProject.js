import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBusinessTime, faMessage } from '@fortawesome/free-solid-svg-icons';

const PresentProposals = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/api/Freelancer/getPresentProposals', {
          headers: {
            token: token,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProjects(data.projects);
        } else {
          console.error('Failed to fetch present proposals:', response.status);
        }
      } catch (error) {
        console.error('Error during present proposals fetch:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleDelivered = async (id) => {
    try {
      console.log(id)
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/api/Freelancer/ProjectDelivered/${id}`, {
        method: 'POST', // Assuming you are using a PUT request for updating the project status
        headers: {
          token: token,
        },
      });
      const data=response.json();
      console.log(data);
      if (response.ok) {
        // Project approved successfully
        alert('Project Delivered successfully');
        
          } else {
        const data = await response.json();
        console.error('Failed to Delivered project:', data.message);
        alert('Failed to Deliver project');
      }
    } catch (error) {
      console.error('Error during project deliver:', error);
      alert('Error during project deliver');
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
    <div className="present-proposals-container">
      <div className="heading-container">
        <div className="animated-heading"> <FontAwesomeIcon icon={faBusinessTime} /> Present Proposals</div>
      </div>

      {loading && <p className="text-muted">Loading present proposals...</p>}

      {!loading && projects.length === 0 && <p className="text-muted">No present proposals available.</p>}

      {!loading && projects.length > 0 && (
        <div className='present-proposal'>
          {projects.map((project) => (
            <div key={project._id} className='cardbody'>
              
              <Card className="mb-3">
                <Card.Body>
                <FontAwesomeIcon 
  icon={faMessage} 
  style={{
    position: 'absolute', 
    top: 20, 
    right: 20,
    backgroundColor: "transparent",
    color: "white",
    cursor:"pointer"
  }}
/>

                  <Card.Title className="mt-2 text-white">{project.Title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-white">{project.Username}</Card.Subtitle>
                  <Card.Text className="mt-2 text-white">{project.Description}</Card.Text>
                  <Badge pill variant="info" className="mt-2 text-white">
                    Deadline: {project.Deadline}
                  </Badge>
                  <Badge pill variant="success" className="ml-2 mt-2">
                    Budget: ${project.Budget}
                  </Badge>
                  <button className="btn btn-primary detail_button" onClick={()=> handleDelivered(project._id)}>Delivered</button>
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
              <p>Username: {selectedProject.Username}</p>
              <p>Description: {selectedProject.Description}</p>
              <p>Deadline: {selectedProject.Deadline}</p>
              <p>Budget: ${selectedProject.Budget}</p>
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

export default PresentProposals;
