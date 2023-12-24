import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Modal, Carousel } from 'react-bootstrap';

const SearchComponent = () => {
  const [query, setQuery] = useState('');
  const [allProjects, setAllProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const handleSearch = async () => {
    try {
      let searchUrl = 'http://localhost:3000/api/Freelancer/getallProjects';

      if (query.trim() !== '') {
        searchUrl = `http://localhost:3000/api/Freelancer/searchSeller?query=${query}`;
      }

      const token = localStorage.getItem('token');
      const response = await fetch(searchUrl, {
        headers: {
          token: token,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setFilteredProjects(data.sellerProjects || data);
      setCarouselIndex(0);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const fetchAllProjects = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/Freelancer/getallProjects', {
        headers: {
          token: token,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setAllProjects(data);
      setFilteredProjects(data);
    } catch (error) {
      console.error('Error fetching all projects:', error);
    }
  };
  const fetchSellerProjects = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('localhost:3000/api/Freelancer/getsellerprojects', {
        headers: {
          token: token,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setAllProjects(data);
      setFilteredProjects(data);
    } catch (error) {
      console.error('Error fetching all projects:', error);
    }
  };

  useEffect(() => {
    fetchAllProjects();
   
  }, []);

  useEffect(()=>{
    fetchSellerProjects();
  },[]);

  const handleShowModal = (project, index) => {
    setSelectedProject(project);
    setCarouselIndex(index);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
    setShowModal(false);
  };

  useEffect(() => {
    handleSearch();
  }, [query, allProjects]);

  return (
    <Container className="mt-4">
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <button className="btn btn-outline-secondary" type="button" onClick={handleSearch}>
        Search
      </button>

   
      <div className="heading-container">
        <div className="animated-heading">Projects</div>
      </div>

   
      <div>
        {filteredProjects.length > 0 && (
          <Carousel
            activeIndex={carouselIndex}
            onSelect={(selectedIndex) => setCarouselIndex(selectedIndex)}
            style={{ maxWidth: '80%', margin: '0 auto' }}
          >
            {filteredProjects.map((project, index) => (
              <Carousel.Item key={project._id} onClick={() => handleShowModal(project, index)}>
                <div className="cardbody">
                  <Card className="mb-3 text-white text-center">
                    <Card.Body>
                      <Card.Title className="mb-2 text-white text-center">{project.Title}</Card.Title>
                      {/* Center the Card.Text */}
                      <Card.Text className="mb-2 text-white text-center">{project.Description}</Card.Text>
                      <Button variant="primary ">View Details</Button>
                    </Card.Body>
                  </Card>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        )}
      </div>

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
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="heading-container">
        <div className="animated-heading">Seller Products</div>
      </div>
{/*Seller Products Fetch*/ }
      <div>
        {filteredProjects.length > 0 && (
          <Carousel
            activeIndex={carouselIndex}
            onSelect={(selectedIndex) => setCarouselIndex(selectedIndex)}
            style={{ maxWidth: '80%', margin: '0 auto' }}
          >
            {filteredProjects.map((project, index) => (
              <Carousel.Item key={project._id} onClick={() => handleShowModal(project, index)}>
                <div className="cardbody">
                  <Card className="mb-3 text-white text-center">
                    <Card.Body>
                      <Card.Title className="mb-2 text-white text-center">{project.Title}</Card.Title>
                      {/* Center the Card.Text */}
                      <Card.Text className="mb-2 text-white text-center">{project.Description}</Card.Text>
                      <Button variant="primary ">View Details</Button>
                    </Card.Body>
                  </Card>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        )}
      </div>
    </Container>

  );
};

export default SearchComponent;
