import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBusinessTime, faMessage } from '@fortawesome/free-solid-svg-icons';

const PresentProposals = () => {
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [selectedProjectForMessage, setSelectedProjectForMessage] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState([]);

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
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/api/Freelancer/ProjectDelivered/${id}`, {
        method: 'POST',
        headers: {
          token: token,
        },
      });
  
      if (response.ok) {
        alert('Project Delivered successfully');
  
        // Remove the project from the list
        setProjects(prevProjects => prevProjects.filter(project => project._id !== id));
      } else {
        console.error('Failed to Deliver project');
        alert('Failed to Deliver project');
      }
    } catch (error) {
      console.error('Error during project delivery:', error);
      alert('Error during project delivery');
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


  const fetchMessages = async (projectId) => {
    try {
      console.log("Fum"+projectId)
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/api/Freelancer/getMessage/${projectId}`, {
        method: 'GET', 
      headers: {
          'Content-Type': 'application/json',
          token: token,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data)
        setMessages(data.messages); // Assuming the response has a messages array
      } else {
        console.error('Failed to fetch messages:', response.status);
        setMessages([]); // Reset messages if the fetch fails
      }
    } catch (error) {
      console.error('Error during messages fetch:', error);
      setMessages([]);
    }
  };

  const handleMessageIconClick = async (project) => {
    setSelectedProjectForMessage(project);
    setShowMessageModal(true);
    await fetchMessages(project._id);
  };
  const handleSendMessage = async (id) => {
    if (!selectedProjectForMessage || !messageText.trim()) {
      alert('Please enter a message.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      console.log(id);
      const response = await fetch(`http://localhost:3000/api/Freelancer/sendmessage/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: token,
        },
        body: JSON.stringify({ message: messageText }),
      });

      if (response.ok) {
        const responseData = await response.json();

        // Check if responseData is an array
        if (Array.isArray(responseData)) {
          setMessages(responseData);  // Assuming setMessages updates the state
        } else {
          // If it's not an array, handle it accordingly
          console.log("Received data is not an array", responseData);
          // Here you might want to handle non-array responses, depending on your use case
        }

        alert('Message sent successfully');
      } else {
        // Handle HTTP error responses
        alert('Failed to send message');
      }
    } catch (error) {
      // Handle errors in sending the message or in the response
      console.error('Error during sending message:', error);
      alert('Error during sending message');
    } finally {
      // Reset message input and close modal (or any cleanup) after sending message
      setMessageText('');
      setShowMessageModal(false);
    }
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
  onClick={() => handleMessageIconClick(project)}
  cursor="pointer"
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
              <p>Budget: ${selectedProject.UserId}</p>
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
       {/* Message Modal */}
       <Modal show={showMessageModal} onHide={() => setShowMessageModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title className='text-white'>
            Send Message to {selectedProjectForMessage?.Username}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group text-white">
              <label htmlFor="messageText">Message</label>
              <textarea 
                className="form-control" 
                id="messageText" 
                rows="3"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
              ></textarea>
            </div>
          </form>
          {/* Render existing messages */}
          <div className="existing-messages">
            {messages && messages.map((msg, index) => (
              <div key={index} className="message text-white">
                <strong>{msg.senderName}:</strong> {msg.message}
                <div className="text-muted text-white">
                  <small>{new Date(msg.createdAt).toLocaleString()}</small>
                </div>
              </div>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowMessageModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>handleSendMessage(selectedProjectForMessage?.UserId)}>
            Send
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
};

export default PresentProposals;
